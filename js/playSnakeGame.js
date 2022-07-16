import * as GAME from './game.js';
import * as GA from './AI-for-Snake-Game/geneticAlgorithm.js';

import SnakeGame from './AI-for-Snake-Game/snakeGame.js';
import SnakeGameGATest from './AI-for-Snake-Game/snakeGameGATest.js';
import SnakeGameGATrain from './AI-for-Snake-Game/snakeGameGATrain.js';

let chromosome = '0001011100010100000000100110001010011011011001000001100010111010010011010010011011000111101111101101001111101100101111011111011010110110101010011011101000011101010110110001010111101001101001101000001011010000000110011010101010000011100111010100110000000110000000110011001011100101000100011101001000110100000101110101100000000111100100010000111000010000011001000101011000100000010110110001010100011010011001101111110110010101000010001000111010110011011011000100101010000100101110101010001001000000111000110011111010011101111111100110010000000001011111001111111111100101001001000011111010111001000001011101000010101010101100111000010011101101010001110110010000001100010011000001001111000011010111110001100010000101011011100001110111000101111000110101101111001100001001011111111000100100011111110100111101010010100101100100010010001000100111101000100001110110001011110110110101100010000101000010110101001100110010000101110111100101101011010001010110101100011000100100010110111000010011001010100111100001100111000100011101110111111111010000000110000001101111111011010000001010000011001101011110011111111010010110000011011010000100100000011101111110000101111000001000001000011010001010000000110100011000000000010101000100110110010001000111011101001111100101111010011111101010000000111010001011011010001101011101010111011001110111110011010101000111001110100010110110000000110110010110111000101111101111100110000000110101111001111001011001000101011101001101011010111011011100011101110000000101101011011100100100100111000100111001010010010110000010000111100100001101111010110011101010111001011000010110011100100011100011001110111011010010110000110110000001001010110011010000110100101111101000100111000010011010001100111000010100100100110001110101000111111011101110011011001101000001111000010011101101001110110110000101110000110001111010010100100110110100000111110010000000110101010000111010101011000011001110110010010111000110000111100111110111010101110010110101110011000010110100111100100010111011001010101110110110111111101110110111000110';
let bits_per_weight = 8;

let num_inputs = 9;
let num_hiddens = 10;
let num_outputs = 4;

let chroms_per_gen = 200
let total_bits = ((num_inputs+1)*num_hiddens + num_hiddens*(num_hiddens+1) + num_outputs*(num_hiddens + 1))*bits_per_weight
let population = GA.genPopulation(chroms_per_gen, total_bits)

const snakeGame = new SnakeGame(500);
const snakeGameGATest = new SnakeGameGATest(25, chromosome, bits_per_weight, num_inputs, num_hiddens, num_outputs);
const snakeGameGATrain = new SnakeGameGATrain(0, population, chroms_per_gen, bits_per_weight, num_inputs, num_hiddens, num_outputs);

window.snake = snakeGameGATrain;

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

            setInterval(train, 0);

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
    // if (snakeGameGATest.elapsed == 0 || (elapsed - snakeGameGATest.elapsed > snakeGameGATest.delay)) {
    //     snakeGameGATest.elapsed = elapsed
    // if (snakeGameGATrain.elapsed == 0 || (elapsed - snakeGameGATrain.elapsed > snakeGameGATrain.delay)) {
    //     snakeGameGATrain.elapsed = elapsed

        snakeGame.move_snake(keys);
        snakeGame.check_collisions();
        snakeGame.draw_grid_updates();

        // snakeGameGATest.move_snake(keys);
        // snakeGameGATest.check_collisions();
        // snakeGameGATest.update_frames_since_last_fruit();
        // snakeGameGATest.draw_grid_updates();

        // snakeGameGATrain.move_snake(keys);
        // snakeGameGATrain.check_collisions();
        // snakeGameGATrain.update_frames_since_last_fruit();
        // snakeGameGATrain.frames_alive++;
        // snakeGameGATrain.draw_grid_updates();

        keys.length = 0;
    }
}

function train() {
    snakeGameGATrain.move_snake(keys);
    snakeGameGATrain.check_collisions();
    snakeGameGATrain.update_frames_since_last_fruit();
    snakeGameGATrain.frames_alive++;
    // snakeGameGATrain.draw_grid_updates();
}

GAME.callbacks.onKeyDown = function(event) {
    keys.push(event.code);
}

GAME.state.phase = GAME.PHASES.INIT;