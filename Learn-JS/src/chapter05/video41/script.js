

const names = ["coder", "developer", "trader", "player", "tinder"]

// map ko lam thay doi gia tri mang ban dau
const namesFilter = names.filter((name, index) => {
    return name === "coder"
})

console.log(namesFilter) // output : ['coder']
