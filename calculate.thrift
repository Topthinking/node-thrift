enum Operation {
    ADD = 5,
    SUBTRACT = 9,
    MULTIPLY = 7,
    DIVIDE = 11
}

struct Work {
    1: i32 num1 = 0,
    2: i32 num2,
    3: Operation op,
    4: optional string comment = "this is test comment"
}

exception InvalidOperation {
    1: i32 whatOp,
    2: string why
}

service Calculate {
    void ping(),

    i32 add(1: i32 num1, 2: i32 num2),

    i32 calculate(1: i32 logid, 2: Work work) throws (1: InvalidOperation invalid)
}