function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function addRandomTile(grid) {
    const emptyCells = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) emptyCells.push({ x: i, y: j });
        }
    }
    if (emptyCells.length > 0) {
        const { x, y } = emptyCells[getRandomInt(emptyCells.length)];
        grid[x][y] = Math.random() < 0.9 ? 2 : 4; // 90% chance of 2, 10% chance of 4
    }
}