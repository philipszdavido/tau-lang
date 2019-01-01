const { Parser } = require('./../parsing/parser')
const { BinaryExpr } = require('./../ast/ast')
const { Scope } = require('./../ast/scope')
const { Token } = require('./../parsing/token')

const l = console.log

class Interpreter {
    constructor(statements, scope) {
        this.statements = statements
        this.scope = scope
    }

    interpret() {
        for (let statement of this.statements) {
            this.evaluate(statement)
        }
    }

    visitBinOp(st) {
        switch (st.op.type) {
            case Token.MINUS:
                return this.evaluate(st.left) - this.evaluate(st.right)
            case Token.ADD:
                return this.evaluate(st.left) + this.evaluate(st.right)
            case Token.MUL:
                return this.evaluate(st.left) * this.evaluate(st.right)
            case Token.DIV:
                return this.evaluate(st.left) / thisevaluate(st.right)
            default:
                break;
        }
    }

    visitCallStmt(st) {
        let fun_name = this.evaluate(st.name)
        let args = []
        for (let f of st.args) {
            args.push(this.evaluate(f))
                //l()
        }
        return fun_name(...args)
    }

    visitVariableOp(st) {
        let n = st.name.value
            //l(n)
        return this.scope.getValue(n)
    }

    visitVarOp(st) {
        let name = st.name.value
        let initializer = st.initializer
        let v = this.evaluate(initializer)
        return this.scope.setValue(name, v)
    }

    visitLiteralOp(st) {
        return st.value
    }

    visitBlockStmt(op) {
        for (let b of op.body) {
            return this.evaluate(b)
        }
    }

    visitFunctionStmt(op) {
        return this.scope.setValue(op.name.value, () => {
            this.visitBlockStmt(op.body)
        })
    }

    evaluate(expr) {
        return expr.accept(this)
    }
}

exports.Interpreter = Interpreter