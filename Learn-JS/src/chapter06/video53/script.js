
const myBtn = document.getElementById("changeBtn")
const myBtn1 = document.getElementById("backBtn")

const myText = document.getElementById("text1")

myBtn.addEventListener("click", () => {
    console.log("click me")
    myText.style.color = "red";
    myText.style.backgroundColor = "#ccc";
    myText.classList.add("text2", "text3")
})

myBtn1.addEventListener("click", () => {
    console.log("click me")
    myText.style.color = "green";
    myText.style.backgroundColor = "#333";
    myText.classList.remove("text2", "text3")
})