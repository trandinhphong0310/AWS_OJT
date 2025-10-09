const button = document.getElementById("btn")
const inputElement = document.getElementById("input")

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

if (button) {
    button.addEventListener('click', () => {

        const todo = {
            id: getRandomInt(1, 10000),
            name: inputElement.value
        }

        const currentTodoStr = localStorage.getItem("todo") // lấy ra todo hiện tại

        // check todo hiện tại đã có chưa
        if (currentTodoStr) {
            const currentTodo = JSON.parse(currentTodoStr) // convert từ string sang object

            currentTodo.push(todo)
            localStorage.setItem("todo", JSON.stringify(currentTodo)) // lưu todo mới vào
        } else {
            localStorage.setItem("todo", JSON.stringify([todo])) // convert từ object sang string
        }

        window.location.href = "video70.html"

    })
}


const generateTodoTable = () => {
    const todoListStr = localStorage.getItem("todo")
    if (todoListStr) {
        const todoList = JSON.parse(todoListStr)
        const tbody = document.querySelector("#users tbody")

        if (tbody && todoList && todoList.length) {
            todoList.forEach((item) => {
                tbody.innerHTML += `
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td><button class="delete-btn" data-id="${item.id}">Xóa</button></td>
        </tr>
        `
            });
        }
    }

}

generateTodoTable()

const deleteBtn = document.querySelectorAll(".delete-btn")
if (deleteBtn) {
    deleteBtn.forEach((button) => {
        button.addEventListener('click', () => {
            const id = parseInt(button.getAttribute("data-id"))
            deleteTodoTable(id)
        })
    })
}

const deleteTodoTable = (id) => {
    const todoListStr = localStorage.getItem("todo")
    if(todoListStr) {
        const todoList = JSON.parse(todoListStr)

        const newTodo = todoList.filter(todo => todo.id !== id)

        localStorage.setItem("todo", JSON.stringify(newTodo))
        window.location.reload()
    }
}
