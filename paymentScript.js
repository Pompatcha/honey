document.addEventListener("DOMContentLoaded", function() {

  // Get the cart from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Get the cart table body and total price display
  const tableBody = document.querySelector('#cartTable tbody');
  const totalPriceElement = document.getElementById('totalPrice');

  // Function to calculate total cart price
  function calculateTotalPrice(cart) {
    return cart.reduce((total, item) => total + parseFloat(item.totalPrice), 0).toFixed(2);
  }

  // Function to render the cart table
  function renderCartTable(cart) {
    tableBody.innerHTML = ''; // Clear existing table rows

    if (cart.length === 0) {
      const emptyRow = document.createElement('tr');
      emptyRow.innerHTML = `<td colspan="5" style="text-align: center;">Your cart is empty</td>`;
      tableBody.appendChild(emptyRow);
      totalPriceElement.textContent = "0.00"; // Reset total price when cart is empty
    } else {
      cart.forEach((item, index) => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>$${parseFloat(item.price).toFixed(2)}</td>
          <td>$${item.totalPrice}</td>  
          <td><span class="remove-btn" data-index="${index}" style="cursor:pointer; color:red;">Remove</span></td> 
        `;
        tableBody.appendChild(newRow);
      });

      // Update total price display
      totalPriceElement.textContent = calculateTotalPrice(cart);
    }
  }

  // Initial render of the cart table
  renderCartTable(cart);

  // Add event listener for Remove buttons (event delegation)
  tableBody.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('remove-btn')) {
      // Get the index of the product to remove
      const index = e.target.getAttribute('data-index');

      // Remove the product from the cart array
      cart.splice(index, 1);

      // Update the cart in localStorage
      localStorage.setItem('cart', JSON.stringify(cart));

      // Re-render the cart table and update total price
      renderCartTable(cart);
    }
  });

});
