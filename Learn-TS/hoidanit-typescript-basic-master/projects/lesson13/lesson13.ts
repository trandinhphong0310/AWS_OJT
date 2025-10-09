let skills : (string | number)[] = ["rec", "ppp", 25]
skills.push("eeee")
skills.push(24)

//tuple: dataType/size/order
let skills2 : [string, number] = ["23232", 222] 
// tuple la khai bao truc tiep types cho value
// let skills2 : [string, number] = ["23232", 222, true] // false
// let skills2 : [string, number] = ["23232", "string"] // false


// optional tuple: co hay ko cung dc
let skills3 : [number, boolean, string?] = [24, true]