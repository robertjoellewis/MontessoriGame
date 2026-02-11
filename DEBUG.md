# Debug Mode - Scene Jumping

For testing specific scenes without playing through the entire game, use these URL links:

## Quick Links

- [Name Selection (Default)](http://localhost:5173/?scene=name)
- [Cottage Scene](http://localhost:5173/?scene=cottage)
- [Village Scene](http://localhost:5173/?scene=village)
- [Classroom Scene](http://localhost:5173/?scene=classroom)
- [Observation Scene](http://localhost:5173/?scene=observation)

## How It Works

Add `?scene=<scenename>` to the URL to jump directly to that scene.

**Examples:**
```
http://localhost:5173/?scene=classroom
http://localhost:5173/?scene=village
http://localhost:5173/?scene=cottage
```

**Note:** Some scenes may require initialization data (player name, energy, time). The system automatically sets default values for testing.
