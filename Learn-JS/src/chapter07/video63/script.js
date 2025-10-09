

// fetch => data raw (response)
const response = fetch("http://localhost:8000/users")

response
    .then(res => res.json()) // json convert data raw => object
    .then(data => console.log(data)) // get data


const getData = async () => {
    try {
        const response = await fetch("http://localhost:8000/users")
        const data = await response.json()
        return data
    } catch (err) {
        console.log(err)
    }
}

getData()
    .then(data => console.log(data))