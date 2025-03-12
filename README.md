# 2048 Game for Facebook Instant Games

A classic 2048 puzzle game implemented as a Facebook Instant Game using HTML5 Canvas and JavaScript.

## Overview

2048 is a sliding tile puzzle game where players combine numbered tiles to create a tile with the number 2048. The game features:

- Smooth animations and modern visuals
- Facebook Instant Games integration
- Score tracking and social features
- Mobile-friendly controls

## How to Play

1. Use arrow keys to slide tiles in any direction
2. When two tiles with the same number collide, they merge into one tile with the sum
3. After each move, a new tile with value 2 or 4 appears
4. Try to create a tile with the number 2048!

## Technical Details

The game is built using:
- HTML5 Canvas for rendering
- Vanilla JavaScript for game logic
- Facebook Instant Games SDK for social features

Key files:
- `index.html` - Main game page
- `js/game.js` - Core game mechanics
- `js/render.js` - Canvas rendering logic
- `js/utils.js` - Helper functions
- `js/main.js` - Game initialization and controls
- `css/style.css` - Game styling

## Features

- Animated tile movements and merges
- Score tracking
- Game over detection
- Social sharing when reaching 2048
- Session score updates
- Responsive design

## Development

To run locally:
1. Set up a Facebook Instant Games project
2. Clone this repository
3. Configure your Facebook App ID
4. Test using the Facebook Instant Games simulator

## Credits

This implementation is inspired by the original 2048 game created by Gabriele Cirulli.
