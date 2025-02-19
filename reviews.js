document.addEventListener("DOMContentLoaded", function () {
    const reviewList = document.getElementById("review-list");
    const submitReviewBtn = document.getElementById("submit-review-btn");
    const reviewerNameInput = document.getElementById("reviewer-name");
    const reviewTextInput = document.getElementById("review-text");
    const reviewRatingInput = document.getElementById("review-rating");

    
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    function displayReviews() {
        reviewList.innerHTML = ""; 
        if (reviews.length === 0) {
            reviewList.innerHTML = "<p class='text-center'>No reviews yet. Be the first to review!</p>";
        } else {
            reviews.forEach((review, index) => {
                const reviewCard = document.createElement("div");
                reviewCard.classList.add("col-md-4", "mb-4");
                reviewCard.innerHTML = `
                    <div class="card p-3 shadow-sm">
                        <h5>${review.name}</h5>
                        <p>${review.text}</p>
                        <p class="text-warning">${"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}</p>
                        <button class="btn btn-sm btn-danger" onclick="deleteReview(${index})">Delete</button>
                    </div>
                `;
                reviewList.appendChild(reviewCard);
            });
        }
    }

    function addReview() {
        const name = reviewerNameInput.value.trim();
        const text = reviewTextInput.value.trim();
        const rating = parseInt(reviewRatingInput.value);

        if (!name || !text) {
            alert("Please enter your name and review.");
            return;
        }

        const newReview = { name, text, rating };
        reviews.push(newReview);
        localStorage.setItem("reviews", JSON.stringify(reviews));

        reviewerNameInput.value = "";
        reviewTextInput.value = "";
        reviewRatingInput.value = "5"; 

        displayReviews();
    }

    window.deleteReview = function (index) {
        reviews.splice(index, 1);
        localStorage.setItem("reviews", JSON.stringify(reviews));
        displayReviews();
    };

    submitReviewBtn.addEventListener("click", addReview);

   
    displayReviews();
});
