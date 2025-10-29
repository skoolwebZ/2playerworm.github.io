document.getElementById("start-button").addEventListener("click", () => {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game-container").style.display = "block";
  startGame();
});

function startGame() {
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game-container",
    backgroundColor: "#000",
    scene: {
      preload,
      create,
      update
    }
  };

  const game = new Phaser.Game(config);
  let snake = [];
  let food;
  let cursors;
  let speed = 2;

  function preload() {
    this.load.image("food", "https://i.imgur.com/6R8sZtU.png");
  }

  function create() {
    for (let i = 0; i < 10; i++) {
      let segment = this.add.circle(400 - i * 10, 300, 5, 0x00ff00);
      snake.push(segment);
    }

    food = this.add.image(Phaser.Math.Between(100, 700), Phaser.Math.Between(100, 500), "food");
    cursors = this.input.keyboard.createCursorKeys();
  }

  function update() {
    let head = snake[0];
    let dx = 0;
    let dy = 0;

    if (cursors.left.isDown) dx = -speed;
    if (cursors.right.isDown) dx = speed;
    if (cursors.up.isDown) dy = -speed;
    if (cursors.down.isDown) dy = speed;

    head.x += dx;
    head.y += dy;

    for (let i = snake.length - 1; i > 0; i--) {
      snake[i].x = snake[i - 1].x;
      snake[i].y = snake[i - 1].y;
    }

    if (Phaser.Math.Distance.Between(head.x, head.y, food.x, food.y) < 10) {
      let newSegment = this.add.circle(snake[snake.length - 1].x, snake[snake.length - 1].y, 5, 0x00ff00);
      snake.push(newSegment);
      food.setPosition(Phaser.Math.Between(100, 700), Phaser.Math.Between(100, 500));
    }
  }
}
