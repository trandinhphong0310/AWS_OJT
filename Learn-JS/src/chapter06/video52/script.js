
const myBtn = document.getElementById("changeBtn")
const myBtn1 = document.getElementById("backBtn")

const myText = document.getElementById("text1")

console.log(myBtn, myText)


myBtn.addEventListener("click", () => {
    // innerText change the text
    myText.innerText = "click success"

    // innerHTML change the text and tag element
    myText.innerHTML = "<p><em>click success</em></p>"
    console.log(myText)
})

myBtn1.addEventListener("click", () => {
    myText.innerText = "back success"
})

