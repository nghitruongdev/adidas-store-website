//function khi onload va beforeunload
(function () {
    // localStorage.clear();
    let cart = document.getElementsByClassName('cart')[0];
    let badge = document.getElementsByClassName('cart-amount')[0];
    window.onbeforeunload = function (){
        localStorage.setItem('cart',cart.innerHTML);
        localStorage.setItem('badge',badge.innerText);
    }
    window.onload = function(){
        loadAnh();
        if(localStorage.getItem('cart')!==null){
            cart.innerHTML = localStorage.getItem('cart');
        }
        if(localStorage.getItem('badge')!==null){
            badge.innerText = localStorage.getItem('badge');
        }

    }
}())

//display top-right-info
let cartBox = document.getElementsByClassName('cart')[0];
let userBox = document.getElementsByClassName('user-info')[0];

function displayCart() {
    userBox.classList.remove('user-info-active');
    cartBox.classList.toggle('cart-show');
}

function displayUser() {
    cartBox.classList.remove('cart-show');
    userBox.classList.toggle('user-info-active');
}
    




/*------------------------------------------SLIDE_SHOW------------------------------------------------*/ 
//function tao slide show 
(function () {
    setInterval(function tg() {
        let now = new Date();
        let clockHTML = document.getElementsByClassName('clock')[0];
        clockHTML.innerHTML = `${now.getHours()} : ${now.getMinutes()} : ${now.getSeconds()}`;
    }, 1000);
}())

let images = [];
function loadAnh() {
    for (let i = 0; i < 3; i++) {
        images[i] = new Image();
        images[i].src = `img/slide-show/${i}.jpg`;
    }
}

let currentIndex = 0;
let imgSlide = document.getElementsByClassName('slide-show-image')[0];
const slideBtn = document.querySelectorAll('.slide-show-bottom-button-item');

function clearDots() {
    slideBtn.forEach(function (btn) {
        btn.classList.remove('slide-show-bottom-button-item-active');
    })
}

function addDots(i) {
    slideBtn[i].classList.add('slide-show-bottom-button-item-active');
}

let auto;

function setAuto() {
    auto = setInterval("browseImage('right')", 2000);

}

function clearAuto() {
    clearInterval(auto);
}

//set auto slide-show
(function () {
    setAuto();
    let slideshowBtn = document.querySelectorAll('.slide-show-btn');
    // console.log(slideshowBtn);
    slideshowBtn.forEach(function (btn) {
        btn.addEventListener('click', function (event) {
            clearAuto();
            setAuto();
        })
    })
}());

//chuyen hinh anh theo dot
(function () {
    slideBtn.forEach(function (btn) {
        btn.addEventListener('click', function (event) {
            for (let i = 0; i < slideBtn.length; i++) {
                if (event.target === slideBtn[i])
                    currentIndex = i;
            }
            imgSlide.src = images[currentIndex].src;
            clearDots();
            addDots(currentIndex);
        })
    })
}());
//function left and right
function browseImage(button) {
    if (button === 'right') {
        currentIndex < images.length - 1 ? currentIndex++ : currentIndex = 0;
    } else {
        currentIndex > 0 ? currentIndex-- : currentIndex = images.length - 1;
    }
    imgSlide.src = images[currentIndex].src;
    clearDots();
    addDots(currentIndex);
}

//function thumbnail
(function () {
    const thumbProducts = document.querySelectorAll('.img-thumbnail');
    thumbProducts.forEach(function (thumb) {
        thumb.addEventListener('click', function (event) {
            let curThumb = event.target;
            let img = event.target.parentElement.previousElementSibling;
            img.src = curThumb.src;
        })
    })
}());

/*-------------------------------------------------Cart----------------------------------------------- */
//function add-to-cart
(function () {
    isCartEmpty();
    const addBtn = document.querySelectorAll('.add-to-cart');
    addBtn.forEach(function (btn) {
        btn.addEventListener('click', function (event) {
            let product_container = event.target.parentElement.parentElement;
            if (product_container.classList.contains('product-container')) {
                let product = {};
                product.img = new Image();
                let img = product_container.getElementsByClassName('pr-img')[0];
                let name = product_container.getElementsByClassName('pr-name')[0].textContent;
                let type = product_container.getElementsByClassName('pr-type')[0].textContent;
                let price = product_container.getElementsByClassName('pr-price')[0].textContent;
                product.name = name;
                product.img.src = img.src;
                product.type = type;
                product.price = parseFloat(price.slice(0, price.indexOf(' VND')));
                while(true){
                    product.qty = prompt('Vui lòng nhập số lượng:','1');
                    if(product.qty===null) return false;
                    if(product.qty>0) break;
                }

                let cartDiv = document.getElementsByClassName('cart')[0];
                let div = document.createElement('div');
                let summary = document.getElementsByClassName('cart-summary')[0];
                // console.log(summary);
                div.classList.add('cart-product', 'container-fluid', 'd-flex', 'justify-content-between', 'mt-3');
                div.innerHTML = `<div class="col-1"></div>
                                 <div class="cart-product-info d-flex col-6">
                                    <img alt="" class="cart-product-img" src="${product.img.src}">
                                    <div class="d-flex flex-column mx-3">
                                        <span class="cart-product-name">${product.name}</span>
                                        <span class="cart-product-type ">${product.type}</span>
                                    </div>
                                </div>
                                <div class="col-3 d-flex flex-column align-items-center">
                                <div class="cart-product-quantity d-flex">
<button class="cart-btn in-btn d-flex justify-content-center align-items-center"
        onclick="changeQty(this,'-');"><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
  <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
</svg></span>
</button>
<div class="cart-btn d-flex justify-content-center align-items-center"><span
class="px-2 product-qty">${product.qty}</span></div>
<button class="cart-btn de-btn d-flex justify-content-center align-items-center"
        onclick="changeQty(this,'+');"><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
  <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
</svg>
</span></button>
</div>
<span class="cart-product-price mt-2 text-danger" data-price="${product.price}">đ ${product.price}</span>
</div>
<div class="col-2 d-flex justify-content-end"><a class="remove-btn btn" onclick="removeItem(this);">
<svg class="bi bi-trash" fill="red" height="30"
     viewBox="0 0 16 16" width="30" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
      fill-rule="evenodd"/>
</svg></a></div>
</div>`;
                
                cartDiv.insertBefore(div, cartDiv.firstChild);
                // cart.push(product);
                isCartEmpty();
                countBadge();
                changeAmount();
                swal({
                    title: "Good job!",
                    text: "Đã thêm vào giỏ hàng thành công!",
                    icon: "success",
                    button: false,
                    timer: 1000,
                });
            }
        })
    })
}());

