// Input handling system

const Input = {
    keys: {},
    mouseX: 0,
    mouseY: 0,
    mouseDown: false,

    // Initialize input listeners
    init: () => {
        window.addEventListener('keydown', (e) => {
            Input.keys[e.key.toLowerCase()] = true;

            // Prevent default for game keys
            if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(e.key.toLowerCase())) {
                e.preventDefault();
            }
        });

        window.addEventListener('keyup', (e) => {
            Input.keys[e.key.toLowerCase()] = false;
        });

        window.addEventListener('mousedown', (e) => {
            Input.mouseDown = true;
        });

        window.addEventListener('mouseup', (e) => {
            Input.mouseDown = false;
        });

        window.addEventListener('mousemove', (e) => {
            const canvas = document.getElementById('gameCanvas');
            const rect = canvas.getBoundingClientRect();
            Input.mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
            Input.mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);
        });
    },

    // Check if key is pressed
    isKeyDown: (key) => {
        return Input.keys[key.toLowerCase()] === true;
    },

    // Get horizontal input (-1, 0, 1)
    getHorizontal: () => {
        let h = 0;
        if (Input.isKeyDown('arrowleft') || Input.isKeyDown('a')) h -= 1;
        if (Input.isKeyDown('arrowright') || Input.isKeyDown('d')) h += 1;
        return h;
    },

    // Get vertical input (-1, 0, 1)
    getVertical: () => {
        let v = 0;
        if (Input.isKeyDown('arrowup') || Input.isKeyDown('w')) v -= 1;
        if (Input.isKeyDown('arrowdown') || Input.isKeyDown('s')) v += 1;
        return v;
    },

    // Check jump button
    isJumpPressed: () => {
        return Input.isKeyDown(' ') || Input.isKeyDown('spacebar');
    },

    // Check shoot button
    isShootPressed: () => {
        return Input.isKeyDown('z') || Input.isKeyDown('j');
    },

    // Check aim lock
    isAimLockPressed: () => {
        return Input.isKeyDown('shift');
    },

    // Get aim direction (8-directional)
    getAimDirection: () => {
        const h = Input.getHorizontal();
        const v = Input.getVertical();

        if (h === 0 && v === 0) return null;

        // Map to 8 directions
        if (v === -1 && h === 0) return DIRECTION.UP;
        if (v === -1 && h === 1) return DIRECTION.UP_RIGHT;
        if (v === 0 && h === 1) return DIRECTION.RIGHT;
        if (v === 1 && h === 1) return DIRECTION.DOWN_RIGHT;
        if (v === 1 && h === 0) return DIRECTION.DOWN;
        if (v === 1 && h === -1) return DIRECTION.DOWN_LEFT;
        if (v === 0 && h === -1) return DIRECTION.LEFT;
        if (v === -1 && h === -1) return DIRECTION.UP_LEFT;

        return DIRECTION.RIGHT;
    }
};
