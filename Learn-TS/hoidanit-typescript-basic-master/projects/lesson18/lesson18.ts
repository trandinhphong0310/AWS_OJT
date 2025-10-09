// union type : join nhieu type lai voi nhau
const addNumberOrString = (a: number | string, b: number | string) => {
    if(typeof a === "number" && typeof b === "string")
        return "true 1"
    else if(typeof a === "boolean" && typeof b === "object")
        return "true 2"
    else
        return false
}

console.log(addNumberOrString(12, "ss"))