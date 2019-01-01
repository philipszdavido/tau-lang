const { Scope } = require('./src/ast/scope')
const { Scanner } = require('./src/parsing/scanner.js')
const { Parser } = require('./src/parsing/parser.js')
const { Interpreter } = require('./src/interpreter/interpreter')
const l = console.log

/*
var f = `
        var d = 90;
        d += 9;
        23 + 45
`
*/

const scope = new Scope()
scope.setValue('print', function(args) {
    console.log(args)
})
scope.setValue('sqrt', function() {
    return 344;
})

f = `
     89-24+90   
     120+678
     4/2
     3*3
`
f = `
     var f = 90
`
f = `
    var d= "nnamdi chidume"
    var t = 90
    var g = sqrt()
    print(g,d,t,34)
`
var d = `
    function add(d){
        print("add function")
    }
    add()
    {
        var ff = "inside a block"
    }
    print(ff)
`
const scanner = new Scanner(d)
    //l(scanner.getTokens())
const tokens = scanner.getTokens()

l(tokens)

//return
const parser = new Parser(tokens)

const statements = parser.parse()
l(statements)

//return
new Interpreter(statements, scope).interpret()
scope.printAll()