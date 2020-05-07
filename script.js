// number array for checkout
var numbers = document.querySelectorAll("#checkout #numbuttons button");
//text on the checkout pane
var coText = document.querySelector("#checkout #coText");
const priceFormat = new Intl.NumberFormat('en-US',{style: 'currency', currency: 'USD', minimumFractionDigits: 2});

//variables
var str = "";
var products = [];
var shoppingCart = [];

(function setupNumbers() {
    for (var i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener("click", function () {
            str += Number(this.id);
            coText.innerHTML = str;
        });
    }
})();

function addProduct() {
    var input = document.getElementById("newProduct");
    var item = input.value;
    var product = { name: item, price: 0 };
    input.value = "";

    if (item != "") {

        products.unshift(product);
        var menuList = document.getElementById("firstSelect");
        menuList.innerHTML = "";

        products.forEach(function (item) {
            var myOption = document.createElement("option");
            myOption.text = item.name;
            menuList.add(myOption);
        });
    }
}

function addPriceOfProduct() {
    var item = document.getElementById("firstSelect").value;
    var priceOfProduct = document.getElementById("price").value;
    document.getElementById("price").value = "";

    if (priceOfProduct != "") {
        for (var i = 0; i < products.length; i++) {
            if (products[i].name == item) {
                products[i].price = priceOfProduct;

                var unitMenuList = document.getElementById("secondSelect");
                unitMenuList.innerHTML = "";

                products.forEach(function (item) {
                    var myOption = document.createElement("option");
                    myOption.text = item.name + " " +priceFormat.format(item.price) + "/unit";
                    unitMenuList.add(myOption);
                });
            }
        }
    }
}

function addToCart() {
    var totalUnits = parseInt(str);
    var table = document.getElementById("recieptTable");
    var item = document.getElementById("secondSelect").value;

    if (!isNaN(parseInt(str)) && str != "") {
        for (var i = 0; i < products.length; i++) {
            if (item.search(products[i].name) >= 0) {
                var productWithQuantity = { product: products[i], units: totalUnits, totalPrice: products[i].price * totalUnits };
                shoppingCart.push(productWithQuantity);
            }
        }
        coText.innerHTML = "Enter Next Item";

    } else { 
        coText.innerHTML = "Enter Quantity";
    }

    str = "";
    table.innerHTML = "";
    for (var i = 0; i < shoppingCart.length; i++) {
        var row = table.insertRow(table.rows.length);
        row.insertCell(0).innerHTML = shoppingCart[i].product.name;
        row.insertCell(1).innerHTML = priceFormat.format(shoppingCart[i].product.price);
        row.insertCell(2).innerHTML = shoppingCart[i].units;
        row.insertCell(3).innerHTML = priceFormat.format(shoppingCart[i].totalPrice);
    }
}

function popReciept() {
    var total = 0;

    for (var i = 0; i < shoppingCart.length; i++) {
        total += shoppingCart[i].totalPrice;
    }

    document.getElementById("TotalPrice").innerHTML = "Total Price: "+ priceFormat.format(total);
    document.getElementById("Taxes").innerHTML = "Taxes: "+ priceFormat.format(total * 0.05);
    document.getElementById("AmountDue").innerHTML = "Amount Due: " + priceFormat.format(total *1.05);
}

function myDisplayDateTime() {
    var d = new Date();
    var hours = d.getHours() % 12;
    hours = hours ? hours : 12;
    var test = "Date : " + ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()] + " " +
        ("00" + d.getDate()).slice(-2) + ", " +
        d.getFullYear() + "<br> " + "Time : " +
        ("00" + hours).slice(-2) + ":" +
        ("00" + d.getMinutes()).slice(-2) + "   " + (d.getHours() >= 12 ? 'PM' : 'AM');
    document.getElementById("dateTime").innerHTML = test;
}

function newTransaction() {
    shoppingCart = [];
    addToCart();
    popReciept();
    myDisplayDateTime();
}