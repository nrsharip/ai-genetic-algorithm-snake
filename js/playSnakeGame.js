import * as GAME from './game.js';
import * as GA from './AI-for-Snake-Game/geneticAlgorithm.js';

import * as CHARTS from './charts.js'

import * as POPS from './populations.js'

import SnakeGame from './AI-for-Snake-Game/snakeGame.js';
import SnakeGameGATest from './AI-for-Snake-Game/snakeGameGATest.js';
import SnakeGameGATrain from './AI-for-Snake-Game/snakeGameGATrain.js';

// https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
const timeOffset = new Date().getTimezoneOffset();
const date = new Date(new Date().getTime() - (timeOffset*60*1000));
// 2011-10-05T14:48:00.000Z
const fileLabel = date.toISOString().replaceAll('-','').replaceAll(':','').replace('T','_').split('.')[0];

let chromosome = '0001011100010100000000100110001010011011011001000001100010111010010011010010011011000111101111101101001111101100101111011111011010110110101010011011101000011101010110110001010111101001101001101000001011010000000110011010101010000011100111010100110000000110000000110011001011100101000100011101001000110100000101110101100000000111100100010000111000010000011001000101011000100000010110110001010100011010011001101111110110010101000010001000111010110011011011000100101010000100101110101010001001000000111000110011111010011101111111100110010000000001011111001111111111100101001001000011111010111001000001011101000010101010101100111000010011101101010001110110010000001100010011000001001111000011010111110001100010000101011011100001110111000101111000110101101111001100001001011111111000100100011111110100111101010010100101100100010010001000100111101000100001110110001011110110110101100010000101000010110101001100110010000101110111100101101011010001010110101100011000100100010110111000010011001010100111100001100111000100011101110111111111010000000110000001101111111011010000001010000011001101011110011111111010010110000011011010000100100000011101111110000101111000001000001000011010001010000000110100011000000000010101000100110110010001000111011101001111100101111010011111101010000000111010001011011010001101011101010111011001110111110011010101000111001110100010110110000000110110010110111000101111101111100110000000110101111001111001011001000101011101001101011010111011011100011101110000000101101011011100100100100111000100111001010010010110000010000111100100001101111010110011101010111001011000010110011100100011100011001110111011010010110000110110000001001010110011010000110100101111101000100111000010011010001100111000010100100100110001110101000111111011101110011011001101000001111000010011101101001110110110000101110000110001111010010100100110110100000111110010000000110101010000111010101011000011001110110010010111000110000111100111110111010101110010110101110011000010110100111100100010111011001010101110110110111111101110110111000110';
let bits_per_weight = 8;

let num_inputs = 9;
let num_hiddens = 10;
let num_outputs = 4;

let chroms_per_gen = 200;
let total_bits = ((num_inputs + 1) * num_hiddens + num_hiddens * (num_hiddens + 1) + num_outputs * (num_hiddens + 1)) * bits_per_weight;
let population = POPS.population_20220718_001050_gen_109;
//let population = GA.genPopulation(chroms_per_gen, total_bits);

const snakeGame = new SnakeGame(500);
const snakeGameGATest = new SnakeGameGATest(25, chromosome, bits_per_weight, num_inputs, num_hiddens, num_outputs);
const snakeGameGATrain = new SnakeGameGATrain(0, population, chroms_per_gen, bits_per_weight, num_inputs, num_hiddens, num_outputs);

window.snakeGame = snakeGame;
window.snakeGameGATest = snakeGameGATest;
window.snakeGameGATrain = snakeGameGATrain;
window.CHARTS = CHARTS;

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

snakeGameGATrain.onGameOver = function(num_generations, cur_chrom, score, frames_alive, fitness) {
    CHARTS.data1.push({ x: cur_chrom, score: score, frame_score: fitness.frame_score });
    CHARTS.cfg1.data.labels.push(cur_chrom);
    
    CHARTS.data3.push({ x: cur_chrom, _1: fitness._1, _2: fitness._2 });
    CHARTS.cfg3.data.labels.push(cur_chrom);

    //console.log(fitness._3);
    CHARTS.data4.push({ x: cur_chrom, _3: fitness._3 });
    CHARTS.cfg4.data.labels.push(cur_chrom);

    CHARTS.chart1.update();
    CHARTS.chart3.update();
    CHARTS.chart4.update();

    document.getElementById("generation").textContent = `GENERATION: ${snakeGameGATrain.num_generations}`;
    document.getElementById("chromosome").textContent = `CHROMOSOME: ${snakeGameGATrain.cur_chrom}`;
    document.getElementById("score").textContent = `SCORE: ${snakeGameGATrain.score}`;
    document.getElementById("high_score").textContent = `HIGHSCORE: ${snakeGameGATrain.high_score}`;
}

const palettes = [
    '#f3a935', '#c73558', '#6ebe9f', '#2586a4', '#55596a', // https://www.color-hex.com/color-palette/32566
    '#fe0000', '#fdfe02', '#0bff01', '#011efe', '#fe00f6', // https://www.color-hex.com/color-palette/1131
    '#feda75', '#fa7e1e', '#d62976', '#962fbf', '#4f5bd5', // https://www.color-hex.com/color-palette/44340
]
palettes.counter = 0;

