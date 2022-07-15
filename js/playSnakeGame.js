import * as GAME from './game.js';

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

GAME.callbacks.onUpdate = function(delta, elapsed) {

}

GAME.callbacks.onKeyDown = function(event) {
    switch (event.code) {
        case 'Escape':
            break;
        case 'ArrowLeft':
            break;
        case 'ArrowRight':
            break;
        case 'ArrowUp':
            break;
        case 'ArrowDown':
            break;
    }
}

GAME.state.phase = GAME.PHASES.INIT;