// let productCountElement = document.querySelector(".shop-count");




// //// Add to cart
// let cart = [];
// // Lưu vào LocalStorage
// if(localStorage.getItem('cart')){
//   cart = JSON.parse(localStorage.getItem('cart'));
// }
// let countProductsInCart =() => {
//   // Kiểm tra xem giỏ hàng (cart) có tồn tại không
//   if (cart) {
//     const productCount = cart.length || 0
//     productCountElement.textContent = productCount;
//   }
// }

// // Gọi hàm để cập nhật số sản phẩm trong giỏ hàng
// countProductsInCart();
// // Show html trong giỏ hàng
// const renderCart = () => {
//   const renderCartElement  = document.querySelector("#RenderCart");
//   let htmlCart = '';

//   cart.forEach(item => {
//     htmlCart += `
//     <tr class="cart-product-item">
//     <td class="product-remove">
//       <a  onclick="RemoveItemCart('${item._id}')"><i class="fa fa-trash-o"></i></a>
//     </td>
//     <td class="product-thumb">
//       <a href="single-product.html">
//         <img src="${item.img}" width="90" height="110" alt="Image-HasTech">
//       </a>
//     </td>
//     <td class="product-name">
//       <h4 class="title"><a href="single-product.html">${item.name}</a></h4>
//     </td>
//     <td class="product-price">
//       <span class="price">${new Intl.NumberFormat("vi-VN", {
//         style: "currency",
//         currency: "VND",
//     }).format(
//         item.price
//     )} </span>
//     </td>
//     <td class="product-quantity">
//       <div class="pro-qty">
//       <input type="number" class="quantity" data-product-id="${item._id}" value="${item.quantity}" min="1" onchange="updatePriceOnUI('${item._id}', this.value)">
//       </div>
//     </td>
//     <td class="subtotal" id="product-${item._id}-subtotal">${new Intl.NumberFormat("vi-VN", {
//       style: "currency",
//       currency: "VND",
//     }).format(
//       item.price * item.quantity
//     )}</td>
//   </tr>
//     `;
//   });
  
//   if (renderCartElement) {
//     renderCartElement.innerHTML = htmlCart ;
//   }
//   countProductsInCart();



// };

// renderCart(); // Cập nhật giao diện giỏ hàng khi trang web tải lên


// // Hàm thêm sản phẩm vào giỏ hàng
// const addCart = (id) => {
//   fetch('http://localhost:5000/api/v1/products')
//     .then((response) => response.json())
//     .then((data) => {
//       const item = data.find((item) => item._id === id);
//       const existingItem = cart.find((cartItem) => cartItem._id === id);

//       if (existingItem) {
//         existingItem.quantity += 1;
//       }else{
//         item.quantity = 1 ;
//         cart.push(item);
//       }
//       localStorage.setItem('cart', JSON.stringify(cart));
//       renderCart() // Cập nhật giao diện ngay lập tức
      
//     });
//     countProductsInCart();

// }

  
// // Hàm xóa sản phẩm
// const RemoveItemCart = (id) => {
//     // Tìm sản phẩm cần xóa trong giỏ hàng (mảng cart)
//     const itemIndex = cart.findIndex((item) => item._id === id);
//     if (itemIndex !== -1) {
//       // Xóa sản phẩm khỏi mảng cart
//       cart.splice(itemIndex, 1);
//       localStorage.setItem('cart', JSON.stringify(cart));
//       renderCart() // Cập nhật giao diện ngay lập tức
//     }
// };

// // Hàm xóa toàn bộ sản phẩm
// const clearCart = () => {
//   // Xóa dữ liệu giỏ hàng trong Local Storage (nếu cần)
//   localStorage.removeItem('cart');
//   // Xóa toàn bộ sản phẩm trong mảng giỏ hàng
//   cart = [];
//   // Cập nhật giao diện giỏ hàng ngay lập tức
//   renderCart()
// }


