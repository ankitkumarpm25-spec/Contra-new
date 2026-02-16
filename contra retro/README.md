# CONTRA: GRAVITY SHIFT

A retro-styled run-and-gun platformer with anti-gravity mechanics, built with HTML5 Canvas.

![Game Screenshot](screenshot.png)

## 🎮 Play Now

**[Play the Game](https://yourusername.github.io/contra-gravity-shift/)** (GitHub Pages)

Or download and open `index.html` in your browser!

## ✨ Features

- 🎯 Classic run-and-gun gameplay
- 🌀 Anti-gravity mechanics with dynamic zones
- 🤖 Smart enemy AI (3 types)
- 💥 Fast-paced arcade action
- 🎨 Retro pixel-art aesthetic with CRT effects
- 🎵 60 FPS smooth gameplay

## 🕹️ Controls

| Action | Keys |
|--------|------|
| Move | Arrow Keys / WASD |
| Jump | Spacebar |
| Shoot | Z or J |
| Aim Lock | Shift |
| Pause | ESC |

## 🚀 Quick Start

### Play Locally
1. Clone this repository
2. Open `index.html` in your browser
3. Start playing!

### Run with Server (Optional)
```bash
# Using Python
python -m http.server 3000

# Using Node.js
node server.js
```

Then open http://localhost:3000

## 📦 Project Structure

```
contra-retro/
├── index.html          # Main game file
├── styles.css          # Retro styling
├── js/
│   ├── utils.js        # Utilities
│   ├── input.js        # Input handling
│   ├── physics.js      # Physics engine
│   ├── player.js       # Player class
│   ├── bullet.js       # Bullet system
│   ├── enemy.js        # Enemy AI
│   ├── level.js        # Level design
│   ├── game.js         # Game logic
│   └── main.js         # Entry point
├── server.js           # Optional Node.js server
└── README.md
```

## 🎯 Gameplay

- **Objective**: Survive waves of enemies and rack up points
- **Lives**: You start with 3 lives
- **Scoring**: 100 points per enemy killed
- **Gravity Zones**: Walk into cyan-bordered areas to experience reversed gravity!

### Enemy Types
- **Grunt (Red)**: Patrols and shoots when you're nearby
- **Turret (Orange)**: Stationary with 3-way spread shot
- **Heavy (Dark Red)**: Chases you and shoots frequently

## 🛠️ Technology Stack

- **Pure HTML5 Canvas** - No frameworks
- **Vanilla JavaScript** - ES6+ features
- **CSS3** - Retro styling with animations
- **No dependencies** - Runs anywhere!

## 🎨 Features Implemented

- ✅ Player movement with 8-directional aiming
- ✅ Jump mechanics with air control
- ✅ Weapon system (Machine Gun, Spread Gun)
- ✅ Enemy AI with multiple behaviors
- ✅ Gravity zones (flip, zero-G, directional)
- ✅ Collision detection
- ✅ Score tracking
- ✅ Menu system (Main, Pause, Game Over)
- ✅ Retro visual effects (CRT, scanlines, glitch)

## 🚧 Roadmap

- [ ] Add sprite graphics
- [ ] Implement sound effects and music
- [ ] Create additional levels
- [ ] Add boss fights
- [ ] Power-up collection system
- [ ] Multiplayer mode
- [ ] Leaderboard system

## 📝 License

MIT License - Feel free to use and modify!

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 🎮 Credits

Inspired by the classic Contra series with a modern anti-gravity twist!

---

**Made with ❤️ using HTML5 Canvas**
