const getBlogs = async () => {
    try {
        const res = await fetch("http://localhost:8000/blogs")
        const data = await res.json()
        return data
    } catch (err) {
        console.log(err)
    }
}

const generateBlogsTable = async () => {
    const blogs = await getBlogs()
    const tableBlog = document.querySelector("#blogs tbody")

    tableBlog.innerHTML = ""

    blogs.forEach((item) => {
        tableBlog.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.title}</td>
                <td>${item.author}</td>
                <td>${item.content}</td>
                <td data-id="${item.id}" class="deleteBtn">Delete</td>
            </tr>
        `
    });
}

generateBlogsTable().then(() => {deleteBlogs()})

const addNewRow = (item) => {
    const tableBody = document.querySelector("#blogs tbody")

    const newRow = document.createElement("tr")

    newRow.innerHTML += `
        <tr>
            <td>${item.id}</td>
            <td>${item.title}</td>
            <td>${item.author}</td>
            <td>${item.content}</td>
            <td data-id="${item.id}" class="deleteBtn">Delete</td>
        </tr>
    `

    tableBody.appendChild(newRow)
}

const postBlogTable = async () => {
    const title = document.getElementById("title")
    const author = document.getElementById("author")
    const content = document.getElementById("content")

    const blogBtn = document.getElementById("submitBtn")
    blogBtn.addEventListener('click', async () => {
        try {
            const res = await fetch("http://localhost:8000/blogs", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title.value,
                    author: author.value,
                    content: content.value
                })
            })
            const data = await res.json()
            addNewRow(data)
        } catch (err) {
            console.log(err)
        }
    })
}

postBlogTable()


const deleteBlogsApi = async (id) => {
    try {
        const res = await fetch(`http://localhost:8000/blogs/${id}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        })
        const data = res.json()
        return data
    } catch (err) {
        console.log(err)
    }
}


const deleteBlogs = () => {
    const deleteBtn = document.querySelectorAll(".deleteBtn")
    deleteBtn.forEach(function (button) {
        button.addEventListener('click', () => {
            const id = button.getAttribute("data-id")
            deleteBlogsApi(id)

            //delete row in html
            const row = button.closest("tr")
            row.remove()
        })
    })
}

deleteBlogs()
