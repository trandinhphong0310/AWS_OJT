

const names = ["coder", "developer", "trader", "player", "tinder"]

// map ko lam thay doi gia tri mang ban dau
const namesMap = names.map((name, index) => {
    return `${name} + 2`
})

console.log(names) // output : ["coder", "developer", "trader", "player", "tinder"]
console.log(namesMap) // output: ['coder + 2', 'developer + 2', 'trader + 2', 'player + 2', 'tinder + 2']
