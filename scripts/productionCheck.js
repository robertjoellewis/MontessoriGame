#!/usr/bin/env node

/**
 * Production Deployment Readiness Checker
 * Run this before pushing to ensure all assets and configurations are production-ready
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// ANSI color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
};

let errorCount = 0;
let warningCount = 0;

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function error(message) {
    errorCount++;
    log(`❌ ERROR: ${message}`, 'red');
}

function warning(message) {
    warningCount++;
    log(`⚠️  WARNING: ${message}`, 'yellow');
}

function success(message) {
    log(`✅ ${message}`, 'green');
}

function section(title) {
    log(`\n${'='.repeat(60)}`, 'blue');
    log(title, 'blue');
    log('='.repeat(60), 'blue');
}

/**
 * Check 1: Verify all assets in src/scenes are in public/assets
 */
function checkAssetPaths() {
    section('Checking Asset Paths');

    const scenesDir = path.join(projectRoot, 'src', 'scenes');
    const sceneFiles = fs.readdirSync(scenesDir).filter(f => f.endsWith('.js'));

    sceneFiles.forEach(sceneFile => {
        const sceneContent = fs.readFileSync(path.join(scenesDir, sceneFile), 'utf8');

        // Find all asset loads
        const assetRegex = /this\.load\.(image|audio|spritesheet)\s*\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]/g;
        let match;

        while ((match = assetRegex.exec(sceneContent)) !== null) {
            const assetType = match[1];
            const assetKey = match[2];
            const assetPath = match[3];

            // Check if asset exists in public/ directory
            const publicPath = path.join(projectRoot, 'public', assetPath);

            if (!fs.existsSync(publicPath)) {
                error(`${sceneFile}: Asset not found - ${assetPath}`);
            } else {
                // Verify file is not empty
                const stats = fs.statSync(publicPath);
                if (stats.size === 0) {
                    error(`${sceneFile}: Asset is empty - ${assetPath}`);
                }
            }
        }
    });

    if (errorCount === 0) {
        success('All asset paths are valid');
    }
}

/**
 * Check 2: Verify vite.config.js base path matches repository
 */
function checkViteConfig() {
    section('Checking Vite Configuration');

    const viteConfigPath = path.join(projectRoot, 'vite.config.js');

    if (!fs.existsSync(viteConfigPath)) {
        error('vite.config.js not found');
        return;
    }

    const viteConfig = fs.readFileSync(viteConfigPath, 'utf8');
    const baseMatch = viteConfig.match(/base:\s*['"]([^'"]+)['"]/);

    if (baseMatch) {
        const basePath = baseMatch[1];
        log(`   Base path: ${basePath}`, 'magenta');

        if (basePath === '/') {
            warning('Base path is "/" - ensure this matches your deployment URL');
        } else if (!basePath.startsWith('/') || !basePath.endsWith('/')) {
            error('Base path should start and end with "/"');
        } else {
            success(`Base path configured: ${basePath}`);
        }
    } else {
        warning('No base path configured (defaults to "/")');
    }
}

/**
 * Check 3: Verify public/ assets are in sync with assets/
 */
function checkAssetSync() {
    section('Checking Asset Synchronization');

    const assetsAudio = path.join(projectRoot, 'assets', 'audio');
    const publicAudio = path.join(projectRoot, 'public', 'assets', 'audio');

    if (fs.existsSync(assetsAudio)) {
        const assetsFiles = fs.readdirSync(assetsAudio).filter(f => f.endsWith('.mp3'));
        const publicFiles = fs.readdirSync(publicAudio).filter(f => f.endsWith('.mp3'));

        const missingInPublic = assetsFiles.filter(f => !publicFiles.includes(f));

        if (missingInPublic.length > 0) {
            error(`${missingInPublic.length} audio file(s) in assets/ not in public/assets/:`);
            missingInPublic.forEach(f => log(`     - ${f}`, 'red'));
        } else {
            success('All audio files synced between assets/ and public/assets/');
        }
    }
}

