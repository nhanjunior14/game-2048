class Game {
  constructor() {
    this.initGame();
    this.hasWon = false;
  }

  initGame() {
    this.grid = Array(4)
      .fill()
      .map(() => Array(4).fill(0));
    this.score = 0;
    addRandomTile(this.grid);
    this.hasWon = false;
  }

  restart() {
    this.initGame();
  }

  checkWin() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.grid[i][j] === 2048 && !this.hasWon) {
          this.hasWon = true;
          //   const continueGame = confirm("Chúc mừng! Bạn đã đạt được 2048!\nBạn có muốn tiếp tục chơi không?");
          //   if (!continueGame) {
          //     this.restart();
          //   }
          FBInstant.updateAsync({
            action: "CUSTOM",
            cta: "Play Again",
            text: {
              default: `I reached 2048! Can you beat my score of ${this.score}?`,
            },
            template: "play_turn",
            data: { score: this.score },
            strategy: "IMMEDIATE",
            notification: "NO_PUSH",
          });
          return;
        }
      }
    }
  }

  isGameOver() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.grid[i][j] === 0) return false;
      }
    }

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.grid[i][j] === this.grid[i][j + 1]) return false;
      }
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.grid[i][j] === this.grid[i + 1][j]) return false;
      }
    }

    if (this.isGameOver()) {
      FBInstant.updateAsync({
        action: "CUSTOM",
        cta: "Try Again",
        text: {
          default: `Game Over! I scored ${this.score} in 2048. Can you beat me?`,
        },
        template: "play_turn",
        data: { score: this.score },
        strategy: "IMMEDIATE",
        notification: "NO_PUSH",
      });
    }

    return true;
  }

  move(direction) {
    let moved = false;
    // Simplified movement logic (left direction only for now)
    if (direction === "left") {
      for (let i = 0; i < 4; i++) {
        let row = this.grid[i].filter((val) => val !== 0); // Remove zeros
        for (let j = 0; j < row.length - 1; j++) {
          if (row[j] === row[j + 1]) {
            row[j] *= 2;
            this.score += row[j];
            row[j + 1] = 0;
          }
        }
        row = row.filter((val) => val !== 0); // Remove zeros again
        while (row.length < 4) row.push(0); // Pad with zeros
        if (this.grid[i].join() !== row.join()) moved = true;
        this.grid[i] = row;
      }
    }

    if (direction === "right") {
      for (let i = 0; i < 4; i++) {
        let row = this.grid[i].filter((val) => val !== 0);
        for (let j = row.length - 1; j > 0; j--) {
          if (row[j] === row[j - 1]) {
            row[j] *= 2;
            this.score += row[j];
            row[j - 1] = 0;
          }
        }
        row = row.filter((val) => val !== 0);
        while (row.length < 4) row.unshift(0);
        if (this.grid[i].join() !== row.join()) moved = true;
        this.grid[i] = row;
      }
    }

    if (direction === "up") {
      for (let j = 0; j < 4; j++) {
        let oldColumn = [
          this.grid[0][j],
          this.grid[1][j],
          this.grid[2][j],
          this.grid[3][j],
        ];
        let column = oldColumn.filter((val) => val !== 0);
        for (let i = 0; i < column.length - 1; i++) {
          if (column[i] === column[i + 1]) {
            column[i] *= 2;
            this.score += column[i];
            column[i + 1] = 0;
          }
        }
        column = column.filter((val) => val !== 0);
        while (column.length < 4) column.push(0);
        if (oldColumn.join() !== column.join()) moved = true;
        for (let i = 0; i < 4; i++) this.grid[i][j] = column[i];
      }
    }

    if (direction === "down") {
      for (let j = 0; j < 4; j++) {
        let oldColumn = [
          this.grid[0][j],
          this.grid[1][j],
          this.grid[2][j],
          this.grid[3][j],
        ];
        let column = oldColumn.filter((val) => val !== 0);
        for (let i = column.length - 1; i > 0; i--) {
          if (column[i] === column[i - 1]) {
            column[i] *= 2;
            this.score += column[i];
            column[i - 1] = 0;
          }
        }
        column = column.filter((val) => val !== 0);
        while (column.length < 4) column.unshift(0);
        if (oldColumn.join() !== column.join()) moved = true;
        for (let i = 0; i < 4; i++) this.grid[i][j] = column[i];
      }
    }

    // Check if the grid changed
    if (moved) {
      addRandomTile(this.grid);
      this.checkWin();
      if (this.isGameOver()) {
        setTimeout(() => {
          alert("Game Over! Your score: " + this.score);
        }, 300);
      }
    }
  }
}
