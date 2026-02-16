// Physics and gravity system

class Physics {
    constructor() {
        this.gravityDirection = { x: 0, y: 1 }; // Default: down
        this.gravityStrength = GRAVITY;
        this.gravityZones = [];
    }

    // Add a gravity zone
    addGravityZone(zone) {
        this.gravityZones.push(zone);
    }

    // Clear all gravity zones
    clearGravityZones() {
        this.gravityZones = [];
    }

    // Get gravity for a specific position
    getGravityAt(x, y) {
        // Check if position is in any gravity zone
        for (let zone of this.gravityZones) {
            if (x >= zone.x && x <= zone.x + zone.width &&
                y >= zone.y && y <= zone.y + zone.height) {
                return {
                    x: zone.gravityX * this.gravityStrength,
                    y: zone.gravityY * this.gravityStrength
                };
            }
        }

        // Default gravity
        return {
            x: this.gravityDirection.x * this.gravityStrength,
            y: this.gravityDirection.y * this.gravityStrength
        };
    }

    // Apply gravity to an entity
    applyGravity(entity) {
        const gravity = this.getGravityAt(entity.x, entity.y);
        entity.velocityX += gravity.x;
        entity.velocityY += gravity.y;

        // Clamp fall speed
        entity.velocityY = Utils.clamp(entity.velocityY, -MAX_FALL_SPEED, MAX_FALL_SPEED);
    }

    // Check collision with level tiles
    checkTileCollision(entity, level) {
        const tileX = Math.floor(entity.x / TILE_SIZE);
        const tileY = Math.floor(entity.y / TILE_SIZE);

        // Check surrounding tiles
        for (let dy = -1; dy <= 2; dy++) {
            for (let dx = -1; dx <= 2; dx++) {
                const tx = tileX + dx;
                const ty = tileY + dy;

                if (level.isSolidTile(tx, ty)) {
                    const tileRect = {
                        x: tx * TILE_SIZE,
                        y: ty * TILE_SIZE,
                        width: TILE_SIZE,
                        height: TILE_SIZE
                    };

                    const entityRect = {
                        x: entity.x,
                        y: entity.y,
                        width: entity.width,
                        height: entity.height
                    };

                    if (Utils.checkCollision(entityRect, tileRect)) {
                        this.resolveCollision(entity, tileRect);
                    }
                }
            }
        }
    }

    // Resolve collision between entity and tile
    resolveCollision(entity, tile) {
        const overlapLeft = (entity.x + entity.width) - tile.x;
        const overlapRight = (tile.x + tile.width) - entity.x;
        const overlapTop = (entity.y + entity.height) - tile.y;
        const overlapBottom = (tile.y + tile.height) - entity.y;

        // Find smallest overlap
        const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

        if (minOverlap === overlapLeft) {
            entity.x = tile.x - entity.width;
            entity.velocityX = 0;
        } else if (minOverlap === overlapRight) {
            entity.x = tile.x + tile.width;
            entity.velocityX = 0;
        } else if (minOverlap === overlapTop) {
            entity.y = tile.y - entity.height;
            entity.velocityY = 0;
            entity.grounded = true;
        } else if (minOverlap === overlapBottom) {
            entity.y = tile.y + tile.height;
            entity.velocityY = 0;
        }
    }
}

// Gravity zone types
const GRAVITY_ZONE_TYPE = {
    FLIP: 'FLIP',           // Reverse gravity
    ZERO_G: 'ZERO_G',       // No gravity
    WELL: 'WELL',           // Pull toward center
    DIRECTIONAL: 'DIRECTIONAL' // Custom direction
};

class GravityZone {
    constructor(x, y, width, height, type, gravityX = 0, gravityY = 1) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.gravityX = gravityX;
        this.gravityY = gravityY;
    }

    draw(ctx) {
        // Visual indicator for gravity zones
        ctx.fillStyle = this.type === GRAVITY_ZONE_TYPE.FLIP ? 'rgba(0, 255, 255, 0.1)' :
            this.type === GRAVITY_ZONE_TYPE.ZERO_G ? 'rgba(255, 0, 255, 0.1)' :
                'rgba(0, 255, 0, 0.1)';
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Draw border
        ctx.strokeStyle = this.type === GRAVITY_ZONE_TYPE.FLIP ? '#00ffff' :
            this.type === GRAVITY_ZONE_TYPE.ZERO_G ? '#ff00ff' :
                '#00ff00';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}
