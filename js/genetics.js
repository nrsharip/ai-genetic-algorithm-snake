import * as GAME from './game.js'

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

            init();
            break;
        case GAME.PHASES.GAME_STARTED:
            break;
        case GAME.PHASES.GAME_PAUSED:
            break;
        case GAME.PHASES.GAME_RESUMED:
            break;
    }
});

GAME.state.phase = GAME.PHASES.INIT;

function init() {
    let genetic = Genetic.create();
    
    console.log(genetic);

    //https://github.com/subprotocol/genetic-js#population-functions
    genetic.seed;//()                      // [R] Called to create an individual, can be of any type (int, float, string, array, object)
    genetic.fitness;//(individual)         // [R] Computes a fitness score for an individual
    // https://github.com/subprotocol/genetic-js#optimizer
    genetic.optimize = Genetic.Optimize.Minimize;    // [R] Determines if the first fitness score is better than the second.
    // Genetic.Optimize.Minimize - The smaller fitness score of two individuals is best
    // Genetic.Optimize.Maximize - The greater fitness score of two individuals is best
    // https://github.com/subprotocol/genetic-js#selection
    genetic.select1 = Genetic.Select1.Tournament2;   // [R] Selects a single individual for survival from a population
    // https://github.com/subprotocol/genetic-js#selection-operators
    // Genetic.Select1.Tournament2 - Fittest of two random individuals
    // Genetic.Select1.Tournament3 - Fittest of three random individuals
    // Genetic.Select1.Fittest - Always selects the Fittest individual
    // Genetic.Select1.Random - Randomly selects an individual
    // Genetic.Select1.RandomLinearRank - Select random individual where probability is a linear function of rank
    // Genetic.Select1.Sequential - Sequentially selects an individual
    // https://github.com/subprotocol/genetic-js#selection
    genetic.select2 = Genetic.Select2.FittestRandom; // [O] Selects two individuals from a population for mating/crossover
    // https://github.com/subprotocol/genetic-js#selection-operators
    // Genetic.Select2.Tournament2 - Pairs two individuals, each the best from a random pair
    // Genetic.Select2.Tournament3 - Pairs two individuals, each the best from a random triplett
    // Genetic.Select2.Random - Randomly pairs two individuals
    // Genetic.Select2.RandomLinearRank - Pairs two individuals, each randomly selected from a linear rank
    // Genetic.Select2.Sequential - Selects adjacent pairs
    // Genetic.Select2.FittestRandom - Pairs the most fit individual with random individuals
    genetic.crossover;//(mother, father)   // [O] Called when two individuals are selected for mating. Two children should always returned
    genetic.mutate;//(individual)          // [O] Called when an individual has been selected for mutation
    genetic.generation;//(pop, gen, stats) // [O] Called for each generation. Return false to terminate end algorithm (ie- if goal state is reached)
    genetic.notification;//(...)           // [O] Runs in the calling context. All functions other than this one are run in a web worker.

    let config = {};
    // https://github.com/subprotocol/genetic-js#configuration-parameters
    // size                  - 250 - Real Number - Population size
    // crossover             - 0.9 - [0.0, 1.0] - Probability of crossover
    // mutation              - 0.2 - [0.0, 1.0] - Probability of mutation
    // iterations            - 100 - Real Number - Maximum number of iterations before finishing
    // fittestAlwaysSurvives - true - Boolean - Prevents losing the best fit between generations
    // maxResults            - 100 - Real Number - The maximum number of best-fit results that webworkers will send per notification
    // webWorkers            - true - Boolean - Use Web Workers (when available)
    // skip                  - 0 - Real Number - Setting this higher throttles back how frequently genetic.notification gets called in the main thread.
    let userData = {};
    genetic.evolve(config, userData);
}