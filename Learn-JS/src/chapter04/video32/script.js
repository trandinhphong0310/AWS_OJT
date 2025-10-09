


const greeting = (a, b) => {
    if(typeof a !== 'number') {
        return false
    }
    return a + b
}

console.log(greeting("aaa", 10))