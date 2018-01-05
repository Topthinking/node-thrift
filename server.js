const thrift = require('thrift')

const Calculate = require('./gen-nodejs/Calculate')
const ttypes = require('./gen-nodejs/calculate_types')

const serverObj = {
    ping: function () { 
        console.log('ping success')
    },
    add: function (num1, num2, result) { 
        result(null,num1 + num2)
    },
    calculate: function (logid,work,result) { 
        let val = 0

        if (work.op == ttypes.Operation.ADD) {
            val = work.num1 + work.num2
        } else if (work.op == ttypes.Operation.SUBTRACT) {
            val = work.num1 - work.num2
        } else if (work.op == ttypes.Operation.MULTIPLY) {
            val = work.num1 * work.num2
        } else if (work.op == ttypes.Operation.DIVIDE) {
            if (work.num2 == 0) {
                var o = new ttypes.InvalidOperation()
                o.whatOp = work.op
                o.why = 'can not divide by 0'
                result(0)
                return
            }
            val = work.num1 / work.num2
        } else { 
            var o = new ttypes.InvalidOperation()
            o.whatOp = work.op
            o.why = 'invalid operation'
            result(o)
            return
        }

        result(null,val)
    }
}

const server = thrift.createServer(Calculate,serverObj)

server.listen(5000)