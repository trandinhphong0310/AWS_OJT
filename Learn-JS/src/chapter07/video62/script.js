console.log("1. Start")// chay lan dau


const myPromise = new Promise((resolve, reject) => {
    console.log("2. Start now") // promise chay ngay lap tuc

    setTimeout(() => {
        resolve("4. setTimeout running") // in ra sau khi chay 2 giay
    }, 2000)
})

myPromise.then((message) => {
    console.log(message)
})

console.log("3. End running") // cai nay in ra o vi tri thu 3

// output :
// 1. Start
// 2. Start now
// 3. End running
// 4. setTimeout running