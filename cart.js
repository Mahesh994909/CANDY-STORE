document.addEventListener("DOMContentLoaded", function () { 
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count"); 
    const checkoutBtn = document.getElementById("checkout-btn"); 

    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    const candies = [
        { id: 1, name: "Chocolate Bar", price: 150.0 },
        { id: 2, name: "Gummy Bears", price: 30.0 },
        { id: 3, name: "Lollipops", price: 15.0 },
        { id: 4, name: "Candy Canes", price: 40.0 },
        { id: 5, name: "Jelly Beans", price: 35.0 },
        { id: 6, name: "Marshmallows", price: 28.0 },
        { id: 7, name: "Caramel Chews", price: 22.0 },
        { id: 8, name: "Licorice", price: 27.0 },
        { id: 9, name: "Fruit Gummies", price: 30.0 },
        { id: 10, name: "Mint Candy", price: 100.0 },
        { id: 11, name: "Toffee", price: 29.0 },
        { id: 12, name: "Peanut Brittle", price: 60.0 },
        { id: 13, name: "Bubble Gum", price: 15.0 },
        { id: 14, name: "Rock Candy", price: 25.3 },
        { id: 15, name: "Sour Belts", price: 30.1 },
        { id: 16, name: "Chocolate Truffles", price: 50.0 },
        { id: 17, name: "Cotton Candy", price: 40.0 },
        { id: 18, name: "Hard Candy", price: 21.5 },
        { id: 19, name: "Caramel Popcorn", price: 40.5 },
        { id: 20, name: "Nougat", price: 30.8 },
    ];

    function displayCart() {
        cartItems.innerHTML = "";
        let total = 0;
        let totalItems = 0;

        for (const id in cart) {
            const candy = candies.find((c) => c.id == id);
            if (candy) {
                total += candy.price * cart[id];
                totalItems += cart[id];

                const listItem = document.createElement("li");
                listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
                listItem.innerHTML = `
                    <div>
                        <strong>${candy.name}</strong> (x${cart[id]}) - ₹${(candy.price * cart[id]).toFixed(2)}
                    </div>
                    <div>
                        <button class="btn btn-sm btn-secondary" onclick="decrementCart(${id})">-</button>
                        <span class="mx-2">${cart[id]}</span>
                        <button class="btn btn-sm btn-primary" onclick="incrementCart(${id})">+</button>
                        <button class="btn btn-sm btn-danger ms-2" onclick="removeFromCart(${id})">Remove</button>
                    </div>
                `;
                cartItems.appendChild(listItem);
            }
        }

        cartTotal.textContent = `₹${total.toFixed(2)}`;
        cartCount.textContent = totalItems; 
    }

    window.incrementCart = function (id) {
        if (cart[id]) {
            cart[id]++;
        } else {
            cart[id] = 1;
        }
        updateCart();
    };

    window.decrementCart = function (id) {
        if (cart[id] > 1) {
            cart[id]--;
        } else {
            delete cart[id];
        }
        updateCart();
    };

    window.removeFromCart = function (id) {
        delete cart[id];
        updateCart();
    };

    window.clearCart = function () {
        localStorage.removeItem("cart");
        cart = {};
        updateCart();
    };

    window.checkout = function () {
        if (Object.keys(cart).length === 0) {
            alert("Your cart is empty!");
            return;
        }

        
        localStorage.setItem("cart", JSON.stringify(cart));

        
        window.location.href = "./payment/payment.html";
    };

    function updateCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    }

   
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", checkout);
    }

    displayCart();
});
