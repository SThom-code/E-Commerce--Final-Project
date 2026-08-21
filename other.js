function openTab(event, tabId) {
    if (event) {
        event.preventDefault();
    }

    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active');

    if (event && event.currentTarget && event.currentTarget.classList.contains('nav-link')) {
        event.currentTarget.classList.add('active');
    }
}

class User {
    constructor(username, password, fullName, initialFunds) {
        this.username = username;
        this.password = password;
        this.fullName = fullName;
        this.funds = initialFunds;
        this.cart = [];
    }
}

class Product {
    constructor(id, name, price, stock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }
}

const users = [
    new User("les_pink", "vintage2026", "Leslie Pinkerton", 250.00),
    new User("streetwear_bro", "brown88", "Jordan Brown", 85.50),
    new User("noir_chic", "blackout", "Chantal Noire", 500.00)
];

const inventory = [
    new Product(101, "LES Espresso Hoodie", 85.00, 5),
    new Product(102, "Pink Cargo Pants", 95.00, 3),
    new Product(103, "Midnight Black Trench", 150.00, 2),
    new Product(104, "Boutique Vintage Tee", 45.00, 10),

    new Product(201, "LES Luxury Backpack", 110.00, 4),
    new Product(202, "Retro Knit Sweater", 75.00, 6),
    new Product(203, "Oxford Button Shirt", 55.00, 8),
    new Product(204, "Boutique Retro Shoes", 125.00, 3),
    new Product(205, "Bermuda Casual Shorts", 50.00, 12),

    new Product(206, "Pink Pleated Skirt", 60.00, 7),
    new Product(207, "Vintage Denim Jorts", 65.00, 8),
    new Product(208, "Black Flared Leggings", 45.00, 10),
    new Product(209, "Lace Trim Mini Skirt", 55.00, 6),
    new Product(210, "Low-Rise Denim Skirt", 70.00, 5),
    new Product(211, "Pink Ribbon Leggings", 50.00, 7),
    new Product(212, "Vintage Cargo Jorts", 68.00, 9),
    new Product(213, "Satin Coquette Skirt", 58.00, 6)
];

let currentUser = null;

function handleLoginSubmit() {
    const enteredUser = document.getElementById("loginUser").value;
    const enteredPass = document.getElementById("loginPass").value;

    login(enteredUser, enteredPass);
}

const selectedSizes = {};

function selectSize(productId, size, button) {
    selectedSizes[productId] = size;

    const buttons = button.parentElement.querySelectorAll('.size-btn');

    buttons.forEach(btn => {
        btn.classList.remove('active');
    });

    button.classList.add('active');
}

function handleRegistrationSubmit() {
    const newName = document.getElementById("regName").value;
    const newUsername = document.getElementById("regUser").value;
    const newPassword = document.getElementById("regPass").value;

    signUp(newName, newUsername, newPassword);
}

function signUp(newName, newUsername, newPassword) {
    newName = newName.trim();
    newUsername = newUsername.trim();
    newPassword = newPassword.trim();

    if (newName === "" || newUsername === "" || newPassword === "") {
        showNotice("Please fill out all registration fields!", "error");
        return;
    }

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === newUsername) {
            showNotice("That username is already taken!", "error");
            return;
        }
    }

    const newUser = new User(
        newUsername,
        newPassword,
        newName,
        700.00
    );

    users.push(newUser);

    showNotice(
        `Account registered for ${newName}! You can now sign in.`,
        "success"
    );

    document.getElementById("regName").value = "";
    document.getElementById("regUser").value = "";
    document.getElementById("regPass").value = "";
}

function login(enteredUser, enteredPass) {
    enteredUser = enteredUser.trim();
    enteredPass = enteredPass.trim();

    if (enteredUser === "" || enteredPass === "") {
        showNotice("Don't leave the login boxes empty!", "error");
        return;
    }

    let i = 0;

    while (i < users.length) {
        let user = users[i];

        if (enteredUser === user.username) {
            if (enteredPass === user.password) {
                currentUser = user;

                showNotice(
                    `Welcome back, ${currentUser.fullName}!`,
                    "success"
                );

                updateScreen();
                return;
            }
        }

        i++;
    }

    showNotice("Wrong username or password.", "error");
}

