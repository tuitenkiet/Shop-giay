
 let renderproduct = (currentPage = 1, itemsPerPage = 9) => {
    const url = `http://localhost:5000/api/v1/products?page=${currentPage}&limit=${itemsPerPage}`;
    fetch(url)
      .then((response) => response.json()) // dùng câu lệnh này để tự động về parse => hướng đối tượng Js
      .then((data) => {
        const listproducts = document.querySelector("#product-ql");
        let productListHTML = ""; // Khởi tạo một chuỗi rỗng để tích luỹ HTML
  
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
  
        const currentPageData = data.data.slice(startIndex, endIndex);
  
        data.data.forEach((item) => {
          productListHTML += `
          <tr >
          <td class="tm-product-name">${item._id}</td>
          <td class="tm-product-name">${item.name}</td>
          <td class="tm-product-name"><img class="img-products" src="${item.img}"></td>
          <td class="tm-product-name">${new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
          }).format(
              item.price
          )} </td>
          <td class="tm-product-name">${item.quantity}</td>
          <td class="tm-product-name">${item.category.name}</td>
          <td class="tm-product-name">Còn hàng</td>
          <td>
          <a href="edit-product.html?id=${item._id}" class="tm-product-delete-link" onclick="editProduct('${item._id}')">
          Sửa
          </a>
          <a href="#" class="tm-product-delete-link" onclick="deletesP('${item._id}')">
           Xóa
          </a>
          
        </td>
        
        </tr>
          `;
        });
  
        // Sau khi vòng lặp hoàn thành, đặt innerHTML của listproducts
        listproducts.innerHTML = productListHTML;
  
        // Tạo phân trang
        const totalPages = Math.ceil(data.length / itemsPerPage);
        const paginationContainer = document.getElementById("pagination");
        let paginationHTML = "";
  
        for (let i = 1; i <= data.totalPages; i++) {
          paginationHTML += `<li><a href="#" onclick="changePage(${i})">${i}</a></li>`;
        }
  
        paginationContainer.innerHTML = paginationHTML;
      })
      .catch((error) => {
        console.error("Lỗi", error);
      });
  };
  function changePage(page) {
    // Gọi lại hàm renderproduct với trang mới
    renderproduct(page, itemsPerPage);
  }
  
  const itemsPerPage = 1; // Số sản phẩm trên mỗi trang
  renderproduct(1, itemsPerPage); // Hiển thị trang đầu tiên khi trang web được tải lên

  

  const themSP =()=>{
    const name = document.getElementById('name').value
    const category_id = document.getElementById('category_id').value
    const quantity = document.getElementById('quantity').value
    const price = document.getElementById('price').value
    // const img = document.getElementById('fileInput').value

  
    if(name=='' || category_id=='' || quantity=='' || price=='' ) {
      alert('vui lòng nhập đầy đủ thông tin')
      return false
    }
  
    fetch('http://localhost:5000/api/v1/products/create', {
      headers: {
        'Content-Type': 'application/json',
      },
      method:'POST',
      body: JSON.stringify({
        name:name,
        price:price,
        quantity:quantity,
        category:category_id,
  
      })
    })
  }
  
  
  fetch('http://localhost:5000/api/v1/categorys')
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
  })



// Hàm xóa sản phẩm
  const deletesP = (id) => {
    const confirms = confirm("Bạn muốn xóa tớ sao :(( ! ");
    if (confirms) {
      fetch(`http://localhost:5000/api/v1/products/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      })
    }
    setTimeout(()=> {
        window.location.reload();
    }, 700)
    
  };


