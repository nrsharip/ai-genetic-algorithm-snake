import * as GAME from './game.js';

import SnakeGame from './AI-for-Snake-Game/snakeGame.js';

const snakeGame = new SnakeGame(500);

GAME.state.onPhaseChange.push( function(phase) {
    switch (phase) {
        case GAME.PHASES.INIT:
            console.log("init");
            break;
        case GAME.PHASES.LOAD_STARTED:
            console.log("load started");
            break;
        case GAME.PHASES.LOAD_COMPLETED:
            console.log("load completed");

            GAME.state.phase = GAME.PHASES.GAME_STARTED;
            break;
        case GAME.PHASES.GAME_STARTED:
            break;
        case GAME.PHASES.GAME_PAUSED:
            break;
        case GAME.PHASES.GAME_RESUMED:
            break;
    }
});

const keys = []

GAME.callbacks.onUpdate = function(delta, elapsed) {
    
    if (snakeGame.elapsed == 0 || (elapsed - snakeGame.elapsed > snakeGame.delay)) {
        snakeGame.elapsed = elapsed

        snakeGame.move_snake(keys);
        snakeGame.check_collisions();
        snakeGame.draw_grid_updates();

        keys.length = 0;
    }

}

GAME.callbacks.onKeyDown = function(event) {
    keys.push(event.code);
}

GAME.state.phase = GAME.PHASES.INIT;