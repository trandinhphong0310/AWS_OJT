

const myFunction = (name, callback) => {
    console.log(name)
    callback()
}

const hello = () => {
    console.log("hi")
}

myFunction("jack", hello)