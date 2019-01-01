class Expr {
    accept(intr) {}
}

class Binary {
    constructor(left, op, right) {
        this.type = "BinaryExpr"
        this.left = left
        this.op = op
        this.right = right
    }
    accept(intr) {
        return intr.visitBinOp(this)
    }
}

// holds number, false, true
/**
 * value: 67, true, false
 */
class Literal {
    constructor(value, type) {
        this.type = ""
        this.value = value
    }
    accept(intr) {
        return intr.visitLiteralOp(this)
    }
}

// yu = 90
class Assign {
    constructor(left, right) {
        this.left = left
        this.right = right
    }
    accept(intr) {
        return intr.visitAssignOp(this)
    }
}

// name of var and function
/**
 * var dd = 90
 * dd is variable
 * name: dd
 */
class Variable {
    constructor(name) {
        this.name = name
    }
    accept(intr) {
        return intr.visitVariableOp(this)
    }
}

// holds `var op = 90+989`
/**
 * name: op
 * initializer: 90 + 989
 * 
 */
class Var {
    constructor(name, initializer) {
        this.name = name
        this.initializer = initializer
    }
    accept(intr) {
        return intr.visitVarOp(this)
    }
}

class ExprStmt {
    constructor(st) {
        this.statement = st
    }
    accept(intr) {
        return intr.visitExprStmt(this)
    }
}

class CallStmt {
    constructor(name, args) {
        this.name = name
        this.args = args
    }
    accept(intr) {
        return intr.visitCallStmt(this)
    }
}

class IfSt {
    constructor(cond, then_st, else_st) {
        this.cond = cond
        this.then = then_st
        this.else = else_st
    }
    accept(intr) {
        return intr.visitIfSt(this)
    }
}

class FunctionStmt {
    constructor(name, args, body) {
        this.name = name
        this.args = args
        this.body = body
    }
    accept(intr) {
        intr.visitFunctionStmt(this)
    }
}

class BlockStmt {
    constructor(body) {
        this.body = body
    }
    accept(intr) {
        intr.visitBlockStmt(this)
    }
}

exports.BinaryExpr = Binary
exports.LiteralExpr = Literal
exports.AssignExpr = Assign
exports.VariableExpr = Variable
exports.IfSt = IfSt
exports.ExprStmt = ExprStmt
exports.CallStmt = CallStmt
exports.Var = Var
exports.FunctionStmt = FunctionStmt
exports.BlockStmt = BlockStmt