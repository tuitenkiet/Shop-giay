
let RenderProductHotIndex = () => {
  var urlproducthot = "http://localhost:3000/producthot"
  fetch(urlproducthot)
  .then((response) => response.json()) // dùng câu lệnh này để tự động về parse => hướng đối tượng Js  
    .then((data) => {
      const listproducthot = document.querySelector("#listproducthot")
      let producthothtml = '';
      data.forEach((item) => {
          producthothtml += `
  
          <div class="col-sm-6 col-lg-3">
          <div class="product-item">
           <div class="inner-content">
             <div class="product-thumb">
               <a href="single-normal-product.html">
                 <img src="${item.img}" width="270" height="274" alt="Image-HasTech">
               </a>
               <div class="product-flag">
               <ul>
                 <li class="discount">SALE: ${item.discount}</li>
               </ul>
             </div>
               <div class="product-action">
                 <a class="btn-product-cart" onclick="addCart(${item.id})"><i class="fa fa-shopping-cart"></i></a>

               </div>
               <a class="banner-link-overlay" href="shop-three-columns.html"></a>
             </div>
             <div class="product-info">
               <h4 class="title"><a href="single-normal-product.html">${item.title}</a></h4>
               <div class="prices">
                    <span class="price-old">${item.price}VND</span>
                    <span class="sep">-</span>
                    <span class="price">${item.price} VND</span>
              </div>
             </div>
           </div>
         </div>
       </div>  
  
          `
      });
      
      listproducthot.innerHTML = producthothtml;
  
    });
};
RenderProductHotIndex();