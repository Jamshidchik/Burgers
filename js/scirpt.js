const product = {
    crazy: {
        name: "Crazy",
        price: 31000,
        amount: 0,
        img: "images/burger_1.png",
        get Summ() {
            return this.price * this.amount
        }

    },
    light: {
        name: "Light",
        price: 26000,
        amount: 0,
        img: "images/burger_2.png",
        get Summ() {
            return this.price * this.amount
        }

    },
    cheeseburger: {
        name: "Cheeseburger",
        price: 29000,
        amount: 0,
        img: "images/burger_3.png",
        get Summ() {
            return this.price * this.amount
        }

    },
    dburger: {
        name: "Dburger",
        price: 24000,
        amount: 0,
        img: "images/burger_4.png",
        get Summ() {
            return this.price * this.amount
        }

    },
}

const btns = document.querySelectorAll('.card__shop')
btns.forEach(btn => {
    btn.addEventListener("click", function () {
        addCard(btn)
    })
});

function addCard(btn) {
    const parent = btn.closest(".card"),
        cardId = parent.getAttribute("id")
    product[cardId].amount++
    basketInfo()

}
const basketBox = document.querySelector('.basket__box'),
    shopItem = document.querySelector('.shop__item');
    basketTotal = document.querySelector('.basket__total');

function basketInfo() {
    const productArr = []
    for (const key in product) {
        const pk = product[key],
            productCard = document.querySelector(`#${key}`);
        const cardItem = productCard.querySelector(".card__item")
        if (pk.amount) {
           
            cardItem.classList.add("active")
            cardItem.innerHTML = pk.amount
            productArr.push(pk)
        } else {
            cardItem.classList.remove("active")
        }
    }
    basketBox.innerHTML = ""
    productArr.forEach((card, i) => {
        basketBox.innerHTML += basketCard(card)
        shopItem.innerHTML = productArr.length
    })
    basketTotal.innerHTML = totalSumm()
    const allAmount = totalAmount()
    if (allAmount) {
        shopItem.classList.add("active")
    } else {
        shopItem.classList.remove("active")
    }
    
}
function totalAmount() {
    let amount = 0
    for (const key in product) {
        amount += product[key].amount
    }
    return amount 
} function totalSumm() {
    let total = 0
    for (const key in product) {
        total += product[key].Summ
    }
    return total
}

function basketCard(card) {
    const {
        name,
        price,
        Summ,
        img,
        amount
    } = card
    return `  
                   <div class="basket__card">
                    <img src="${img}" alt="" 
                    class="basket__img">
                    <div class="basket__info">
                        <h2 class="basket__title">${name}</h2>
                        <p class="basket__price">${Summ}</p>
                    </div>
                    <div class="basket__btns" id="${name.toLowerCase()}_card">
                      <button class="basket__sym">-</button>
                      <p class="basket__amount">${amount}</p>
                      <button class="basket__sym">+</button>
                    </div>
                   </div>
                `
}

window.addEventListener("click", (e) => {
    const btn = e.target
    if (btn.classList.contains("basket__sym")) {
        const parent = btn.closest(".basket__btns"),
            parentId = parent.getAttribute("id").split("_")[0]
        if (btn.innerHTML == "+") product[parentId].amount++
        else if (btn.innerHTML == "-") product[parentId].amount--
        basketInfo()
    }
})







const banerBg = document.querySelector('.header__img');
const Burgers = document.querySelectorAll('.card__img');

Burgers.forEach(item => {
    item.addEventListener('click', function () {
        banerBg.src = item.src
    })
})





const shop = document.querySelector('.shop'),
    basket = document.querySelector('.basket'),
    closeBasket = document.querySelector('.basket__close');

shop.addEventListener("click", () => {
    basket.classList.add("active")
})
closeBasket.addEventListener("click", () => {
    basket.classList.remove("active")
})



const basketBtn = document.querySelector('.basket__bottom'),
    printMain = document.querySelector('.print__main'),
    printTotal = document.querySelector('.print__total');
basketBtn.onclick = () => {
    for (const key in product) {
        const {amount, name, Summ, img } = product[key]
        if (amount) {
            printMain.innerHTML += ` <div class="print__main-item">
        <img class="basket__img" src="${img}" alt="">
        <p class="print__main-name">
            <span>${name}</span>
            <span>${name}</span>
        </p>
        <div class="print__total">
            ${Summ} so'm
        </div>
    </div>
      
      
      
      `
            
        }
    }
    printTotal.innerHTML = `Jami: ${totalSumm()}`
    window.print()
}