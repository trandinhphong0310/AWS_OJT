const cards = document.querySelectorAll(".cards")
const annually = document.querySelector(".annually")
const monthly = document.querySelector(".monthly")
const price1 = document.querySelector(".price1")
const price2 = document.querySelector(".price2")
const price3 = document.querySelector(".price3")

cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove("active"))
        card.classList.add("active")
    })
});

annually.addEventListener('click', () => {
    price1.innerHTML = "&dollar;199.99"
    price2.innerHTML = "&dollar;249.99"
    price3.innerHTML = "&dollar;399.99"
})

monthly.addEventListener('click', () => {
    price1.innerHTML = "&dollar;19.99"
    price2.innerHTML = "&dollar;24.99"
    price3.innerHTML = "&dollar;39.99"
})