
let RenderProductIndex = () => {
  const url = "http://localhost:5000/api/v1/products";

  fetch(url)
    .then((response) => response.json()) // dùng câu lệnh này để tự động về parse => hướng đối tượng Js  
    .then((data) => {
      const listproducts = document.querySelector("#show-product-outstanding");
      let productListHTML = ''; // Khởi tạo một chuỗi rỗng để tích luỹ HTML
      const  slicedData = data.data.slice(0, 8)
      slicedData.forEach((item) => {
        productListHTML += `
          <div class="col-sm-6 col-lg-3">
             <div class="product-item">
              <div class="inner-content">
                <div class="product-thumb">
                  <a href="single-normal-product.html">
                    <img src="${item.img}" width="270" height="274" alt="Image-HasTech">
                  </a>
                  <div class="product-action">
                  <a class="btn-product-cart" onclick="addCart('${item._id}')"><i class="fa fa-shopping-cart"></i></a>
                  </div>
                  <a class="banner-link-overlay" href="shop-three-columns.html"></a>
                </div>
                <div class="product-info">
                  <h4 class="title"><a href="single-normal-product.html">${item.name}</a></h4>
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
          </div>  
          `;
      });
  
      // Sau khi vòng lặp hoàn thành, đặt innerHTML của listproducts
      listproducts.innerHTML = productListHTML;
  
    })
    .catch((error) => {
      console.error("Lỗi", error);
    });
}
RenderProductIndex()


