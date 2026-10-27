/* =========================================
   1. MOBILE NAVIGATION
   ========================================= */

// Get the mobile menu elements
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link");

// Open or close the mobile menu when the button is clicked
menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");

    // Update the button's appearance
    menuToggle.classList.toggle("open", isOpen);

    // Tell screen readers whether the menu is open
    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

// Close the mobile menu when a navigation link is clicked
navItems.forEach(function (link) {
    link.addEventListener("click", function () {
        closeMobileMenu();
    });
});

// Close the menu using the Escape key
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeMobileMenu();
    }
});

// Reusable function for closing the mobile menu
function closeMobileMenu() {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
}

// Close the menu if the user switches back to desktop width
window.addEventListener("resize", function () {
    if (window.innerWidth > 700) {
        closeMobileMenu();
    }
});


/* =========================================
   2. SCROLL ANIMATIONS
   ========================================= */

// Select all elements that should animate into view
const revealElements = document.querySelectorAll(".reveal");

// Check whether the browser supports IntersectionObserver
if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                // Animate the element when it enters the screen
                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    // Stop observing once the animation has happened
                    observer.unobserve(entry.target);
                }
            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });

} else {

    // Fallback for browsers without IntersectionObserver
    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });

}


/* =========================================
   3. SKILL PROGRESS BARS
   ========================================= */

// Find every skill progress bar
const skillBars = document.querySelectorAll(".skill-progress");

// Animate each progress bar when it becomes visible
if ("IntersectionObserver" in window) {

    const skillObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    const bar = entry.target;

                    // Read the percentage from the HTML data attribute
                    const targetWidth = bar.dataset.width;

                    // Animate the bar to its target width
                    bar.style.width = targetWidth;

                    // Stop observing this bar after animating
                    observer.unobserve(bar);
                }
            });

        },
        {
            threshold: 0.5
        }
    );

    skillBars.forEach(function (bar) {
        skillObserver.observe(bar);
    });

} else {

    // Display skill bars immediately if necessary
    skillBars.forEach(function (bar) {
        bar.style.width = bar.dataset.width;
    });

}


/* =========================================
   4. ACTIVE NAVIGATION LINK
   ========================================= */

// Highlight the navigation link for the current section
const pageSections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    const currentSection = entry.target.id;

                    navItems.forEach(function (link) {

                        const linkSection = link.getAttribute("href");

                        // Highlight the matching navigation link
                        link.classList.toggle(
                            "active",
                            linkSection === "#" + currentSection
                        );
                    });
                }
            });

        },
        {
            rootMargin: "-25% 0px -60% 0px"
        }
    );

    pageSections.forEach(function (section) {
        sectionObserver.observe(section);
    });

}


/* =========================================
   5. BACK TO TOP BUTTON
   ========================================= */

const backToTop = document.getElementById("back-to-top");

// Show the button after the user scrolls down
window.addEventListener("scroll", function () {

    if (window.scrollY > 400) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }

});

// Scroll smoothly to the top when clicked
backToTop.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================
   6. CONTACT FORM
   ========================================= */

// Get the contact form and its status message
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

// Change this to your actual email address
const portfolioEmail = "bibhuttishrestha@gmail.com";

contactForm.addEventListener("submit", function (event) {

    // Prevent the browser from submitting the form to a server
    event.preventDefault();

    // Check the form's built-in validation
    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    // Get the values entered by the visitor
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Make sure no required field is empty
    if (!name || !email || !subject || !message) {

        formStatus.textContent = "Please complete all the fields.";
        formStatus.className = "form-status error";

        return;
    }

    // Prepare the email content
    const emailSubject = encodeURIComponent(subject);

    const emailBody = encodeURIComponent(
        "Name: " + name + "\n" +
        "Email: " + email + "\n\n" +
        "Message:\n" + message
    );

    // Create an email link with the visitor's information
    const mailtoLink =
        "mailto:" + portfolioEmail +
        "?subject=" + emailSubject +
        "&body=" + emailBody;

    // Explain what will happen next
    formStatus.textContent =
        "Your email application should open with your message prepared. " +
        "Review it and press Send to deliver it.";

    formStatus.className = "form-status success";

    // Open the visitor's default email application
    window.location.href = mailtoLink;

});


/* =========================================
   7. AUTOMATIC COPYRIGHT YEAR
   ========================================= */

// Automatically update the year in the footer
document.getElementById("current-year").textContent =
    new Date().getFullYear();