const bestParents = {
    longest: 0,
    update(bps) {
        for (let i = 0; i < bps.length; i++) { 
            let chromosome = bps[i].chromosome;
            let fitness = bps[i].fitness;
            let generationNum = snakeGameGATrain.num_generations - 1;
    
            if (!this[chromosome]) { this[chromosome] = [] }
            this[chromosome].push({ gen: generationNum, fitness: fitness});

            if (this[chromosome].length > this.longest) { this.longest = this[chromosome].length; }
        }
    }
};
window.bestParents = bestParents;

snakeGameGATrain.onGenerationOver = function(average_game_score, average_frame_score, average_fitness, best_individual, fitnessRatios, fitnessRouletteCutoffs, bps) {
    let cur_gen = snakeGameGATrain.num_generations;
    
    CHARTS.data1.length = 0
    CHARTS.cfg1.data.labels.length = 0
    CHARTS.data3.length = 0
    CHARTS.cfg3.data.labels.length = 0
    CHARTS.data4.length = 0
    CHARTS.cfg4.data.labels.length = 0

    CHARTS.data5.length = 0
    CHARTS.cfg5.data.labels.length = 0
    CHARTS.data6.length = 0
    CHARTS.cfg6.data.labels.length = 0

    CHARTS.cfg8.data.labels.length = 0
    CHARTS.cfg8.data.datasets.length = 0
    CHARTS.cfg9.data.labels.length = 0
    CHARTS.cfg9.data.datasets.length = 0

    for (let i = 0; i < fitnessRatios.length; i++) {
        CHARTS.data5.push({ x: i, ratio: fitnessRatios[i] });
        CHARTS.cfg5.data.labels.push(i);
    }
    for (let i = 0; i < fitnessRouletteCutoffs.length; i++) {
        CHARTS.data6.push({ x: i, cutoff: fitnessRouletteCutoffs[i] });
        CHARTS.cfg6.data.labels.push(i);
    }

    CHARTS.data2.push({ x: cur_gen - 1, average_game_score: average_game_score, average_frame_score: average_frame_score });
    CHARTS.cfg2.data.labels.push(cur_gen - 1);
    
    CHARTS.data7.push({ x: cur_gen - 1, average_fitness: average_fitness });
    CHARTS.cfg7.data.labels.push(cur_gen - 1);

    bestParents.update(bps);
    // CHART 8
    let forDownload = [];
    let entries = Object.entries(bestParents)
        .filter((a) => a[1][0])                                   // keeping only those with array as a value
        .filter((a) => a[1][a[1].length - 1].gen == cur_gen - 1); // keeping only lasted until this generation
    // entry[0] - key (chromosome); entry[1] - value ({gen: N, fitness: S});
    entries.sort((a, b) => {
        const avgA = a[1].map((element, index, array) => element.fitness).reduce((sum, a) => sum + a, 0) / a[1].length;
        const avgB = b[1].map((element, index, array) => element.fitness).reduce((sum, a) => sum + a, 0) / b[1].length;
        
        // https://stackoverflow.com/questions/10759018/how-can-i-reliably-subsort-arrays-using-dom-methods
        return (b[1].length - a[1].length) || (avgB - avgA);
    });   // sorting descending by the number of generations and by the average fitness
    
    let bottom = Math.floor(cur_gen - bestParents.longest * 1.1);
    let top = Math.ceil(cur_gen + bestParents.longest * 0.1);
    for (let i = bottom; i < top; i++) { CHARTS.cfg8.data.labels.push(i); }

    let range = entries.length < 5 ? entries.length : 5; // taking top-5 results of sort
    for (let i = 0; i < range; i++) { // taking top-5 results of sort
        let chromosome = entries[i][0];
        let infos = entries[i][1];

        forDownload.push({ chromosome, infos });

        let dataset = {
            label: chromosome.substring(0,8),
            data: [],
            borderColor: palettes[palettes.counter % palettes.length],
            backgroundColor: palettes[palettes.counter++ % palettes.length],
            yAxisID: 'y',
        }
        for (const info of infos) { dataset.data.push({ x: info.gen, y: info.fitness }); }
        CHARTS.cfg8.data.datasets.push(dataset);
    }

    // https://www.codegrepper.com/code-examples/javascript/save+array+file
    let a = document.getElementById("downloadBestParents1").appendChild(document.createElement("a"));
    a.download = `best_parents_top5_1_${fileLabel}_gen_${cur_gen}.txt`;
    a.href = "data:text/plain;base64," + btoa(JSON.stringify(forDownload));
    a.innerHTML = `${cur_gen}`;
    let span = document.getElementById("downloadBestParents1").appendChild(document.createElement("span"));
    span.innerHTML = " • ";

    // CHART 9
    forDownload = [];
    entries = Object.entries(bestParents)
        .filter((a) => a[1][0])                                     // keeping only those with array as a value
        .filter((a) => a[1][a[1].length - 1].gen == cur_gen - 1)    // keeping only lasted until this generation
        .filter((a) => a[1].length >= bestParents.longest * (1/3)); // keeping those lasted at least 1/3 of the longest living
    // entry[0] - key (chromosome); entry[1] - value ({gen: N, fitness: S});
    entries.sort((a, b) => { // sorting descending by fitness averages
        const avgA = a[1].map((element, index, array) => element.fitness).reduce((sum, a) => sum + a, 0) / a[1].length;
        const avgB = b[1].map((element, index, array) => element.fitness).reduce((sum, a) => sum + a, 0) / b[1].length;
        
        return avgB - avgA;
    }); 
    
    bottom = Math.floor(cur_gen - bestParents.longest * 1.1);
    top = Math.ceil(cur_gen + bestParents.longest * 0.1);
    for (let i = bottom; i < top; i++) { CHARTS.cfg9.data.labels.push(i); }
    
    range = entries.length < 5 ? entries.length : 5; // taking top-5 results of sort
    for (let i = 0; i < range; i++) { 
        let chromosome = entries[i][0];
        let infos = entries[i][1];

        forDownload.push({ chromosome, infos });

        let dataset = {
            label: chromosome.substring(0,8),
            data: [],
            borderColor: palettes[palettes.counter % palettes.length],
            backgroundColor: palettes[palettes.counter++ % palettes.length],
            yAxisID: 'y',
        }
        for (const info of infos) { dataset.data.push({ x: info.gen, y: info.fitness }); }
        CHARTS.cfg9.data.datasets.push(dataset);
    }

    // https://www.codegrepper.com/code-examples/javascript/save+array+file
    a = document.getElementById("downloadBestParents2").appendChild(document.createElement("a"));
    a.download = `best_parents_top5_2_${fileLabel}_gen_${cur_gen}.txt`;
    a.href = "data:text/plain;base64," + btoa(JSON.stringify(forDownload));
    a.innerHTML = `${cur_gen}`;
    span = document.getElementById("downloadBestParents2").appendChild(document.createElement("span"));
    span.innerHTML = " • ";

    CHARTS.chart5.update();
    CHARTS.chart6.update();
    CHARTS.chart2.update();
    CHARTS.chart7.update();
    CHARTS.chart8.update();
    CHARTS.chart9.update();

    document.getElementById("bestIndividual").textContent = best_individual;

    // https://www.codegrepper.com/code-examples/javascript/save+array+file
    a = document.getElementById("downloadPopulation").appendChild(document.createElement("a"));
    a.download = `population_${fileLabel}_gen_${cur_gen}.txt`;
    a.href = "data:text/plain;base64," + btoa(JSON.stringify(snakeGameGATrain.population));
    a.innerHTML = `${cur_gen}`;
    span = document.getElementById("downloadPopulation").appendChild(document.createElement("span"));
    span.innerHTML = " • ";

}

