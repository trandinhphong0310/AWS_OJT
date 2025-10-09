

const doSomething = () => {
    const a = 10, b = 1
    if (b === 0)
        throw new Error("thuc hien phep chia cho 0")
    return a / b
}

try {
    console.log(doSomething())
} catch (err) {
    console.log(err)
} finally {
    console.log("final")
}