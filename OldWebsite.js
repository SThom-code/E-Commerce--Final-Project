
     const productsDatabase = {
    bow_sandals: {
        id: "bow_sandals",
        name: "Pink Bow Sandals",
        price: 45,
        image: "⊹ ࣪ ˖ ᥬᩤ       𝙎𝙔𝙇𝙑𝙄𝙀       𝙇𝙀𝙀          _   ♡ྀི ⋆˚࿔.jpeg"
    },
    mary_janes: {
        id: "mary_janes",
        name: "Vintage Mary Janes",
        price: 65,
        image: "808185095670072124.jpeg"
    },
    fur_boots: {
        id: "fur_boots",
        name: "Leopard Fur Boots",
        price: 120,
        image: "936748791279688915.jpeg"
    },
    ribbon_boots: {
        id: "ribbon_boots",
        name: "Ribbon Lace-Up Boots",
        price: 90,
        image: "1135047912347905382.jpeg"
    },
    winter: {
        id: "winter",
        name: "Winter Bliss",
        price: 185,
        image: "_ (7).jpeg"
    },
    cocktail: {
        id: "cocktail",
        name: "Cocktail Hour",
        price: 140,
        image: "_ (8).jpeg"
    },
    scarlette: {
        id: "scarlette",
        name: "Scarlette's Revenge",
        price: 210,
        image: "897623769502960659.jpeg"
    },
    wedding: {
        id: "wedding",
        name: "Wedding Disaster",
        price: 250,
        image: "897623769502960658.jpeg"
    },
    ruffle_shorts: {
        id: "ruffle_shorts",
        name: "Pink Ruffle Shorts",
        price: 35,
        image: "lizzie young (1).jpeg"
    },
    polka_shorts: {
        id: "polka_shorts",
        name: "Polka Dot Shorts",
        price: 30,
        image: "ᴘᴏʟᴋᴀ ᴅᴏᴛ sʜᴏʀᴛs  ☁ (1).jpeg"
    },
    coquette_skirt: {
        id: "coquette_skirt",
        name: "Coquette Lace Skirt",
        price: 40,
        image: "cute  skirt  coquette  !!♡.jpeg"
    },
    flared_trousers: {
        id: "flared_trousers",
        name: "Y2K Flared Trousers",
        price: 55,
        image: "2025 Autumn Winter Women Y2k Long Trousers Fake Two Pieces 2000s Kpop Fashion Gyaru Low Rise Flared.jpeg"
    },
    white_coat: {
        id: "white_coat",
        name: "White Peacoat",
        price: 150,
        image: "701013498290441297.jpeg"
    },
    brown_polka_top: {
        id: "brown_polka_top",
        name: "Brown Polka Dot Top",
        price: 35,
        image: "polka dot top.jpeg"
    },
    white_polka_top: {
        id: "white_polka_top",
        name: "White Polka Dot Top",
        price: 40,
        image: "polka dot outfit inspo.jpeg"
    },
    pink_dream_top: {
        id: "pink_dream_top",
        name: "Pink Dream Top",
        price: 45,
        image: "💭.jpeg"
    },
    white_lace_top: {
        id: "white_lace_top",
        name: "Pink Fur Zip-Up Jacket",
        price: 38,
        image: "ꫂ᭪݁.jpeg"
    },
    dark_blue_top: {
        id: "dark_blue_top",
        name: "Black Babydoll Top With Bow",
        price: 42,
        image: "833377106091017171.jpeg"
    },
    pink_fuzzy_top: {
        id: "pink_fuzzy_top",
        name: "White Babydoll Top With Bow",
        price: 50,
        image: "lizzie young.jpeg"
    },
    caterina_babydoll_top: {
        id: "caterina_babydoll_top",
        name: "Caterina Babydoll Top",
        price: 48,
        image: "Caterina Babydoll Lace Top for Women Pink Long Sleeve with Polka Dot Bow.jpeg"
    }
};

let currentProduct = null;
let selectedSize = "M";
let currentQty = 1;
let shoppingCart = [];
let slideIndex = 0;
let slideInterval;