// // Hàm cập nhật giá sản phẩm dựa trên số lượng mới
// function updatePriceOnUI(productId, newQuantity) {
//   const productSubtotalElement = document.getElementById(`product-${productId}-subtotal`);
//   const product = cart.find(item => item._id === productId);
  
//   if (product) {
//     product.quantity = parseInt(newQuantity, 10);
//     productSubtotalElement.textContent = product.price * product.quantity + '.000 VND';
//     // Lưu lại thông tin giỏ hàng sau khi cập nhật
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }
//   renderCart()
// }


const addCart = (id) => {
  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  var check = false;
  cart.forEach((element) => {
    if (element._id === id) {
      element.quantity = element.quantity + 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      check = true;
    }
  });
  if (!check) {
    const url = `http://localhost:5000/api/v1/products/${id}`;

    fetch(url)
      .then((response) => response.json()) // dùng câu lệnh này để tự động về parse => hướng đối tượng Js
      .then((data) => {
        // const product = data.data.filter((products) => products._id === id);
        console.log(data);
        productNew = {
          _id: data._id,
          img: data.img,
          name: data.name,
          price: data.price,
          quantity: 1,
        };
        cart.push(productNew);
        localStorage.setItem("cart", JSON.stringify(cart));
      })
      .catch((error) => {
        console.error("Lỗi", error);
      });
  }
  count();
};



const showCart = () => {
  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  const listproducts = document.querySelector("#RenderCart");
  let productListHTML = ""; // Khởi tạo một chuỗi rỗng để tích luỹ HTML
  console.log(productListHTML)
  cart.forEach((item, index) => {
    productListHTML += `
    <tr class="cart-product-item">
    <td class="product-remove">
      <a  onclick="RemoveItemCart('${item._id}')"><i class="fa fa-trash-o"></i></a>
    </td>
    <td class="product-thumb">
      <a href="single-product.html">
        <img src="${item.img}" width="90" height="110" alt="Image-HasTech">
      </a>
    </td>
    <td class="product-name">
      <h4 class="title"><a href="single-product.html">${item.name}</a></h4>
    </td>
    
    <td class="product-price">
      <span class="price">${new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(
        item.price
    )} </span>
    </td>
    <td class="product-quantity">
          <div class="pro-qty">
          <input type="number" class="quantity" data-product-id="${item._id}" value="${item.quantity}" min="1" onchange="updatePriceOnUI('${item._id}', this.value)">
          </div>
        </td>
    <td class="subtotal" id="product-${item._id}-subtotal">${new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(
      item.price * item.quantity
    )}</td>
  </tr>
    `;

  });

  // Sau khi vòng lặp hoàn thành, đặt innerHTML của listproducts
  listproducts.innerHTML = productListHTML;
};
  showCart();
// Hàm xóa sản phẩm
const RemoveItemCart = (id) => {
  const cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const updatedProducts = cart.filter((product) => product._id !== id);
localStorage.setItem("cart", JSON.stringify(updatedProducts));
showCart();
   
};
// Hàm xóa toàn bộ sản phẩm
const clearCart = () => {
  // Xóa dữ liệu giỏ hàng trong Local Storage (nếu cần)
  localStorage.removeItem('cart');
  // Xóa toàn bộ sản phẩm trong mảng giỏ hàng
  cart = [];
  // Cập nhật giao diện giỏ hàng ngay lập tức
 showCart()
}


// Hàm cập nhật số tiền khi quantity thay đổi
const updatePriceOnUI = (productId, newQuantity) => {
  const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

  // Tìm sản phẩm trong giỏ hàng bằng productId
  const updatedCart = cart.map((item) => {
    if (item._id === productId) {
      // Cập nhật số lượng của sản phẩm
      item.quantity = parseInt(newQuantity, 10);
    }
    return item;
  });

  // Cập nhật giỏ hàng trong localStorage
  localStorage.setItem("cart", JSON.stringify(updatedCart));

  // Hiển thị giỏ hàng sau khi cập nhật
  showCart();
};