function addToCart(productId, countInput) {
    if (!currentUser) {
        showNotice("You must log in before shopping!", "error");
        return;
    }

    const count = parseInt(countInput);

    if (isNaN(count) || count <= 0) {
        showNotice("Enter a valid quantity greater than zero.", "error");
        return;
    }

    let product = null;

    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i].id === productId) {
            product = inventory[i];
            break;
        }
    }

    if (product === null) {
        showNotice("Item missing from catalog collection.", "error");
        return;
    }

    if (count > product.stock) {
        showNotice(
            `We only have ${product.stock} items remaining.`,
            "error"
        );
        return;
    }

    let cartItem = null;

    for (let i = 0; i < currentUser.cart.length; i++) {
        if (currentUser.cart[i].product.id === productId) {
            cartItem = currentUser.cart[i];
            break;
        }
    }

    if (cartItem !== null) {
        if (cartItem.count + count > product.stock) {
            showNotice(
                "Cart requests exceed store capacity.",
                "error"
            );
            return;
        }

        cartItem.count += count;
    } else {
        currentUser.cart.push({
            product: product,
            count: count
        });
    }

    showNotice(
        `Added ${count}x ${product.name} to cart!`,
        "success"
    );

    updateScreen();
}

function checkout(promoCode) {
    if (!currentUser) {
        showNotice("Login session expired.", "error");
        return;
    }

    if (currentUser.cart.length === 0) {
        showNotice("Your cart is completely empty.", "error");
        return;
    }

    let subtotal = 0;

    for (let i = 0; i < currentUser.cart.length; i++) {
        let item = currentUser.cart[i];
        subtotal += item.product.price * item.count;
    }

    promoCode = promoCode.trim().toUpperCase();

    let discount = 0;

    if (promoCode === "LESPINK" || promoCode === "LESBROWN") {
        discount = subtotal * 0.15;
    }

    let discountedSubtotal = subtotal - discount;
    let tax = discountedSubtotal * 0.13;
    let total = discountedSubtotal + tax;

    if (currentUser.funds < total) {
        showNotice(
            `Insufficient funds. Total cost is $${total.toFixed(2)}.`,
            "error"
        );
        return;
    }

    currentUser.funds -= total;

    for (let i = 0; i < currentUser.cart.length; i++) {
        let item = currentUser.cart[i];
        item.product.stock -= item.count;
    }

    currentUser.cart = [];

    showNotice(
        `Purchase success! Total paid: $${total.toFixed(2)}.`,
        "success"
    );

    updateScreen();
}

function logout() {
    if (currentUser !== null) {
        currentUser = null;
        updateScreen();
        showNotice("Logged out safely. See ya!", "success");
    }
}

