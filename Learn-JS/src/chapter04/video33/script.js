
// global scope: 
let globalVar = 10

function greeting() {
    globalVar = 20
    console.log(globalVar)
}

greeting()

//function scope:

function greeting1() {
    let test1 = 10
    console.log(test1)
    test1 = 20
    console.log(test1)
}

