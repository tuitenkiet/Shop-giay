const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
const priceElement = document.querySelector(".price");
const main_title = document.querySelector(".main-title")
const imgPro = document.querySelector(".lightbox-image img")
const mota = document.querySelector(".product-single-info p")
if (productId) {
  document.querySelector(".product-single-area").style.display = "block";
  fetch('http://localhost:3000/productshop')
.then((response) => response.json())
.then(data => {
  let singleProduct = data.filter(product => product.id == productId)
  priceElement.textContent = singleProduct[0].price + " VND";
  main_title.textContent = singleProduct[0].title
  imgPro.src = singleProduct[0].img
  mota.textContent =  singleProduct[0].description
})
}

