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
// 🍽 Food Category Selection and Scrolling (Fully Functional)
const foodHeader = document.getElementById("foodHeading");

if (foodHeader) {
    foodHeader.style.cursor = "pointer"; // Make it look clickable

    foodHeader.addEventListener("click", function () {
        // Remove existing popup if it's already open
        const existingPopup = document.getElementById("selectionPopup");
        if (existingPopup) {
            existingPopup.remove();
        }

        // Create a selection popup dynamically
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

        // Add event listeners to buttons
        document.querySelectorAll(".category-btn").forEach(button => {
            button.addEventListener("click", function () {
                const targetId = this.getAttribute("data-target");
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    // Ensure section is visible before scrolling
                    targetSection.classList.remove("hidden");

                    // *Ensure scrolling works across all browsers*
                    setTimeout(() => {
                        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 100); // Delay to allow visibility update

                    // Remove popup after selection
                    selectionBox.remove();
                }
            });
        });

        // Close button functionality
        document.getElementById("closePopup").addEventListener("click", function () {
            selectionBox.remove();
        });
    });
}

            let targetId = "";
            if (choice === "1") {
                targetId = "appetizersSection";
            } else if (choice === "2") {
                targetId = "mainCourseSection";
            } else if (choice === "3") {
                targetId = "dessertsSection";
            } else {
                alert("Invalid selection. Please enter 1, 2, or 3.");
                return;
            }

            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });

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

    // 📌 *Navigation Buttons - Show Sections Dynamically*
    document.querySelectorAll(".nav-btn").forEach(button => {
        button.addEventListener("click", function() {
            const sectionId = this.getAttribute("data-section");

            // Hide all sections first
            document.querySelectorAll("main section").forEach(section => {
                section.classList.add("hidden");
            });

            // Show only the selected section
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.remove("hidden");
                targetSection.scrollIntoView({ behavior: "smooth", block: "start" }); // Smooth Scroll
            }

            // Remove 'active' from all buttons
            document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active-btn"));
            this.classList.add("active-btn"); // Highlight active button
        });
    });

    // 📍 *Smooth Scrolling & Header Highlighting*
    const headers = document.querySelectorAll(".menu-category h1, .menu-category h2, #order h2, #catering h2, #contact h2");

    headers.forEach(header => {
        header.addEventListener("click", function () {
            const targetId = this.id.replace("Heading", ""); // Extract section ID
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth", block: "start" });

                // Remove active class from all headers
                headers.forEach(h => h.classList.remove("active-header"));

                // Add active class to clicked header
                this.classList.add("active-header");
            }
        });
    });