/**
 * Check 4: Test build process
 */
function checkBuild() {
    section('Testing Build Process');

    const distDir = path.join(projectRoot, 'dist');

    if (!fs.existsSync(distDir)) {
        warning('dist/ folder not found - run "npm run build" before deploying');
        return;
    }

    // Check if build is recent (within last hour)
    const distStats = fs.statSync(distDir);
    const hourAgo = Date.now() - (60 * 60 * 1000);

    if (distStats.mtimeMs < hourAgo) {
        warning('Build folder is older than 1 hour - consider rebuilding');
    } else {
        success('Build folder exists and is recent');
    }

    // Check if critical assets exist in dist
    const criticalPaths = [
        'dist/index.html',
        'dist/assets'
    ];

    criticalPaths.forEach(p => {
        const fullPath = path.join(projectRoot, p);
        if (!fs.existsSync(fullPath)) {
            error(`Missing in build: ${p}`);
        }
    });
}

/**
 * Check 5: Verify no hardcoded localhost URLs
 */
function checkHardcodedURLs() {
    section('Checking for Hardcoded URLs');

    const srcDir = path.join(projectRoot, 'src');

    function checkDir(dir) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        entries.forEach(entry => {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                checkDir(fullPath);
            } else if (entry.isFile() && entry.name.endsWith('.js')) {
                const content = fs.readFileSync(fullPath, 'utf8');

                if (content.includes('localhost:5173') || content.includes('127.0.0.1')) {
                    warning(`Hardcoded localhost found in ${path.relative(projectRoot, fullPath)}`);
                }
            }
        });
    }

    checkDir(srcDir);

    if (warningCount === 0) {
        success('No hardcoded localhost URLs found');
    }
}

/**
 * Check 6: Verify all imported files exist
 */
function checkImports() {
    section('Checking Import Paths');

    const srcDir = path.join(projectRoot, 'src');
    let importErrors = 0;

    function checkFile(filePath) {
        const content = fs.readFileSync(filePath, 'utf8');
        const dir = path.dirname(filePath);

        // Match import statements
        const importRegex = /import\s+(?:{[^}]+}|[^'"]+)\s+from\s+['"]([^'"]+)['"]/g;
        let match;

        while ((match = importRegex.exec(content)) !== null) {
            let importPath = match[1];

            // Skip node_modules imports
            if (!importPath.startsWith('.')) continue;

            // Resolve relative path
            let resolvedPath = path.resolve(dir, importPath);

            // Try adding .js extension if not present
            if (!fs.existsSync(resolvedPath) && !importPath.endsWith('.js')) {
                resolvedPath += '.js';
            }

            if (!fs.existsSync(resolvedPath)) {
                error(`Import not found: ${importPath} in ${path.relative(projectRoot, filePath)}`);
                importErrors++;
            }
        }
    }

    function checkDir(dir) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        entries.forEach(entry => {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                checkDir(fullPath);
            } else if (entry.isFile() && entry.name.endsWith('.js')) {
                checkFile(fullPath);
            }
        });
    }

    checkDir(srcDir);

    if (importErrors === 0) {
        success('All import paths are valid');
    }
}

/**
 * Main execution
 */
function main() {
    log('\n🚀 Production Deployment Readiness Check', 'magenta');
    log('=========================================', 'magenta');

    checkAssetPaths();
    checkAssetSync();
    checkViteConfig();
    checkBuild();
    checkHardcodedURLs();
    checkImports();

    // Summary
    section('Summary');

    if (errorCount === 0 && warningCount === 0) {
        success('✨ All checks passed! Ready for production deployment.');
        process.exit(0);
    } else {
        if (errorCount > 0) {
            log(`\n❌ ${errorCount} error(s) found - fix before deploying`, 'red');
        }
        if (warningCount > 0) {
            log(`⚠️  ${warningCount} warning(s) found - review before deploying`, 'yellow');
        }

        if (errorCount > 0) {
            process.exit(1);
        } else {
            process.exit(0);
        }
    }
}

main();
