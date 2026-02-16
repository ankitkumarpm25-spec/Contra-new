// Enemy classes

class Enemy {
    constructor(x, y, type = 'grunt') {
        this.x = x;
        this.y = y;
        this.width = 24;
        this.height = 24;
        this.velocityX = 0;
        this.velocityY = 0;
        this.type = type;
        this.hp = 1;
        this.active = true;
        this.grounded = false;

        // AI
        this.aiTimer = 0;
        this.aiState = 'patrol';
        this.patrolDirection = -1;
        this.shootCooldown = 0;

        // Set properties based on type
        if (type === 'grunt') {
            this.hp = 1;
            this.speed = 2;
            this.shootDelay = 60;
        } else if (type === 'turret') {
            this.hp = 3;
            this.speed = 0;
            this.shootDelay = 45;
        } else if (type === 'heavy') {
            this.hp = 5;
            this.speed = 1;
            this.shootDelay = 30;
        }
    }

    update(physics, level, player) {
        if (!this.active) return;

        this.grounded = false;
        this.aiTimer++;

        // Different AI based on type
        if (this.type === 'grunt') {
            this.updateGruntAI(player);
        } else if (this.type === 'turret') {
            this.updateTurretAI(player);
        } else if (this.type === 'heavy') {
            this.updateHeavyAI(player);
        }

        // Apply physics (except turrets)
        if (this.type !== 'turret') {
            physics.applyGravity(this);
            this.x += this.velocityX;
            this.y += this.velocityY;
            physics.checkTileCollision(this, level);
        }

        // Shooting cooldown
        if (this.shootCooldown > 0) {
            this.shootCooldown--;
        }
    }

    updateGruntAI(player) {
        // Simple patrol behavior
        if (this.aiState === 'patrol') {
            this.velocityX = this.patrolDirection * this.speed;

            // Change direction randomly
            if (this.aiTimer % 120 === 0) {
                this.patrolDirection *= -1;
            }
        }

        // Shoot if player is in line of sight
        const distToPlayer = Utils.distance(this.x, this.y, player.x, player.y);
        if (distToPlayer < 300 && this.shootCooldown === 0) {
            this.aiState = 'attack';
        }
    }

    updateTurretAI(player) {
        // Stationary, just shoot at player
        const distToPlayer = Utils.distance(this.x, this.y, player.x, player.y);
        if (distToPlayer < 400 && this.shootCooldown === 0) {
            this.aiState = 'attack';
        }
    }

    updateHeavyAI(player) {
        // Move toward player
        if (player.x < this.x) {
            this.velocityX = -this.speed;
        } else {
            this.velocityX = this.speed;
        }

        // Shoot frequently
        const distToPlayer = Utils.distance(this.x, this.y, player.x, player.y);
        if (distToPlayer < 350 && this.shootCooldown === 0) {
            this.aiState = 'attack';
        }
    }

    shoot(player) {
        if (this.shootCooldown > 0 || this.aiState !== 'attack') return null;

        this.shootCooldown = this.shootDelay;
        this.aiState = 'patrol';

        // Calculate direction to player
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const normalized = Utils.normalize({ x: dx, y: dy });

        if (this.type === 'turret') {
            // Turret shoots 3-way spread
            const bullets = [];
            for (let i = -1; i <= 1; i++) {
                const angle = Math.atan2(normalized.y, normalized.x) + (i * 0.3);
                bullets.push(new Bullet(
                    this.x + this.width / 2,
                    this.y + this.height / 2,
                    Math.cos(angle),
                    Math.sin(angle),
                    false
                ));
            }
            return bullets;
        } else {
            // Single bullet toward player
            return [new Bullet(
                this.x + this.width / 2,
                this.y + this.height / 2,
                normalized.x,
                normalized.y,
                false
            )];
        }
    }

    takeDamage(damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.active = false;
            return true; // Enemy killed
        }
        return false;
    }

    draw(ctx) {
        if (!this.active) return;

        // Different colors for different types
        if (this.type === 'grunt') {
            ctx.fillStyle = '#ff0000';
        } else if (this.type === 'turret') {
            ctx.fillStyle = '#ff6600';
        } else if (this.type === 'heavy') {
            ctx.fillStyle = '#cc0000';
        }

        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Draw HP indicator
        ctx.fillStyle = '#00ff00';
        const hpWidth = (this.hp / (this.type === 'heavy' ? 5 : this.type === 'turret' ? 3 : 1)) * this.width;
        ctx.fillRect(this.x, this.y - 4, hpWidth, 2);
    }
}
