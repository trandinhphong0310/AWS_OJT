

const names = ["coder", "developer", "trader", "player", "tinder"]

console.log(names, names.length)

//for
for(let i = 0; i < names.length; i++) {
    console.log("i: ",i, names[i])
}

//forEach
names.forEach((value, index) => {
    console.log(value, index)
})