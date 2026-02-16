// Main entry point

let game;
let lastTime = 0;
const FPS = 60;
const FRAME_TIME = 1000 / FPS;

// Initialize game
window.addEventListener('load', () => {
    const canvas = document.getElementById('gameCanvas');
    game = new Game(canvas);

    // Initialize input
    Input.init();

    // Setup menu navigation
    setupMenus();

    // Start game loop
    requestAnimationFrame(gameLoop);
});

// Main game loop
function gameLoop(currentTime) {
    requestAnimationFrame(gameLoop);

    const deltaTime = currentTime - lastTime;

    if (deltaTime >= FRAME_TIME) {
        lastTime = currentTime - (deltaTime % FRAME_TIME);

        // Update and draw
        game.update();
        game.draw();
    }
}

// Menu system
function setupMenus() {
    // Main menu
    setupMenu('main-menu', {
        'start': () => {
            document.getElementById('main-menu').classList.remove('active');
            game.startGame();
        },
        'controls': () => {
            document.getElementById('main-menu').classList.remove('active');
            document.getElementById('controls-menu').classList.add('active');
        },
        'credits': () => {
            alert('CONTRA: GRAVITY SHIFT\\n\\nCreated with HTML5 Canvas\\nRetro run-and-gun with anti-gravity mechanics');
        }
    });

    // Controls menu
    setupMenu('controls-menu', {
        'back': () => {
            document.getElementById('controls-menu').classList.remove('active');
            document.getElementById('main-menu').classList.add('active');
        }
    });

    // Pause menu
    setupMenu('pause-menu', {
        'resume': () => game.resume(),
        'restart': () => game.restart(),
        'quit': () => game.quitToMenu()
    });

    // Game over menu
    setupMenu('game-over-menu', {
        'restart': () => game.restart(),
        'quit': () => game.quitToMenu()
    });

    // Pause key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (game.state === 'playing') {
                game.pause();
            } else if (game.state === 'paused') {
                game.resume();
            }
        }
    });
}

function setupMenu(menuId, actions) {
    const menu = document.getElementById(menuId);
    const items = menu.querySelectorAll('.menu-item');
    let selectedIndex = 0;

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
        if (!menu.classList.contains('active')) return;

        if (e.key === 'ArrowUp' || e.key === 'w') {
            items[selectedIndex].classList.remove('selected');
            selectedIndex = (selectedIndex - 1 + items.length) % items.length;
            items[selectedIndex].classList.add('selected');
            e.preventDefault();
        } else if (e.key === 'ArrowDown' || e.key === 's') {
            items[selectedIndex].classList.remove('selected');
            selectedIndex = (selectedIndex + 1) % items.length;
            items[selectedIndex].classList.add('selected');
            e.preventDefault();
        } else if (e.key === 'Enter' || e.key === ' ') {
            const action = items[selectedIndex].getAttribute('data-action');
            if (actions[action]) {
                actions[action]();
            }
            e.preventDefault();
        }
    });

    // Mouse navigation
    items.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            items[selectedIndex].classList.remove('selected');
            selectedIndex = index;
            items[selectedIndex].classList.add('selected');
        });

        item.addEventListener('click', () => {
            const action = item.getAttribute('data-action');
            if (actions[action]) {
                actions[action]();
            }
        });
    });
}