function updateScreen() {
    const checkoutTabPanel = document.getElementById("checkout-tab");

    if (!checkoutTabPanel) {
        return;
    }

    if (currentUser === null) {
        checkoutTabPanel.innerHTML = `
            <h2 class="category-title">Checkout</h2>
            <p style="text-align:center; font-family:'Georgia', serif; color:#555;">
                Please log in to review your checkout details.
            </p>
        `;

        return;
    }

    let cartLinesHtml = "";
    let subtotal = 0;

    for (let i = 0; i < currentUser.cart.length; i++) {
        let item = currentUser.cart[i];
        let itemTotal = item.product.price * item.count;

        subtotal += itemTotal;

        cartLinesHtml += `
            <div style="
                background:#FFF;
                padding:12px;
                margin-bottom:10px;
                border-radius:6px;
                border:1px dashed #ff99cc;
                display:flex;
                justify-content:space-between;
                align-items:center;
            ">
                <span style="font-size:14px; font-weight:bold;">
                    ${item.count}x ${item.product.name}
                </span>

                <span style="font-size:14px; color:#333;">
                    $${itemTotal.toFixed(2)}
                </span>
            </div>
        `;
    }

    if (currentUser.cart.length === 0) {
        cartLinesHtml = `
            <p style="color:#777; font-size:14px; margin:10px 0;">
                Your shopping cart is completely empty.
            </p>
        `;
    }

    checkoutTabPanel.innerHTML = `
        <h2 class="category-title">Checkout Dashboard</h2>

        <div style="
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:40px;
            max-width:1000px;
            margin:0 auto;
            padding-bottom:50px;
        ">

            <div style="
                background:#ffffff;
                padding:25px;
                border-radius:12px;
                box-shadow:0 4px 10px rgba(0,0,0,0.05);
                border:1px solid #ddd;
            ">

                <h3 style="
                    font-family:'Georgia', serif;
                    font-size:18px;
                    margin-bottom:15px;
                    border-bottom:1px dashed #ff99cc;
                    padding-bottom:5px;
                ">
                    Shopper Balance
                </h3>

                <p style="font-size:14px; margin:8px 0;">
                    <strong>Customer:</strong>
                    ${currentUser.fullName}
                </p>

                <p style="font-size:14px; margin:8px 0;">
                    <strong>Wallet Cash:</strong>
                    <span style="color:#ff99cc; font-weight:bold;">
                        $${currentUser.funds.toFixed(2)}
                    </span>
                </p>

                <button
                    onclick="logout()"
                    style="
                        background:#333;
                        color:#fff;
                        border:none;
                        padding:10px 20px;
                        cursor:pointer;
                        font-family:'Arial', sans-serif;
                        font-size:12px;
                        font-weight:bold;
                        border-radius:6px;
                        text-transform:uppercase;
                        margin-top:20px;
                    "
                >
                    Log Out
                </button>
            </div>

            <div style="
                background:#ffffff;
                padding:25px;
                border-radius:12px;
                box-shadow:0 4px 10px rgba(0,0,0,0.05);
                border:1px solid #ddd;
            ">

                <h3 style="
                    font-family:'Georgia', serif;
                    font-size:18px;
                    margin-bottom:15px;
                    border-bottom:1px dashed #ff99cc;
                    padding-bottom:5px;
                ">
                    Shopping Ledger
                </h3>

                ${cartLinesHtml}

                <div style="
                    margin-top:20px;
                    padding-top:15px;
                    border-top:1px dashed #ddd;
                ">

                    <p style="
                        display:flex;
                        justify-content:space-between;
                        font-family:'Arial', sans-serif;
                        font-size:14px;
                        margin-bottom:12px;
                    ">
                        <strong>Subtotal:</strong>
                        <span>$${subtotal.toFixed(2)}</span>
                        <strong>Tax:</strong>
                        <span>$${(subtotal * 0.13).toFixed(2)}</span>
                        <strong>Total:</strong>
                        <span>$${(subtotal + (subtotal * 0.13)).toFixed(2)}</span>
                    </p>

                    <input
                        type="text"
                        id="promoInput"
                        placeholder="ENTER COUPON CODE"
                        style="
                            width:100%;
                            padding:12px;
                            margin-bottom:12px;
                            border:1px solid #ccc;
                            border-radius:6px;
                            font-size:13px;
                        "
                    >


                    <button
                        onclick="checkout(document.getElementById('promoInput').value)"
                        style="
                            background:linear-gradient(to bottom,#333,#000);
                            color:#fff;
                            border:none;
                            padding:14px;
                            cursor:pointer;
                            font-family:'Arial', sans-serif;
                            font-size:13px;
                            font-weight:bold;
                            border-radius:6px;
                            text-transform:uppercase;
                            width:100%;
                        "
                    >
                        Process Payment
                    </button>

                </div>
            </div>
        </div>
    `;
}

function showNotice(text, type) {
    let box = document.getElementById("msg-box");

    if (!box) {
        box = document.createElement("div");
        box.id = "msg-box";

        box.style.position = "fixed";
        box.style.bottom = "20px";
        box.style.right = "20px";
        box.style.padding = "15px 25px";
        box.style.borderRadius = "8px";
        box.style.zIndex = "1000";
        box.style.fontWeight = "bold";
        box.style.fontFamily = "'Arial', sans-serif";
        box.style.fontSize = "14px";
        box.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";

        document.body.appendChild(box);
    }

    box.innerText = text;
    box.style.background = "#FFFFFF";
    box.style.color = "#333333";

    if (type === "success") {
        box.style.border = "3px double #ff99cc";
    } else {
        box.style.border = "3px double #333333";
    }

    clearTimeout(box.noticeTimer);

    box.noticeTimer = setTimeout(() => {
        box.innerText = "";
        box.style.background = "none";
        box.style.border = "none";
        box.style.boxShadow = "none";
    }, 4000);
}

window.addEventListener("DOMContentLoaded", function() {
    updateScreen();
});



