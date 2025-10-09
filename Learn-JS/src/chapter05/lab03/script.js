
const products = [
    {
        name: "ao",
        price: 100,
        inStock: true
    },
    {
        name: "quan",
        price: 120,
        inStock: false
    },
    {
        name: "dep",
        price: 140,
        inStock: true
    },
    {
        name: "giay",
        price: 100,
        inStock: true
    },
    {
        name: "non",
        price: 110,
        inStock: false
    },
]

console.log(products)

const products2 = products.map(
    pro => pro.name === "quan" ? { ...pro, price: 150 } : pro
)

console.log(products2)

products.push({
    name: "kinh",
    price: 180,
    inStock: false
})
console.log(products)

products.pop({
    name: "kinh",
    price: 180,
    inStock: false
})
console.log(products)

products.forEach((item, index) => {
    console.log(item.name)
})

const productsMap = products.map((item, index) => {
    return item.price
})

console.log(productsMap)

const productsFilter = products.filter(item => item.inStock === true)
console.log(productsFilter)

for(let product of products) {
    console.log(Object.values(product))
}