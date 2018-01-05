const thrift = require('thrift')

const Calculate = require('./gen-nodejs/Calculate')
const ttypes = require('./gen-nodejs/calculate_types')

//选择transport
const transport = thrift.TBufferedTransport

// 选择Protocol
const protocol = thrift.TBinaryProtocol

// 创建一个客户端的链接
const connection = thrift.createConnection('localhost', 5000, {
    transport: transport,
    protocol:protocol
})

// 监听error
connection.on('error', (err) => { 
    console.log(err)
})

const client = thrift.createClient(Calculate, connection)

// 执行减法

const work1 = new ttypes.Work({
    num1: 10,
    num2: 4,
    op: ttypes.Operation.SUBTRACT
})

client.ping()

client.add(3, 4, function (err, res) { 
    if (err) {
        console.log(err)
    } else { 
        console.log('3 + 4 = '+ res)
    }
    connection.end()
})

client.calculate(1, work1, (err, res) => { 
    if (err) {
        console.log(err)
    } else { 
        console.log('10 - 4 = '+ res)
    }
    connection.end()
})