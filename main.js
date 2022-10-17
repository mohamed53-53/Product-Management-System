let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let create = document.getElementById('create')
let search = document.getElementById("search")
let searchT = document.getElementById("search-title")
let searchC = document.getElementById("search-category")
let update = document.getElementById("update")
let delete1 = document.getElementById("delete")
let body1 = document.getElementById("body1")

let createMood = "Create";
let searchMood = "title"
let tmp;
// get our product data from localStorage
let dataProduct;
if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product)
} else {
    dataProduct = []
}



create.onclick = function () {
    let newprduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (price.value !== '' && taxes.value !== '' && ads.value !== '' && discount.value !== ''&&count.value<=100) {
        if (createMood === "Create") {
            if (count.value > 1) {
                for (let i = 0; count.value > i; i++) {
                    dataProduct.push(newprduct)
                }
            } else {
                dataProduct.push(newprduct)
            }
        } else {
            dataProduct[tmp].title = title.value.toLowerCase()
            dataProduct[tmp].price = price.value
            dataProduct[tmp].taxes = taxes.value
            dataProduct[tmp].ads = ads.value
            dataProduct[tmp].discount = discount.value
            dataProduct[tmp].category = category.value.toLowerCase()
            createMood = "Create"
            create.innerHTML = "Create"
            count.style.display = "block"

        }
        clearData()
    }

    localStorage.setItem('product', JSON.stringify(dataProduct))
    
    showData()
}
// get total price 
function getTotal() {
    if (price.value !== '' && taxes.value !== '' && ads.value !== '' && discount.value !== '') {
        let sum = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = `${sum}`
        total.style.backgroundColor = 'green'
    } else {
        total.innerHTML = ''
        total.style.backgroundColor = '#a00d02'
    }
}
// clear inputs data
function clearData() {
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    count.value = ''
    category.value = ''
}
// show products data
function showData() {
    getTotal()
    let table = '';
    for (let i = 0; i < dataProduct.length; i++) {

        table +=
            `
        <tr>
            <td>${i+1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick ="updateData(${i})" id="update">Update</button></td>
            <td><button onclick ="deleteData(${i})"  id="delete">Delete</button></td>
        </tr>
    `

    }
    document.getElementById("body1").innerHTML = table
    let deletebtn = document.getElementById('delete-all')
    if (dataProduct.length > 0) {
        deletebtn.innerHTML = `<td><button onclick ="clearAll()"  id="delete-all">DeleteAll (${dataProduct.length})</button></td>`
        deletebtn.style.margin = '20px 0px'
    } else {
        deletebtn.innerHTML = '';
    }
}

showData()

//  delete
function deleteData(i) {
    dataProduct.splice(i, 1)
    localStorage.product = JSON.stringify(dataProduct);
    showData()

}
// delete all
function clearAll() {
    window.localStorage.removeItem("product");
    dataProduct.splice(0)
    showData()
}
// update
function updateData(i) {
    title.value = dataProduct[i].title
    price.value = dataProduct[i].price
    taxes.value = dataProduct[i].taxes
    ads.value = dataProduct[i].ads
    discount.value = dataProduct[i].discount
    count.style.display = "none"
    create.innerHTML = "Update"
    createMood = "Update"
    getTotal()
    category.value = dataProduct[i].category
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
}
// search mood method
function getSearchMood(id) {
    if (id == "search-title") {
        searchMood = "title"
    } else {
        searchMood = "category"
    }
    search.placeholder = "Search By " + searchMood
    search.focus()
    search.value = ''
    showData()
}
//  search on data
function searchData(value) {
    let table = '';
    for (let i = 0; dataProduct.length > i; i++) {
        if (searchMood == "title") {
            if (dataProduct[i].title.includes(value.toLowerCase())) {
                table +=
                    `
                <tr>
                    <td>${i}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button onclick ="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick ="deleteData(${i})"  id="delete">Delete</button></td>
                </tr>
            `
            }
        } else {

            if (dataProduct[i].category.includes(value.toLowerCase())) {
                table +=
                    `
                <tr>
                    <td>${i}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button onclick ="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick ="deleteData(${i})"  id="delete">Delete</button></td>
                </tr>
            `
            }
        }
    }

    document.getElementById("body1").innerHTML = table
}