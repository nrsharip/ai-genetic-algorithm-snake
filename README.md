## Overview

This is a port of [AI-for-Snake-Game](https://github.com/craighaber/AI-for-Snake-Game) (see [The AI for Snake Game Chronicles](https://craighaber.github.io/AI-for-Snake-Game/website_files/index.html) by [Craig Haber](https://github.com/craighaber)) from Python to Javascript.

## Screenshots

<img src="docs/run.gif?raw=true" width="100%">

## Development

### Neural Network and Data Flow

<img src="docs/data.png?raw=true" width="100%">

### File Map to [AI-for-Snake-Game](https://github.com/craighaber/AI-for-Snake-Game):

- [`helpers/geneticAlgorithm.py`](https://github.com/craighaber/AI-for-Snake-Game/blob/master/helpers/geneticAlgorithm.py) ~> [`js/AI-for-Snake-Game/geneticAlgorithm.js`](https://github.com/nrsharip/ai-genetic-algorithm-snake/blob/main/js/AI-for-Snake-Game/geneticAlgorithm.js)
- [`helpers/neuralNetwork.py`](https://github.com/craighaber/AI-for-Snake-Game/blob/master/helpers/neuralNetwork.py) ~> [`js/AI-for-Snake-Game/neuralNetwork.js`](https://github.com/nrsharip/ai-genetic-algorithm-snake/blob/main/js/AI-for-Snake-Game/neuralNetwork.js)
- [`helpers/snake.py`](https://github.com/craighaber/AI-for-Snake-Game/blob/master/helpers/snake.py) ~> [`js/AI-for-Snake-Game/snake.js`](https://github.com/nrsharip/ai-genetic-algorithm-snake/blob/main/js/AI-for-Snake-Game/snake.js)
- [`helpers/snakeGame.py`](https://github.com/craighaber/AI-for-Snake-Game/blob/master/helpers/snakeGame.py) ~> [`js/AI-for-Snake-Game/snakeGame.js`](https://github.com/nrsharip/ai-genetic-algorithm-snake/blob/main/js/AI-for-Snake-Game/snakeGame.js)
- [`helpers/snakeGameGATest.py`](https://github.com/craighaber/AI-for-Snake-Game/blob/master/helpers/snakeGameGATest.py) ~> [`js/AI-for-Snake-Game/snakeGameGATest.js`](https://github.com/nrsharip/ai-genetic-algorithm-snake/blob/main/js/AI-for-Snake-Game/snakeGameGATest.js)
- [`helpers/snakeGameGATrain.py`](https://github.com/craighaber/AI-for-Snake-Game/blob/master/helpers/snakeGameGATrain.py) ~> [`js/AI-for-Snake-Game/snakeGameGATrain.js`](https://github.com/nrsharip/ai-genetic-algorithm-snake/blob/main/js/AI-for-Snake-Game/snakeGameGATrain.js)

- [`playSnakeGame.py`](https://github.com/craighaber/AI-for-Snake-Game/blob/master/playSnakeGame.py) ~> [`js/playSnakeGame.js`](https://github.com/nrsharip/ai-genetic-algorithm-snake/blob/main/js/playSnakeGame.js)
- [`testTrainedAgents.py`](https://github.com/craighaber/AI-for-Snake-Game/blob/master/testTrainedAgents.py) ~> [`js/playSnakeGame.js`](https://github.com/nrsharip/ai-genetic-algorithm-snake/blob/main/js/playSnakeGame.js)
- [`trainGeneticAlgorithm.py`](https://github.com/craighaber/AI-for-Snake-Game/blob/master/trainGeneticAlgorithm.py) ~> [`js/playSnakeGame.js`](https://github.com/nrsharip/ai-genetic-algorithm-snake/blob/main/js/playSnakeGame.js)