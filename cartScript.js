document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const tableBody = document.querySelector("#cartTable tbody");
  const totalPriceElement = document.getElementById("totalPrice");

  function calculateTotalPrice(cart) {
    return cart.reduce((total, item) => total + parseFloat(item.totalPrice), 0).toFixed(2);
  }

  function renderCartTable(cart) {
    tableBody.innerHTML = "";

    if (cart.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center;">Your cart is empty</td></tr>`;
      totalPriceElement.textContent = "0.00";
    } else {
      cart.forEach((item, index) => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
          <td>${item.name}</td>
          <td>
            <button class="adjust-btn" data-index="${index}" data-action="decrement">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="adjust-btn" data-index="${index}" data-action="increment">+</button>
          </td>
          <td>$${parseFloat(item.price).toFixed(2)}</td>
          <td>$${parseFloat(item.totalPrice).toFixed(2)}</td>
          <td><span class="remove-btn" data-index="${index}" style="cursor:pointer; color:red;">Remove</span></td>
        `;
        tableBody.appendChild(newRow);
      });

      totalPriceElement.textContent = calculateTotalPrice(cart);
    }
  }

  function adjustQuantity(index, action) {
    if (action === "increment") {
      cart[index].quantity += 1;
    } else if (action === "decrement" && cart[index].quantity > 1) {
      cart[index].quantity -= 1;
    }

    cart[index].totalPrice = (cart[index].quantity * cart[index].price).toFixed(2);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartTable(cart);
  }

  tableBody.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-btn")) {
      const index = e.target.getAttribute("data-index");
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartTable(cart);
    } else if (e.target.classList.contains("adjust-btn")) {
      const index = e.target.getAttribute("data-index");
      const action = e.target.getAttribute("data-action");
      adjustQuantity(index, action);
    }
  });

  renderCartTable(cart);
});