//function remove-from-cart
function removeItem(button) {
    let item = button.parentElement.parentElement;
    let cart = document.getElementsByClassName('cart')[0];
    swal({
        title: "Bạn có muốn xoá sản phẩm ra khỏi giỏ hàng?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            cart.removeChild(item);
            isCartEmpty();
            countBadge();
            changeAmount();
            swal("Đã xoá sản phẩm!", {
                icon: "success",
                button: false,
                timer: 1000,
            });
        }
    });


}

//function kiem tra cart
function isCartEmpty() {
    let emptyText = document.getElementsByClassName('empty-cart')[0];
    let summary = document.getElementsByClassName('cart-summary')[0];
    let products = document.getElementsByClassName('cart')[0].getElementsByClassName('cart-product');
    if (!products.length) {
        emptyText.style.display = 'block';
        summary.classList.remove('d-flex');
        summary.style.display = 'none';
    } else {
        emptyText.style.display = 'none';
        summary.classList.add('d-flex');
        summary.style.display = 'block';
    }
}

//function dem so loai san pham
function countBadge() {
    let cart = document.getElementsByClassName('cart')[0];
    let pros = cart.getElementsByClassName('cart-product');
    let badge = document.getElementsByClassName('cart-amount')[0];
    badge.innerText = pros.length;
}

//function thay doi so luong san pham
function changeQty(button, operator) {
    let qtyContainer = button.parentElement.getElementsByClassName('product-qty')[0];
    let quantity = Number(qtyContainer.innerText);
    if (operator === '-') {
        if (quantity <= 1) {
            removeItem(button.parentElement);
        } else {
            quantity--;
        }
    } else {
        quantity++;
    }
    qtyContainer.innerText = quantity;
    changeAmount();
}

//function tinh tong tien
function changeAmount() {
    let products = document.getElementsByClassName('cart')[0].getElementsByClassName('cart-product');
    let total = document.getElementsByClassName('summary-total-amount')[0];
    let sumTotal = 0;
    for (let pro of products) {
        let qty = pro.getElementsByClassName('product-qty')[0].innerText;
        let price = pro.getElementsByClassName('cart-product-price')[0];
        let priceItem = price.getAttribute('data-price');
        price.innerText = `đ ${qty * priceItem}`;
        sumTotal += priceItem * qty;
    }
    total.innerText = `${sumTotal} VND`;
}



//login authentication
function signUpWarning() {
    let signupLink = document.createElement('div');
    signupLink.innerHTML = `Vui lòng <a class="text-decoration-none" href="../pages/login.html">đăng nhập</a> hoặc <a class="text-decoration-none" href="../pages/sign-up.html">đăng kí tài khoản</a><br> để tiếp tục thanh toán.`;
    swal({
        content: signupLink,
        buttons: 'Tiếp tục'

    })
    .then((value) => {
        if (value) window.location.replace('pages/sign-up.html');
    });
}

/*----------------------------------------AUTHENTICATION----------------------------------------------*/
//function login-user-info
(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            hasLogin(user);
            let userWelcome = document.querySelector('.user-login-info');
            userWelcome.innerHTML = `Xin chào, ${user.displayName}`;
             }
            else {
            hasLogin(false);
           } 
        });
}())
    
function hasLogin(user) {
    let cartLink = document.getElementsByClassName('cart-link')[0];
    if (user) {
        cartLink.removeAttribute('onclick');
        displayUserInfo(user);
    } else {
        cartLink.setAttribute('onclick','signUpWarning()');
        displayUserInfo(user);
    }
}
function displayUserInfo(user){
    let container = document.getElementsByClassName('user-info')[0];
    if (user) {
         container.innerHTML = `<img src="img/user-avatar.png" alt="" class='w-25 mb-4'>
					<div class='d-flex container justify-content-between align-items-center mb-2'>
						<span class=''>Xin chào,<br>${user.displayName}</span>
						<a href="" onclick='signOut();' class=' btn btn-primary align-self-end text-decoration-none'>Log Out</a>
					</div>`;
    } else {
    container.innerHTML = `<span>Vui lòng <a href="pages/login.html" class='text-decoration-none'>đăng nhập</a> hoặc <a href="pages/sign-up.html" class='text-decoration-none'>đăng kí</a></span>`;
    }
   
}
function signOut() {
    auth.signOut();
}