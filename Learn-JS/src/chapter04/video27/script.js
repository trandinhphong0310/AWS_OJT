
const score = 5

switch(true) {
    case (score >= 8 && score <= 10):
        console.log("excellent");
        break;
    case (score === 5):
        console.log("average")
        break
    case (score <= 4):
        console.log("Weak")
        break
    default:
        console.log("Null")
}