let productCountElement = document.querySelector(".shop-count");

//// Add to cart
let cart = [];
// Lưu vào LocalStorage
if(localStorage.getItem('cart')){
  cart = JSON.parse(localStorage.getItem('cart'));
}
let countProductsInCart =() => {
  // Kiểm tra xem giỏ hàng (cart) có tồn tại không
  if (cart) {
    const productCount = cart.length || 0
    productCountElement.textContent = productCount;
  }
}

// Gọi hàm để cập nhật số sản phẩm trong giỏ hàng
countProductsInCart();
// Show html trong giỏ hàng
const renderCart = () => {


  const renderCartElement  = document.querySelector("#RenderCart");
  let htmlCart = '';

  cart.forEach(item => {
    htmlCart += `
    <tr class="cart-product-item">
    <td class="product-remove">
      <a  onclick="RemoveItemCart(${item.id})"><i class="fa fa-trash-o"></i></a>
    </td>
    <td class="product-thumb">
      <a href="single-product.html">
        <img src="${item.img}" width="90" height="110" alt="Image-HasTech">
      </a>
    </td>
    <td class="product-name">
      <h4 class="title"><a href="single-product.html">${item.title}</a></h4>
    </td>
    <td class="product-price">
      <span class="price">${item.price} VND</span>
    </td>
    <td class="product-quantity">
      <div class="pro-qty">
      <input type="number" class="quantity" data-product-id="${item.id}" value="${item.quantity}" min="1" onchange="updatePriceOnUI(${item.id}, this.value)">
      </div>
    </td>
    <td class="subtotal" id="product-${item.id}-subtotal">${item.price * item.quantity}.000 VND</td>
  </tr>
    `;
  });
  
  if (renderCartElement) {
    renderCartElement.innerHTML = htmlCart ;
  }
  countProductsInCart();



};

renderCart(); // Cập nhật giao diện giỏ hàng khi trang web tải lên


// Hàm thêm sản phẩm vào giỏ hàng
const addCart = (id) => {
  fetch('http://localhost:3000/productshop')
    .then((response) => response.json())
    .then((data) => {
      const item = data.find((item) => item.id === id);
      const existingItem = cart.find((cartItem) => cartItem.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      }else{
        item.quantity = 1 ;
        cart.push(item);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart() // Cập nhật giao diện ngay lập tức
      
    });
    countProductsInCart();

}

  
// Hàm xóa sản phẩm
const RemoveItemCart = (id) => {
    // Tìm sản phẩm cần xóa trong giỏ hàng (mảng cart)
    const itemIndex = cart.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      // Xóa sản phẩm khỏi mảng cart
      cart.splice(itemIndex, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart() // Cập nhật giao diện ngay lập tức
    }
};

// Hàm xóa toàn bộ sản phẩm
const clearCart = () => {
  // Xóa dữ liệu giỏ hàng trong Local Storage (nếu cần)
  localStorage.removeItem('cart');
  // Xóa toàn bộ sản phẩm trong mảng giỏ hàng
  cart = [];
  // Cập nhật giao diện giỏ hàng ngay lập tức
  renderCart()
}


// Hàm cập nhật giá sản phẩm dựa trên số lượng mới
function updatePriceOnUI(productId, newQuantity) {
  const productSubtotalElement = document.getElementById(`product-${productId}-subtotal`);
  const product = cart.find(item => item.id === productId);
  
  if (product) {
    product.quantity = parseInt(newQuantity, 10);
    productSubtotalElement.textContent = product.price * product.quantity + '.000 VND';
    // Lưu lại thông tin giỏ hàng sau khi cập nhật
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

