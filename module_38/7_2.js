function calculate(a, b, operator){
    switch(operator) {
        case '+':
            return a + b;
        case '-':
           return a - b;
        case '*':
            return a * b;
        case '/':
                return a / b;
        default:
            return 'Unknown operator';
    }
}

const context ={};
const args =[2, 3, '+'];
const result = calculate.apply(context, args)