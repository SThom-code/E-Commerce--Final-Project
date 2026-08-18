function openTab(event, tabId) {
    event.preventDefault();
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

let slideIndex = 0;
let slideInterval;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;

    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    slideIndex = index;
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    let nextIndex = (slideIndex + 1) % slides.length;
    showSlide(nextIndex);
}

function startSlideshow() {
    slideInterval = setInterval(nextSlide, 6000); 
}

function currentSlide(index) {
    clearInterval(slideInterval);
    showSlide(index);
    startSlideshow();
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
    new Product(102, "Pink Cargo Pants", 95.00, 3)
];

let currentUser = null; 

function signUp(newName, newUsername, newPassword) {
    try {
        if (!newName.trim() || !newUsername.trim() || !newPassword.trim()) {
            throw new Error("Please fill out all registration fields!");
        }

        const usernameExists = users.some(u => u.username === newUsername.trim());
        if (usernameExists) {
            throw new Error("That username is already taken!");
        }

        const registeredUser = new User(newUsername.trim(), newPassword.trim(), newName.trim(), 200.00);
        users.push(registeredUser); // Add item directly to storage list [LISTS]

        showNotice(`Account created for ${newName}! You can now log in.`, "success");
    } catch (err) {
        showNotice(err.message, "error");
    }
}

function login(enteredUser, enteredPass) {
    try {
        if (!enteredUser.trim() || !enteredPass.trim()) {
            throw new Error("Don't leave the login boxes empty!");
        }

        let foundUser = null;
        for (let i = 0; i < users.length; i++) {
            if (users[i].username === enteredUser) {
                foundUser = users[i];
                break;
            }
        }

        if (!foundUser || foundUser.password !== enteredPass) {
            throw new Error("Wrong username or password.");
        }

        currentUser = foundUser;
        showNotice(`Welcome back, ${currentUser.fullName}!`, "success");
        updateScreen();
    } catch (err) {
        showNotice(err.message, "error");
    }
}

function addToCart(productId, countInput) {
    try {
        if (!currentUser) {
            throw new Error("You must log in before shopping!");
        }

        const count = parseInt(countInput);
        if (isNaN(count) || count <= 0) {
            throw new Error("Please enter a valid amount greater than zero.");
        }

        const product = inventory.find(p => p.id === productId);
        if (!product) {
            throw new Error("Item not found in store collection.");
        }

        if (count > product.stock) {
            throw new Error(`We only have ${product.stock} left in stock.`);
        }

        const existingItem = currentUser.cart.find(item => item.product.id === productId);
        
        if (existingItem) {
            if (existingItem.count + count > product.stock) {
                throw new Error("You can't add more than what we have in stock.");
            }
            existingItem.count += count; // Addition calculations [ARITHMETIC]
        } else {
            currentUser.cart.push({ product, count }); // Append item to cart list [LISTS]
        }

        showNotice(`Added ${count}x ${product.name} to cart!`, "success");
        updateScreen();
    } catch (err) {
        showNotice(err.message, "error");
    }
}

function checkout(promoCode) {
    try {
        if (!currentUser) throw new Error("Please log in again.");
        if (currentUser.cart.length === 0) throw new Error("Your cart is empty.");

        let subtotal = 0;
        for (let item of currentUser.cart) {
            subtotal += item.product.price * item.count;
        }

        let discount = 0;
        const code = promoCode.toUpperCase().trim();
        if (code === "LESBROWN" || code === "LESPINK") {
            discount = subtotal * 0.15; // 15% reduction calculations [ARITHMETIC]
        } else {
            discount = 0;
        }

        const tax = subtotal * 0.13; // Ontario HST calculation arithmetic [ARITHMETIC]
        const total = (subtotal + tax) - discount;

        if (currentUser.funds < total) {
            throw new Error(`Not enough money! You need $${total.toFixed(2)}.`);
        }

        currentUser.funds -= total;
        for (let item of currentUser.cart) {
            item.product.stock -= item.count;
        }

        showNotice(`Purchase success! Paid: $${total.toFixed(2)}. Saved: $${discount.toFixed(2)}.`, "success");
        currentUser.cart = []; // Flush active cart array fields back to blank [LISTS]
        updateScreen();
    } catch (err) {
        showNotice(err.message, "error");
    }
}

function logout() {
    if (currentUser) {
        showNotice("Logged out safely. See ya!", "success");
        currentUser = null;
        updateScreen();
    }
}


function updateScreen() {
    const checkoutTabPanel = document.getElementById("checkout-tab");
    if (!checkoutTabPanel) return;

    if (!currentUser) {
        checkoutTabPanel.innerHTML = `
            <h2 class="category-title">Checkout</h2>
            <p style="text-align: center; color: #555;">Please log in to review your checkout details.</p>
        `;
    } else {
        let cartLinesHtml = "";
        if (currentUser.cart.length === 0) {
            cartLinesHtml = "<p>Your shopping cart is completely empty.</p>";
        } else {
            for (let item of currentUser.cart) {
                cartLinesHtml += `<p>• ${item.count}x ${item.product.name} — $${(item.product.price * item.count).toFixed(2)}</p>`;
            }
        }

        checkoutTabPanel.innerHTML = `
            <h2 class="category-title">Checkout Dashboard</h2>
            <div style="background: #F9EAE1; padding: 15px; margin-bottom: 15px; border-radius: 5px; color: #2B1E19;">
                <p><strong>Shopper Profile:</strong> ${currentUser.fullName}</p>
                <p><strong>Available Wallet Funds:</strong> $${currentUser.funds.toFixed(2)}</p>
                <button onclick="logout()" style="background:#E29B9B; border:none; padding:5px 10px; cursor:pointer; font-weight:bold;">Log Out</button>
            </div>
            
            <div style="background: #FFF; padding: 15px; border: 1px solid #2B1E19; border-radius: 5px;">
                <h3>Your Active Items Selection</h3>
                ${cartLinesHtml}
                <hr style="border-top: 1px dashed #2B1E19;">
                <input type="text" id="promoInput" placeholder="Promo Code" style="padding: 5px; margin-right: 10px;">
                <button onclick="checkout(document.getElementById('promoInput').value)" style="background:#E29B9B; border:none; padding:6px 12px; cursor:pointer; font-weight:bold;">Complete Purchase</button>
            </div>
        `;
    }
}

function showNotice(text, type) {
    let box = document.getElementById("msg-box");
    if (!box) {

