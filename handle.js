function getCart(){
    let cart = localStorage.getItem("cart")
    cart = JSON.parse(cart)
    console.log(cart)
    for (let i=0; i < cart.length; i++){
        document.getElementById("cartBox").innerHTML += `        
            <div class="flex flex-col sm:min-w-1/2 sm:max-w-2/3">
                <div class="border-solid rounded-2xl border-1 mb-2 flex p-8">
                    <img class="w-1/3 object-fill" src="${cart[i].image}">
                    <div class="text-xl">
                        <h2 class="text-5xl font-bold">${cart[i].name}</h2>
                        <p>${cart[i].category}</p>
                        <p class="w-full flex justify-end text-xl">${cart[i].price}</p>
                    </div>
                </div>
            </div>`
    }
}getCart()
//localStorage.removeItem("cart")