function openTab(event, tabId) {
    if (event) {
        event.preventDefault();
    }

    document.querySelectorAll(".tab-content").forEach(tab => {
        tab.classList.remove("active");
    });

    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
    });

    const selectedTab = document.getElementById(tabId);

    if (selectedTab) {
        selectedTab.classList.add("active");
    }

    if (event && event.currentTarget) {
        event.currentTarget.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function showSlide(index) {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    if (!slides.length) {
        return;
    }

    slideIndex = (index + slides.length) % slides.length;

    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[slideIndex].classList.add("active");

    if (dots[slideIndex]) {
        dots[slideIndex].classList.add("active");
    }
}

function nextSlide() {
    showSlide(slideIndex + 1);
}

function currentSlide(index) {
    clearInterval(slideInterval);
    showSlide(index);
    startSlideshow();
}

function startSlideshow() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 6000);
}

function viewProduct(productId) {
    const product = productsDatabase[productId];

    if (!product) {
        return;
    }

    currentProduct = product;
    currentQty = 1;
    selectedSize = "M";

    document.getElementById("pv-img").src = product.image;
    document.getElementById("pv-img").alt = product.name;
    document.getElementById("pv-title").textContent = product.name;
    document.getElementById("pv-price").textContent =
        `$${product.price.toFixed(2)}`;
    document.getElementById("pv-qty").textContent = currentQty;

    document.querySelectorAll(".size-circle").forEach(size => {
        size.classList.remove("active");

        if (size.textContent.trim() === "M") {
            size.classList.add("active");
        }
    });

    openTab(null, "product-view-tab");
}

function selectSize(element, size) {
    document.querySelectorAll(".size-circle").forEach(item => {
        item.classList.remove("active");
    });

    element.classList.add("active");
    selectedSize = size;
}

function changeQty(amount) {
    currentQty += amount;

    if (currentQty < 1) {
        currentQty = 1;
    }

    document.getElementById("pv-qty").textContent = currentQty;
}

function addToCart() {
    if (!currentProduct) {
        return;
    }

    const existingItem = shoppingCart.find(
        item =>
            item.id === currentProduct.id &&
            item.size === selectedSize
    );

    if (existingItem) {
        existingItem.qty += currentQty;
    } else {
        shoppingCart.push({
            ...currentProduct,
            size: selectedSize,
            qty: currentQty
        });
    }

    updateCartUI();
    openTab(null, "checkout-tab");
}

function removeFromCart(index) {
    if (index < 0 || index >= shoppingCart.length) {
        return;
    }

    shoppingCart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById("cart-container");
    const subtotalElement = document.getElementById("summary-subtotal");
    const totalElement = document.getElementById("summary-total");

    if (!container || !subtotalElement || !totalElement) {
        return;
    }

    if (shoppingCart.length === 0) {
        container.innerHTML =
            '<div class="empty-cart-msg">Your shopping bag is empty.</div>';

        subtotalElement.textContent = "$0.00";
        totalElement.textContent = "$0.00";
        return;
    }

    let subtotal = 0;

    container.innerHTML = shoppingCart.map((item, index) => {
        const itemTotal = item.price * item.qty;
        subtotal += itemTotal;

        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">

                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-details">
                        Size: ${item.size} | Quantity: ${item.qty}
                    </div>
                    <button class="remove-cart-btn" onclick="removeFromCart(${index})">
                        Remove
                    </button>
                </div>

                <div class="cart-item-price">
                    $${itemTotal.toFixed(2)}
                </div>
            </div>
        `;
    }).join("");

    const shipping = subtotal > 0 ? 15 : 0;
    const total = subtotal + shipping;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

function proceedToCheckout() {
    if (shoppingCart.length === 0) {
        alert("Your shopping bag is empty.");
        return;
    }

    const subtotal = shoppingCart.reduce(
        (total, item) => total + item.price * item.qty,
        0
    );

    const total = subtotal + 15;

    alert(
        `Order ready!\n\nSubtotal: $${subtotal.toFixed(2)}\nShipping: $15.00\nTotal: $${total.toFixed(2)}`
    );
}

document.addEventListener("DOMContentLoaded", () => {
    showSlide(0);
    startSlideshow();
    updateCartUI();

    const checkoutButton = document.querySelector(".checkout-btn");

    if (checkoutButton) {
        checkoutButton.addEventListener("click", proceedToCheckout);
    }
});
