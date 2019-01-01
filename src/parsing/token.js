const TOKEN = {
    "IDENTIFIER": "IDENTIFIER",
    "VAR": 'VAR',
    'ADD': 'ADD',
    'COMMA': 'COMMA',
    'LP': 'LP',
    'RP': 'RP',
    'ASSIGN': 'ASSIGN',
    'NUM': 'NUM',
    'LITERAL': 'LITERAL',
    'FUNCTION': 'FUNCTION',
    'CLASS': 'CLASS',
    'EOF': 'EOF',
    'NUMBER': 'NUMBER',
    'MINUS': 'MINUS',
    'MUL': 'MUL',
    'DIV': 'DIV',
    'IF': 'IF',
    'FUNCTION': 'FUNCTION',
    'LITERAL': 'LITERAL',
    'STRING': 'STRING',
    'LB': 'LB',
    'RB': 'RB'
}

const keywords = {
    'new': 'NEW',
    'typeof': 'TYPEOF',
    'delete': 'DELETE',
    'class': 'CLASS',
    'if': 'IF',
    'while': 'WHILE',
    'do': 6,
    'for': 7,
    'of': 8,
    'function': 'FUNCTION',
    'var': 'VAR'
}

const operators = ['=', '==', '===', '-', '-=', '*', '*=', '/', '/=', '+', '+=', '>', '<', '>=', '=<', '(', ')', '[', ']', '{', '}']

exports.Token = TOKEN
exports.Keywords = keywords