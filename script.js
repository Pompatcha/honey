document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.buy-now').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
  
            const productDiv = this.closest('.product');
            const productName = productDiv.querySelector('h3').textContent;
            const priceText = productDiv.querySelector('.product-price').textContent;
            const price = parseFloat(priceText.replace('$', '').trim());
  
            // ✅ Get quantity from select dropdown
            const quantitySelect = productDiv.querySelector('select');
            if (!quantitySelect) {
                console.error("Quantity dropdown not found for", productName);
                return;
            }
            const selectedQuantity = parseInt(quantitySelect.value, 10) || 1;
            console.log(`Selected quantity for ${productName}:`, selectedQuantity);
  
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
            let existingProduct = cart.find(item => item.name === productName);
            if (existingProduct) {
                // ✅ Add new quantity to existing quantity instead of replacing it
                existingProduct.quantity += selectedQuantity;
                existingProduct.totalPrice = (existingProduct.price * existingProduct.quantity).toFixed(2);
            } else {
                let product = {
                    name: productName,
                    price: price,
                    quantity: selectedQuantity,
                    totalPrice: (price * selectedQuantity).toFixed(2)
                };
                cart.push(product);
            }
  
            // ✅ Store updated cart in localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
  
            // ✅ Redirect to cart page
            window.location.href = 'shoppingcart.html';
        });
    });
  });
  