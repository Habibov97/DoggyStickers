import './style.css'
import api from "./services/api"

const cards = document.querySelector("#cards")

async function getAllProducts(){
    let allProductsData = await api.getAllData()
    let products = allProductsData.pageProps.products
    products.map(item => {
        cards.innerHTML += `
                                <div class="card">
                                    <div id="image">
                                       <a href="/checkout/?params=${item.node.title}"><img src="${item.node.images.edges[0].node.originalSrc}" alt=""></a>
                                </div>
                                <div>
                                    <!-- Title -->
                                    <div class="font-main" id="title">
                                        <h1 class="color-main text-md ">${item.node.title}</h1>
                                    </div>
                                    
                                    <!-- Description -->
                                    <div class="text-sm font-main padding-full" id="description">
                                        <p class="color-main text-weight-sm ">${item.node.description}</p>
                                    </div>
                                
                                    <!-- Price -->
                                    <div id="price-list">
                                    <div class="text-sm font-main " id="price">
                                        <p class="color-main">$${item.node.variants.edges[0].node.price}</p>
                                    </div>
                                    </div>
                                    
                                    </div>
                                </div> 
                        ` 


    })
}


getAllProducts()