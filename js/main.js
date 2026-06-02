// ==================== PRODUCT DATA ====================
const currencySymbol = 'PKR';

const defaultProducts = [
    {
        id: 1,
        title: "Blue Pottery Serving Bowl",
        artisan: "Ayesha Khan",
        price: 3450.00,
        category: "pottery",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.8,
        badge: "Featured",
        description: "Hand-painted blue pottery bowl made in Multan using traditional craftsmanship."
    },
    {
        id: 2,
        title: "Ajrak Cushion Cover",
        artisan: "Sana Baloch",
        price: 2850.00,
        category: "textiles",
        image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.9,
        badge: "New",
        description: "Authentic Ajrak cushion cover hand-printed in Sindh with rich colors."
    },
    {
        id: 3,
        title: "Carved Sheesham Serving Tray",
        artisan: "Ali Raza",
        price: 4200.00,
        category: "woodwork",
        image: "https://images.unsplash.com/photo-1587913844347-572393ce05b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.7,
        badge: null,
        description: "Carved sheesham wood tray with polished finish, handcrafted in Lahore."
    },
    {
        id: 4,
        title: "Silver Jhumka Earrings",
        artisan: "Mariam Shah",
        price: 2100.00,
        category: "jewelry",
        image: "https://images.unsplash.com/photo-1512436995084-1c8a4b69cd9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.6,
        badge: "Popular",
        description: "Classic silver jhumka earrings handcrafted by Peshawari silversmiths."
    },
    {
        id: 5,
        title: "Embroidered Shawl",
        artisan: "Nadia Iqbal",
        price: 6200.00,
        category: "textiles",
        image: "https://images.unsplash.com/photo-1520975911099-9c1fbc2440fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.8,
        badge: null,
        description: "Soft embroidered shawl with intricate Kashmiri paisley motifs."
    },
    {
        id: 6,
        title: "Terracotta Planter Set",
        artisan: "Hassan Ali",
        price: 1950.00,
        category: "pottery",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.5,
        badge: "Sale",
        description: "Rustic terracotta planter set made by clay artisans in Gujranwala."
    },
    {
        id: 7,
        title: "Bamboo Lantern",
        artisan: "Zainab Khan",
        price: 5200.00,
        category: "woodwork",
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.9,
        badge: "Eco-Friendly",
        description: "Handwoven bamboo lantern for warm ambient lighting."
    },
    {
        id: 8,
        title: "Sindhi Mirror Necklace",
        artisan: "Amina Qureshi",
        price: 3050.00,
        category: "jewelry",
        image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.7,
        badge: null,
        description: "Handcrafted Sindhi mirror necklace with traditional decorative details."
    }
];

let products = [];
let cart = [];
let currentModalProduct = null;
let currentTestimonial = 0;
let currentCategory = 'all';
let searchQuery = '';
let sortBy = 'default';

function initProducts() {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    if (Array.isArray(storedProducts) && storedProducts.length > 0) {
        products = storedProducts.map(p => ({
            ...p,
            title: p.title || p.name || 'Untitled product',
            name: p.name || p.title || 'Untitled product',
            sellerName: p.sellerName || p.seller || 'ArtisanCraft',
            createdAt: p.createdAt || new Date().toISOString(),
            status: p.status || 'approved',
            stock: p.stock == null ? 12 : p.stock
        }));
        saveProducts();
    } else {
        products = defaultProducts.map(p => ({
            ...p,
            title: p.title || p.name || 'Untitled product',
            name: p.name || p.title || 'Untitled product',
            sellerName: p.sellerName || p.seller || 'ArtisanCraft',
            createdAt: p.createdAt || new Date().toISOString(),
            status: p.status || 'approved',
            stock: p.stock == null ? 12 : p.stock
        }));
        saveProducts();
    }
}

function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

function formatCurrency(amount) {
    return `${currencySymbol} ${amount.toFixed(2)}`;
}

function getWishlist() {
    return JSON.parse(localStorage.getItem('wishlist')) || [];
}

