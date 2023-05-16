// 集群策略 开启多端口模式

const cluster = require('cluster');
const os = require('os');

const numCPUs = os.cpus().length;
const ports = [3000, 3001, 3002]; // 端口数组，可以根据需要进行扩展

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // 创建工作进程
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    // 在工作进程退出后重新创建新的工作进程
    cluster.fork();
  });
} else {
  // 在工作进程中创建服务器监听指定端口
  const serverConfig = getServerConfig(); // 获取服务端配置
  const port = ports[cluster.worker.id % ports.length]; // 根据工作进程ID选择端口

  const server = createServer(serverConfig);
  server.listen(port, () => {
    console.log(`Worker ${process.pid} is listening on port ${port}`);
  });
}

// 获取服务端配置的示例函数，根据实际需求进行实现
function getServerConfig() {
  return {
    // 返回服务端配置对象
  };
}

// 创建服务器的示例函数，根据实际需求进行实现
function createServer(config) {
  // 创建服务器逻辑，返回服务器实例
}
