// Player class

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 24;
        this.height = 32;
        this.velocityX = 0;
        this.velocityY = 0;
        this.speed = 5;
        this.jumpPower = 12;
        this.grounded = false;
        this.facing = 1; // 1 = right, -1 = left
        this.aimDirection = DIRECTION.RIGHT;
        this.aimLocked = false;

        // Combat
        this.lives = 3;
        this.weapon = WEAPON_TYPE.MACHINE_GUN;
        this.ammo = Infinity;
        this.shootCooldown = 0;
        this.shootDelay = 5; // frames between shots

        // Animation
        this.animFrame = 0;
        this.animTimer = 0;
    }

    update(physics, level) {
        // Store previous grounded state
        const wasGrounded = this.grounded;
        this.grounded = false;

        // Movement input
        const horizontal = Input.getHorizontal();
        if (horizontal !== 0) {
            this.velocityX = horizontal * this.speed;
            this.facing = horizontal;
        } else {
            this.velocityX = 0;
        }

        // Jump
        if (Input.isJumpPressed() && wasGrounded) {
            this.velocityY = -this.jumpPower;
        }

        // Aim direction
        if (!Input.isAimLockPressed()) {
            const aimDir = Input.getAimDirection();
            if (aimDir !== null) {
                this.aimDirection = aimDir;
            } else {
                // Default to horizontal facing
                this.aimDirection = this.facing === 1 ? DIRECTION.RIGHT : DIRECTION.LEFT;
            }
        }

        // Apply physics
        physics.applyGravity(this);

        // Update position
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Collision detection
        physics.checkTileCollision(this, level);

        // Keep in bounds
        this.x = Utils.clamp(this.x, 0, GAME_WIDTH - this.width);
        this.y = Utils.clamp(this.y, 0, GAME_HEIGHT - this.height);

        // Shooting
        if (this.shootCooldown > 0) {
            this.shootCooldown--;
        }

        // Animation
        this.animTimer++;
        if (this.animTimer > 8) {
            this.animTimer = 0;
            this.animFrame = (this.animFrame + 1) % 2;
        }
    }

    shoot() {
        if (this.shootCooldown > 0) return null;

        this.shootCooldown = this.shootDelay;

        const dirVec = Utils.getDirectionVector(this.aimDirection);
        const bulletX = this.x + this.width / 2;
        const bulletY = this.y + this.height / 2;

        if (this.weapon === WEAPON_TYPE.SPREAD_GUN) {
            // Create 5 bullets in spread pattern
            const bullets = [];
            for (let i = -2; i <= 2; i++) {
                const angle = Math.atan2(dirVec.y, dirVec.x) + (i * 0.2);
                bullets.push(new Bullet(
                    bulletX,
                    bulletY,
                    Math.cos(angle),
                    Math.sin(angle),
                    true
                ));
            }
            return bullets;
        } else {
            // Single bullet
            return [new Bullet(bulletX, bulletY, dirVec.x, dirVec.y, true)];
        }
    }

    takeDamage() {
        this.lives--;
        // Reset position (simple respawn)
        this.x = 100;
        this.y = 100;
        this.velocityX = 0;
        this.velocityY = 0;
    }

    draw(ctx) {
        // Simple rectangle representation (replace with sprites later)
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Draw facing indicator
        ctx.fillStyle = '#ffffff';
        const eyeX = this.x + (this.facing === 1 ? this.width - 8 : 8);
        ctx.fillRect(eyeX, this.y + 8, 4, 4);

        // Draw weapon indicator
        const weaponX = this.x + (this.facing === 1 ? this.width : 0);
        const weaponY = this.y + this.height / 2;
        ctx.fillStyle = '#ffff00';
        ctx.fillRect(weaponX, weaponY, this.facing * 8, 2);
    }
}
