let PROJECT_ID = 'l6v8tzk7'
let DATASET = 'production'
let QUERY = encodeURIComponent(`*[_type == 'products']{productname, artist, category->{category}, year, price, description, image}`)
let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`
let products
let cartList = []

function getImageUrl(index){ //lager url-en til bilde
    let imageList = products[index].image.asset._ref.split('-') //deler bildereferansen inn i deler slik at den er lesbar
    let imageURL = `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${imageList[1]}-${imageList[2]}.${imageList[3]}` //lager URL for bilde
    return imageURL
}

async function getProducts(url){ // henter produktene fra databasen
    let response =  await fetch(url)
    let data =  await response.json()
    return data.result
}
getProducts(URL).then((data) => { // putter produktene inn i frontenden
    products = data
    insertItems(products)
})

function insertItems(itemList) {
    document.getElementById('productbox').innerHTML = ""
    for (let i = 0; i < itemList.length; i++){
        console.log(itemList[i])
        document.getElementById('productbox').innerHTML += `        
            <div class="lg:w-2/7 w-9/20 border-[1.5px] rounded-4xl p-8 bg-purple-100 m-2" onclick="modalFunc(${i})">
                <img class=" border-[1.5px] rounded-2xl bg-white h-80" src="${getImageUrl(i)}">
                <h2 class="max-h-16 font-bold rounded-full border-[1.5px] w-fit p-4 bg-white dynamic-height">${itemList[i].productname}</h2>
                <div class="flex flex-row justify-between items-end text-xl p-2 -mt-3">
                    <div>
                        <p>${itemList[i].artist}</p>
                        <p>${itemList[i].category.category}</p>
                    </div>
                    <p>${itemList[i].price} kr</p>
                </div>
            </div>
        `
    }
}


function search(){
    //søkefunksjon her!!!
    let userInput = document.getElementById('search').value
    console.log(userInput)
    let searchquery = encodeURIComponent(`*[productname match "${userInput}*"]`)
    let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${searchquery}`
    getProducts(URL).then((data) => {
        document.getElementById('productbox').innerHTML = ""
        for (let i = 0; i < data.length; i++){
            console.log(data[i])
            let imageList = data[i].image.asset._ref.split('-') //deler bildereferansen inn i deler slik at den er lesbar
            let imageURL = `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${imageList[1]}-${imageList[2]}.${imageList[3]}` //lager URL for bilde
            document.getElementById('productbox').innerHTML += `        
                <div class="lg:w-2/7 w-9/20 border-[1.5px] rounded-4xl p-8 bg-purple-100 m-2" onclick="modalFunc(${i})">
                    <img class=" border-[1.5px] rounded-2xl bg-white h-80" src="${imageURL}">
                    <h2 class="max-h-16 font-bold rounded-full border-[1.5px] w-fit p-4 bg-white dynamic-height">${data[i].productname}</h2>
                    <div class="flex flex-row justify-between items-end text-xl p-2 -mt-3">
                        <div>
                            <p>${data[i].artist}</p>
                            <p>${data[i].category.category}</p>
                        </div>
                        <p>${data[i].price} kr</p>
                    </div>
                </div>
            `
        }
    })
}

let modalOpen = false
function modalFunc(index){
    //funksjon som åpner produktsidene
    // let modalbox = document.getElementById("modalbox");
    //modalbox.style.display = "inline";
    document.body.style.overflow = 'hidden';
    document.body.innerHTML += `    
        <div id="modalbox" class="fixed flex w-screen h-screen align-middle justify-center">
            <div id="modal" class="flex flex-col bg-white md:border-2 md:rounded-4xl w-max-screen m-min-120 md:ml-30 md:mr-30 h-screen md:h-fit mt-20 p-8">
                <h1 class="text-7xl mb-8">${products[index].productname}</h1>
                <div class="flex flex-row justify-between">
                    <img class=" border-[1.5px] rounded-2xl w-2/5" src="${getImageUrl(index)}">
                    <div class="flex flex-col w-5/10">
                        <h2 class="text-4xl">${products[index].price} kr</h2>
                        <p>${products[index].category.category}</p>
                        <p>${products[index].description}</p>
                        <button onclick="handlekurvFunc(${index})" class="border-1 rounded-4xl max-w-80">legg til i handlekurv</button>
                    </div>
                </div>
            </div>
        </div>
        `
    modalOpen = true
}
window.onclick = function(event) {
    //console.log('hei')
    let modal = document.getElementById("modal");
    let modalbox = document.getElementById("modalbox");
    if (modalOpen==true){
        //console.log('hei2')
        if (event.target != modal) {
            //console.log('hei3')
            //modalbox.style.display = "none";
        }
    }
}

function handlekurvFunc(index){ //funksjon som kjører når brukeren trykker på legg til i handlekurven
    const cartItem = { //lager et objekt av produktet som brukeren har lagt i handlekurven
        name: `${products[index].productname}`,
        artist: `${products[index].artist}`,
        category: `${products[index].category.category}`,
        price: `${products[index].price}`,
        year: `${products[index].year}`,
        image: `${getImageUrl(index)}`
    }
    if (localStorage.getItem("cart") != null){
        let localCart = localStorage.getItem("cart")
        localCart = JSON.parse(localCart)
        //console.log(localCart, 'dete er localcart')
        cartList.push(...localCart);
        //console.log(cartList)
    }
    cartList.push(cartItem)
    localStorage.setItem("cart", JSON.stringify(cartList))
    //console.log(localStorage.getItem("cart"))
}

