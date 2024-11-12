const tiles = document.querySelectorAll(".tile");
const cells = document.querySelectorAll(".cell");
const socket = io();

// 监听麻将牌拖动
tiles.forEach((tile) => {
  tile.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("tile", tile.dataset.tile); // 保存牌的信息
  });
});

// 监听棋盘格子放置
cells.forEach((cell) => {
  cell.addEventListener("dragover", (e) => {
    e.preventDefault(); // 允许拖放
  });

  cell.addEventListener("drop", (e) => {
    const tileValue = e.dataTransfer.getData("tile"); // 获取牌的信息
    const droppedTile = document.querySelector(`.tile[data-tile="${tileValue}"]`);
    if (droppedTile) {
      cell.textContent = droppedTile.textContent; // 将牌放置到格子
      droppedTile.remove(); // 从牌堆移除
    }
  });
});


socket.on("connect", () => {
    console.log("Connected to server:", socket.id);
  });
  
// 初始化棋盘
socket.on("initBoard", (boardState) => {
  console.log("Initial board state:", boardState);
  // 根据 boardState 渲染棋盘
});

// 更新棋盘
socket.on("updateBoard", ({ index, tile }) => {
  console.log(`Tile updated: Index ${index}, Tile ${tile}`);
  // 更新前端界面上的棋盘
});

// 玩家移动牌（示例）
function moveTile(index, tile) {
  socket.emit("moveTile", { index, tile });
}