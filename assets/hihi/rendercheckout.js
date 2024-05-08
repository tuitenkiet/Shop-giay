if (localStorage.getItem('cart')) {
  // Lấy dữ liệu giỏ hàng từ localStorage
  const cart = JSON.parse(localStorage.getItem('cart'));
  const showProductBill = document.querySelector("#tbody");
  let show = "";
  let total = 0;

  cart.forEach((item) => {
      show += `  
          <tr class="cart-item">
              <td class="product-name">${item.name}<span class="product-quantity">× ${item.quantity}</span></td>
              <td class="product-total">${new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
              }).format(item.price * item.quantity)}</td>
          </tr>
      `;
      total += item.price * item.quantity;
  });

  showProductBill.innerHTML = show;

  const tfoot = document.querySelector("#tfoot");
  let subtotal = "";
  subtotal += `
      <tr class="cart-subtotal">
          <th>Tổng tiền</th>
          <td>${total.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</td>
      </tr>
      <tr class="shipping">
          <th>Ship</th>
          <td>20.000 ₫</td>
      </tr>
      <tr class="order-total">
          <th>Tổng cộng </th>
          <td>${(total + 20000).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</td>
      </tr>
  `;

  tfoot.innerHTML = subtotal;
};
