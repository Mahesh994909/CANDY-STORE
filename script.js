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
    { id: 6, name: "Marshmallows", price: 28.0, image: "images/img6.jpg" },
    { id: 7, name: "Caramel Chews", price: 22.0, image: "images/img7.jpg" },
    { id: 8, name: "Licorice", price: 27.0, image: "images/img8.jpg" },
    { id: 9, name: "Fruit Gummies", price: 30.0, image: "images/img9.webp" },
    { id: 10, name: "Mint Candy", price: 100.0, image: "images/img10.jpg" },
    { id: 11, name: "Toffee", price: 29.0, image: "images/img11.jpg" },
    { id: 12, name: "Peanut Brittle", price: 60.0, image: "images/img12.jpg" },
    { id: 13, name: "Bubble Gum", price: 15.0, image: "images/img13.jpg" },
    { id: 14, name: "Rock Candy", price: 25.3, image: "images/img14.jpg" },
    { id: 15, name: "Sour Belts", price: 30.1, image: "images/img15.jpg" },
    { id: 16, name: "Chocolate Truffles", price: 50.0, image: "images/img16.jpg" },
    { id: 17, name: "Cotton Candy", price: 40.0, image: "images/img17.webp" },
    { id: 18, name: "Hard Candy", price: 21.5, image: "images/img18.png" },
    { id: 19, name: "Caramel Popcorn", price: 40.5, image: "images/img19.webp" },
    { id: 20, name: "Nougat", price: 30.8, image: "images/img20.webp" },
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
