document.addEventListener("DOMContentLoaded", function() {
    const countrySelect = document.getElementById("country");
    
    countrySelect.addEventListener("change", function() {
      const selectedCountry = this.value;
      console.log("Selected country:", selectedCountry);
      // Additional logic can go here...
    });
  });

function togglePaymentFields() {
    // Get the selected payment method
    var paymentMethod = document.getElementById("payment-method").value;

    // Hide all payment sections first
    document.getElementById("credit-card-form").classList.add("hidden");
    document.getElementById("cash-transfer-info").classList.add("hidden");
    document.getElementById("paypal-info").classList.add("hidden");

    // Show the selected payment section
    if (paymentMethod === "credit-card") {
        document.getElementById("credit-card-form").classList.remove("hidden");
    } else if (paymentMethod === "cash-transfer") {
        document.getElementById("cash-transfer-info").classList.remove("hidden");
    } else if (paymentMethod === "paypal") {
        document.getElementById("paypal-info").classList.remove("hidden");
    }
}

// Form validation on submit
document.getElementById("payment-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent actual submission

  alert("Payment details submitted successfully!");
});
