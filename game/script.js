const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 32;
const mapWidth = 10;
const mapHeight = 10;
canvas.width = tileSize * mapWidth;
canvas.height = tileSize * mapHeight;

const player = {
    x: 5,
    y: 5,
    color: "red"
};

const map = [
    "##########",
    "#........#",
    "#..####..#",
    "#..#  #..#",
    "#..#  #..#",
    "#..#  #..#",
    "#..####..#",
    "#........#",
    "##########"
];

function drawMap() {
    for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
            if (map[y][x] === "#") {
                ctx.fillStyle = "#4c5c68"; // Серый для стен
            } else {
                ctx.fillStyle = "#1b263b"; // Синий для пола
            }
            ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }
}

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();
    drawPlayer();
}

document.addEventListener("keydown", (e) => {
    let newX = player.x;
    let newY = player.y;

    if (e.key === "ArrowUp") newY--;
    if (e.key === "ArrowDown") newY++;
    if (e.key === "ArrowLeft") newX--;
    if (e.key === "ArrowRight") newX++;

    if (map[newY] && map[newY][newX] === ".") {
        player.x = newX;
        player.y = newY;
    }
    update();
});

update();
