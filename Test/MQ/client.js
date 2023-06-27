const net = require("net")

class T_MQClient{
    
    QUEQUE_NAME = "hello"

    constructor(){
        const client = net.connect({
            'port':"9999"
        })
        setInterval(()=>{
            client.write("测试队列")
        },3000)

    }
}

new T_MQClient()