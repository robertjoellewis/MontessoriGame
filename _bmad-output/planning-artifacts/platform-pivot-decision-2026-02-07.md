# Platform Pivot Decision: Mobile → Desktop/Laptop

**Date:** 2026-02-07
**Decision:** Pivot from mobile-first to desktop/laptop as primary platform

---

## What Happened

Built initial prototype targeting mobile-first HTML5. Tested on actual phone (served over local network). Discovered critical UX issues:

**Problems on Mobile:**
- Text too small to read comfortably
- Children sprites too small to tap accurately
- UI cramped - no room for observation panels, menus, materials
- Touch controls imprecise compared to mouse
- Fighting against platform constraints instead of building game

**Robert's realization:** *"It's almost making me wonder whether I should do this mobile on mobile or not. Like, maybe this should just be like a computer, PC, laptop type game."*

---

## Why Desktop/Laptop Makes More Sense

### 1. Genre Fit
**Management sims need screen space:**
- Observation panels with detailed child info
- Material shelves to browse and select
- Day cycle UI, trust meters, currency displays
- Multiple systems visible at once (children, materials, time, stats)
- Precision clicking (select specific child among 12)

**Reference:** Stardew Valley is PC-first. Mobile port exists but feels cramped and compromised.

### 2. Target Audience
**Primary audience: Virginia (lead guide) and educators**
- More likely to play at home on laptop/desktop
- Teachers often use computers for planning/work
- Cozy game fans tend to be PC gamers
- Genre attracts players who enjoy detailed management

### 3. Development Benefits
**Easier to build a good game:**
- More screen space = better UX design
- Mouse precision = better interaction design
- Keyboard shortcuts = power user features
- Don't waste time fighting mobile constraints
- Can always port to mobile later (not vice versa)

### 4. Controls & Inspiration
**Stardew Valley controls (what we're modeling):**
- Mouse for clicking, selecting, dragging
- WASD or arrow keys for movement (if needed)
- Keyboard shortcuts (E for inventory, etc.)
- Scroll to zoom
- Right-click context menus

These controls are natural for management sims, awkward to translate to touch.

### 5. Deployment Options Still Great
**Desktop doesn't mean "hard to distribute":**
- **itch.io** - Upload HTML5 build, plays in browser (easiest)
- **Downloadable build** - Package with Electron or similar
- **Steam** - Eventually if game takes off
- **Browser-based** - Still accessible, no install needed
- **Mobile later** - If demand exists, port after desktop version works

---

## Decision: Desktop/Laptop Primary Platform

### New Specifications

**Target Resolution:**
- Primary: 1280x720 (HD, fits most laptops)
- Stretch: 1920x1080 (Full HD for larger monitors)
- Scalable UI for different resolutions

**Controls:**
- Mouse (primary) - point, click, drag
- Keyboard (secondary) - shortcuts, movement
- No touch required

**Deployment:**
- HTML5 build on itch.io (primary)
- Downloadable option (secondary)
- Consider Steam if game succeeds (future)

**Tech Stack (unchanged):**
- Phaser 3 (works perfectly for desktop)
- Vite (dev server)
- JavaScript ES6

---

## What Changes for Next Session

### Immediate Code Changes Needed:
1. **Resize game canvas** from 800x600 → 1280x720 (or bigger)
2. **Increase sprite sizes** - children can be 64x64 or 96x96 instead of 48x48
3. **Larger text** - use 14-16px instead of 10-12px
4. **More UI space** - observation panels can be bigger, more detailed
5. **Optimize for mouse hover** instead of touch/tap

### Design Implications:
- More information can be visible on screen at once
- Can show multiple panels simultaneously
- Room for more complex UI (material browser, lesson menu, stats dashboard)
- Can use tooltips, context menus, drag-and-drop
- Keyboard shortcuts become viable

### What Stays the Same:
- Pixel art style
- 12 children system
- Observation mechanic
- Montessori progression
- Gacha/collection systems
- All design docs still valid

---

## Benefits of This Decision

✅ Better UX for players (readable, usable)
✅ Faster development (no mobile constraints)
✅ Fits the genre (management sims are PC games)
✅ Matches inspiration (Stardew is PC-first)
✅ Easier to iterate and test
✅ Still accessible (browser-based HTML5)
✅ Can add mobile later if needed

---

## Risks & Mitigations

**Risk:** Smaller potential audience (PC vs mobile)
**Mitigation:** Target audience (educators, cozy gamers) are PC users anyway. Quality > reach for indie games.

**Risk:** Harder to share/demo (can't just text a link)
**Mitigation:** itch.io makes sharing easy. Virginia can test on her laptop.

**Risk:** Development might take longer with bigger canvas
**Mitigation:** Actually faster - not fighting mobile constraints. More space = easier design.

---

## Virginia's Perspective (Primary Playtester)

**Would Virginia play this on:**
- Phone? Unlikely (small screen, hard to manage classroom sim)
- Laptop? More likely (at home after work, relaxing)

**Her use case:**
- Cozy evening gaming session
- Wants to see details (child personalities, materials)
- Needs precision (selecting specific kids, specific materials)
- Desktop fits this better

---

## Next Session Action Items

1. Update `src/main.js` - change canvas size to 1280x720
2. Regenerate child sprites at larger size (64x64 or 96x96)
3. Increase text sizes throughout UI
4. Test on laptop to confirm it feels right
5. Update README.md with new platform target
6. Commit platform pivot

---

## Conclusion

**This is the right call.** Mobile-first was a reasonable starting assumption, but real-world testing revealed it's the wrong platform for this game. Desktop/laptop fits the genre, audience, and gameplay better. We're not abandoning HTML5 (still browser-based), just targeting a bigger screen.

**Stardew Valley taught us:** Build for the platform that serves the game best. Then port if demand exists.

---

*Decision finalized after phone testing revealed UX issues. Moving forward with desktop/laptop as primary platform.*
