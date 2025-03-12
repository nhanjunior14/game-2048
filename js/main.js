let canvas, game, renderer;

FBInstant.initializeAsync()
.then(() => {
    FBInstant.setLoadingProgress(50);
    
    canvas = document.getElementById("gameCanvas");
    game = new Game();
    renderer = new Renderer(canvas);
    
    FBInstant.setLoadingProgress(100);
    
    return FBInstant.startGameAsync();
})
.then(() => {
    document.addEventListener("keydown", (event) => {
        if (event.key.startsWith("Arrow")) {
            event.preventDefault();
            const direction = event.key.replace("Arrow", "").toLowerCase();
            game.move(direction);
            update();
        }
    });
    
    update();
});

function update() {
    renderer.render(game.grid);
    document.getElementById('score').textContent = game.score;
    FBInstant.setSessionScore(game.score);
}
