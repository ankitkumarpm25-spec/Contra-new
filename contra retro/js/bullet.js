// Bullet class

class Bullet {
    constructor(x, y, dirX, dirY, isPlayerBullet = true) {
        this.x = x;
        this.y = y;
        this.width = 4;
        this.height = 4;
        this.dirX = dirX;
        this.dirY = dirY;
        this.speed = 15;
        this.isPlayerBullet = isPlayerBullet;
        this.active = true;
        this.damage = 1;
    }

    update() {
        // Move bullet
        this.x += this.dirX * this.speed;
        this.y += this.dirY * this.speed;

        // Deactivate if out of bounds
        if (this.x < 0 || this.x > GAME_WIDTH ||
            this.y < 0 || this.y > GAME_HEIGHT) {
            this.active = false;
        }
    }

    checkCollision(target) {
        if (!this.active) return false;

        const bulletRect = {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };

        const targetRect = {
            x: target.x,
            y: target.y,
            width: target.width,
            height: target.height
        };

        return Utils.checkCollision(bulletRect, targetRect);
    }

    draw(ctx) {
        if (!this.active) return;

        // Draw bullet
        ctx.fillStyle = this.isPlayerBullet ? '#ffff00' : '#ff0000';
        ctx.fillRect(this.x - 2, this.y - 2, this.width, this.height);

        // Draw trail
        ctx.fillStyle = this.isPlayerBullet ? 'rgba(255, 255, 0, 0.3)' : 'rgba(255, 0, 0, 0.3)';
        ctx.fillRect(
            this.x - this.dirX * 8,
            this.y - this.dirY * 8,
            this.width,
            this.height
        );
    }
}
