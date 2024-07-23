const openShopping = document.querySelector(".open-shopping");
const closeShopping = document.querySelector(".close-shopping");
const list = document.querySelector(".list");
const listCard = document.querySelector(".listCard");
const total = document.querySelector(".total");
const body = document.querySelector("body");
const cartQuantity = document.querySelector(".cart-quantity");
const itemQuantity = document.querySelector(".item-quantity");
const logout = document.getElementById("logout")

logout.onclick = function(){
    window.location.href = "index.html"
}

openShopping.addEventListener("click", () => {
  body.classList.add("active");
});

closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});

let products = [
  { id: 1, name: "Product 1", image: "1.png", price: 150 },
  { id: 2, name: "Product 2", image: "1.png", price: 200 },
  { id: 3, name: "Product 3", image: "1.png", price: 180 },
  { id: 4, name: "Product 4", image: "1.png", price: 320 },
  { id: 5, name: "Product 5", image: "1.png", price: 275 },
  { id: 6, name: "Product 6", image: "1.png", price: 650 },
];

let listCards = [];

// Load cart data from local storage
const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    listCards = JSON.parse(storedCart);
    realseCard(); // Refresh the cart UI
  }
};

const saveCartToLocalStorage = () => {
  localStorage.setItem("cart", JSON.stringify(listCards));
};

const intApp = () => {
  products.forEach((value, key) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = `
        <img src="./images/${value.image}" alt="image">
        <div class="title">${value.name}</div>
        <div class="price">${value.price.toLocaleString()}</div>
        <button onclick="addToCart(${key})">Add to Cart</button>`;
    list.appendChild(newDiv);
  });
  loadCartFromLocalStorage();
};

const addToCart = (key) => {
  if (listCards[key] == null) {
    listCards[key] = { ...products[key] }; 
    listCards[key].quantity = 1;
  } else {
    listCards[key].quantity += 1;
  }
  saveCartToLocalStorage(); 
  realseCard();
};

const realseCard = () => {
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;

  listCards.forEach((value, key) => {
    if (value != null) {
      totalPrice += value.price * value.quantity;
      count += value.quantity;

      let newDiv = document.createElement("li");
      newDiv.innerHTML = `
            <div><img src="img/${value.image}" alt="image"></div>
            <div class="cardTitle">${value.name}</div>
            <div class="cardPrice">${value.price.toLocaleString()}</div>
            <div class="cardQuantity">Quantity: ${value.quantity}</div>
            <div>
                <button style="background-color:#2f2fff;" class="cardButton" onclick="changeQuantity(${key}, -1)">-</button>
                <button style="background-color:#2f2fff;" class="cardButton" onclick="changeQuantity(${key}, 1)">+</button>
            </div>
        `;
      listCard.appendChild(newDiv);
    }
  });
  total.textContent = totalPrice.toLocaleString();
  cartQuantity.textContent = count; 
  itemQuantity.textContent = count;
};

const changeQuantity = (key, amount) => {
  if (listCards[key] != null) {
    listCards[key].quantity += amount;
    if (listCards[key].quantity <= 0) {
      listCards[key] = null; 
    }
    saveCartToLocalStorage();
    realseCard();
  }
};
intApp();
