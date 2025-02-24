document.addEventListener("DOMContentLoaded", function () {
  const candyList = document.getElementById("candy-list");
  const cartCount = document.getElementById("cart-count");
  const searchBar = document.getElementById("searchBar");

  let cart = JSON.parse(localStorage.getItem("cart")) || {};

  const candies = [
    { id: 1, name: "Chocolate Bar", price: 150.0, image: "images/img1.jpg" },
    { id: 2, name: "Gummy Bears", price: 30.0, image: "images/img2.webp" },
    { id: 3, name: "Lollipops", price: 15.0, image: "images/img3.jpg" },
    { id: 4, name: "Candy Canes", price: 40.0, image: "images/img4.webp" },
    { id: 5, name: "Jelly Beans", price: 35.0, image: "images/img5.jpg" },
  ];

  function displayCandies(candiesToDisplay) {
    candyList.innerHTML = "";
    candiesToDisplay.forEach((candy) => {
      const candyCard = document.createElement("div");
      candyCard.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3", "mb-4");
      candyCard.innerHTML = `
        <div class="card candy-card h-100" data-id="${candy.id}">
          <img src="${candy.image}" class="card-img-top" alt="${candy.name}" style="height: 200px; object-fit: cover;">
          <div class="card-body text-center d-flex flex-column">
            <h5 class="card-title">${candy.name}</h5>
            <p class="card-text">₹${candy.price.toFixed(2)}</p>
            <div id="cart-controls-${candy.id}" class="mt-auto">
              ${cart[candy.id] ? quantityControls(candy.id) : `<button class="btn btn-primary w-100" onclick="addToCart(${candy.id})">Add to Cart</button>`}
            </div>
          </div>
        </div>
      `;

      candyList.appendChild(candyCard);
    });
  }

  function quantityControls(id) {
    return `
      <div class="d-flex justify-content-center align-items-center">
        <button class="btn btn-sm btn-danger me-2" onclick="decreaseQuantity(${id})">-</button>
        <span id="quantity-${id}" class="mx-2">${cart[id]}</span>
        <button class="btn btn-sm btn-success ms-2" onclick="increaseQuantity(${id})">+</button>
      </div>
    `;
  }

  window.addToCart = function (id) {
    cart[id] = (cart[id] || 0) + 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
    displayCandies(candies);
  };

  window.increaseQuantity = function (id) {
    cart[id] = (cart[id] || 0) + 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
    displayCandies(candies);
  };

  window.decreaseQuantity = function (id) {
    if (cart[id] > 1) {
      cart[id]--;
    } else {
      delete cart[id];
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
    displayCandies(candies);
  };

  function updateCart() {
    const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
    cartCount.textContent = totalItems;
  }

  searchBar.addEventListener("input", function () {
    const searchText = searchBar.value.toLowerCase().trim();
    const filteredCandies = candies.filter(candy =>
      candy.name.toLowerCase().includes(searchText)
    );
    displayCandies(filteredCandies);
  });

  displayCandies(candies);
  updateCart();
});
