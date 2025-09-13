import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import styles from './styles';

const BOARD_SIZE = 10;
const INITIAL_SNAKE = [{ x: 5, y: 5 }];
const INITIAL_DIRECTION = 'RIGHT';
const INITIAL_FOOD = { x: 2, y: 2 };

const SNAKE_COLORS = ['#0f0', '#00f', '#ff0', '#0ff', '#f0f', '#fa0', '#a0f'];
const FOOD_COLORS = ['#f00', '#f80', '#08f', '#0fa', '#af0', '#f0a', '#aaf'];

type Position = { x: number; y: number };

function getRandomPosition(snake: Position[]): Position {
  let position: Position;
  do {
    position = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
  } while (snake.some(seg => seg.x === position.x && seg.y === position.y));
  return position;
}

export default function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<string>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [paused, setPaused] = useState(false);
  const [started, setStarted] = useState(false);
  const [speed, setSpeed] = useState(200);
  const [snakeColorIdx, setSnakeColorIdx] = useState(0);
  const [foodColorIdx, setFoodColorIdx] = useState(0);

useEffect(() => {
  if (gameOver || paused || !started) return;
  const interval = setInterval(() => {
    moveSnake();
  }, speed);
  return () => clearInterval(interval);
}, [snake, direction, gameOver, paused, started, speed]);

const moveSnake = () => {
  const head = { ...snake[0] };
  let newHead = { ...head };

  switch (direction) {
    case 'UP':
      newHead.y -= 1;
      break;
    case 'DOWN':
      newHead.y += 1;
      break;
    case 'LEFT':
      newHead.x -= 1;
      break;
    case 'RIGHT':
      newHead.x += 1;
      break;
  }

  // Colisión con paredes o consigo misma
  if (
    newHead.x < 0 ||
    newHead.x >= BOARD_SIZE ||
    newHead.y < 0 ||
    newHead.y >= BOARD_SIZE ||
    snake.some(seg => seg.x === newHead.x && seg.y === newHead.y)
  ) {
    setGameOver(true);
    setStarted(false);
    return;
  }

  let newSnake = [newHead, ...snake];

  // Comer manzana
  if (newHead.x === food.x && newHead.y === food.y) {
    setFood(getRandomPosition(newSnake));
    setScore(score + 1);
    setSnakeColorIdx((prev) => (prev + 1) % SNAKE_COLORS.length);
    setFoodColorIdx((prev) => (prev + 1) % FOOD_COLORS.length);
    setSpeed(prev => Math.max(80, prev - 10)); // aumenta velocidad, mínimo 80ms
  } else {
    newSnake.pop();
  }

  setSnake(newSnake);
};

  const restartGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(getRandomPosition(INITIAL_SNAKE));
    setGameOver(false);
    setScore(0);
    setPaused(false);
    setStarted(false);
    setSnakeColorIdx(0);
    setFoodColorIdx(0);
  };

  const swipeGesture = Gesture.Pan()
    .onEnd((event) => {
      if (!started || paused || gameOver) return;
      const { translationX, translationY } = event;
      let newDirection = direction;
      if (Math.abs(translationX) > Math.abs(translationY)) {
        if (translationX > 0 && direction !== 'LEFT') {
          newDirection = 'RIGHT';
        } else if (translationX < 0 && direction !== 'RIGHT') {
          newDirection = 'LEFT';
        }
      } else {
        if (translationY > 0 && direction !== 'UP') {
          newDirection = 'DOWN';
        } else if (translationY < 0 && direction !== 'DOWN') {
          newDirection = 'UP';
        }
      }
      if (newDirection !== direction) {
        setDirection(newDirection);
      }
    });

  return (
    <GestureDetector gesture={swipeGesture}>
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (!started && !gameOver) setStarted(true);
          }}
        >
          <View style={{ flex: 1, width: '100%' }}>
            <View style={styles.topBar}>
              <TouchableOpacity onPress={() => setPaused(!paused)} style={styles.pauseBtn}>
                <Text style={styles.pauseText}>{paused ? 'Resume' : 'Pause'}</Text>
              </TouchableOpacity>
              <Text style={styles.scoreText}>Score: {score}</Text>
            </View>
            <View style={styles.board}>
              {Array.from({ length: BOARD_SIZE }).map((_, y) => (
                <View key={y + '-row'} style={styles.row}>
                  {Array.from({ length: BOARD_SIZE }).map((_, x) => {
                    const isSnake = snake.some(seg => seg.x === x && seg.y === y);
                    const isFood = food.x === x && food.y === y;
                    let cellStyle = styles.cell;
                    if (isSnake) {
                      cellStyle = { ...styles.cell, backgroundColor: SNAKE_COLORS[snakeColorIdx] };
                    }
                    if (isFood) {
                      cellStyle = { ...styles.cell, backgroundColor: FOOD_COLORS[foodColorIdx] };
                    }
                    return (
                      <View
                        key={x + '-' + y + '-cell'}
                        style={cellStyle}
                      />
                    );
                  })}
                </View>
              ))}
            </View>
            {gameOver && (
              <View style={styles.overlay}>
                <Text style={styles.gameOver}>Game Over</Text>
                <TouchableOpacity onPress={restartGame} style={styles.restartBtn}>
                  <Text>Restart</Text>
                </TouchableOpacity>
              </View>
            )}
            {!started && !gameOver && (
              <View style={styles.tapToStartOverlay}>
                <Text style={styles.tapToStartText}>Tap to start</Text>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </GestureDetector>
  );
}
