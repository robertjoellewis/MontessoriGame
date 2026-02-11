// Cottage Interior - Image-Based Sprite Loader
// Loads AI-generated Stardew Valley-style sprites from PNG files

/**
 * Preload all cottage interior sprites
 * Call this from scene.preload()
 */
export function preloadCottageSprites(scene) {
    // Load ALL FLUX-generated sprites (perfect Stardew Valley style)
    scene.load.image('cottage_floor_ai', '/assets/sprites/cleaned/floor_planks.png');
    scene.load.image('cottage_bed_ai', '/assets/sprites/cleaned/bed.png');
    scene.load.image('cottage_dresser_ai', '/assets/sprites/cleaned/dresser.png');
    scene.load.image('cottage_table_ai', '/assets/sprites/cleaned/table.png');
    scene.load.image('cottage_door_ai', '/assets/sprites/cleaned/door.png');
    scene.load.image('cottage_window_ai', '/assets/sprites/cleaned/window.png');
    scene.load.image('cottage_plant_ai', '/assets/sprites/cleaned/plant.png');
    scene.load.image('cottage_coffee_maker_ai', '/assets/sprites/cleaned/coffee_maker.png');
    scene.load.image('cottage_rug_ai', '/assets/sprites/cleaned/rug.png');
}

/**
 * Get the floor texture key
 * Returns AI-generated texture if available, otherwise generates procedurally
 */
export function getCottageFloorKey(scene) {
    if (scene.textures.exists('cottage_floor_ai')) {
        return 'cottage_floor_ai';
    }
    // Fallback: import and use procedural generation
    console.warn('Using procedural floor texture - AI sprite not found');
    return null; // Will trigger procedural generation
}

/**
 * Get the bed texture key
 */
export function getCottageBedKey(scene) {
    if (scene.textures.exists('cottage_bed_ai')) {
        return 'cottage_bed_ai';
    }
    console.warn('Using procedural bed texture - AI sprite not found');
    return null;
}

/**
 * Get the dresser texture key
 */
export function getCottageDresserKey(scene) {
    if (scene.textures.exists('cottage_dresser_ai')) {
        return 'cottage_dresser_ai';
    }
    console.warn('Using procedural dresser texture - AI sprite not found');
    return null;
}

/**
 * Get the window texture key
 */
export function getCottageWindowKey(scene) {
    if (scene.textures.exists('cottage_window_ai')) {
        return 'cottage_window_ai';
    }
    console.warn('Using procedural window texture - AI sprite not found');
    return null;
}

/**
 * Get the rug texture key
 */
export function getCottageRugKey(scene) {
    if (scene.textures.exists('cottage_rug_ai')) {
        return 'cottage_rug_ai';
    }
    console.warn('Using procedural rug texture - AI sprite not found');
    return null;
}

// Export all texture keys for easy reference
export const COTTAGE_TEXTURES = {
    FLOOR: 'cottage_floor_ai',
    BED: 'cottage_bed_ai',
    DRESSER: 'cottage_dresser_ai',
    WINDOW: 'cottage_window_ai',
    RUG: 'cottage_rug_ai',
    // To be added:
    // WALLPAPER: 'cottage_wallpaper_ai',
    // TABLE: 'cottage_table_ai',
    // DOOR: 'cottage_door_ai',
    // PLANT: 'cottage_plant_ai',
    // COFFEE_MAKER: 'cottage_coffee_maker_ai',
};