function saveWishlist(wishlist) {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function toggleWishlist(id) {
    const product = products.find(p => p.id === id);
    if (!product) return showToast('Product not found');

    let wishlist = getWishlist();
    const exists = wishlist.find(item => item.id === id);

    if (exists) {
        wishlist = wishlist.filter(item => item.id !== id);
        showToast('Removed from wishlist.');
    } else {
        wishlist.push(product);
        showToast('Added to wishlist!');
    }

    saveWishlist(wishlist);
}

function applyProductFilters() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');

    if (searchInput) {
        searchQuery = searchInput.value.trim().toLowerCase();
    }
    if (sortSelect) {
        sortBy = sortSelect.value;
    }

    renderProducts(currentCategory);
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initProducts();
    if (document.getElementById('productGrid')) {
        applyProductFilters();
    }
    setupScrollReveal();
    setupNavbar();
    setupSmoothScroll();
    setupKeyboardEvents();
    updateAuthUI();
    
    // Load cart from localStorage
    loadCartFromStorage();
    updateCart();
    
    // Handle redirect from login with checkout intent
    const params = new URLSearchParams(window.location.search);
    if (params.get('action') === 'checkout') {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && cart.length > 0) {
            // Small delay to ensure cart UI updates
            setTimeout(() => {
                showPaymentModal();
            }, 500);
        }
    }
});

// ==================== AUTH UI UPDATE ====================
function updateAuthUI() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authSection = document.getElementById('authSection');
    
    if (!authSection) return;
    
    if (currentUser) {
        let dashboardLink = '';
        switch(currentUser.role) {
            case 'admin':
                dashboardLink = 'pages/admin-dashboard.html';
                break;
            case 'seller':
                dashboardLink = 'pages/seller-dashboard.html';
                break;
            case 'buyer':
                dashboardLink = 'pages/buyer-dashboard.html';
                break;
        }
        
        authSection.innerHTML = `
            <div class="user-menu" onclick="toggleDropdown()">
                <span>${currentUser.name || currentUser.shopName}</span>
                <div class="avatar">${(currentUser.name || currentUser.shopName || 'U').charAt(0).toUpperCase()}</div>
                <div class="dropdown-menu" id="userDropdown">
                    <a href="${dashboardLink}"><i class="fas fa-tachometer-alt"></i> Dashboard</a>
                    <a href="#" onclick="logout(); return false;"><i class="fas fa-sign-out-alt"></i> Logout</a>
                </div>
            </div>
        `;
    }
}

function getBuyerAddresses() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    if (!currentUser.id || currentUser.role !== 'buyer') return [];
    return (JSON.parse(localStorage.getItem('addresses')) || []).filter(a => String(a.buyerId) === String(currentUser.id));
}

function formatAddressForCheckout(address) {
    if (!address) return '';
    const parts = [
        address.label ? `${address.label}` : '',
        address.line || '',
        `${address.city || ''}, ${address.region || ''}`.trim(),
        `${address.country || ''} ${address.postalCode || ''}`.trim()
    ].filter(Boolean);
    return parts.join('\n');
}

function syncCodAddressSelect() {
    const select = document.getElementById('codAddressSelect');
    const addressField = document.getElementById('codAddress');
    if (!select || !addressField) return;

    const selected = select.value;
    if (selected === 'custom') {
        addressField.value = '';
        addressField.focus();
        return;
    }

    const address = getBuyerAddresses().find(a => String(a.id) === String(selected));
    if (address) {
        addressField.value = formatAddressForCheckout(address);
    }
}

function toggleDropdown() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) dropdown.classList.toggle('show');
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.reload();
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('userDropdown');
    const userMenu = document.querySelector('.user-menu');
    if (dropdown && userMenu && !userMenu.contains(e.target)) {
        dropdown.classList.remove('show');
    }
});

window.addEventListener('storage', (event) => {
    if (event.key === 'products') {
        initProducts();
        renderProducts(currentCategory);
        updateCart();
    }
});

