// const { log } = require("debug/src/browser");

const urlParams = new URLSearchParams(window.location.search);


// Lấy giá trị của tham số cụ thể
const id = urlParams.get('id');
console.log(id);
fetch("http://localhost:5000/api/v1/categorys")
  .then((response) => response.json()) // dùng câu lệnh này để tự động về parse => hướng đối tượng Js
  .then((data) => {
    const listcategory = document.querySelector("#category_id");
    let categoryListHTML = ""; // Khởi tạo một chuỗi rỗng để tích luỹ HTML

    data.forEach((item) => {
      categoryListHTML += `
    <option value="${item._id}">${item.name}</option>
    `;
    });

    // Sau khi vòng lặp hoàn thành, đặt innerHTML của listproducts
    listcategory.innerHTML = categoryListHTML;
  });
console.log(id);

const name = document.getElementById("name");
const category_id = document.getElementById("category_id");
const quantity = document.getElementById("quantity");
const price = document.getElementById("price");
const img = document.getElementById("img");
fetch("http://localhost:5000/api/v1/products/" +id).then(response => response.json()).then(data => {
 console.log(data);
   name.value = data.name;
   category_id.value = data.category._id;
   quantity.value = data.quantity;
   price.value = data.price;
  //  img.value = data.img;
}
)




const editProduct = () => {
 
  if (
    name.value == "" ||
    category_id.value == "" ||
    quantity.value == "" ||
    price.value == "" 
  ) {
    alert("vui lòng nhập đầy đủ thông tin");
    return false;
  }

  fetch("http://localhost:5000/api/v1/products/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.value,
      // img: img.value,
      price: price.value,
      quantity: quantity.value,
      category: document.getElementById('category_id').value,
    }),
  })
    .then(response => response.json())
    .then(data => {
      alert("Sửa sản phẩm thành công");
      window.location.href = "http://127.0.0.1:5500/product-admin-master/products.html";
    })
    .catch(error => {
      console.error('Error updating product:', error);
      alert('Đã xảy ra lỗi khi cập nhật sản phẩm');
    });
}



