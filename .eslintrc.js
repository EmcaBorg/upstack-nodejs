module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'indent': ['error', 2],
        'no-multi-spaces': ['error'],
        'no-multiple-empty-lines': [1, {"max": 1 }],
       
    }
}
