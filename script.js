document.addEventListener("DOMContentLoaded", function () {
  const candyList = document.getElementById("candy-list");
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const searchBar = document.getElementById("searchBar");

  let cart = [];
  
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
    { id: 20, name: "Nougat", price: 30.8, image: "images/img20.webp" }
  ];

  // Function to display candies
  function displayCandies(candiesToDisplay) {
    candyList.innerHTML = "";
    candiesToDisplay.forEach((candy) => {
      const candyCard = document.createElement("div");
      candyCard.classList.add("col-md-3", "mb-4");
      candyCard.innerHTML = `
        <div class="card">
          <img src="${candy.image}" class="card-img-top" alt="${candy.name}" style="width: 100%; height: 200px; object-fit: cover;">
          <div class="card-body text-center">
            <h5 class="card-title">${candy.name}</h5>
            <p class="card-text">$${candy.price.toFixed(2)}</p>
            <button class="btn btn-primary" onclick="addToCart(${candy.id})">Add to Cart</button>
          </div>
        </div>
      `;
      candyList.appendChild(candyCard);
    });
  }

  // Function to filter candies based on search input
  searchBar.addEventListener("input", function () {
    const searchTerm = searchBar.value.toLowerCase();
    const filteredCandies = candies.filter((candy) => candy.name.toLowerCase().includes(searchTerm));
    displayCandies(filteredCandies); // Display filtered candies
  });

  // Function to add candy to cart
  window.addToCart = function (id) {
    const candy = candies.find((item) => item.id === id);
    if (candy) {
      cart.push(candy);
      updateCart();
    }
  };

  // Function to update cart display
  function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price;
      const listItem = document.createElement("li");
      listItem.classList.add("list-group-item");
      listItem.innerHTML = `
        ${item.name} - $${item.price.toFixed(2)}
        <button class="btn btn-sm btn-danger float-end" onclick="removeFromCart(${index})">Remove</button>
      `;
      cartItems.appendChild(listItem);
    });

    cartCount.textContent = cart.length;
  }

  // Function to remove item from cart
  window.removeFromCart = function (index) {
    cart.splice(index, 1);
    updateCart();
  };

  // Function to checkout
  window.checkout = function () {
    if (cart.length === 0) {
      alert("Your cart is empty!");
    } else {
      alert("Thank you for your purchase!");
      cart = [];
      updateCart();
    }
  };

  // Display candies on page load
  displayCandies(candies);
});

