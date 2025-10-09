

const names = ["coder", "developer", "trader", "player", "tinder"]

console.log(names)

names[1] = "hacker"
console.log("After update: ", names)

names.pop()
console.log("Delete last element: ", names)

names.shift()
console.log("Delete first element: ", names)

names.splice(0, 1)
console.log("Delete index element: ", names)