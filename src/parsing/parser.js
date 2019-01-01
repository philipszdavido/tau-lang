const { Token } = require('./token')
const { IfSt, BlockStmt, FunctionStmt, CallStmt, LiteralExpr, BinaryExpr, VariableExpr, Var } = require('./../ast/ast')
const { Scope } = require('./../ast/scope')
const l = console.log

// numbers, strings true false nil are literal expr
// identitfier is an variable  expr

class Parser {

    constructor(tokens) {
        this.tokens = tokens
        this.current = 0
        this.statements = []
    }

    advance() {
        this.current++
    }

    parse() {
        //l(this.tokens)

        while (!this.isEndOf()) {
            //this.statements.push(this.expression())
            this.statements.push(this.declaration())
        }
        return this.statements
    }

    declaration() {
        if (this.match(Token.CLASS)) {
            return this.classDecalration()
        }
        if (this.match(Token.FUNCTION)) {
            return this.funcDeclaration()
        }
        if (this.match(Token.VAR)) {
            return this.varDeclaration()
        }
        return this.statement()
    }
    expression() {
        return this.addition()

        /*
        const left = this.primary()
        const op = this.peek()
        this.advance()
        const right = this.primary()
        return new BinaryExpr(left, op, right)
        */
    }

    addition() {
        let left = this.multiplication()
        while (this.match(Token.ADD, Token.MINUS)) {
            let op = this.peek()
            this.consumeToken()
            let right = this.multiplication()
            left = new BinaryExpr(left, op, right)
        }
        return left
    }

    multiplication() {
        //let left = this.primary()
        let left = this.callExpr()
        while (this.match(Token.MUL, Token.DIV)) {
            let op = this.peek()
            this.consumeToken()
            let right = this.primary()
            left = new BinaryExpr(left, op, right)
        }
        return left
    }

    assignExpr() {

    }

    callExpr() {
        let fun_name = this.primary()
        let arglist = []

        if (this.match(Token.LP)) {
            this.consumeToken()
            while (!this.match(Token.RP)) {
                if (this.peek().type == Token.COMMA) {
                    this.consumeToken()
                } else {
                    arglist.push(this.expression())
                }
            }
            this.consumeToken()
            return new CallStmt(fun_name, arglist)
        }
        return fun_name

        /*while (this.match(Token.COMMA, Token.RP)) {

        }*/
    }

    primary() {
        /*if (this.match(Token.LITERAL)) {

        }*/
        if (this.match(Token.NUMBER)) {
            let number = this.peek()
            this.consumeToken()
            return new LiteralExpr(number.value, 'NumberLiteral')
        }
        if (this.match(Token.STRING)) {
            let number = this.peek()
            this.consumeToken()
            return new LiteralExpr(number.value, 'StringLiteral')
        }

        if (this.match(Token.IDENTIFIER)) {
            let iden = this.peek()
            this.consumeToken()
            return new VariableExpr(iden)
        }
    }

    statement() {
        if (this.match(Token.IF)) {
            this.IfStatement()
        }
        if (this.match(Token.LB)) {
            return this.blockStatement()
        }
        return this.exprStatement()
    }

    varDeclaration() {
        let initializer
        this.consumeToken()
        let name = this.peek()
        this.consumeToken()
        if (this.match(Token.ASSIGN)) {
            this.consumeToken()
            initializer = this.expression()
        }
        return new Var(name, initializer)
    }

    funcDeclaration() {
        this.consumeToken()
        let fun_name = this.peek()
        let arglist = []
        this.consumeToken()
        if (this.match(Token.LP)) {
            this.consumeToken()
            while (!this.match(Token.RP)) {
                //this.consumeToken()
                if (this.peek().type == Token.COMMA) {
                    this.consumeToken()
                } else {
                    //arglist.push(this.expression())
                    arglist.push(this.peek())
                    this.consumeToken()
                }
                //l(this.peek(), arglist)
                //this.advance()
            }
            this.consumeToken()
        }
        return new FunctionStmt(fun_name, arglist, this.blockStatement())
    }

    blockStatement() {
        l(this.peek())
        this.consumeToken()
        let statements = []
        l(this.peek())
        while (!this.match(Token.RB) && !this.isEndOf()) {
            statements.push(this.declaration())
                //l(this.peek())
                //l(statements)
        }
        this.consumeToken()
        return new BlockStmt(statements)
    }

    exprStatement() {
        return this.expression()
    }

    IfStatement() {
        this.consumeToken()
    }

    isEndOf() {
        //l(this.tokens[this.current].type)
        if (this.tokens[this.current].type == Token.EOF)
            return true
        return false
    }

    // eat a the current Token and advance
    consumeToken() {
        this.advance()
    }

    match() {
        for (let arg of arguments) {
            if (this.peek().type == arg) {
                return true
            }
        }
        return false
    }

    peek() {
        return this.tokens[this.current]
    }
}

exports.Parser = Parser