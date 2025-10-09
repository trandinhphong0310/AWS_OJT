

const username = "hoidanit@gmail.com"
const password = "123456"

const usernameElement = document.getElementById("username")
const passwordElement = document.getElementById("password")

const handleClick = document.getElementById("loginBtn")

handleClick.addEventListener("click", (e) => {
    e.preventDefault()
    
    const loginUsername = usernameElement.value
    const loginPassword = passwordElement.value

    if (loginUsername === username && loginPassword === password) {
        alert("Login successfully")
        window.location.href = "loginSuccess.html"
    } else {
        alert("Login failed")
        usernameElement.style.borderColor = "red"
        passwordElement.style.borderColor = "red"
    }

})