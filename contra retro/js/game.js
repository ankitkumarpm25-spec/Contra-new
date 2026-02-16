// Main game class

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false; // Pixel-perfect rendering

        // Game state
        this.state = 'menu'; // menu, playing, paused, gameover
        this.score = 0;
        this.level = null;
        this.player = null;
        this.physics = null;
        this.bullets = [];
        this.particles = [];

        // Gravity zones (for demo)
        this.gravityZones = [];

        this.init();
    }

    init() {
        // Initialize physics
        this.physics = new Physics();

        // Add a demo gravity flip zone
        this.gravityZones.push(new GravityZone(
            600, 200, 200, 300,
            GRAVITY_ZONE_TYPE.FLIP,
            0, -1 // Upward gravity
        ));

        for (let zone of this.gravityZones) {
            this.physics.addGravityZone(zone);
        }
    }

    startGame() {
        this.state = 'playing';
        this.score = 0;
        this.bullets = [];

        // Create level
        this.level = new Level();

        // Create player
        this.player = new Player(100, 500);

        // Update HUD
        this.updateHUD();
    }

    update() {
        if (this.state !== 'playing') return;

        // Update player
        this.player.update(this.physics, this.level);

        // Player shooting
        if (Input.isShootPressed()) {
            const newBullets = this.player.shoot();
            if (newBullets) {
                this.bullets.push(...newBullets);
            }
        }

        // Update level and enemies
        this.level.update(this.physics, this.player);

        // Enemy shooting
        for (let enemy of this.level.enemies) {
            if (enemy.active) {
                const enemyBullets = enemy.shoot(this.player);
                if (enemyBullets) {
                    this.bullets.push(...enemyBullets);
                }
            }
        }

        // Update bullets
        for (let bullet of this.bullets) {
            bullet.update();

            // Check collision with enemies (player bullets)
            if (bullet.isPlayerBullet && bullet.active) {
                for (let enemy of this.level.enemies) {
                    if (enemy.active && bullet.checkCollision(enemy)) {
                        bullet.active = false;
                        if (enemy.takeDamage(bullet.damage)) {
                            // Enemy killed
                            this.score += 100;
                            this.updateHUD();
                        }
                    }
                }
            }

            // Check collision with player (enemy bullets)
            if (!bullet.isPlayerBullet && bullet.active) {
                if (bullet.checkCollision(this.player)) {
                    bullet.active = false;
                    this.player.takeDamage();
                    this.updateHUD();

                    if (this.player.lives <= 0) {
                        this.gameOver();
                    }
                }
            }
        }

        // Remove inactive bullets
        this.bullets = this.bullets.filter(b => b.active);

        // Check if player is in gravity zone (update indicator)
        this.updateGravityIndicator();
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#1a1e3f';
        this.ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        if (this.state === 'playing' || this.state === 'paused') {
            // Draw gravity zones
            for (let zone of this.gravityZones) {
                zone.draw(this.ctx);
            }

            // Draw level
            this.level.draw(this.ctx);

            // Draw player
            this.player.draw(this.ctx);

            // Draw bullets
            for (let bullet of this.bullets) {
                bullet.draw(this.ctx);
            }
        }
    }

    updateHUD() {
        document.getElementById('lives').textContent = `❤×${this.player.lives}`;
        document.getElementById('score').textContent = `SCORE: ${this.score.toString().padStart(8, '0')}`;
        document.getElementById('weapon').textContent = `[${this.player.weapon}]`;
        document.getElementById('ammo').textContent = this.player.ammo === Infinity ? 'AMMO: ∞' : `AMMO: ${this.player.ammo}`;
    }

    updateGravityIndicator() {
        const gravity = this.physics.getGravityAt(this.player.x, this.player.y);
        const indicator = document.getElementById('gravity-indicator');

        if (gravity.y < 0) {
            indicator.textContent = '↓'; // Upward gravity
            indicator.style.color = '#ff00ff';
        } else if (gravity.y > 0) {
            indicator.textContent = '↑'; // Normal gravity
            indicator.style.color = '#00ffff';
        } else {
            indicator.textContent = '○'; // Zero-G
            indicator.style.color = '#ffff00';
        }
    }

    pause() {
        if (this.state === 'playing') {
            this.state = 'paused';
            document.getElementById('pause-menu').classList.add('active');
        }
    }

    resume() {
        if (this.state === 'paused') {
            this.state = 'playing';
            document.getElementById('pause-menu').classList.remove('active');
        }
    }

    restart() {
        this.startGame();
        document.getElementById('pause-menu').classList.remove('active');
        document.getElementById('game-over-menu').classList.remove('active');
    }

    quitToMenu() {
        this.state = 'menu';
        document.getElementById('main-menu').classList.add('active');
        document.getElementById('pause-menu').classList.remove('active');
        document.getElementById('game-over-menu').classList.remove('active');
    }

    gameOver() {
        this.state = 'gameover';
        document.getElementById('final-score').textContent = `FINAL SCORE: ${this.score.toString().padStart(8, '0')}`;
        document.getElementById('game-over-menu').classList.add('active');
    }
}