let trainingStarted = true;
let drawModels = true;

function train(redraw) {
    if (!trainingStarted) { return; }

    snakeGameGATrain.move_snake(keys);
    snakeGameGATrain.check_collisions();
    snakeGameGATrain.update_frames_since_last_fruit();
    snakeGameGATrain.frames_alive++;
    if (redraw) { snakeGameGATrain.draw_grid_updates(); }
}

GAME.callbacks.onUpdate = function(delta, elapsed) {
    
    // if (snakeGame.elapsed == 0 || (elapsed - snakeGame.elapsed > snakeGame.delay)) {
    //     snakeGame.elapsed = elapsed

    //     snakeGame.move_snake(keys);
    //     snakeGame.check_collisions();
    //     snakeGame.draw_grid_updates();

    //     keys.length = 0;
    // }
    
    // if (snakeGameGATest.elapsed == 0 || (elapsed - snakeGameGATest.elapsed > snakeGameGATest.delay)) {
    //     snakeGameGATest.elapsed = elapsed

    //     snakeGameGATest.move_snake(keys);
    //     snakeGameGATest.check_collisions();
    //     snakeGameGATest.update_frames_since_last_fruit();
    //     snakeGameGATest.draw_grid_updates();
    // }
    
    if ( drawModels && (snakeGameGATrain.elapsed == 0 || (elapsed - snakeGameGATrain.elapsed > snakeGameGATrain.delay)) ) {
        snakeGameGATrain.elapsed = elapsed

        train(true);
    }
}

GAME.callbacks.onKeyDown = function(event) {
    keys.push(event.code);
}

$("#startStopTraining").click(function () {
    trainingStarted = !trainingStarted;
    if (trainingStarted) {
        $(this).html("Stop Training");
    } else {
        $(this).html("Resume Training");
    }
});

let intervalID = -1;
$("#startStopDrawing").click(function () {
    drawModels = !drawModels;
    if (drawModels) {
        $(this).html("Draw Models: OFF");

        if (intervalID != -1) {
            clearInterval(intervalID);
            intervalID = -1;
        }

    } else {
        $(this).html("Draw Models: ON");

        intervalID = setInterval(train, 0);
    }
});

GAME.state.phase = GAME.PHASES.INIT;