function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    let countOpen = 0,
        countClouse = 0;

    for(let i = 0; i < expr.length ; i++){
        if (expr.charAt(i) == '('){
            countOpen++ ;
        } else if(expr.charAt(i)  == ')'){
            countClouse++ ;
        } 
    }
    
    if(countOpen != countClouse){
        throw new Error("ExpressionError: Brackets must be paired");
    }
    let exprArr = [];

    if(expr.length < 4){
        exprArr = expr.split('');
    } else{
        exprArr = expr.split(' ');
        exprArr.forEach((element,i,arr) => {
            if(!element || element == ' '){
            arr.splice(i,1);
            }
        });
    }

    function calc(a,b,oper){

        if (oper == '/' && b == 0){
            throw new Error("TypeError: Division by zero.");
        }

        switch(oper){
            case '+' : return Number(a) + Number(b);
            break;

            case '-' : return Number(a) - Number(b);
            break;

            case '/' : return Number(a) / Number(b);
            break;

            case '*' : return Number(a) * Number(b);
            break;
        }
    } 
    let oper = ['*','/','-','+']

    function calcArray(arr){
        let calcArr = arr;
        for(let i = 1 ; i < calcArr.length ; i+= 2 ){
            if (calcArr[i] == '*' || calcArr[i] == '/'){
                let num = i;
                let res = calc(calcArr[num-1],calcArr[num+1],calcArr[num]);
                calcArr.splice(num-1,3,res);
                calcArray(calcArr);
                
            } else if (!calcArr.includes('*') && !calcArr.includes('/')){
                let num = i;
                let res = calc(calcArr[num-1],calcArr[num+1],calcArr[num]);
                calcArr.splice(num-1,3,res);
                calcArray(calcArr);
            }
        }
        
        return calcArr.join('');
    }

    let result = 0;
    function calcExpr(expr){
        let arr = expr;
        if(arr.includes('(')){ 
            let start = arr.lastIndexOf('(');
            let end = arr.indexOf(')', start);
            let slice = expr.slice(start+1, end);
            let len = slice.length
            let arrCalc = calcArray(slice);
            arr.splice(start,len + 2,arrCalc);
            calcExpr(arr);
        } else {
            result = calcArray(arr);
        }

    }

    calcExpr(exprArr);

    
    return Number(result);
}

module.exports = {
    expressionCalculator
}