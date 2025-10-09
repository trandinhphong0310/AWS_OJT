

const fetchData = async () => {
    const res = await fetch("http://localhost:8000/users") 
    const data = await res.json()
    console.log(data) 
}

fetchData()
// await giúp code thực hiện từ trên xuống và chờ cho dòng nó resolved thì nó mới chạy tiếp
// nếu k có await thì nó sẽ trả về 1 promise, mà promise là 1 bất đồng bộ nên sẽ trả dữ liệu sau khi parse Json