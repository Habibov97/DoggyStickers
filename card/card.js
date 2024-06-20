import "../style.css";
import "./card.css";


const tbody = document.querySelector('#tbody')
const total_price = document.querySelector('#totalPrice')
const cartCountCheckout = document.querySelector('#cartCountCheckout')


/*---- UPDATE TOTAL PRICE  ----*/
function updateTotalPrice() {
    let qtyInputs = document.querySelectorAll('#qtyCart');
    const priceElems = document.querySelectorAll('#priceNameWidth');
    let total = 0;
    let totalCount = 0;
    qtyInputs.forEach((input, index) => {
        const qty = parseInt(input.value);
        const price = parseFloat(priceElems[index].innerText.replace('$', ''));
        total += qty * price;
        totalCount += qty;
    });
    
    total_price.innerText = `$${total.toFixed(2)}`;
    cartCountCheckout.innerText = totalCount;
}


/*---- REMOVE PRODUCT FROM CART  ----*/

function removeProduct(index) {
    let storedData = localStorage.getItem('products');
    let products = JSON.parse(storedData);
    products.splice(index, 1); 
    localStorage.setItem('products', JSON.stringify(products)); 

    tbody.innerHTML = '';
    GetCartProduct();
}


function GetCartProduct(){
    let storedData = localStorage.getItem('products');
    let products = JSON.parse(storedData)
    // console.log(products);

    products.forEach((item, index) => {
        tbody.innerHTML += `
            <li id="productNameWidth">
                <img style="width: 35px; height: 35px;" src="${item.image}" alt="">
                <div class="font-main "><span>${item.title}</span> <span>${item.size}</span></div>
            </li>
            <li id="quantityNameWidth">
                <input id="qtyCart" type="number" min="1" max="20" value="${item.count}" data-index="${index}">
            </li>
            <li class="font-main color-transparent" id="priceNameWidth">$
                ${item.price}
            </li>
            <li id="removeNameWidth"><a href="" class="removeProduct" data-index="${index}"><i class="fa-solid fa-xmark"></i></a></li>
        `;
    });
    
    const qtyInputs = document.querySelectorAll('#qtyCart');
    qtyInputs.forEach(input => {
        input.addEventListener('change', updateTotalPrice);
    });

    updateTotalPrice();
    

    const removeButtons = document.querySelectorAll('.removeProduct');
    removeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const index = parseInt(button.getAttribute('data-index'));
            // console.log(index);
            removeProduct(index);
        });
    });

}

GetCartProduct()












// let allCartPrices = []
    // products.map(item=> {
    //     allCartPrices.push(item.price);
    // })
    // console.log(allCartPrices);

    // total_price.innerHTML = allCartPrices.map(item => parseFloat(item)).reduce((total, item) => total += item, 0)





// function  getSubtotal(item){
//     let count = item.count
//     let price = JSON.parse(item.price)
//     allCartPrices.push(price) 
    
//     // total_price.innerHTML += total
// }
// 
// console.log(allCartPrices);