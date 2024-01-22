function quickestPath(board: {
  ladders: [number, number][]
  snakes: [number, number][]
}): number[] {
  const { ladders, snakes } = board
  const snakePoint = snakes.map((p) => p[0])

  const ladderSteps = ladders.map((p) => [p[0], p[1] - p[0]])

  let playerPosition = 1

  const diceRoll: number[] = []

  const finish = 100

  while (playerPosition !== finish) {
    const closestLadder = ladderSteps.filter((p) => p[0] > playerPosition)[0]
    if (closestLadder) {
      const distance = closestLadder[0] - playerPosition
      const roll = Math.min(6, distance)
      if (snakePoint.includes(playerPosition + roll)) {
        diceRoll.push(roll - 1)
        playerPosition += roll - 1
      } else {
        diceRoll.push(roll)
        playerPosition += roll
      }
      playerPosition += closestLadder[1]
    } else {
      const distance = finish - playerPosition
      const roll = Math.min(6, distance)
      if (snakePoint.includes(playerPosition + roll)) {
        diceRoll.push(roll - 1)
        playerPosition += roll - 1
      } else {
        diceRoll.push(roll)
        playerPosition += roll
      }
    }
  }

  return diceRoll
}
