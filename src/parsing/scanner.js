const { Token, Keywords } = require('./token')
const l = console.log


class Scanner {
    constructor(source) {
        this.source = source
        this.tokens = []
        this.curent = 0
    }

    isAtEnd() {
        return this.source[this.curent] == undefined ? true : false
    }

    getTokens() {
        while (!this.isAtEnd()) {
            this.scanToken()
        }
        this.tokens.push({ type: 'EOF' })
        return this.tokens
    }

    advance() {
        this.curent++;
        return this.source[this.curent - 1]
    }

    addTok(type, value) {
        if (value)
            this.tokens.push({ type, value })
        else
            this.tokens.push({ type })
    }

    scanToken() {
        let d = this.advance().trim()
            //l(d)
        switch (d) {

            case ',':
                this.addTok('COMMA')
                break

            case '(':
                this.addTok('LP')
                break

            case ')':
                this.addTok('RP')
                break

            case '{':
                this.addTok('LB')
                break

            case '}':
                this.addTok('RB')
                break

            case '=':
                this.addTok('ASSIGN')
                break;

            case '-':
                if (this.match('=')) {
                    this.addTok('ASSIGN_MINUS')
                    break
                }
                this.addTok('MINUS')
                break;

            case 'var':
                this.addTok('VAR')
                break;

            case ';':
                this.addTok('EOL')
                break;

            case '*':
                if (this.match('=')) {
                    this.addTok('ASSIGN_MUL')
                    break
                }
                this.addTok('MUL')
                break

            case '/':
                if (this.match('=')) {
                    this.addTok('ASSIGN_DIV')
                    break
                }
                this.addTok('DIV')
                break

            case '+':
                if (this.match('=')) {
                    this.addTok('ASSIGN_ADD')
                    break
                }
                this.addTok(Token.ADD)
                break;
            case '\t':
            case ' ':
            case '\r':
                break
            case '\n':
                this.advance()
                break
            case '"':
                this.string()
                break
            default:
                if (this.isDigit(d)) {
                    this.addTok('NUMBER', this.number())
                }
                if (this.isAlpha(d)) {
                    this.identifier()
                }
                break;
        }
    }
    string() {
        this.advance()
        let n = this.previous()
        while (this.source[this.curent] !== '"' && !this.isAtEnd()) {
            let c = this.source[this.curent]
            if (c == undefined || c == '"' || c == '\n') {
                break
            }
            n += c
                //l(n)
            this.advance()
        }
        this.advance()
        this.addTok('STRING', n)
    }
    number() {
        let n = this.previous()
        while (this.source[this.curent] !== " ") {
            let c = this.source[this.curent]
            if (c == undefined || c == ";" || c == " " || (this.isDigit(c) == false))
                break

            n += c
                //l(n)
            this.advance()
        }
        return n
    }

    previous() {
        return this.source[this.curent - 1]
    }

    identifier() {
        let n = this.previous()
        while (this.source[this.curent] !== " ") {
            let c = this.source[this.curent]
            if (c == undefined || c == ";" || c == " " || (this.isAlpha(c) == false))
                break
            n += c
            this.advance()
        }
        //l(n)
        if (Keywords[n]) {
            this.addTok(Keywords[n])
            return
        }
        this.addTok('IDENTIFIER', n)
    }

    match(str) {
        if (str != this.source[this.curent])
            return false

        this.curent++
            return true
    }

    isDigit(str) {
        return str >= '0' && str <= '9'
    }

    isAlpha(str) {
        return str >= 'a' && str <= 'z' || str == '_'
    }

    peek() {
        return this.source[this.curent + 1]
    }
}

exports.Scanner = Scanner