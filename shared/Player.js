const { dimension } = require('./space');

class Player {
  constructor({ x, y, score, id, radius = 30 }) {
    this.x = x;
    this.y = y;
    this.score = score;
    this.id = id;
    this.radius = radius;
  }

  movePlayer(dir, speed) {
    switch (dir) {
      case 'up':
        this.y = Math.max(dimension.minY + this.radius, this.y - speed);
        break;
      case 'down':
        this.y = Math.min(dimension.maxY - this.radius, this.y + speed);
        break;
      case 'left':
        this.x = Math.max(dimension.minX + this.radius, this.x - speed);
        break;
      case 'right':
        this.x = Math.min(dimension.maxX - this.radius, this.x + speed);
        break;
    }
  }

  collision(item) {
    const dx = this.x - item.x;
    const dy = this.y - item.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < this.radius + item.radius;
  }

  draw(context, img) {
    context.drawImage(img, this.x - this.radius, this.y - this.radius, 2 * this.radius, 2 * this.radius);
  }

  calculateRank(arr) {
    const sort = arr.sort((a, b) => b.score - a.score);
    let position = 0;
    sort.forEach((player, index) => {
      if (this.id === player.id) position = index + 1;
    });

    return `Rank: ${position} / ${arr.length}`;
  }
}

module.exports = Player;