// ==================== RENDER PRODUCTS ====================
function renderProducts(category) {
    const grid = document.getElementById('productGrid');
    currentCategory = category;

    let filtered = category === 'all' ? products : products.filter(p => p.category === category);
    filtered = filtered.filter(p => !p.status || p.status === 'approved' || p.status === 'sold-out');
    if (searchQuery) {
        filtered = filtered.filter(product => {
            const productName = (product.title || product.name || '').toLowerCase();
            return productName.includes(searchQuery)
                || product.artisan.toLowerCase().includes(searchQuery)
                || product.category.toLowerCase().includes(searchQuery);
        });
    }

    if (sortBy === 'price_low') {
        filtered = filtered.slice().sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_high') {
        filtered = filtered.slice().sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
        filtered = filtered.slice().sort((a, b) => b.rating - a.rating);
    }
    
    if (filtered.length === 0) {
        grid.innerHTML = `<div class="no-results">No matching products found. Try another category or search term.</div>`;
        return;
    }
    
    grid.innerHTML = filtered.map(product => `
        <div class="product-card scroll-reveal">
            <div class="product-img" style="background-image: url('${product.image}')">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                ${product.stock === 0 ? '<span class="sold-out-badge">Sold Out</span>' : ''}
                <div class="product-actions">
                    <button class="action-btn" onclick="quickView(${product.id})" title="Quick View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn ${product.stock === 0 ? 'disabled' : ''}" ${product.stock === 0 ? 'disabled title="Sold out"' : `onclick="addToCart(${product.id})" title="Add to Cart"`}>
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                    <button class="action-btn" onclick="toggleWishlist(${product.id})" title="Wishlist">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title || product.name}</h3>
                <p class="product-artisan"><i class="fas fa-user"></i> ${product.artisan}</p>
                <div class="product-price">
                    <span class="price">${formatCurrency(product.price)}</span>
                    <span class="rating">
                        ${generateStars(product.rating)}
                        ${product.rating}
                    </span>
                </div>
                <div class="product-stock">${product.stock === 0 ? 'Sold out' : `${product.stock} item${product.stock === 1 ? '' : 's'} left`}</div>
            </div>
        </div>
    `).join('');

    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach(el => {
            el.classList.add('active');
        });
    }, 100);
}

function generateStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < Math.floor(rating)) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i < rating) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// ==================== FILTER PRODUCTS ====================
function filterProducts(category) {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
        if ((category === 'all' && tab.textContent === 'All') ||
            tab.textContent.toLowerCase().includes(category)) {
            tab.classList.add('active');
        }
    });

    renderProducts(category);
    
    if (window.scrollY < document.getElementById('products').offsetTop - 100) {
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    }
}

// ==================== QUICK VIEW MODAL ====================
function quickView(id) {
    const product = products.find(p => p.id === id);
    currentModalProduct = product;
    
    document.getElementById('modalImg').style.backgroundImage = `url('${product.image}')`;
    document.getElementById('modalTitle').textContent = product.title || product.name;
document.getElementById('modalPrice').textContent = formatCurrency(product.price);
    document.getElementById('modalDesc').textContent = product.description;
    
    document.getElementById('quickViewModal').classList.add('active');
}

function closeModal() {
    document.getElementById('quickViewModal').classList.remove('active');
    currentModalProduct = null;
}

// ==================== CART PERSISTENCE ====================
function loadCartFromStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        try {
            cart = JSON.parse(storedCart);
        } catch (e) {
            cart = [];
        }
    }
}

function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCartFromModal() {
    if (currentModalProduct) {
        addToCart(currentModalProduct.id);
        closeModal();
    }
}

