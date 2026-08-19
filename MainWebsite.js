
        // Tab Navigation
        function openTab(event, tabId); {
            if(event) event.preventDefault(); 
            const tabs = document.querySelectorAll('.tab-content');
            tabs.forEach(tab => tab.classList.remove('active'));
            
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => link.classList.remove('active'));
            
            document.getElementById(tabId).classList.add('active');
            
            if(event && event.currentTarget) {
                event.currentTarget.classList.add('active');
            }
        }

        // Slideshow
        let slideIndex = 0;
        let slideInterval;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');

        function showSlide(index) {
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            slideIndex = index;
        }

        function nextSlide() {
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

        startSlideshow();

        // PRODUCT DATABASE
        const productsDatabase = {
            'bow_sandals': { id: 'bow_sandals', name: 'Pink Bow Sandals', price: 45.00, image: '⊹ ࣪ ˖ ᥬᩤ       𝙎𝙔𝙇𝙑𝙄𝙀       𝙇𝙀𝙀          _   ♡ྀི ⋆˚࿔.jpeg' },
            'mary_janes': { id: 'mary_janes', name: 'Vintage Mary Janes', price: 65.00, image: '808185095670072124.jpeg' },
            'fur_boots': { id: 'fur_boots', name: 'Leopard Fur Boots', price: 120.00, image: '936748791279688915.jpeg' },
            'ribbon_boots': { id: 'ribbon_boots', name: 'Ribbon Lace-Up Boots', price: 90.00, image: '1135047912347905382.jpeg' },
            'winter': { id: 'winter', name: 'Winter Bliss', price: 185.00, image: '_ (7).jpeg' },
            'cocktail': { id: 'cocktail', name: 'Cocktail Hour', price: 140.00, image: '_ (8).jpeg' },
            'scarlette': { id: 'scarlette', name: 'Scarlette\'s Revenge', price: 210.00, image: '897623769502960659.jpeg' },
            'wedding': { id: 'wedding', name: 'Wedding Disaster', price: 250.00, image: '897623769502960658.jpeg' },
            'ruffle_shorts': { id: 'ruffle_shorts', name: 'Pink Ruffle Shorts', price: 35.00, image: 'lizzie young (1).jpeg' },
            'polka_shorts': { id: 'polka_shorts', name: 'Polka Dot Shorts', price: 30.00, image: 'ᴘᴏʟᴋᴀ ᴅᴏᴛ sʜᴏʀᴛs  ☁ (1).jpeg' },
            'coquette_skirt': { id: 'coquette_skirt', name: 'Coquette Lace Skirt', price: 40.00, image: 'cute  skirt  coquette  !!♡.jpeg' },
            'flared_trousers': { id: 'flared_trousers', name: 'Y2K Flared Trousers', price: 55.00, image: '2025 Autumn Winter Women Y2k Long Trousers Fake Two Pieces 2000s Kpop Fashion Gyaru Low Rise Flared.jpeg' },
            'white_coat': { id: 'white_coat', name: 'White Peacoat', price: 150.00, image: '701013498290441297.jpeg' },
            'brown_polka_top': { id: 'brown_polka_top', name: 'Brown Polka Dot Top', price: 35.00, image: 'polka dot top.jpeg' },
            'white_polka_top': { id: 'white_polka_top', name: 'White Polka Dot Top', price: 40.00, image: 'polka dot outfit inspo.jpeg' },
            'pink_dream_top': { id: 'pink_dream_top', name: 'Pink Dream Top', price: 45.00, image: '💭.jpeg' },
            'white_lace_top': { id: 'white_lace_top', name: 'Pink Fur Zip-Up Jacket', price: 38.00, image: 'ꫂ᭪݁.jpeg' },
            'dark_blue_top': { id: 'dark_blue_top', name: 'Black Babydoll Top With Bow', price: 42.00, image: '833377106091017171.jpeg' },
            'pink_fuzzy_top': { id: 'pink_fuzzy_top', name: 'White Babydoll Top With Bow', price: 50.00, image: 'lizzie young.jpeg' },
            'caterina_babydoll_top': { id: 'caterina_babydoll_top', name: 'Caterina Babydoll Top', price: 48.00, image: 'Caterina Babydoll Lace Top for Women Pink Long Sleeve with Polka Dot Bow.jpeg' }
        };


        // Interactive Func 
        let currentProduct = null;
        let selectedSize = 'M';
        let currentQty = 1;
        let shoppingCart = [];

        function viewProduct(productId) {
            currentProduct = productsDatabase[productId];
            
            // Product View Tab
            document.getElementById('pv-img').src = currentProduct.image;
            document.getElementById('pv-title').textContent = currentProduct.name;
            document.getElementById('pv-price').textContent = '$' + currentProduct.price.toFixed(2);
            
            // Reset to default size and quantity
            currentQty = 1;
            document.getElementById('pv-qty').textContent = currentQty;
            
            const sizes = document.querySelectorAll('.size-circle');
            sizes.forEach(s => s.classList.remove('active'));
            sizes[2].classList.add('active'); // Default to 'M'
            selectedSize = 'M';
            
            // Switch tab and scroll up
            openTab(null, 'product-view-tab');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function selectSize(element, size) {
            document.querySelectorAll('.size-circle').forEach(s => s.classList.remove('active'));
            element.classList.add('active');
            selectedSize = size;
        }

        function changeQty(amount) {
            currentQty += amount;
            if (currentQty < 1) currentQty = 1;
            document.getElementById('pv-qty').textContent = currentQty;
        }

        function addToCart() {
            if (!currentProduct) return;
            
            const item = {
                ...currentProduct,
                size: selectedSize,
                qty: currentQty
            };
            
            shoppingCart.push(item);
            updateCartUI();
            alert(`${currentProduct.name} has been added to your bag!`);
        }

        function updateCartUI() {
            const container = document.getElementById('cart-container');
            
            if (shoppingCart.length === 0) {
                container.innerHTML = '<div class="empty-cart-msg">Your shopping bag is empty.</div>';
                document.getElementById('summary-subtotal').textContent = '$0.00';
                document.getElementById('summary-total').textContent = '$0.00';
                return;
            }
            
            let htmlContent = '';
            let subtotal = 0;
            
            shoppingCart.forEach((item) => {
                const itemTotal = item.price * item.qty;
                subtotal += itemTotal;
                
                htmlContent += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-details">Size: ${item.size} | Qty: ${item.qty}</div>
                    </div>
                    <div class="cart-item-price">$${itemTotal.toFixed(2)}</div>
                </div>
                `;
            });
            
            container.innerHTML = htmlContent;
            document.getElementById('summary-subtotal').textContent = '$' + subtotal.toFixed(2);
            document.getElementById('summary-total').textContent = '$' + (subtotal + 15).toFixed(2);
        }
