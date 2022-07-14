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
            testTensorFlow();
            initNeuralNetwork();
            break;
        case GAME.PHASES.GAME_STARTED:
            break;
        case GAME.PHASES.GAME_PAUSED:
            break;
        case GAME.PHASES.GAME_RESUMED:
            break;
    }
});

let userData = undefined;

GAME.state.phase = GAME.PHASES.INIT;

function seed() {
    if (!this.userData) { return undefined; }

    // https://github.com/nrsharip/AI-for-Snake-Game/blob/6cd9d65b2a5b0018f772d19849b49c6fce32b76d/helpers/geneticAlgorithm.py#L31
    let chromosome = ""
    for (let i = 0; i < this.userData.total_bits; i++) {
        let bit = Math.floor(Math.random() * 2);
        chromosome += bit;
    }
    return chromosome
}

function fitness(chromosome) {
    // put the game loop here...
    let fitness = Math.random() * 5;

    return fitness
}

// https://github.com/nrsharip/AI-for-Snake-Game/blob/6cd9d65b2a5b0018f772d19849b49c6fce32b76d/helpers/geneticAlgorithm.py#L223
function crossover(chromosome1, chromosome2) {
	// Randomly determine the crossover point
	// Start by getting the number of bits in an individual chromosome
	let numBits = chromosome1.length;
	let xPoint = Math.floor(Math.random() * numBits);

    if (xPoint == 0) {
        xPoint++;
    } else if (xPoint == (numBits - 1)) {
        xPoint--;
    }

	// Create child offpsring with crossover
	let children = []

    children.push(chromosome1.substring(0, xPoint) + chromosome2.substring(xPoint));
    children.push(chromosome2.substring(0, xPoint) + chromosome1.substring(xPoint));

    if (children[0].length !== numBits || children[1].length !== numBits) {
        throw new Error("children lengths don't match: " + children[0].length + " " + children[1].length);
    }

	return children
}

function mutate(chromosome) {
    // Probability each bit is mutated
	const MUTATION_RATE = .008
	// Convert the chromsome bit string into a list
	let bitArray = chromosome.split('');
    for (let i of bitArray) {
        let randValue = Math.random();

		// If the random chance of mutation occured
		if (randValue < MUTATION_RATE) {
			// Flip the bit
			if (bitArray[i] == "0") {
                bitArray[i] = "1"
            } else {
                bitArray[i] = "0"
            }
        }
    }

	return bitArray.join('')
}

// https://github.com/subprotocol/genetic-js/blob/f351807c1ee38b9bf8fec357bae3eaa699d62b94/js/genetic-0.1.14.js#L156
function generation(population, generaionNum, stats) {
    //https://github.com/subprotocol/genetic-js/blob/f351807c1ee38b9bf8fec357bae3eaa699d62b94/js/genetic-0.1.14.js#L149
    //console.log("generation: ", generaionNum, stats.maximum, stats.minimum, stats.mean, stats.stdev, population);

    return true;
}

// https://github.com/subprotocol/genetic-js/blob/f351807c1ee38b9bf8fec357bae3eaa699d62b94/js/genetic-0.1.14.js#L160
function notification(population, generaionNum, stats, isFinished) {
    //console.log("notification: ", generaionNum, isFinished, stats.maximum, stats.minimum, stats.mean, stats.stdev, population);
}

userData = {
    // https://github.com/nrsharip/AI-for-Snake-Game/blob/6cd9d65b2a5b0018f772d19849b49c6fce32b76d/trainGeneticAlgorithmMulti.py#L76
    chroms_per_gen: 200,
    bits_per_weight: 8,

    num_inputs: 9,
    num_hidden_layer_nodes: 10,
    num_outputs: 4,

    total_bits: 0,

    population: undefined,
};

userData.total_bits = (
    (userData.num_inputs+1) * userData.num_hidden_layer_nodes 
    + userData.num_hidden_layer_nodes * (userData.num_hidden_layer_nodes + 1) 
    + userData.num_outputs * (userData.num_hidden_layer_nodes + 1)
) * userData.bits_per_weight