// ==================== CART FUNCTIONALITY ====================
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return showToast('Product not found', 'error');
    if (product.stock === 0) return showToast('This product is sold out', 'error');

    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        if (existingItem.quantity >= product.stock) {
            return showToast('No more stock available for this product', 'error');
        }
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
    showToast(`${product.title || product.name} added to cart!`);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            updateCart();
        }
    }
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = formatCurrency(totalPrice);
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div style="text-align: center; padding: 3rem 1rem; color: var(--text-light);">
                <i class="fas fa-shopping-bag" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                <p>Your cart is empty</p>
                <a href="#products" class="btn" style="margin-top: 1rem;" onclick="toggleCart()">Start Shopping</a>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-img" style="background-image: url('${item.image}')"></div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title || item.name}</div>
                    <div class="cart-item-price">${formatCurrency(item.price)}</div>
                    <div class="quantity-control">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <span class="remove-item" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i> Remove
                    </span>
                </div>
            </div>
        `).join('');
    }
    
    // Save cart to localStorage
    saveCartToStorage();
}

function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('active');
}

function checkout() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        // Store checkout intent before redirecting to login
        localStorage.setItem('checkoutIntent', 'true');
        localStorage.setItem('checkoutFrom', window.location.pathname.split('/').pop() || 'index.html');
        showToast('Please login to checkout!');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return;
    }
    
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }
    
    // Show payment modal instead of directly creating order
    showPaymentModal();
}

// ==================== PAYMENT INTEGRATION ====================
function showPaymentModal() {
    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const buyerAddresses = getBuyerAddresses();
    const defaultAddressText = buyerAddresses.length ? formatAddressForCheckout(buyerAddresses[0]) : '';
    const addressSelectHtml = buyerAddresses.length ? `
                <div class="form-group">
                    <label>Choose saved delivery address</label>
                    <select id="codAddressSelect" onchange="syncCodAddressSelect()">
                        ${buyerAddresses.map(address => `
                            <option value="${address.id}">${address.label} — ${address.city}, ${address.region}</option>
                        `).join('')}
                        <option value="custom">Use a different address</option>
                    </select>
                </div>
    ` : '';
    
    // Create payment modal
    const paymentModal = document.createElement('div');
    paymentModal.id = 'paymentModal';
    paymentModal.className = 'payment-modal';
    paymentModal.innerHTML = `
        <div class="payment-content">
            <button class="payment-close" onclick="closePaymentModal()">×</button>
            
            <h2>Secure Payment</h2>
            <p class="payment-subtitle">Choose your payment method</p>
            
            <div class="payment-amount">
                <span>Total Amount:</span>
                <span class="amount-value">${currencySymbol} ${cartTotal.toLocaleString('en-PK', {minimumFractionDigits: 2})}</span>
            </div>
            
            <div class="payment-methods">
                <!-- Card Payment -->
                <div class="payment-method" onclick="selectPaymentMethod('card')">
                    <input type="radio" name="payment" value="card" id="card-method">
                    <label for="card-method" class="method-label">
                        <i class="fas fa-credit-card"></i>
                        <span>Credit/Debit Card</span>
                    </label>
                </div>
                
                <!-- EasyPaisa -->
                <div class="payment-method" onclick="selectPaymentMethod('easypaisa')">
                    <input type="radio" name="payment" value="easypaisa" id="easypaisa-method">
                    <label for="easypaisa-method" class="method-label">
                        <i class="fas fa-mobile-alt"></i>
                        <span>EasyPaisa</span>
                    </label>
                </div>
                
                <!-- Bank Transfer -->
                <div class="payment-method" onclick="selectPaymentMethod('bank')">
                    <input type="radio" name="payment" value="bank" id="bank-method">
                    <label for="bank-method" class="method-label">
                        <i class="fas fa-university"></i>
                        <span>Bank Transfer</span>
                    </label>
                </div>
                
                <!-- COD -->
                <div class="payment-method" onclick="selectPaymentMethod('cod')">
                    <input type="radio" name="payment" value="cod" id="cod-method">
                    <label for="cod-method" class="method-label">
                        <i class="fas fa-money-bill-wave"></i>
                        <span>Cash on Delivery</span>
                    </label>
                </div>
            </div>
            
            <!-- Card Form (Hidden by default) -->
            <div id="cardForm" class="payment-form" style="display: none;">
                <h3>Card Details</h3>
                <p class="test-note">🔒 This is a demo payment. Use test card: <strong>4242 4242 4242 4242</strong></p>
                <form onsubmit="processCardPayment(event)">
                    <div class="form-group">
                        <label>Card Number</label>
                        <input type="text" placeholder="4242 4242 4242 4242" maxlength="19" id="cardNumber" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>MM/YY</label>
                            <input type="text" placeholder="12/25" maxlength="5" id="cardExpiry" required>
                        </div>
                        <div class="form-group">
                            <label>CVC</label>
                            <input type="text" placeholder="123" maxlength="3" id="cardCVC" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Cardholder Name</label>
                        <input type="text" placeholder="Full Name" id="cardName" required>
                    </div>
                    <button type="submit" class="btn" style="width: 100%; margin-top: 1rem;">
                        Pay ${currencySymbol} ${cartTotal.toLocaleString('en-PK', {minimumFractionDigits: 2})}
                    </button>
                </form>
            </div>
            
            <!-- EasyPaisa Form (Hidden by default) -->
            <div id="easypaisaForm" class="payment-form" style="display: none;">
                <h3>EasyPaisa Payment</h3>
                <p class="test-note">📱 Demo EasyPaisa Payment</p>
                <form onsubmit="processEasyPaisaPayment(event)">
                    <div class="form-group">
                        <label>Phone Number</label>
                        <input type="tel" placeholder="300XXXXXXXX" maxlength="12" id="easypaisaPhone" required>
                    </div>
                    <div class="form-group">
                        <label>EasyPaisa PIN</label>
                        <input type="password" placeholder="5-digit PIN" maxlength="5" id="easypaisaPIN" required>
                    </div>
                    <p style="font-size: 0.85rem; color: #666; margin-top: 1rem;">
                        <strong>Demo PIN:</strong> 12345
                    </p>
                    <button type="submit" class="btn" style="width: 100%; margin-top: 1rem;">
                        Confirm Payment - ${currencySymbol} ${cartTotal.toLocaleString('en-PK', {minimumFractionDigits: 2})}
                    </button>
                </form>
            </div>
            
            <!-- Bank Transfer Form (Hidden by default) -->
            <div id="bankForm" class="payment-form" style="display: none;">
                <h3>Bank Transfer Details</h3>
                <div class="bank-details">
                    <p><strong>Bank Name:</strong> Allied Bank Limited</p>
                    <p><strong>Account Title:</strong> ArtisanCraft PK</p>
                    <p><strong>Account Number:</strong> 24110072649001</p>
                    <p><strong>IBAN:</strong> PK72ABFL0024110072649001</p>
                    <p><strong>Amount:</strong> ${currencySymbol} ${cartTotal.toLocaleString('en-PK', {minimumFractionDigits: 2})}</p>
                </div>
                <p style="font-size: 0.85rem; color: #666; margin-top: 1rem; border-top: 1px solid #ddd; padding-top: 1rem;">
                    <i class="fas fa-info-circle"></i> Please enter the amount you're transferring below to confirm.
                </p>
                <form onsubmit="processBankPayment(event)">
                    <div class="form-group">
                        <label>Transfer Reference/TRX ID</label>
                        <input type="text" placeholder="Enter transfer reference number" id="bankRef" required>
                    </div>
                    <button type="submit" class="btn" style="width: 100%; margin-top: 1rem;">
                        Confirm Bank Transfer
                    </button>
                </form>
            </div>
            
            <!-- COD Form (Hidden by default) -->
            <div id="codForm" class="payment-form" style="display: none;">
                <h3>Cash on Delivery</h3>
                <div class="cod-info">
                    <p><i class="fas fa-check-circle"></i> Pay when you receive your order</p>
                    <p><strong>Amount to Pay:</strong> ${currencySymbol} ${cartTotal.toLocaleString('en-PK', {minimumFractionDigits: 2})}</p>
                    <p style="font-size: 0.85rem; color: #666; margin-top: 1rem;">
                        Delivery will take 3-5 business days. Our courier will contact you for delivery confirmation.
                    </p>
                </div>
                <form onsubmit="processCODPayment(event)">
                    ${addressSelectHtml}
                    <div class="form-group">
                        <label>Delivery Address</label>
                        <textarea id="codAddress" placeholder="Enter delivery street address, landmark or area" rows="2" required>${defaultAddressText}</textarea>
                    </div>
                    <div class="form-group">
                        <label>Delivery Instructions</label>
                        <textarea id="codInstructions" placeholder="Enter special instructions for delivery (gate code, preferred delivery time, contact notes)" rows="3" required></textarea>
                    </div>
                    <button type="submit" class="btn" style="width: 100%; margin-top: 1rem;">
                        Confirm Cash on Delivery
                    </button>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(paymentModal);
}

