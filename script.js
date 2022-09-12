// ================= TOGGLE CART ========================= //
(function(){
    const toggleCart = document.querySelector('.toggle-cart');
    const cart = document.getElementById('cart');
    
    toggleCart.addEventListener('click', () => {
        //condition ? exprIfTrue : exprIfFalse
        cart.ariaExpanded == "false" ? cart.ariaExpanded = "true" : cart.ariaExpanded = "false";
    })
})();

// ================= ADD TO CART  & OTHER RELATED FUNCTIONS ========================= //
(function(){
    const storeCarts = document.querySelectorAll('.store-cart-icon');
    // ADD TO CART AND OTHER //
    storeCarts.forEach(storeCart => {
        storeCart.addEventListener('click', cart => {
            if(cart.target.parentElement.classList.contains('store-cart-icon')){

                // ROMOVING MSG //
                let emptyMsg = document.querySelector('.empty-msg');
                emptyMsg.style.display = "none";
                
                // object to store informations //
                let cartItem = {};

                // getting img path of current item to change it with other file //
                let fullPath = cart.target.parentElement.previousElementSibling.src;
                
                let currFileInd = fullPath.indexOf('cart') +4;
                
                let partialPath = fullPath.slice(currFileInd);
                
                let finalPath = `images/cart-img${partialPath}`;

                // store curr img into object //
                cartItem.img = finalPath;

                let name = cart.target.parentElement.parentElement.nextElementSibling.children[0].textContent;

                // store curr name into object //
                cartItem.name = name;

                let price = cart.target.parentElement.parentElement.nextElementSibling.children[1].textContent.slice(1);
                
                // store curr price into object //
                cartItem.price = price;

                // targetting items list (ul tag) //
                let itemsList = document.querySelector('.cart-items-list');

                // create list tag //
                let listTag = document.createElement('li');

                // add relevant classes to list tag //
                listTag.classList.add("cart-item", "d-flex", "justify-content-between", "align-items-center", "mb-2");
                
                // add relevant html to list tag with object information //
                listTag.innerHTML = `<img class="cart-item-img" src=${cartItem.img} alt="cart-item-image">
                <p class="cart-item-name m-0 fw-bold">${cartItem.name} <span class="cart-item-price">$${cartItem.price}</span></p>
                <i class="fa-solid fa-trash"></i>`;

                // append list tag with items list (ul tag)
                itemsList.appendChild(listTag);

                // calling show total //
                showTotal();

                // calling incresing item number function //
                increaseItemNumbers();

                // calling deleteItem function //
                deleteItem();
            }
        } );
    });
    
    // INCREASING ITEM NO FUNCTION //
    function increaseItemNumbers(){
        let itemsList = document.querySelector('.cart-items-list');
        let numberOfItems = document.querySelector('.number-of-items');
        let count = itemsList.children.length;
        numberOfItems.textContent = `${count} items` ;
    }

    // SHOW TOTAL FUNCTION //
    function showTotal(){
        let cartItemPrice = document.querySelectorAll('.cart-item-price');
        let total= [];
        
        cartItemPrice.forEach(price => {
            total.push(Number(price.textContent.slice(1)))
        });

        

       total = total.reduce((acc,curr) => {
            acc += curr;
            return acc;
        },0)

        let finalTotal = total.toFixed(2)

        let totalPrice = document.querySelectorAll('.total-price');
        
        totalPrice.forEach(price => {
            price.textContent = `$${finalTotal}`
        });
    }
    
    // DELETE FUNCTION //
    function deleteItem(){
         let deletBtns = document.querySelectorAll('.fa-trash');
         let itemsList = document.querySelector('.cart-items-list');

         deletBtns.forEach(delBtn => {
            delBtn.addEventListener('click', btn => {
               btn.currentTarget.parentElement.remove();
               //show total //
               showTotal();

               // calling incresing item number function //
               increaseItemNumbers();

               // removing message //
               if(itemsList.children.length == 0){
                let emptyMsg = document.querySelector('.empty-msg');
                emptyMsg.style.display = "block";
               }
            })
         })
    }
    
    // FILTER ITEMS FUNCTION //
    let filterBtns = document.querySelectorAll('.button > button');
    let varieties = document.querySelectorAll('.store-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', clicked => {
            let btnId = clicked.currentTarget.dataset.id;
            
            varieties.forEach(variety => {
                if(variety.dataset.category !== btnId && btnId !== "all"){
                    variety.style.display = "none";
                }else{
                    variety.style.display = "block";
                }
            })
        })
    })

    // SEARCH ITEM FUNCTION //
    let searchBtn = document.getElementById('basic-addon1');

    searchBtn.addEventListener('click', () => {
        let input = document.getElementsByClassName('form-control')[0];
        
        varieties.forEach(variety => {
            if(variety.dataset.category !== input.value && input.value !== "all"){
                variety.style.display = "none";
            }else{
                variety.style.display = "block";
            }
        });

        input.value = "";
    })

    // BAR BUTTON FUNCTION //
    const barBtn = document.getElementById('bar-btn');

    barBtn.addEventListener('click', () => {
        const listContainer = document.querySelector('.list-container');

        if(listContainer.ariaExpanded === "false"){
            listContainer.ariaExpanded = "true"
        }else{
            listContainer.ariaExpanded = "false"
        }
        
    })
})();