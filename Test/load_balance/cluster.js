const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const net = require('net');

const ports = [3000, 4000, 5000]; // 要监听的端口列表

if (cluster.isMaster) {
  // 主进程
  console.log(`Master process ID: ${process.pid}`);

  // 创建工作进程
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // 监听工作进程的退出事件
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker process ${worker.process.pid} exited`);
    console.log(`Starting a new worker...`);
    cluster.fork();
  });
} else {
  // 工作进程
  console.log(`Worker process ID: ${process.pid}`);

  // 创建 TCP 服务器实例
  const servers = ports.map(port => {
    const server = net.createServer();

    // 监听连接事件
    server.on('connection', socket => {
      console.log(`Worker process ${process.pid} - Client connected to port ${port}`);

      // 处理接收到的数据
      socket.on('data', data => {
        console.log(`Worker process ${process.pid} - Received data from client on port ${port}: ${data}`);
      });

      // 处理连接断开事件
      socket.on('end', () => {
        console.log(`Worker process ${process.pid} - Client disconnected from port ${port}`);
      });
    });

    // 启动服务器，开始监听指定端口
    server.listen(port, () => {
      console.log(`Worker process ${process.pid} - Server started on port ${port}`);
    });

    return server;
  });
}