function selectPaymentMethod(method) {
    document.getElementById('cardForm').style.display = 'none';
    document.getElementById('easypaisaForm').style.display = 'none';
    document.getElementById('bankForm').style.display = 'none';
    document.getElementById('codForm').style.display = 'none';
    
    if (method === 'card') {
        document.getElementById('cardForm').style.display = 'block';
    } else if (method === 'easypaisa') {
        document.getElementById('easypaisaForm').style.display = 'block';
    } else if (method === 'bank') {
        document.getElementById('bankForm').style.display = 'block';
    } else if (method === 'cod') {
        document.getElementById('codForm').style.display = 'block';
    }
}

function processCardPayment(event) {
    event.preventDefault();
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const expiry = document.getElementById('cardExpiry').value;
    const cvc = document.getElementById('cardCVC').value;
    const name = document.getElementById('cardName').value;
    
    if (cardNumber !== '4242424242424242' && cardNumber !== '4111111111111111') {
        showToast('Test card declined. Use 4242 4242 4242 4242');
        return;
    }
    
    processPayment('Credit Card', `${name} - ${cardNumber.slice(-4)}`);
}

function processEasyPaisaPayment(event) {
    event.preventDefault();
    const phone = document.getElementById('easypaisaPhone').value;
    const pin = document.getElementById('easypaisaPIN').value;
    
    if (pin !== '12345') {
        showToast('Invalid EasyPaisa PIN');
        return;
    }
    
    processPayment('EasyPaisa', phone);
}

