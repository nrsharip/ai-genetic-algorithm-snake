import * as GAME from './game.js'

let userData = {
    // https://github.com/nrsharip/AI-for-Snake-Game/blob/6cd9d65b2a5b0018f772d19849b49c6fce32b76d/trainGeneticAlgorithmMulti.py#L76
    chroms_per_gen: 200,
    bits_per_weight: 8,

    num_inputs: 9,
    num_hiddens: 10,
    num_outputs: 4,

    total_bits: 0,

    population: [],
    seedNum: 0,
    generaionNum: 0,

    neuralNetwork: undefined,
};

userData.total_bits = (
    (userData.num_inputs + 1) * userData.num_hiddens 
        + userData.num_hiddens * (userData.num_hiddens + 1) 
        + userData.num_outputs * (userData.num_hiddens + 1)
) * userData.bits_per_weight

const neuralNetwork = {
    init(num_inputs, num_hiddens, num_outputs) {
        this.num_inputs = num_inputs;
        this.num_hiddens = num_hiddens;
        this.num_outputs = num_outputs;

        this.input = tf.input({shape: [num_inputs]});
        this.dense1 = tf.layers.dense({ units: num_hiddens, activation: 'sigmoid' }).apply(this.input);
        this.dense2 = tf.layers.dense({ units: num_hiddens, activation: 'sigmoid' }).apply(this.dense1);
        this.dense3 = tf.layers.dense({ units: num_outputs, activation: 'sigmoid' }).apply(this.dense2);
        this.model = tf.model({ inputs: this.input, outputs: this.dense3 });

        console.log(this.model);
    },

    predict(inputs) {
        // https://stackoverflow.com/questions/44843581/what-is-the-difference-between-model-fit-an-model-evaluate-in-keras
        // https://stackoverflow.com/questions/71835403/tensorflow-error-expected-dense-dense1-input-to-have-shape-null-3-but-got-arr
        const prediction = model.predict(tf.tensor([ inputs ]));

        return prediction.arraySync();
    },

    // https://github.com/nrsharip/AI-for-Snake-Game/blob/6cd9d65b2a5b0018f772d19849b49c6fce32b76d/helpers/neuralNetwork.py#L15
    mapChrom2Weights(chromosome, bitsPerWeight) {
        let numInputs = this.num_inputs;
        let numHiddenLayerNodes = this.num_hiddens;
        let numOutputs = this.num_outputs;

        // https://www.tensorflow.org/js/guide/train_models
        // dense layers represent a function that maps the input tensor x to an output tensor y via 
        // the equation y = Ax + b where A (the kernel) and b (the bias) are parameters of the dense layer.
        let weightIH1_kernel = [];
        let weightIH1_bias = [];
        let weightH1H2_kernel = [];
        let weightH1H2_bias = [];
        let weightH2O_kernel = [];
        let weightH2O_bias = [];

        chromosome = " " + chromosome;

        let hiddenLayer1BitsEnd =                                 (numInputs + 1) * numHiddenLayerNodes * bitsPerWeight;
        let hiddenLayer2BitsEnd = hiddenLayer1BitsEnd + (numHiddenLayerNodes + 1) * numHiddenLayerNodes * bitsPerWeight;
        let outputBitsEnd       = hiddenLayer2BitsEnd + (numHiddenLayerNodes + 1) *          numOutputs * bitsPerWeight;

        let index = 1
        let node_num = 0
        let numWeightsPerCurNode = 0
    
        // While we are still looking at the bits representing wieghts going into hidden layer 1
        while (index < hiddenLayer1BitsEnd) {
            let weightBitString = chrom.substring(index, index + bitsPerWeight);
            // weightList[0] accesses the data for weights going into hidden layer 1
            //weightList[0][node_num][numWeightsPerCurNode] = bin2Weight(weightBitString)
            numWeightsPerCurNode +=1
            // if we are at the end of the bits of weights per this node
            if (numWeightsPerCurNode == numInputs + 1) {
                node_num += 1
                numWeightsPerCurNode = 0
            }
            index += bitsPerWeight
        }
    },

    binToWeight(binString) {
        const bitsPerWeight = binString.length;

        const intValue = parseInt(binString, 2);

        // Convert integer to a value between -3 and 3
        // E.g. bitsPerWeight = 8
        //  0 ... 128 ... 256
        // -3 ...  0  ...  3
        // intValue > 128 : intValue/128 > 1 and <=2 : 3*(intValue/128) > 3 <= 6
        // intValue < 128 : intValue/128 < 1 and >=0 : 3*(intValue/128) < 3 >= 0
        const product = 3 / (2 ** (bitsPerWeight - 1));

        const floatValue = intValue * product - 3;

        return floatValue;
    }
}

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

            neuralNetwork.init(userData.num_inputs, userData.num_hiddens, userData.num_outputs);
            userData.neuralNetwork = neuralNetwork;

            geneticInit();
            //testTensorFlow();
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

