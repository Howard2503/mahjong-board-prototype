// 引入必要模块
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

// 创建 Express 应用和 HTTP 服务
const app = express();
const server = http.createServer(app);

// 配置 Socket.IO
const io = new Server(server);

// 设置端口号
const PORT = process.env.PORT || 3000;

// 静态文件托管（前端 HTML、CSS 和 JS）
app.use(express.static("public"));

// 棋盘状态（简单的共享状态示例，实际项目中可用数据库存储）
let boardState = Array(100).fill(null); // 示例：9格棋盘的状态

// 监听客户端连接
io.on("connection", (socket) => {
  console.log("A player connected:", socket.id);

  // 当新玩家连接时，发送当前棋盘状态
  socket.emit("initBoard", boardState);

  // 监听玩家的移动
  socket.on("moveTile", (data) => {
    const { index, tile } = data; // index 是格子位置，tile 是牌的值
    boardState[index] = tile; // 更新棋盘状态

    // 广播给所有其他玩家
    socket.broadcast.emit("updateBoard", { index, tile });
  });

  // 玩家断开连接
  socket.on("disconnect", () => {
    console.log("A player disconnected:", socket.id);
  });
});

// 启动服务
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});