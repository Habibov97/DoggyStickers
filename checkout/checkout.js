import "../style.css";
import "./checkout.css";
import api from "../services/api"


window.selectPhoto = selectPhoto

/*---------- SLIDER ---------- */

let swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  centeredSlides: false,
  spaceBetween: 10,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});


/*------------ GET SPECIFIC STICKER FOR CHECKOUT PAGE ------------*/

let url = new URLSearchParams(window.location.search)
let params = url.get('params')


const card_image = document.querySelector('#card-image')
const products_Slider = document.getElementById('products-slider')
const title_name = document.getElementById('titleName')
const about_sticker = document.getElementById('aboutSticker')


async function getStickerPhoto(params) {

  let stickerData = await api.getAllData()
  let product = stickerData.pageProps.products
  let mainImageSrc = ''
  let productId = ''
  product?.map(item => {
    if (item.node.title == params) {
      /*--- Get Title ---*/
      title_name.innerHTML = `${item.node.title}`

      /*--- Get Description ---*/
      about_sticker.innerHTML = `${item.node.description}`

      /*--- Get Slider Images ---*/
      let slider_images = item.node.images.edges
      slider_images.map(item => {
        products_Slider.innerHTML += `<div class="swiper-slide"><img id="${item.node.id}" onclick="selectPhoto('${item.node.id}')" src="${item.node.originalSrc}" alt=""></div>`
      })

      /*--- Get Main Image ---*/
      mainImageSrc = item.node.images.edges[0].node.originalSrc
      card_image.innerHTML = `<img src="${mainImageSrc}" alt="">`

      /*--- GET ID ---*/
      productId = item.node.id;
    }

  })

  toCart(productId, params, mainImageSrc);


}
getStickerPhoto(params)



function selectPhoto(id) {
  card_image.innerHTML = ""
  const productPhoto = document.getElementById(`${id}`).src
  card_image.innerHTML = `<img src="${productPhoto}" alt="" />`
  // console.log(productPhoto, 'product');
}

/*---  GET STICKER SIZES AND QUANTITIES  ---*/

let addToCart = document.querySelector('#addToCart');
let c = 1;
let selected_Size;
let qiymetler;
function getSizes() {
  const sizes = document.querySelector('#sizes')
  let prices = document.querySelector('#prices')
  let addUp = document.querySelector('#addUp') // bu blokdaki kodlari js ile getirmek ucun qurulmusdu, lakin lazim deyil.
  let quantityCount = document.querySelector('#qty')

  qiymetler = ["9.99", "10.99", "11.99"]

  /*----------------------------------------------------------- */

  quantityCount.addEventListener('change', () => {
    c = parseInt(quantityCount.value);
  });

  /*----------------------------------------------------------- */

  sizes.innerHTML = `
    <option value="" selected> Choose size </option>
    <option value="3x3" > 3 x 3 </option>
    <option value="4x4" > 4 x 4 </option>
    <option value="5x5" > 5.5 x 5.5 </option>

  `

  prices.innerHTML = "Choose size of sticker for view price";
  addToCart.classList.add('inactiveLink')

  sizes.addEventListener('change', function () {

    selected_Size = sizes.value

    if (selected_Size == "3x3") {
      prices.innerHTML = `$${qiymetler[0]}`
      addToCart.classList.remove('inactiveLink')
    }

    else if (selected_Size == "4x4") {
      prices.innerHTML = `$${qiymetler[1]}`
      addToCart.classList.remove('inactiveLink')
    }

    else if (selected_Size == "5x5") {
      prices.innerHTML = `$${qiymetler[2]}`;
      addToCart.classList.remove('inactiveLink')
    }

    else {
      alert('Please choose size')
      prices.innerHTML = "Choose size of sticker for view price";
      addToCart.classList.add('inactiveLink')
    }
  })

}


/*-------  ADD TO CART -------*/

function toCart(id, title, image) {
  getSizes();

  let cartCount = document.querySelector('#cartCount');
  cartCount.classList.add("display-none");


  addToCart.addEventListener('click', (e) => {
    e.preventDefault();
    cartCount.classList.remove("display-none");
    cartCount.classList.add("display-block");
    cartCount.innerHTML = c;

    let products = JSON.parse(localStorage.getItem("products")) || [];
    let flag = false;


    products = products.map(item => {
      if (item.id == id && item.size == selected_Size && item.price == prices.innerHTML.slice(1)) {
        flag = true;
        return { ...item, count: item.count + c };
      }
      return item;
    })
    
    if (!flag) {
      products.push({ id: id, title: title, count: c, size: selected_Size, price: prices.innerHTML.slice(1), image: image });
    }

    localStorage.setItem("products", JSON.stringify(products));

    console.log(c);
  });
}























// function toCart(){
//   getSizes()
//   let addToCart = document.querySelector('#addToCart')
//   let cartCount = document.querySelector('#cartCount')
//   cartCount.classList.add("display-none")
//   addToCart.addEventListener('click', (e) => {
//     e.preventDefault()
//     cartCount.classList.remove("display-none")
//     cartCount.classList.add("display-block")
//     cartCount.innerHTML = c
//     let olculer = []
//     olculer.push([c, selected_Size, qiymetler])
//     let products = localStorage.setItem("product1", JSON.stringify(...olculer))
//     console.log(products);
//     console.log(c);
//   })
// }
// toCart()