function seed() {
    if (!this.userData) { return undefined; }

    // https://github.com/nrsharip/AI-for-Snake-Game/blob/6cd9d65b2a5b0018f772d19849b49c6fce32b76d/helpers/geneticAlgorithm.py#L31
    let chromosome = ""
    for (let i = 0; i < this.userData.total_bits; i++) {
        let bit = Math.floor(Math.random() * 2);
        chromosome += bit;
    }

    this.userData.population.push(chromosome);
    this.userData.seedNum++;

    return chromosome
}

function fitness(chromosome) {
    this.userData.neuralNetwork.mapChrom2Weights(chromosome, this.userData.bits_per_weight);

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
    console.log("generation: ", generaionNum, stats.maximum, stats.minimum, stats.mean, stats.stdev, population);

    this.userData.generaionNum++;

    this.userData.population.length = 0;
    this.userData.seedNum = 0;

    return true;
}

// https://github.com/subprotocol/genetic-js/blob/f351807c1ee38b9bf8fec357bae3eaa699d62b94/js/genetic-0.1.14.js#L160
function notification(population, generaionNum, stats, isFinished) {
    //console.log("notification: ", generaionNum, isFinished, stats.maximum, stats.minimum, stats.mean, stats.stdev, population);
}

function geneticInit() {
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
        iterations: 1,
        fittestAlwaysSurvives: true,
        maxResults: 100,
        webWorkers: false,
        skip: 0,
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
    const input = tf.input({shape: [3]});
    const dense1 = tf.layers.dense({ units: 2, activation: 'relu' }).apply(input);
    const dense2 = tf.layers.dense({ units: 1, activation: 'relu' }).apply(dense1);
    const model = tf.model({ inputs: input, outputs: dense2 });

    model.summary();
    console.log(model);
    console.log(input);
    console.log(dense1);
    console.log(dense2);

    // https://www.tensorflow.org/js/guide/train_models
    model.weights.forEach(w => {
        const newVals = tf.zeros(w.shape); // randomNormal
        // w.val is an instance of tf.Variable
        w.val.assign(newVals);
    });

    model.weights.forEach(w => {
        console.log(" * ", w.name, w.shape, w.val.arraySync());
    });

    console.log(model.weights[0].shape);
    console.log(model.weights[2].shape);
    model.weights[0].val.assign(tf.tensor([[1, 2], [3, 4], [5, 6]]));
    model.weights[2].val.assign(tf.tensor([[7], [8]]));

    model.weights.forEach(w => {
        console.log(" $ ", w.val.arraySync());
    });

    // https://stackoverflow.com/questions/44843581/what-is-the-difference-between-model-fit-an-model-evaluate-in-keras
    // https://stackoverflow.com/questions/71835403/tensorflow-error-expected-dense-dense1-input-to-have-shape-null-3-but-got-arr
    const prediction = model.predict(tf.tensor([[3, 2, 1]]));
    // (3*1 + 2*3 + 1*5) = 14
    // (3*2 + 2*4 + 1*6) = 20
    // 14 * 7 + 20 * 8 = 258
    console.log(prediction.arraySync());
}

