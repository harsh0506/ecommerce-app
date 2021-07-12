
let imgsrc
let total = 0
let prodname
let price
let img = []
let prod = []
let pr = []
let img1 = []
let prod1 = []
let pr1 = []
let jtodata
let showprodhtml
function dataloader() {
    async function data() {
        const infod = await fetch("/datat")
        const dd = await infod.json()
        for (let i = 0; i <4; i++) {
            imgsrc = dd[i]["ImageUrl"]
            img.push(imgsrc)
            prodname = dd[i]["Prodname"]
            prod.push(prodname)
            price = dd[i]["Price"]
            pr.push(price)
        }
        appending(img, prod, pr)
        console.log(imgsrc)
        const info = await fetch("data.json")
        jtodata = await info.json()
        for (let i = 0; i < 10; i++) {
            imgsrc = jtodata[i].url
            img.push(imgsrc)
            prodname = jtodata[i].name
            prod.push(prodname)
            price = jtodata[i].price
            pr.push(price)
        }
        appending(img, prod, pr)
        datagetter()
        inputdata()
    }
    data()
    function appending(img, prod, pr) {
        for (let k = 0; k < pr.length; k++) {
            let produ = prod[k]
            let i = img[k]
            let pri = pr[k]
            const products = document.getElementsByClassName("products")[0]
            const divcontainmer = document.createElement("div")
            divcontainmer.setAttribute("class", "danger")
            let htmldata = `<div class="card">
            <div class="img">
                <img src="${i}" alt="">
            </div>
            <div class="text">
                <p class="name">${produ}</p>
                <div class="priceandno"><p class="price">price<p class="no">${pri}</p></p></div>
               
                <button class="btn">add to cart</button>
               
            </div>
        </div>
            `
            divcontainmer.innerHTML = htmldata
            //products.append(danger)
            products.appendChild(divcontainmer)
        }
    }
}
dataloader()
//function to get value 
function datagetter() {
    for (let i = 0; i < img.length; i++) {
        const button = document.getElementsByClassName("btn")
        button[i].addEventListener("click", () => {
            const nameofproducts = document.getElementsByClassName("name")[i].textContent
            const priceofproducts = parseFloat(document.getElementsByClassName("no")[i].textContent.replace("$", ""))
            const imgsrcofproducts = document.getElementsByTagName("img")[i].src
            console.log(nameofproducts, priceofproducts, imgsrcofproducts)
            //function to add in shopping list
            addtocart(nameofproducts, priceofproducts, imgsrcofproducts)
            //function to update price
            updatetotal(priceofproducts)
            //to remove item from list
            remove_item()
        })
    }
    //add to cart function
    function addtocart(nameofproducts, priceofproducts, imgsrcofproducts) {
        const cart_prod = document.getElementsByClassName("cart_prod")[0]
        const added_item = document.createElement("div")
        added_item.setAttribute("class", "added_item")
        added_item.innerHTML = `
            <div class="cart_img">
                <img src="${imgsrcofproducts}" alt="">
            </div>
            <div class="cart_text">
                <p class="cart_name">${nameofproducts}</p>
                <p class="cart_price">${priceofproducts}</p>
                <button class="remove">remove</button>
            </div>
        `
        let items = added_item
        cart_prod.appendChild(items)
    }
    //update total means when something is added the total willl increase
    function updatetotal(priceofproducts) {
        total = total + priceofproducts
        document.getElementsByClassName("total")[0].innerHTML = total
    }
    //fumction to remove the item from the shopping list
    function remove_item() {
        for (let i = 0; i < img.length; i++) {
            let remove = document.getElementsByClassName("remove")[i];
            console.log(remove)
            remove.addEventListener("click", () => {
                const cart_prod = document.getElementsByClassName("cart_prod")[i]
                let item_to_be_removed = document.getElementsByClassName("added_item")[i]
                console.log(item_to_be_removed)
                item_to_be_removed.parentNode.removeChild(item_to_be_removed)
                //function to change the total
                total = total - total
                document.getElementsByClassName("total")[0].innerHTML = total
            })

        }
    }
    //code to use the search bar

}
datagetter()
function inputdata() {
    const submitbtn = document.getElementById("s_btn")
    submitbtn.addEventListener("click", () => {
        const search = document.querySelector(".search")
        const inputeddata = search.value
        console.log(inputeddata)
        for (let i = 0; i < prod.length; i++) {
            console.log(jtodata[i]["name"])
            if (jtodata[i]["name"] = inputeddata) {
                console.log(i)
                let searchedproductshow = document.getElementsByClassName("seearchedprodycts")[i]
                let showprodhtml = document.createElement("div")
                showprodhtml.setAttribute("class", "fang")
                let data = `
                <div class="containerall">
                <img class ="imagewhichsearch" src="${jtodata[0]["url"]}" alt="">
                <p class="nameofprodsearched">
                ${jtodata[i]["name"]}    
                </p>
                <p class="priceofprodsearched">
                ${jtodata[i]["price"]}
                </p>
                <button class="removefrom" >remove</button>
                </div>
                `
                showprodhtml.innerHTML = data
                searchedproductshow.appendChild(showprodhtml)
                const removebtn = document.getElementsByClassName("removefrom")[i]
                removebtn.addEventListener("click", () => {
                    showprodhtml.remove(showprodhtml)[i]
                })
                console.log(showprodhtml)
                console.log(jtodata[i]["name"], jtodata[i]["url"])
                break
            }
            else {
                console.log("sorry")
            }
        }
    })
}

async function data() {

}
data()

