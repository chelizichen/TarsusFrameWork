const os = require("os")

// 调用负载的请求
function T_LB_Request(url) {
  return
}


/**
 * @TarsusLoadBalance 负载均衡 BaseClass
 * @description 
 * 在我的思维里，对项目进行配置时会配置他的所有IP和权重
 * 在GateWay里时会对每个代理IP创建一个链接实例，每分钟都会拿到负载的数据
 * 对 负载 / weight 得到合适的权重 再通过sort 进行排序
 * sort 后的 数组第一位即为当前负载最低的机器
 */
class TarsusLoadBalance{

  hostList = []
  totalWeight = 0;
  /**
   * @description 得到操作系统上一分钟的负载信息 
   * */
  static getLastOneMinutes() {
    return os.loadavg()[0]
  }

  /**
   * @param {Array<{url:string;weight:number;currWeight:number>} param0 
   * */
  constructor(hostList = []) {
    // 给定权重列表
    this.hostList = hostList.map(item => {
      item.currWeight = 0;
      return item;
    })
    // 赋值全部的权重
    this.totalWeight = servers.reduce((sum, server) => sum + server.weight, 0);
    // 开启分钟轮询
    this.TimesSending()
  }


  /**
   * @description 轮询操作系统的负载
   *  */ 
  TimesSending() {
    setInterval(async () => {
      const arrs = await Promise.all(this.hostList.map(async item => {
        const { url,weight } = item;
        // 拿到负载信息
        const LB = await T_LB_Request(url);
        item.currWeight = (LB.data / weight).toFixed(2)
        return item
      }))
      arrs = arrs.sort((a, b) => a.weight - b.weight);
      this.hostList = arrs
    },1000)
  }

  /**
   * @description 根据这个代理去请求
   */
  ProxySendRequest() {
  }
}

const a = TarsusLoadBalance.getLastOneMinutes()
console.log(a);



