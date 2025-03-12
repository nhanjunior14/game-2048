class Renderer {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.tileSize = canvas.width / 4;
    this.animations = [];
    this.previousGrid = null;
    this.drawGrid();
  }

  drawGrid() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        this.ctx.fillStyle = "rgba(238, 228, 218, 0.35)";
        this.ctx.fillRect(
          j * this.tileSize + 2,
          i * this.tileSize + 2,
          this.tileSize - 4,
          this.tileSize - 4
        );
      }
    }
  }

  render(grid) {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.drawGrid();

    const oldGrid = this.previousGrid
      ? JSON.parse(JSON.stringify(this.previousGrid))
      : null;
    this.previousGrid = JSON.parse(JSON.stringify(grid));

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const value = grid[i][j];
        if (value !== 0) {
          if (!oldGrid || oldGrid[i][j] !== value) {
            this.animateNewTile(j * this.tileSize, i * this.tileSize, value);
          } else {
            this.drawTile(j * this.tileSize, i * this.tileSize, value);
          }
        }
      }
    }
  }

  animateNewTile(x, y, value) {
    let scale = 0;
    const animate = () => {
      scale += 0.1;
      if (scale <= 1) {
        this.ctx.save();
        this.ctx.translate(x + this.tileSize / 2, y + this.tileSize / 2);
        this.ctx.scale(scale, scale);
        this.ctx.translate(-(x + this.tileSize / 2), -(y + this.tileSize / 2));
        this.drawTile(x, y, value);
        this.ctx.restore();
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }

  drawTile(x, y, value) {
    const padding = 2;
    this.ctx.fillStyle =
      value === 0 ? "rgba(238, 228, 218, 0.35)" : this.getTileColor(value);
    this.ctx.fillRect(
      x + padding,
      y + padding,
      this.tileSize - padding * 2,
      this.tileSize - padding * 2
    );

    if (value !== 0) {
      this.ctx.fillStyle = value <= 4 ? "#776e65" : "#f9f6f2";
      this.ctx.font = value >= 1024 ? "bold 24px Arial" : "bold 30px Arial";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillText(value, x + this.tileSize / 2, y + this.tileSize / 2);
    }
  }

  getTileColor(value) {
    const colors = {
      2: "#eee4da",
      4: "#ede0c8",
      8: "#f2b179",
      16: "#f59563",
      32: "#f67c5f",
      64: "#f65e3b",
      128: "#edcf72",
      256: "#edcc61",
      512: "#edc850",
      1024: "#edc53f",
      2048: "#edc22e",
    };
    return colors[value] || "#3c3a32";
  }
}
