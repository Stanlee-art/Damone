document.addEventListener("DOMContentLoaded", function () {
    // 🌙 Dark Mode Toggle
    const darkModeToggle = document.getElementById("darkModeToggle");
    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
            localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
        });
    }

    // Apply stored theme on page load
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }

    // 🍽 Food Category Selection and Scrolling
    const foodHeader = document.getElementById("foodHeading");
    if (foodHeader) {
        foodHeader.style.cursor = "pointer"; // Make it look clickable

        foodHeader.addEventListener("click", function () {
            const existingPopup = document.getElementById("selectionPopup");
            if (existingPopup) {
                existingPopup.remove();
            }

            const selectionBox = document.createElement("div");
            selectionBox.id = "selectionPopup";
            selectionBox.innerHTML = `
                <div style="
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: #fff;
                    padding: 15px;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
                    border-radius: 8px;
                    text-align: center;
                    z-index: 1000;
                ">
                    <p><b>Choose a category:</b></p>
                    <button class="category-btn" data-target="appetizersSection">Appetizers</button>
                    <button class="category-btn" data-target="mainCourseSection">Main Course</button>
                    <button class="category-btn" data-target="dessertsSection">Desserts</button>
                    <button id="closePopup" style="display: block; margin-top: 10px; background: red; color: white; padding: 5px 10px; border: none; border-radius: 5px; cursor: pointer;">Cancel</button>
                </div>
            `;
            document.body.appendChild(selectionBox);

            document.querySelectorAll(".category-btn").forEach(button => {
                button.addEventListener("click", function () {
                    const targetId = this.getAttribute("data-target");
                    const targetSection = document.getElementById(targetId);
                    if (targetSection) {
                        targetSection.classList.remove("hidden");
                        setTimeout(() => {
                            targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
                        }, 100);
                        selectionBox.remove();
                    }
                });
            });

            document.getElementById("closePopup").addEventListener("click", function () {
                selectionBox.remove();
            });
        });
    }
   // 🌍 Language Selection - Dynamic Text Update
   const translations = {
    en: {
        food: "Food",
        appetizers: "Appetizers",
        mainCourse: "Main Course",
        desserts: "Desserts",
        beverages: "Beverages",
        orderNow: "Order Now",
        catering: "Catering",
        contact: "Contact",
    },
    fr: {
        food: "Nourriture",
        appetizers: "Entrées",
        mainCourse: "Plat Principal",
        desserts: "Desserts",
        beverages: "Boissons",
        orderNow: "Commander",
        catering: "Service Traiteur",
        contact: "Contact",
    },
    sw: {
        food: "Chakula",
        appetizers: "Vyakula vya Mwanzo",
        mainCourse: "Mlo Mkuu",
        desserts: "Kitindamlo",
        beverages: "Vinywaji",
        orderNow: "Agiza Sasa",
        catering: "Upishi",
        contact: "Wasiliana",
    }
};

function updateLanguage(lang) {
    document.getElementById("foodHeading").textContent = translations[lang].food;
    document.getElementById("appetizersHeading").textContent = translations[lang].appetizers;
    document.getElementById("mainCourseHeading").textContent = translations[lang].mainCourse;
    document.getElementById("dessertsHeading").textContent = translations[lang].desserts;
    document.getElementById("beveragesHeading").textContent = translations[lang].beverages;
    document.getElementById("orderNowButton").textContent = translations[lang].orderNow;
    document.getElementById("cateringHeading").textContent = translations[lang].catering;
    document.getElementById("contactHeading").textContent = translations[lang].contact;
}
const languageSelect = document.getElementById("languageSelect");
if (languageSelect) {
    languageSelect.addEventListener("change", function () {
        let selectedLang = this.value;
        updateLanguage(selectedLang);
        showNotification(`Language changed to ${this.options[this.selectedIndex].text}`);
    });
}

// 🔔 Show notification
function showNotification(message) {
    const notification = document.getElementById("notificationBox");
    if (notification) {
        notification.innerText = message;
        notification.classList.add("show");

        setTimeout(() => {
            notification.classList.remove("show");
        }, 3000);
    }
}

// 💬 Comment Submission
const commentBox = document.getElementById('commentBox');
const commentsList = document.getElementById('commentsList');
if (commentBox && commentsList) {
    commentBox.addEventListener('keypress', function (event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            submitComment();
        }
    });

    function submitComment() {
        const commentText = commentBox.value.trim();
        if (commentText !== '') {
            const newComment = document.createElement('p');
            newComment.textContent = commentText;
            commentsList.appendChild(newComment);
            commentBox.value = '';
        }
    }

    const submitButton = document.querySelector(".comment-section button");
    if (submitButton) {
        submitButton.addEventListener("click", submitComment);
    }
}

    // ⭐ Star Rating System
    document.querySelectorAll(".rating span").forEach(star => {
        star.addEventListener("click", function () {
            let rating = this.getAttribute("data-value");
            let ratingContainer = this.parentElement;
            let itemId = ratingContainer.getAttribute("data-item-id");

            // Store rating in localStorage
            localStorage.setItem(`rating-${itemId}`, rating);

            // Update UI
            updateRatingUI(ratingContainer, rating);

            // ✅ Check if a rating was given, then show the submission popup
            hasRated = true;
            showRatingPopup();
        });
    });

    // Function to update star colors based on rating
    function updateRatingUI(container, rating) {
        let stars = container.querySelectorAll("span");
        stars.forEach(star => {
            star.style.color = (star.getAttribute("data-value") <= rating) ? "#ffcc00" : "#ccc";
        });
        container.classList.add("selected");
    }

    // Load saved ratings on page load
    document.querySelectorAll(".rating").forEach(container => {
        let itemId = container.getAttribute("data-item-id");
        let savedRating = localStorage.getItem(`rating-${itemId}`);
        if (savedRating) {
            updateRatingUI(container, savedRating);
        }
    });

    // 🎯 Rating Submission Popup System (✅ CORRECTLY PLACED HERE)
    const ratingPopup = document.getElementById("ratingPopup");
    const submitRatingsBtn = document.getElementById("submitRatings");
    const closePopupBtn = document.getElementById("closePopup");
    let hasRated = false;

    function showRatingPopup() {
        if (hasRated) {
            ratingPopup.classList.add("show-popup");
        }
    }

    closePopupBtn.addEventListener("click", function () {
        ratingPopup.classList.remove("show-popup");
    });

    submitRatingsBtn.addEventListener("click", function () {
        alert("Thank you for your feedback!");
        ratingPopup.classList.remove("show-popup");
        hasRated = false;
    });

   // 📌 *Navigation Buttons - Show Sections Dynamically*
document.querySelectorAll(".nav-btn").forEach(button => {
    button.addEventListener("click", function() {
        const sectionId = this.getAttribute("data-section");

        document.querySelectorAll("main section").forEach(section => {
            section.classList.add("hidden");
        });

        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.remove("hidden");
            targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active-btn"));
        this.classList.add("active-btn");
    });
});

// 📍 *Smooth Scrolling & Header Highlighting*
const headers = document.querySelectorAll(".menu-category h1, .menu-category h2, #order h2, #catering h2, #contact h2");
headers.forEach(header => {
    header.addEventListener("click", function () {
        const targetId = this.id.replace("Heading", "");
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
            headers.forEach(h => h.classList.remove("active-header"));
            this.classList.add("active-header");
        }
    });
 // 🍔 Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector("nav");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("show");
    });
}   
});
})