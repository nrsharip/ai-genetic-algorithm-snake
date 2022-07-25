## Overview

Try the following link: https://nrsharip.github.io/ai-genetic-algorithm-snake/

This is a port of [AI-for-Snake-Game](https://github.com/craighaber/AI-for-Snake-Game) (see [The AI for Snake Game Chronicles](https://craighaber.github.io/AI-for-Snake-Game/website_files/index.html) by [Craig Haber](https://github.com/craighaber)) from Python to Javascript.

**UPDATE:** Managed to reach the score of **79** by adjusting the criterias (see [RUN 2022-07-24 21:21:26](#run-2022-07-24-212126)).

**NOTE:** To accelerate the training process use the [multiprocessing python version](https://github.com/nrsharip/AI-for-Snake-Game/blob/743f41a980c2336f65eefc065978109e8211dd6e/trainGeneticAlgorithmMulti.py).

## Screenshots

<img src="docs/run.gif?raw=true" width="100%">

## Development

### Neural Network and Data Flow

<img src="docs/data.png?raw=true" width="100%">

### [Pareto Fronts](https://en.wikipedia.org/wiki/Pareto_front) and Scatter Charts

<img src="docs/pareto.png?raw=true" width="100%">

**Generation #4140:**

<table>
  <tr>
    <td><img src="docs/scatter_4140_1.png?raw=true" width="100%"></td>
    <td><img src="docs/scatter_4140_2.png?raw=true" width="100%"></td>
  </tr>
</table>

### Successes

#### RUN 2022-07-24 21:21:26

**Criterias changed:**

(see this [line in snakeGameGATest.js](https://github.com/nrsharip/ai-genetic-algorithm-snake/blob/3d74afefbdf40cfa0aa4498c36c4c74c67a647b4/js/AI-for-Snake-Game/snakeGameGATest.js#L173))
```
if self.frames_since_last_fruit == 100:
    self.game_over()
```

(see this [line in snakeGameGATrain.js](https://github.com/nrsharip/ai-genetic-algorithm-snake/blob/3d74afefbdf40cfa0aa4498c36c4c74c67a647b4/js/AI-for-Snake-Game/snakeGameGATrain.js#L90))
```
if self.frames_since_last_fruit == 100:
    frame_score = self.frames_alive - self.frames_since_last_fruit
    if frame_score <= 0:
        frame_score = 0
```

(see this [line in snakeGameGATrain.js](https://github.com/nrsharip/ai-genetic-algorithm-snake/blob/3d74afefbdf40cfa0aa4498c36c4c74c67a647b4/js/AI-for-Snake-Game/snakeGameGATrain.js#L100))
```
_1 = self.score**(4.5 - (self.score + 1)**(1/5))
_2 = frame_score**((self.score + 1)**(1/3))
fitness = _1 * _2
```

<!-- https://www.desmos.com/calculator/k9eapp630v -->
<img src="docs/powers_20220724212126.png?raw=true" width="100%">

**RESULTS:**

(see [GAdata.txt](data/GAdata_20220724212126_upd3.txt)):
```
Generation 4007 Best Game Score: 79
Generation 3186 Best Game Score: 73
Generation 3465 Best Game Score: 73
Generation 4141 Best Game Score: 73
Generation 3448 Best Game Score: 72
Generation 4035 Best Game Score: 72
Generation 4223 Best Game Score: 72
Generation 4368 Best Game Score: 72
Generation 4449 Best Game Score: 72
Generation 3825 Best Game Score: 71
Generation 4077 Best Game Score: 71
Generation 4332 Best Game Score: 71
Generation 4333 Best Game Score: 71
```

<table>
  <tr>
    <td><img src="docs/best_game_scores_20220724212126.png?raw=true" width="100%"></td>
    <td><img src="docs/scatter_20220724212126.gif?raw=true" width="100%"></td>
  </tr>
</table>

<img src="docs/best_20220724212126_gen4007_max_59.gif?raw=true" width="75%">

### Tries and Failures

**Generation #4140 (4152) CPG:200 BPW:8 I:9 H:10 O:4 failures:**

<table>
  <tr>
    <td><img src="docs/failures_20220712124030_gen4152_1.gif?raw=true" width="100%"></td>
    <td><img src="docs/failures_20220712124030_gen4152_2.gif?raw=true" width="100%"></td>
  </tr>
</table>

### File Map to [AI-for-Snake-Game](https://github.com/craighaber/AI-for-Snake-Game)

- [`helpers/geneticAlgorithm.py`](https://github.com/craighaber/AI-for-Snake-Game/blob/master/helpers/geneticAlgorithm.py) ~> [`js/AI-for-Snake-Game/geneticAlgorithm.js`](https://github.com/nrsharip/ai-genetic-algorithm-snake/blob/main/js/AI-for-Snake-Game/geneticAlgorithm.js)
- [`helpers/neuralNetwork.py`](https://github.com/craighaber/AI-for-Snake-Game/blob/master/helpers/neuralNetwork.py) ~> [`js/AI-for-Snake-Game/neuralNetwork.js`](https://github.com/nrsharip/ai-genetic-algorithm-snake/blob/main/js/AI-for-Snake-Game/neuralNetwork.js)
- [`helpers/snake.py`](https://github.com/craighaber/AI-for-Snake-Game/blob/master/helpers/snake.py) ~> [`js/AI-for-Snake-Game/snake.js`](https://github.com/nrsharip/ai-genetic-algorithm-snake/blob/main/js/AI-for-Snake-Game/snake.js)
- [`helpers/snakeGame.py`](https://github.com/craighaber/AI-for-Snake-Game/blob/master/helpers/snakeGame.py) ~> [`js/AI-for-Snake-Game/snakeGame.js`](https://github.com/nrsharip/ai-genetic-algorithm-snake/blob/main/js/AI-for-Snake-Game/snakeGame.js)
- [`helpers/snakeGameGATest.py`](https://github.com/craighaber/AI-for-Snake-Game/blob/master/helpers/snakeGameGATest.py) ~> [`js/AI-for-Snake-Game/snakeGameGATest.js`](https://github.com/nrsharip/ai-genetic-algorithm-snake/blob/main/js/AI-for-Snake-Game/snakeGameGATest.js)
- [`helpers/snakeGameGATrain.py`](https://github.com/craighaber/AI-for-Snake-Game/blob/master/helpers/snakeGameGATrain.py) ~> [`js/AI-for-Snake-Game/snakeGameGATrain.js`](https://github.com/nrsharip/ai-genetic-algorithm-snake/blob/main/js/AI-for-Snake-Game/snakeGameGATrain.js)

- [`playSnakeGame.py`](https://github.com/craighaber/AI-for-Snake-Game/blob/master/playSnakeGame.py) ~> [`js/playSnakeGame.js`](https://github.com/nrsharip/ai-genetic-algorithm-snake/blob/main/js/playSnakeGame.js)
- [`testTrainedAgents.py`](https://github.com/craighaber/AI-for-Snake-Game/blob/master/testTrainedAgents.py) ~> [`js/playSnakeGame.js`](https://github.com/nrsharip/ai-genetic-algorithm-snake/blob/main/js/playSnakeGame.js)
- [`trainGeneticAlgorithm.py`](https://github.com/craighaber/AI-for-Snake-Game/blob/master/trainGeneticAlgorithm.py) ~> [`js/playSnakeGame.js`](https://github.com/nrsharip/ai-genetic-algorithm-snake/blob/main/js/playSnakeGame.js)
