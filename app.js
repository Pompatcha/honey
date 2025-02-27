// Initialize EmailJS
emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS User ID

// Add event listener to form submission
document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const templateParams = {
        fullName: formData.get("full-name"),
        email: formData.get("email"),
        message: formData.get("message")
    };

    // Send the email using EmailJS
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
        .then(function (response) {
            alert("Message sent successfully!");
            form.reset(); // Reset form
        }, function (error) {
            alert("Failed to send message. Try again later.");
            console.error("Error sending email:", error);
        });
});
