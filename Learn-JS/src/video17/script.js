

 
function test() {
    let a = 10
    a = 20

    {
        let b
        b = 20
    }
    console.log(b)

    console.log(a)
}

test()
