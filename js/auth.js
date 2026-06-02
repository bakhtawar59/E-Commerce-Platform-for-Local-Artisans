// ==================== AUTHENTICATION SYSTEM ====================

// Demo users (pre-populated)
const defaultUsers = [
    {
        id: 'admin1',
        name: 'System Administrator',
        email: 'admin@artisancraft.pk',
        password: 'admin123',
        role: 'admin',
        status: 'active',
        createdAt: new Date().toISOString()
    },
    {
        id: 'seller1',
        name: 'Ayesha Khan',
        email: 'ayesha@artisancraft.pk',
        password: 'seller123',
        role: 'seller',
        shopName: 'Multan Blue Pottery',
        phone: '+92 300 1234567',
        status: 'approved',
        createdAt: new Date().toISOString()
    },
    {
        id: 'buyer1',
        name: 'Asad Rehman',
        email: 'asad@artisancraft.pk',
        password: 'buyer123',
        role: 'buyer',
        phone: '+92 311 7654321',
        dob: '1992-08-15',
        status: 'active',
        createdAt: new Date().toISOString()
    }
];

// Initialize users in localStorage if not exists
function initUsers() {
    try {
        const stored = JSON.parse(localStorage.getItem('users')) || [];


        // If no users stored, seed with defaultUsers
        if (!Array.isArray(stored) || stored.length === 0) {
            localStorage.setItem('users', JSON.stringify(defaultUsers));
            console.log('initUsers: seeded default users', defaultUsers.map(u=>u.email));
            return;
        }

        // Ensure each default user (admin/seller/buyer) exists by email; add if missing
        let changed = false;
        const merged = Array.from(stored);
        defaultUsers.forEach(def => {
            if (!merged.find(u => u.email === def.email)) {
                merged.push(def);
                changed = true;
            }
        });

        if (changed) {
            localStorage.setItem('users', JSON.stringify(merged));
            console.log('initUsers: merged missing defaults into users', merged.map(u=>u.email));
        } else {
            console.log('initUsers: users unchanged, loaded from localStorage', stored.map(u=>u.email));
        }
    } catch (e) {
        // If parsing fails, reset to defaults to avoid locking out admin
        localStorage.setItem('users', JSON.stringify(defaultUsers));
        console.error('initUsers: corrupted users data - reset to defaults', e);
    }
}

// Get all users
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Save users
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function getAddresses() {
    return JSON.parse(localStorage.getItem('addresses')) || [];
}

function saveAddresses(addresses) {
    localStorage.setItem('addresses', JSON.stringify(addresses));
}

// Get current user
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Set current user
function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

// Generate unique ID
function generateId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// ==================== LOGIN ====================
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        showToast('Invalid email or password!', 'error');
        return;
    }
    
    if (user.status === 'suspended') {
        showToast('Your account has been suspended. Contact admin.', 'error');
        return;
    }
    
    // Set current user
    setCurrentUser(user);
    showToast('Login successful! Redirecting...');
    
    // Check if user was trying to checkout
    const checkoutIntent = localStorage.getItem('checkoutIntent');
    
    // Redirect based on role or checkout intent
    setTimeout(() => {
        if (checkoutIntent && user.role === 'buyer') {
            // Clear checkout intent and redirect back to checkout page
            localStorage.removeItem('checkoutIntent');
            const checkoutFrom = localStorage.getItem('checkoutFrom') || 'index.html';
            localStorage.removeItem('checkoutFrom');
            // Redirect back to shop/index and trigger checkout
            window.location.href = checkoutFrom + '?action=checkout';
        } else {
            switch(user.role) {
                case 'admin':
                    window.location.href = 'pages/admin-dashboard.html';
                    break;
                case 'seller':
                    window.location.href = 'pages/seller-dashboard.html';
                    break;
                case 'buyer':
                    window.location.href = 'pages/buyer-dashboard.html';
                    break;
            }
        }
    }, 1000);
}

