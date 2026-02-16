// Level class

class Level {
    constructor() {
        this.tiles = [];
        this.width = 40;  // 40 tiles wide
        this.height = 23; // 23 tiles tall
        this.enemies = [];
        this.powerups = [];

        this.initLevel();
    }

    initLevel() {
        // Initialize empty level
        for (let y = 0; y < this.height; y++) {
            this.tiles[y] = [];
            for (let x = 0; x < this.width; x++) {
                this.tiles[y][x] = 0; // 0 = empty, 1 = solid
            }
        }

        // Create simple platform level
        // Ground
        for (let x = 0; x < this.width; x++) {
            this.tiles[this.height - 1][x] = 1;
            this.tiles[this.height - 2][x] = 1;
        }

        // Platforms
        for (let x = 5; x < 15; x++) {
            this.tiles[15][x] = 1;
        }

        for (let x = 20; x < 30; x++) {
            this.tiles[12][x] = 1;
        }

        for (let x = 10; x < 20; x++) {
            this.tiles[8][x] = 1;
        }

        // Walls
        for (let y = 0; y < this.height; y++) {
            this.tiles[y][0] = 1;
            this.tiles[y][this.width - 1] = 1;
        }

        // Spawn enemies
        this.enemies.push(new Enemy(400, 400, 'grunt'));
        this.enemies.push(new Enemy(600, 300, 'grunt'));
        this.enemies.push(new Enemy(800, 250, 'turret'));
        this.enemies.push(new Enemy(1000, 400, 'heavy'));
    }

    isSolidTile(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return false;
        }
        return this.tiles[y][x] === 1;
    }

    update(physics, player) {
        // Update all enemies
        for (let enemy of this.enemies) {
            if (enemy.active) {
                enemy.update(physics, this, player);
            }
        }
    }

    draw(ctx) {
        // Draw tiles
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.tiles[y][x] === 1) {
                    // Solid tile
                    ctx.fillStyle = '#666666';
                    ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);

                    // Border
                    ctx.strokeStyle = '#888888';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                }
            }
        }

        // Draw enemies
        for (let enemy of this.enemies) {
            enemy.draw(ctx);
        }
    }
}
