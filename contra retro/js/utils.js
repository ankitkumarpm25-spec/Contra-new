// Utility functions and constants

const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;
const TILE_SIZE = 32;
const GRAVITY = 0.5;
const MAX_FALL_SPEED = 10;

// Direction constants (8-directional)
const DIRECTION = {
    RIGHT: 0,
    UP_RIGHT: 1,
    UP: 2,
    UP_LEFT: 3,
    LEFT: 4,
    DOWN_LEFT: 5,
    DOWN: 6,
    DOWN_RIGHT: 7
};

// Weapon types
const WEAPON_TYPE = {
    MACHINE_GUN: 'MACHINE_GUN',
    SPREAD_GUN: 'SPREAD_GUN',
    LASER: 'LASER'
};

// Utility functions
const Utils = {
    // Clamp value between min and max
    clamp: (value, min, max) => {
        return Math.max(min, Math.min(max, value));
    },

    // Check rectangle collision
    checkCollision: (rect1, rect2) => {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    },

    // Get direction vector from angle (8-directional)
    getDirectionVector: (direction) => {
        const vectors = [
            { x: 1, y: 0 },      // RIGHT
            { x: 1, y: -1 },     // UP_RIGHT
            { x: 0, y: -1 },     // UP
            { x: -1, y: -1 },    // UP_LEFT
            { x: -1, y: 0 },     // LEFT
            { x: -1, y: 1 },     // DOWN_LEFT
            { x: 0, y: 1 },      // DOWN
            { x: 1, y: 1 }       // DOWN_RIGHT
        ];
        return vectors[direction] || vectors[0];
    },

    // Normalize vector
    normalize: (vec) => {
        const length = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
        if (length === 0) return { x: 0, y: 0 };
        return { x: vec.x / length, y: vec.y / length };
    },

    // Distance between two points
    distance: (x1, y1, x2, y2) => {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    },

    // Random integer between min and max (inclusive)
    randomInt: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Draw pixel-perfect rectangle
    drawRect: (ctx, x, y, width, height, color) => {
        ctx.fillStyle = color;
        ctx.fillRect(Math.floor(x), Math.floor(y), width, height);
    },

    // Draw pixel-perfect circle
    drawCircle: (ctx, x, y, radius, color) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(Math.floor(x), Math.floor(y), radius, 0, Math.PI * 2);
        ctx.fill();
    },

    // Draw text with pixel font
    drawText: (ctx, text, x, y, color = '#ffffff', size = 12) => {
        ctx.fillStyle = color;
        ctx.font = `${size}px 'Press Start 2P', monospace`;
        ctx.fillText(text, Math.floor(x), Math.floor(y));
    }
};
