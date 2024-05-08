if (localStorage.getItem('cart')) {
    // Lấy dữ liệu giỏ hàng từ localStorage
    const cart = JSON.parse(localStorage.getItem('cart'));
const showproductbill = document.querySelector("#tbody");
let show = ""; 
let total = 0;
cart.forEach((item) =>{
show += `  
<tr class="cart-item">
    <td class="product-name">${item.title}<span class="product-quantity">× ${item.quantity}</span></td>
    <td class="product-total">${item.price * item.quantity}.000 VND</td>
</tr>
`;
total += item.price * item.quantity;
})
showproductbill.innerHTML = show;


const tfoot =document.querySelector("#tfoot");
let subtotal ="";
subtotal += `
<tr class="cart-subtotal">
                      <th>Tổng tiền</th>
                      <td>${total}.000 VND</td>
                    </tr>
                    <tr class="shipping">
                      <th>Ship</th>
                      <td>20.000 VND</td>
                    </tr>
                    <tr class="order-total">
                      <th>Tổng cộng </th>
                      <td>${total + 20}.000 VND</td>
                    </tr>
`
tfoot.innerHTML = subtotal;
};