// ==================== REGISTRATION ====================
function handleRegister(event) {
    event.preventDefault();
    
    const role = document.getElementById('registerRole').value;
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    const shopName = document.getElementById('regShopName').value.trim();
    const addressLabel = document.getElementById('regAddressLabel')?.value.trim();
    const addressLine = document.getElementById('regAddressLine')?.value.trim();
    const addressCity = document.getElementById('regAddressCity')?.value.trim();
    const addressRegion = document.getElementById('regAddressRegion')?.value.trim();
    const addressCountry = document.getElementById('regAddressCountry')?.value.trim();
    const addressPostal = document.getElementById('regAddressPostal')?.value.trim();
    
    // Validation
    if (password !== confirmPassword) {
        showToast('Passwords do not match!', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('Password must be at least 6 characters!', 'error');
        return;
    }
    
    const users = getUsers();
    
    // Check if email exists
    if (users.find(u => u.email === email)) {
        showToast('Email already registered!', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: generateId(),
        name,
        email,
        password,
        phone,
        role,
        status: role === 'seller' ? 'pending' : 'active',
        createdAt: new Date().toISOString()
    };
    
    // Add seller-specific fields
    if (role === 'seller') {
        newUser.shopName = shopName || name + "'s Shop";
    }

    // Add buyer default address when registering as buyer
    if (role === 'buyer') {
        if (!addressLabel || !addressLine || !addressCity || !addressRegion || !addressCountry || !addressPostal) {
            showToast('Please fill in all address fields for buyer registration.', 'error');
            return;
        }
        const addressId = 'addr_' + Date.now();
        const addresses = getAddresses();
        const addressRecord = {
            id: addressId,
            buyerId: newUser.id,
            label: addressLabel,
            phone,
            line: addressLine,
            city: addressCity,
            region: addressRegion,
            country: addressCountry,
            postalCode: addressPostal,
            createdAt: new Date().toISOString()
        };
        addresses.push(addressRecord);
        saveAddresses(addresses);
        newUser.defaultAddressId = addressId;
    }
    
    users.push(newUser);
    saveUsers(users);
    
    showToast('Registration successful! Please login.');
    setTimeout(() => {
        showLogin();
    }, 1500);
}

// ==================== UI FUNCTIONS ====================
function showLogin() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('registerForm').classList.add('hidden');
}

function showRegister(type) {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
    document.getElementById('registerRole').value = type;
    
    const subtitle = document.getElementById('registerSubtitle');
    const shopGroup = document.getElementById('shopNameGroup');
    
    const addressGroup = document.getElementById('addressFieldsGroup');
    if (type === 'seller') {
        subtitle.textContent = 'Register as a Seller';
        shopGroup.style.display = 'block';
        addressGroup.style.display = 'none';
        document.getElementById('regShopName').required = true;
        document.getElementById('regAddressLabel').required = false;
        document.getElementById('regAddressLine').required = false;
        document.getElementById('regAddressCity').required = false;
        document.getElementById('regAddressRegion').required = false;
        document.getElementById('regAddressCountry').required = false;
        document.getElementById('regAddressPostal').required = false;
    } else {
        subtitle.textContent = 'Register as a Buyer';
        shopGroup.style.display = 'none';
        addressGroup.style.display = 'block';
        document.getElementById('regShopName').required = false;
        document.getElementById('regAddressLabel').required = true;
        document.getElementById('regAddressLine').required = true;
        document.getElementById('regAddressCity').required = true;
        document.getElementById('regAddressRegion').required = true;
        document.getElementById('regAddressCountry').required = true;
        document.getElementById('regAddressPostal').required = true;
    }
}

function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    
    if (type === 'error') {
        toast.style.background = '#dc3545';
    } else {
        toast.style.background = 'var(--primary)';
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Check URL params for registration type
window.addEventListener('DOMContentLoaded', () => {
    initUsers();
    
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    
    if (type === 'seller') {
        showRegister('seller');
    }
});