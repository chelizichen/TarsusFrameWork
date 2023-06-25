const net = require("net")

class T_MQServer{
    
    QUEQUE_NAME = "hello"

    constructor(){
        const server = net.createServer(socket=>{
            socket.on("data",function(chunk){
                console.log("接收到消息",chunk.toString());
            })
        })
        server.listen(9999)

    }
}

class T_MQueQue{
    /**
     * @param {*} limit 限制队列长度
     * @param {*} type 队列类型
     */
    constructor(limit,type){
        
    }
}

new T_MQServer()