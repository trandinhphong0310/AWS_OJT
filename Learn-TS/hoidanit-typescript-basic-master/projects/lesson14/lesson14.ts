enum API_STATUS {
    PENDING = "pending",
    FULFILLED = "fulfilled",
    REJECTED = "rejected"
}
// neu la khai bao string thi phai gan gia tri cho no

enum API_STATUS {
    PENDING1 = 1,
    FULFILLED1 = 2,
    REJECTED1 
}

// neu la khai bao number thi gia tri se tu tang neu k gan

let a1 = API_STATUS.PENDING
let a2 = API_STATUS.FULFILLED
let b1 = API_STATUS.PENDING1
let b2 = API_STATUS.REJECTED1

console.log(a1, a2, b1, b2)