function init() {
    let genetic = Genetic.create();
    console.log(genetic);

    //https://github.com/subprotocol/genetic-js#population-functions
    genetic.seed = seed;       // [R] Called to create an individual, can be of any type (int, float, string, array, object)
    genetic.fitness = fitness; // [R] Computes a fitness score for an individual
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
    genetic.crossover = crossover;       // [O] Called when two individuals are selected for mating. Two children should always returned
    genetic.mutate = mutate;             // [O] Called when an individual has been selected for mutation
    genetic.generation = generation;     // [O] Called for each generation. Return false to terminate end algorithm (ie- if goal state is reached)
    genetic.notification = notification; // [O] Runs in the calling context. All functions other than this one are run in a web worker.

    let config = {
        size: userData.chroms_per_gen,
        crossover: 1,
                       // don't confuse probability per chromosome and per gene (bit)
        mutation: 0.1, // https://github.com/nrsharip/AI-for-Snake-Game/blob/6cd9d65b2a5b0018f772d19849b49c6fce32b76d/helpers/geneticAlgorithm.py#L278
        iterations: 4,
        fittestAlwaysSurvives: true,
        maxResults: 100,
        webWorkers: true,
        skip: 2,
    };
    // https://github.com/subprotocol/genetic-js#configuration-parameters
    // size                  - 250 - Real Number - Population size
    // crossover             - 0.9 - [0.0, 1.0] - Probability of crossover
    // mutation              - 0.2 - [0.0, 1.0] - Probability of mutation
    // iterations            - 100 - Real Number - Maximum number of iterations before finishing
    // fittestAlwaysSurvives - true - Boolean - Prevents losing the best fit between generations
    // maxResults            - 100 - Real Number - The maximum number of best-fit results that webworkers will send per notification
    // webWorkers            - true - Boolean - Use Web Workers (when available)
    // skip                  - 0 - Real Number - Setting this higher throttles back how frequently genetic.notification gets called in the main thread.
    genetic.evolve(config, userData);
}

function testTensorFlow() {
    // https://www.tensorflow.org/js/guide/tensors_operations
    const a = tf.tensor([[11, 22], [33, 44]]);
    console.log(a);
    console.log('a rank:', a.rank);
    console.log('a shape:', a.shape);
    console.log('a dtype:', a.dtype);
    a.print();

    const b = a.reshape([4, 1]);
    console.log(b);
    console.log('b rank:', b.rank);
    console.log('b shape:', b.shape);
    console.log('b dtype:', b.dtype);
    b.print();

    const c = tf.tensor([11, 22, 33, 44]);
    console.log(c);
    console.log('c rank:', c.rank);
    console.log('c shape:', c.shape);
    console.log('c dtype:', c.dtype);
    c.print();

    // ASYNCHRONOUS
    // Returns the multi dimensional array of values.
    a.array().then(array => console.log(array));
    // Returns the flattened data that backs the tensor.
    a.data().then(data => console.log(data));
    // SYNCHRONOUS
    // Returns the multi dimensional array of values.
    console.log(a.arraySync());
    // Returns the flattened data that backs the tensor.
    console.log(a.dataSync());

    // https://www.tensorflow.org/js/guide/models_and_layers
    // Create an arbitrary graph of layers, by connecting them via the apply() method.
    const input = tf.input({shape: [userData.num_inputs]});
    const dense1 = tf.layers.dense({ units: userData.num_hidden_layer_nodes, activation: 'sigmoid' }).apply(input);
    const dense2 = tf.layers.dense({ units: userData.num_hidden_layer_nodes, activation: 'sigmoid' }).apply(dense1);
    const dense3 = tf.layers.dense({ units: userData.num_outputs, activation: 'sigmoid' }).apply(dense2);
    const model = tf.model({ inputs: input, outputs: dense3 });

    model.summary();
    console.log(model);
    console.log(input);
    console.log(dense1);
    console.log(dense2);
    console.log(dense3);

    // https://www.tensorflow.org/js/guide/train_models
    model.weights.forEach(w => {
        const newVals = tf.zeros(w.shape); // randomNormal
        // w.val is an instance of tf.Variable
        w.val.assign(newVals);
    });

    model.weights.forEach(w => {
        console.log(w.name, w.shape, w.val.arraySync());
    });
}

function initNeuralNetwork() {

}