
// let renderproductShop = (currentPage, itemsPerPage) => { 
//   const apiUrl = "http://localhost:5000/api/v1/products"; // Thay thế bằng URL API thực tế của bạn

//   fetch(apiUrl)
//   .then((response) => response.json())
//   .then((data) => {
//     const listproducts = document.querySelector("#show-product");
//     let productListHTML = '';
//     // console.log(data)
    
//     // Tính toán chỉ mục bắt đầu và kết thúc dựa trên trang hiện tại và số sản phẩm trên mỗi trang
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
    
//     // Lấy danh sách sản phẩm cho trang hiện tại
//     const currentPageData = data.slice(startIndex, endIndex);

//     currentPageData.forEach((item) => {
//       productListHTML += `
      
//       `;
//     });

//     listproducts.innerHTML = productListHTML;
    

//     // Tạo phân trang
//     const totalPages = (data.length / itemsPerPage);
//     const paginationContainer = document.getElementById("pagination");
//     let paginationHTML = '';

//     for (let i = 1; i <= totalPages; i++) {
//       paginationHTML += `<li><a href="#" onclick="changePage(${i})">${i}</a></li>`;
//     }

//     paginationContainer.innerHTML = paginationHTML;



//   })
// };

// // Hàm để thay đổi trang khi người dùng click vào phân trang
// function changePage(page) {
//   // Gọi lại hàm renderproductShop với trang mới
//   renderproductShop(page, itemsPerPage);
// }

// const itemsPerPage = 9; // Số sản phẩm trên mỗi trang
// renderproductShop(1, itemsPerPage); // Hiển thị trang đầu tiên khi trang web được tải lên

let renderproductShop = (currentPage = 1 , itemsPerPage = 8) => { 
  const apiUrl = `http://localhost:5000/api/v1/products?page=${currentPage}&limit=${itemsPerPage}`; // Thay thế bằng URL API thực tế của bạn

  fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const listproducts = document.querySelector("#show-product");
    let productListHTML = '';
    console.log(data);

    data.data.forEach((item) => {
      productListHTML += `
      <div class="col-sm-6 col-lg-4">
      <!--== Start Product Item ==-->
      <div class="product-item">
        <div class="inner-content">
          <div class="product-thumb">
            <a  href="single-normal-product.html?id=${item._id}">
              <img src="${item.img}" width="370" height="350" alt="Image-HasTech">
            </a>
            <div class="product-action">
                  <a class="btn-product-cart" onclick="addCart('${item._id}')"><i class="fa fa-shopping-cart"></i></a>
            </div>
           <a class="banner-link-overlay" href="shop.html"></a>
          </div>
          <div class="product-info">
            
            <h4 class="title"><a href="single-normal-product.html">${item.name} </a></h4>
            <div class="prices">
            <input  type="hidden" name="prices" value="${item.price}">
              <span class="price">${new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(
                item.price
            )} </span>
            </div>
          </div>
        </div>
      </div>
      <!--== End prPduct Item ==-->
    </div>
      `;
    });

    listproducts.innerHTML = productListHTML;

    // Tạo phân trang
    // const totalPages = (data.length / itemsPerPage);
    const paginationContainer = document.getElementById("pagination");
    let paginationHTML = '';

    for (let i = 1; i <= data.totalPages; i++) {
      paginationHTML += `<li><a href="#" onclick="changePage(${i})">${i}</a></li>`;
    }

    paginationContainer.innerHTML = paginationHTML;




  })

};

// Hàm để thay đổi trang khi người dùng click vào phân trang
function changePage(page) {
  // Gọi lại hàm renderproductShop với trang mới
  renderproductShop(page, itemsPerPage);
}

const itemsPerPage = 9; // Số sản phẩm trên mỗi trang
renderproductShop(1, itemsPerPage); // Hiển thị trang đầu tiên khi trang web được tải lên