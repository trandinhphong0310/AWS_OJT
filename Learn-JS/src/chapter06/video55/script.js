const btn = document.getElementById("submitBtn")
const input = document.getElementById("name")

const prev = document.getElementById("previous")
const prevName = localStorage.getItem("localstorage1")
if (prevName) {
    prev.innerHTML = `<b>${prevName}</b>`
}

const current = document.getElementById("current")

btn.addEventListener("click", () => {
    localStorage.setItem("localstorage1", input.value)
    current.innerHTML = `<b>${input.value}</b>`
})