function processBankPayment(event) {
    event.preventDefault();
    const ref = document.getElementById('bankRef').value;
    processPayment('Bank Transfer', ref);
}

function processCODPayment(event) {
    event.preventDefault();
    const address = document.getElementById('codAddress')?.value.trim() || 'No delivery address provided';
    const instructions = document.getElementById('codInstructions')?.value.trim() || 'No special instructions provided';
    processPayment('Cash on Delivery', 'COD - To be paid on delivery', instructions, address);
}

function processPayment(method, reference, deliveryInstruction = '', deliveryAddress = '') {
    // Show processing
    const modal = document.getElementById('paymentModal');
    const content = modal.querySelector('.payment-content');
    const originalHTML = content.innerHTML;
    
    content.innerHTML = `
        <div class="payment-processing">
            <div class="spinner"></div>
            <h3>Processing Payment...</h3>
            <p>Please wait while we process your ${method} payment.</p>
        </div>
    `;
    
    // Simulate payment processing (2 seconds)
    setTimeout(() => {
        completeOrder(method, reference, deliveryInstruction, deliveryAddress);
        closePaymentModal();
    }, 2000);
}

function completeOrder(paymentMethod, paymentRef, deliveryInstruction = '', deliveryAddress = '') {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const order = {
        id: 'ord_' + Date.now(),
        buyerId: currentUser.id,
        buyerName: currentUser.name,
        buyerEmail: currentUser.email,
        buyerPhone: currentUser.phone || '',
        items: [...cart],
        total: cartTotal,
        status: 'pending',
        paymentMethod: paymentMethod,
        paymentRef: paymentRef,
        deliveryInstruction: deliveryInstruction,
        deliveryAddress: deliveryAddress,
        transactionId: 'TXN_' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        createdAt: new Date().toISOString()
    };
    
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Decrement stock
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            product.stock = Math.max(0, product.stock - item.quantity);
            if (product.stock === 0) {
                product.status = 'sold-out';
            }
        }
    });
    saveProducts();

    // Show success
    showToast(`✅ Payment successful! Order ID: ${order.id}`);
    cart = [];
    updateCart();
    renderProducts(currentCategory);
    toggleCart();
}

function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.remove();
    }
}

// ==================== TOAST NOTIFICATIONS ====================
function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMessage').textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function submitContactForm(event) {
    event.preventDefault();
    const name = document.getElementById('contactName')?.value.trim();
    const email = document.getElementById('contactEmail')?.value.trim();
    const message = document.getElementById('contactMessage')?.value.trim();

    if (!name || !email || !message) {
        return showToast('Please complete all fields before sending.', 'error');
    }

    document.getElementById('contactForm')?.reset();
    showToast('Thank you! Your message has been sent.');
}

// ==================== TESTIMONIAL SLIDER ====================
function showTestimonial(index) {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    
    testimonials.forEach(t => t.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    currentTestimonial = index;
}

setInterval(() => {
    const testimonials = document.querySelectorAll('.testimonial-card');
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// ==================== SCROLL REVEAL ====================
function setupScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

// ==================== NAVBAR SCROLL ====================
function setupNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 2px 20px rgba(139, 69, 19, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 20px var(--shadow)';
        }
    });
}

// ==================== SMOOTH SCROLL ====================
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ==================== KEYBOARD EVENTS ====================
function setupKeyboardEvents() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            if (document.getElementById('cartSidebar').classList.contains('open')) {
                toggleCart();
            }
        }
    });
}

// ==================== MOBILE MENU ====================
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
}