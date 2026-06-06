// ==================== DASHBOARD LOGIC ====================

// Check authentication on page load
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    initDashboard();
});

function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        window.location.href = '../login.html';
        return;
    }
    
    // Update user info in header
    const userNameEl = document.getElementById('adminName') || 
                       document.getElementById('sellerName') || 
                       document.getElementById('headerBuyerName');
    if (userNameEl) userNameEl.textContent = currentUser.name || currentUser.shopName;
    
    // Update avatars
    const avatarEls = document.querySelectorAll('.avatar, .seller-avatar');
    avatarEls.forEach(el => {
        if (el) el.textContent = (currentUser.name || currentUser.shopName || 'U').charAt(0).toUpperCase();
    });
}

const defaultProducts = [
    {
        id: 1,
        name: "Blue Pottery Serving Bowl",
        artisan: "Ayesha Khan",
        sellerName: "Multan Blue Pottery",
        price: 3450.00,
        category: "pottery",
        image: "https://unsplash.com/photos/stack-of-blue-and-white-floral-patterned-ceramic-bowls-u0z0_o9hHOY",
        rating: 4.8,
        badge: "Featured",
        description: "Hand-painted blue pottery bowl made in Multan using traditional craftsmanship.",
        status: 'approved',
        stock: 10,
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        name: "Ajrak Cushion Cover",
        artisan: "Sana Baloch",
        sellerName: "Sindh Textiles",
        price: 2850.00,
        category: "textiles",
        image: "https://unsplash.com/photos/three-assorted-color-throw-pillows-on-black-sofa-GWFFvub7Y1U",
        rating: 4.9,
        badge: "New",
        description: "Authentic Ajrak cushion cover hand-printed in Sindh with rich colors.",
        status: 'approved',
        stock: 8,
        createdAt: new Date().toISOString()
    },
    {
        id: 3,
        name: "Carved Sheesham Serving Tray",
        artisan: "Ali Raza",
        sellerName: "Lahore Woodworks",
        price: 4200.00,
        category: "woodwork",
        image: "https://decoracrafts.shop/wp-content/uploads/2025/09/10.png",
        rating: 4.7,
        badge: null,
        description: "Carved sheesham wood tray with polished finish, handcrafted in Lahore.",
        status: 'approved',
        stock: 6,
        createdAt: new Date().toISOString()
    },
    {
        id: 4,
        name: "Silver Jhumka Earrings",
        artisan: "Mariam Shah",
        sellerName: "Karachi Silver Studio",
        price: 2100.00,
        category: "jewelry",
        image: "https://unsplash.com/photos/a-pair-of-silver-and-gold-earrings-LBvg2FW_VII",
        rating: 4.6,
        badge: "Popular",
        description: "Classic silver jhumka earrings handcrafted by Peshawari silversmiths.",
        status: 'approved',
        stock: 12,
        createdAt: new Date().toISOString()
    },
    {
        id: 5,
        name: "Embroidered Shawl",
        artisan: "Nadia Iqbal",
        sellerName: "Kashmir Looms",
        price: 6200.00,
        category: "textiles",
        image: "https://unsplash.com/photos/white-fabric-with-dark-floral-embroidery-pattern-R_uayLKqDL8",
        rating: 4.8,
        badge: null,
        description: "Soft embroidered shawl with intricate Kashmiri paisley motifs.",
        status: 'approved',
        stock: 7,
        createdAt: new Date().toISOString()
    },
    {
        id: 6,
        name: "Terracotta Planter Set",
        artisan: "Hassan Ali",
        sellerName: "Gujranwala Clay Works",
        price: 1950.00,
        category: "pottery",
        image: "https://unsplash.com/photos/a-white-and-pink-vase-with-a-plant-in-it-MpL7mgRoqfY",
        rating: 4.5,
        badge: "Sale",
        description: "Rustic terracotta planter set made by clay artisans in Gujranwala.",
        status: 'approved',
        stock: 14,
        createdAt: new Date().toISOString()
    },
    {
        id: 7,
        name: "Bamboo Lantern",
        artisan: "Zainab Khan",
        sellerName: "Karachi Bamboo",
        price: 5200.00,
        category: "woodwork",
        image: "https://unsplash.com/photos/a-wicker-lantern-hanging-from-a-ceiling-09YSitq__rE",
        rating: 4.9,
        badge: "Eco-Friendly",
        description: "Handwoven bamboo lantern for warm ambient lighting.",
        status: 'approved',
        stock: 5,
        createdAt: new Date().toISOString()
    },
    {
        id: 8,
        name: "Sindhi Mirror Necklace",
        artisan: "Amina Qureshi",
        sellerName: "Sindh Jewelry Hub",
        price: 3050.00,
        category: "jewelry",
        image: "https://tse4.mm.bing.net/th/id/OIP.Sx9dL9T1kuzwYGJTEBs0CAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
        rating: 4.7,
        badge: null,
        description: "Handcrafted Sindhi mirror necklace with traditional decorative details.",
        status: 'approved',
        stock: 9,
        createdAt: new Date().toISOString()
    }
];

function ensureProductsSeeded() {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    if (!Array.isArray(storedProducts) || storedProducts.length === 0) {
        localStorage.setItem('products', JSON.stringify(defaultProducts));
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '../login.html';
}

// ==================== SECTION NAVIGATION ====================
function showSection(sectionId, evt) {
    // Hide all sections
    document.querySelectorAll('.dashboard-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
    
    // Update nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const targetEvent = evt || window.event;
    const source = targetEvent?.target || targetEvent?.srcElement;
    const navItem = source?.closest?.('.nav-item');
    if (navItem) {
        navItem.classList.add('active');
    }
    
    // Update page title
    const titles = {
        'overview': 'Dashboard Overview',
        'sellers': 'Seller Management',
        'buyers': 'Buyer Management',
        'products': 'Product Approval',
        'orders': 'Orders',
        'reports': 'Reports',
        'addProduct': 'Add New Product',
        'myProducts': 'My Products',
        'profile': 'Profile',
        'wishlist': 'My Wishlist',
        'addresses': 'Saved Addresses'
    };
    
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle && titles[sectionId]) {
        pageTitle.textContent = titles[sectionId];
    }
    
    // Load section data
    loadSectionData(sectionId);
}

// ==================== INITIALIZE DASHBOARD ====================
function initDashboard() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    ensureProductsSeeded();
    
    // Load initial data based on role
    if (currentUser.role === 'admin') {
        loadAdminStats();
        loadPendingCounts();
        // render quick users section on overview
        renderAdminUsersSection();
    } else if (currentUser.role === 'seller') {
        loadSellerStats();
        loadSellerProducts();
        loadSellerProfile();
    } else if (currentUser.role === 'buyer') {
        loadBuyerStats();
        loadBuyerProfile();
    }
    
    if (currentUser.role === 'admin') {
        loadAdminActivity();
    }
    
    // Load overview by default
    loadSectionData('overview');
}

// ==================== ADMIN FUNCTIONS ====================
function loadAdminStats() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    const buyers = users.filter(u => u.role === 'buyer');
    const sellers = users.filter(u => u.role === 'seller');
    const totalRevenue = orders
        .filter(o => o.status === 'delivered')
        .reduce((sum, o) => sum + (o.platformCommission || 0), 0);
    

function loadAdminActivity() {
    const activityList = document.getElementById('activityList');
    if (!activityList) return;

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const recentOrders = orders.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

    activityList.innerHTML = recentOrders.map(order => {
        const item = (order.items || [])[0] || {};
        const sellerNames = Array.from(new Set((order.items || []).map(i => i.sellerName || 'Seller'))).join(', ');
        return `
            <div class="notification-item">
                <i class="fas fa-dollar-sign"></i>
                <div>
                    <p><strong>Order ${order.id}</strong> processed - <strong>Commission:</strong> PKR ${(order.platformCommission || 0).toFixed(2)}</p>
                    <p><small>Buyer: ${order.buyerName || 'Unknown'}, Seller: ${sellerNames}</small></p>
                    <p><small>Product: ${item.name || item.title || 'N/A'} | Status: ${order.status || 'pending'}</small></p>
                    <small>${order.createdAt ? new Date(order.createdAt).toLocaleString() : ''}</small>
                </div>
            </div>
        `;
    }).join('') || '<p>No recent transactions yet.</p>';
}
    updateElement('totalBuyers', buyers.length);
    updateElement('totalSellers', sellers.length);
    updateElement('totalProducts', products.length);
    updateElement('totalRevenue', 'PKR ' + totalRevenue.toFixed(2));
}

function loadAdminActivity() {
    const activityList = document.getElementById('activityList');
    if (!activityList) return;

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const recentOrders = orders.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

    activityList.innerHTML = recentOrders.map(order => {
        const item = (order.items || [])[0] || {};
        const sellerNames = Array.from(new Set((order.items || []).map(i => i.sellerName || 'Seller'))).join(', ');
        return `
            <div class="notification-item">
                <i class="fas fa-dollar-sign"></i>
                <div>
                    <p><strong>Order ${order.id}</strong> processed - <strong>Commission:</strong> PKR ${(order.platformCommission || 0).toFixed(2)}</p>
                    <p><small>Buyer: ${order.buyerName || 'Unknown'}, Seller: ${sellerNames}</small></p>
                    <p><small>Product: ${item.name || item.title || 'N/A'} | Status: ${order.status || 'pending'}</small></p>
                    <small>${order.createdAt ? new Date(order.createdAt).toLocaleString() : ''}</small>
                </div>
            </div>
        `;
    }).join('') || '<p>No recent transactions yet.</p>';
}

// ==================== ADMIN: USER MANAGEMENT ====================
function openUserModal() {
    const modal = document.getElementById('userModal');
    if (!modal) return;
    // reset modal controls
    _usersState.query = '';
    _usersState.sort = 'createdDesc';
    _usersState.page = 1;
    _usersState.pageSize = _usersState.pageSize || 6;
    const searchEl = document.getElementById('usersSearch'); if (searchEl) searchEl.value = '';
    const sortEl = document.getElementById('usersSort'); if (sortEl) sortEl.value = 'createdDesc';
    const pageSizeEl = document.getElementById('usersPageSize'); if (pageSizeEl) pageSizeEl.value = String(_usersState.pageSize);
    const showAdminsToggle = document.getElementById('showAdminsToggle'); if (showAdminsToggle) showAdminsToggle.checked = !!_usersState.showAdmins;
    renderUsersTable();
    modal.style.display = 'block';
    document.body.classList.add('modal-open');

    // restore focus on open so keyboard users can close if needed
    _usersState._prevFocus = document.activeElement;
    const content = modal.querySelector('.modal-content');
    if (content) content.focus();

    setTimeout(() => {
        document.addEventListener('click', modalOutsideClick);
        document.addEventListener('keydown', modalKeyHandler);
    }, 50);
}

function closeUserModal() {
    const modal = document.getElementById('userModal');
    if (!modal) return;
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    document.removeEventListener('click', modalOutsideClick);
    document.removeEventListener('keydown', modalKeyHandler);
    // restore focus
    try { if (_usersState._prevFocus && typeof _usersState._prevFocus.focus === 'function') _usersState._prevFocus.focus(); } catch(e){ }
}

function modalEscKey(e) {
    if (e.key === 'Escape') closeUserModal();
}

function renderUsersTable() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;

    // start with copy
    let list = users.slice();
    // exclude admin users from management list unless toggle enabled
    if (!_usersState.showAdmins) {
        list = list.filter(u => u.role !== 'admin');
    }
    // apply query filter
    const q = (_usersState.query || '').toLowerCase().trim();
    if (q) {
        list = list.filter(u => (u.name||'').toLowerCase().includes(q) || (u.email||'').toLowerCase().includes(q) || (u.shopName||'').toLowerCase().includes(q));
    }

    // sort
    switch(_usersState.sort) {
        case 'createdAsc': list.sort((a,b)=> new Date(a.createdAt) - new Date(b.createdAt)); break;
        case 'createdDesc': list.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt)); break;
        case 'nameAsc': list.sort((a,b)=> (a.name||'').localeCompare(b.name||'')); break;
        case 'nameDesc': list.sort((a,b)=> (b.name||'').localeCompare(a.name||'')); break;
        case 'role': list.sort((a,b)=> (a.role||'').localeCompare(b.role||'')); break;
    }

    // pagination
    const total = list.length;
    const pageSize = _usersState.pageSize || 6;
    const page = Math.max(1, _usersState.page || 1);
    const start = (page - 1) * pageSize;
    const pageItems = list.slice(start, start + pageSize);

    // render rows with data-user-id and actions cell for inline confirms
    tbody.innerHTML = pageItems.map(u => `
        <tr data-user-id="${u.id}">
            <td>${u.role}</td>
            <td>${u.shopName ? `<strong>${u.shopName}</strong><br/><small>${u.name}</small>` : u.name}</td>
            <td>${u.email}</td>
            <td>${u.phone || 'N/A'}</td>
            <td>${u.status || 'N/A'}</td>
            <td class="actions-cell">
                <div class="actions">
                    <button class="btn-action view" onclick="viewUser('${u.id}')">View</button>
                    <button class="btn-action reject" onclick="inlineConfirmSuspend('${u.id}')">${u.status==='suspended' ? 'Unsuspend' : 'Suspend'}</button>
                    <button class="btn-action" onclick="inlineConfirmDelete('${u.id}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');

    const pager = document.getElementById('usersPagerInfo');
    if (pager) pager.textContent = `Showing ${start+1}-${Math.min(start+pageSize,total)} of ${total}`;
}

// Inline row confirmations (replace in-row actions with simple Yes/No)
function inlineConfirmDelete(userId) {
    const row = document.querySelector(`tr[data-user-id="${userId}"]`);
    if (!row) return;
    const cell = row.querySelector('.actions-cell');
    if (!cell) return;
    cell.innerHTML = `
        <div style="display:flex;gap:.5rem;justify-content:flex-end;align-items:center;">
            <span style="color:#b00;margin-right:.5rem;font-weight:600;">\u26A0 Delete?</span>
            <button class="btn-small btn-danger" onclick="deleteUser('${userId}')">
                <i class="fas fa-check" style="margin-right:.35rem"></i>Yes
            </button>
            <button class="btn-small" onclick="renderUsersTable()">
                <i class="fas fa-times" style="margin-right:.35rem"></i>No
            </button>
        </div>`;
}

function inlineConfirmSuspend(userId) {
    const row = document.querySelector(`tr[data-user-id="${userId}"]`);
    if (!row) return;
    const cell = row.querySelector('.actions-cell');
    if (!cell) return;
    cell.innerHTML = `
        <div style="display:flex;gap:.5rem;justify-content:flex-end;align-items:center;">
            <span style="color:#b60;margin-right:.5rem;font-weight:600;">\u26A0 Suspend?</span>
            <button class="btn-small btn-danger" onclick="suspendUser('${userId}')">
                <i class="fas fa-check" style="margin-right:.35rem"></i>Yes
            </button>
            <button class="btn-small" onclick="renderUsersTable()">
                <i class="fas fa-times" style="margin-right:.35rem"></i>No
            </button>
        </div>`;
}

function viewUser(userId) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const u = users.find(x => x.id === userId);
    if (!u) return showToast('User not found', 'error');
    alert(`User:\nName: ${u.name || ''}\nShop: ${u.shopName || ''}\nEmail: ${u.email}\nPhone: ${u.phone || ''}\nRole: ${u.role}\nStatus: ${u.status}`);
}

function deleteUser(userId) {
    // deprecated: use confirmDeleteUser to show nicer UI
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.filter(u => u.id !== userId);
    localStorage.setItem('users', JSON.stringify(users));
    showToast('User deleted');
    renderUsersTable();
    renderAdminUsersSection();
    loadAdminStats();
    loadPendingCounts();
}

function suspendUser(userId) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const u = users.find(x => x.id === userId);
    if (!u) return;
    u.status = u.status === 'suspended' ? 'active' : 'suspended';
    localStorage.setItem('users', JSON.stringify(users));
    showToast('User status updated');
    renderUsersTable();
    renderAdminUsersSection();
}

function resetDemoData() {
    showConfirm('Reset demo users to defaults? This will restore demo accounts but will not affect products.', () => {
        try {
            if (typeof defaultUsers !== 'undefined') {
                localStorage.setItem('users', JSON.stringify(defaultUsers));
                showToast('Demo users reset');
                renderUsersTable();
                renderAdminUsersSection();
                loadAdminStats();
                loadPendingCounts();
            } else {
                showToast('Default users not available', 'error');
            }
        } catch (e) {
            console.error(e);
            showToast('Failed to reset demo users', 'error');
        }
    });
}

// ============ Users modal helpers (search / sort / pagination) ============
const _usersState = { query: '', sort: 'createdDesc', page: 1, pageSize: 6, showAdmins: false, _prevFocus: null };

function onUsersSearch() {
    const el = document.getElementById('usersSearch');
    _usersState.query = el ? el.value : '';
    _usersState.page = 1;
    renderUsersTable();
}

function onUsersSort() {
    const el = document.getElementById('usersSort');
    _usersState.sort = el ? el.value : 'createdDesc';
    renderUsersTable();
}

function onUsersPageSizeChange() {
    const el = document.getElementById('usersPageSize');
    _usersState.pageSize = el ? parseInt(el.value,10) : 6;
    _usersState.page = 1;
    renderUsersTable();
}

function usersPrevPage() { if (_usersState.page > 1) { _usersState.page--; renderUsersTable(); } }
function usersNextPage() { const users = JSON.parse(localStorage.getItem('users')) || []; const max = Math.ceil(users.length / (_usersState.pageSize||6))||1; if (_usersState.page < max) { _usersState.page++; renderUsersTable(); } }

// Toggle showing admin users
function toggleShowAdmins(checked) {
    _usersState.showAdmins = !!checked;
    _usersState.page = 1;
    renderUsersTable();
    renderAdminUsersSection();
}

// Inline reset confirm handlers
function showResetInline() {
    const inline = document.getElementById('resetConfirmInline');
    const btn = document.getElementById('resetDemoBtn');
    if (!inline || !btn) return;
    inline.style.display = 'inline-flex';
    btn.style.display = 'none';
}

function cancelResetInline() {
    const inline = document.getElementById('resetConfirmInline');
    const btn = document.getElementById('resetDemoBtn');
    if (!inline || !btn) return;
    inline.style.display = 'none';
    btn.style.display = 'inline-block';
}

function doResetDemo() {
    try {
        if (typeof defaultUsers !== 'undefined') {
            localStorage.setItem('users', JSON.stringify(defaultUsers));
            showToast('Demo users reset');
            cancelResetInline();
            renderUsersTable();
            renderAdminUsersSection();
            loadAdminStats();
            loadPendingCounts();
        } else {
            showToast('Default users not available', 'error');
        }
    } catch (e) {
        console.error(e);
        showToast('Failed to reset demo users', 'error');
    }
}

// ============ Custom confirm overlay ============
function showConfirm(message, onConfirm) {
    // create overlay
    let overlay = document.getElementById('confirmOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'confirmOverlay';
        overlay.style.position = 'fixed';
        overlay.style.left = 0; overlay.style.top = 0; overlay.style.right = 0; overlay.style.bottom = 0;
        overlay.style.background = 'rgba(0,0,0,0.45)';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = 9999;
        overlay.innerHTML = `<div style="background:#fff;padding:1rem 1.2rem;border-radius:8px;max-width:420px;width:100%;box-shadow:0 8px 24px rgba(0,0,0,0.2);">
            <div id="confirmText" style="margin-bottom:1rem;color:#222"></div>
            <div style="text-align:right;display:flex;gap:.5rem;justify-content:flex-end;">
                <button id="confirmCancel" class="btn">Cancel</button>
                <button id="confirmOk" class="btn btn-danger">Confirm</button>
            </div>
        </div>`;
        document.body.appendChild(overlay);
    }

    document.getElementById('confirmText').textContent = message;
    overlay.style.display = 'flex';

    function cleanup() {
        overlay.style.display = 'none';
        document.getElementById('confirmOk').removeEventListener('click', ok);
        document.getElementById('confirmCancel').removeEventListener('click', cancel);
    }
    function ok() { cleanup(); onConfirm && onConfirm(); }
    function cancel() { cleanup(); }

    document.getElementById('confirmOk').addEventListener('click', ok);
    document.getElementById('confirmCancel').addEventListener('click', cancel);
}

function confirmDeleteUser(userId) {
    showConfirm('Delete this user? This action cannot be undone.', () => deleteUser(userId));
}

function confirmSuspend(userId) {
    showConfirm('Toggle suspension for this user?', () => suspendUser(userId));
}

function loadPendingCounts() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    const pendingSellers = users.filter(u => u.role === 'seller' && u.status === 'pending').length;
    const pendingProducts = products.filter(p => p.status === 'pending').length;
    
    updateElement('pendingSellersBadge', pendingSellers);
    updateElement('pendingProductsBadge', pendingProducts);
}

function loadSellersTable(filter = 'all') {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    let sellers = users.filter(u => u.role === 'seller');
    
    if (filter !== 'all') {
        sellers = sellers.filter(s => s.status === filter);
    }
    
    const tbody = document.getElementById('sellersTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = sellers.map(seller => `
        <tr>
            <td><strong>${seller.shopName || 'N/A'}</strong></td>
            <td>${seller.name}</td>
            <td>${seller.email}</td>
            <td>${seller.phone || 'N/A'}</td>
            <td><span class="status-badge-table ${seller.status}">${seller.status}</span></td>
            <td>${new Date(seller.createdAt).toLocaleDateString()}</td>
            <td>
                ${seller.status === 'pending' ? `
                    <button class="btn-action approve" onclick="approveSeller('${seller.id}')">
                        <i class="fas fa-check"></i> Approve
                    </button>
                    <button class="btn-action reject" onclick="rejectSeller('${seller.id}')">
                        <i class="fas fa-times"></i> Reject
                    </button>
                ` : `
                    <button class="btn-action view" onclick="viewSeller('${seller.id}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                `}
            </td>
        </tr>
    `).join('');
}

function approveSeller(sellerId) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const seller = users.find(u => u.id === sellerId);
    if (seller) {
        seller.status = 'approved';
        localStorage.setItem('users', JSON.stringify(users));
        showToast('Seller approved successfully!');
        loadSellersTable('pending');
        loadPendingCounts();
        loadAdminStats();
    }
}

function rejectSeller(sellerId) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const seller = users.find(u => u.id === sellerId);
    if (seller) {
        seller.status = 'rejected';
        localStorage.setItem('users', JSON.stringify(users));
        showToast('Seller rejected.');
        loadSellersTable('pending');
        loadPendingCounts();
    }
}

function loadBuyersTable() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const buyers = users.filter(u => u.role === 'buyer');
    
    const tbody = document.getElementById('buyersTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = buyers.map(buyer => `
        <tr>
            <td>${buyer.name}</td>
            <td>${buyer.email}</td>
            <td>${buyer.phone || 'N/A'}</td>
            <td>0</td>
            <td>${new Date(buyer.createdAt).toLocaleDateString()}</td>
            <td><span class="status-badge-table approved">active</span></td>
            <td>
                <button class="btn-action view" onclick="viewBuyer('${buyer.id}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-action reject" onclick="inlineConfirmSuspend('${buyer.id}')">
                    <i class="fas fa-ban"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function loadProductsTable(filter = 'all') {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    let filtered = products;
    
    if (filter !== 'all') {
        filtered = products.filter(p => p.status === filter);
    }
    
    const tbody = document.getElementById('productsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = filtered.map(product => `
        <tr>
            <td><strong>${product.name || product.title}</strong></td>
            <td>${product.sellerName || 'Unknown Seller'}</td>
            <td>${product.category}</td>
            <td>${product.stock || 0}</td>
            <td>PKR ${product.price.toFixed(2)}</td>
            <td><span class="status-badge-table ${product.status}">${product.status}</span></td>
            <td>${product.createdAt ? new Date(product.createdAt).toLocaleDateString() : 'Unknown date'}</td>
            <td>
                ${product.status === 'pending' ? `
                    <button class="btn-action approve" onclick="approveProduct('${product.id}')">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="btn-action reject" onclick="rejectProduct('${product.id}')">
                        <i class="fas fa-times"></i>
                    </button>
                ` : `
                    <button class="btn-action view" onclick="viewProduct('${product.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-action reject" onclick="deleteProduct('${product.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                `}
            </td>
        </tr>
    `).join('');
}

function approveProduct(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => String(p.id) === String(productId));
    if (product) {
        product.status = 'approved';
        localStorage.setItem('products', JSON.stringify(products));
        showToast('Product approved!');
        loadProductsTable('pending');
        loadPendingCounts();
    }
}

function rejectProduct(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => String(p.id) === String(productId));
    if (product) {
        product.status = 'rejected';
        localStorage.setItem('products', JSON.stringify(products));
        showToast('Product rejected.');
        loadProductsTable('pending');
        loadPendingCounts();
    }
}

// ==================== SELLER FUNCTIONS ====================
function loadSellerStats() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const myProducts = products.filter(p => p.sellerId === currentUser.id);
    const myOrders = orders.filter(o => (o.items || []).some(i => String(i.sellerId) === String(currentUser.id)));
    const deliveredOrders = myOrders.filter(o => o.status === 'delivered');

    const grossSales = deliveredOrders.reduce((sum, o) => {
        return sum + (o.items || []).reduce((s, item) => {
            if (String(item.sellerId) !== String(currentUser.id)) return s;
            const qty = item.quantity || item.qty || 1;
            return s + ((item.price || 0) * qty);
        }, 0);
    }, 0);

    const totalCommission = deliveredOrders.reduce((sum, o) => {
        return sum + (o.items || []).reduce((s, item) => {
            if (String(item.sellerId) !== String(currentUser.id)) return s;
            const qty = item.quantity || item.qty || 1;
            const itemAmount = (item.price || 0) * qty;
            const commission = item.platformCommission != null ? item.platformCommission : itemAmount * 0.1;
            return s + commission;
        }, 0);
    }, 0);

    const sellerRevenue = grossSales - totalCommission;
    updateElement('sellerProductCount', myProducts.length);
    updateElement('approvedProductCount', myProducts.filter(p => p.status === 'approved').length);
    updateElement('pendingProductCount', myProducts.filter(p => p.status === 'pending').length);
    updateElement('sellerGrossEarnings', 'PKR ' + grossSales.toFixed(2));
    updateElement('sellerRevenue', 'PKR ' + sellerRevenue.toFixed(2));
    // Compute pending earnings (non-delivered, non-cancelled)
    const pendingOrders = myOrders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled');
    const pendingEarnings = pendingOrders.reduce((sum, o) => {
        return sum + (o.items || []).reduce((s, item) => {
            if (String(item.sellerId) !== String(currentUser.id)) return s;
            const qty = item.quantity || item.qty || 1;
            return s + ((item.price || 0) * qty);
        }, 0);
    }, 0);

    // Commission earned by platform from seller's delivered orders
    const commissionEarned = totalCommission;

    updateElement('sellerPendingEarnings', 'PKR ' + pendingEarnings.toFixed(2));
    updateElement('sellerTotalCommission', 'PKR ' + commissionEarned.toFixed(2));
    updateElement('sellerShopName', currentUser.shopName || currentUser.name || 'My Shop');
    const sellerStatus = document.getElementById('sellerStatus');
    if (sellerStatus) sellerStatus.textContent = currentUser.status || 'Pending';
}

function loadSellerProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const profileShopName = document.getElementById('profileShopName');
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const profilePhone = document.getElementById('profilePhone');
    const profileBio = document.getElementById('profileBio');
    const sellerName = document.getElementById('sellerName');
    const headerAvatar = document.getElementById('headerAvatar');
    const sellerAvatar = document.getElementById('sellerAvatar');

    if (profileShopName) profileShopName.value = currentUser.shopName || currentUser.name || '';
    if (profileName) profileName.value = currentUser.name || '';
    if (profileEmail) profileEmail.value = currentUser.email || '';
    if (profilePhone) profilePhone.value = currentUser.phone || '';
    if (profileBio) profileBio.value = currentUser.sellerBio || '';
    if (sellerName) sellerName.textContent = currentUser.shopName || currentUser.name || 'Seller';
    if (headerAvatar) headerAvatar.textContent = (currentUser.name || currentUser.shopName || 'S').charAt(0).toUpperCase();
    if (sellerAvatar) sellerAvatar.textContent = (currentUser.name || currentUser.shopName || 'S').charAt(0).toUpperCase();
}

function updateProfile(event) {
    event.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const shopName = document.getElementById('profileShopName')?.value.trim();
    const name = document.getElementById('profileName')?.value.trim();
    const phone = document.getElementById('profilePhone')?.value.trim();
    const bio = document.getElementById('profileBio')?.value.trim();

    if (!shopName || !name) {
        return showToast('Shop name and owner name are required.', 'error');
    }

    currentUser.shopName = shopName;
    currentUser.name = name;
    currentUser.phone = phone;
    currentUser.sellerBio = bio;

    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...currentUser };
        localStorage.setItem('users', JSON.stringify(users));
    }
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    loadSellerProfile();
    loadSellerStats();
    showToast('Profile updated successfully.');
}

function getSellerOrderPayout(order, sellerId) {
    const items = order.items || [];
    return items.reduce((sum, item) => {
        if (String(item.sellerId) !== String(sellerId)) return sum;
        const quantity = item.quantity || item.qty || 1;
        const itemAmount = (item.price || 0) * quantity;
        const commission = item.platformCommission != null ? item.platformCommission : itemAmount * 0.1;
        return sum + (itemAmount - commission);
    }, 0);
}

function handleAddProduct(event) {
    event.preventDefault();
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    const product = {
        id: 'prod_' + Date.now(),
        title: document.getElementById('productName').value,
        name: document.getElementById('productName').value,
        artisan: currentUser.shopName || currentUser.name,
        category: document.getElementById('productCategory').value,
        price: parseFloat(document.getElementById('productPrice').value),
        stock: parseInt(document.getElementById('productStock').value),
        rating: 4.5,
        description: document.getElementById('productDescription').value,
        image: document.getElementById('productImage').value || 'https://via.placeholder.com/400',
        sellerId: currentUser.id,
        sellerName: currentUser.shopName || currentUser.name,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    
    showToast('Product submitted for approval!');
    event.target.reset();
    showSection('myProducts');
    loadSellerProducts();
}

function loadSellerProducts(filter = 'all') {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const products = JSON.parse(localStorage.getItem('products')) || [];
    let myProducts = products.filter(p => p.sellerId === currentUser.id);
    
    if (filter !== 'all') {
        myProducts = myProducts.filter(p => p.status === filter);
    }
    
    const tbody = document.getElementById('myProductsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = myProducts.map(product => `
        <tr>
            <td><strong>${product.name || product.title}</strong></td>
            <td>${product.category}</td>
            <td>PKR ${product.price.toFixed(2)}</td>
            <td>${product.stock}</td>
            <td><span class="status-badge-table ${product.status}">${product.status}</span></td>
            <td>${product.createdAt ? new Date(product.createdAt).toLocaleDateString() : 'Unknown date'}</td>
            <td>
                <button class="btn-action view" onclick="viewProduct('${product.id}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-action reject" onclick="deleteProduct('${product.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.filter(p => String(p.id) !== String(productId));
    localStorage.setItem('products', JSON.stringify(products));
    
    showToast('Product deleted.');
    loadSellerProducts();
    loadSellerStats();
}

// ==================== BUYER FUNCTIONS ====================
function loadBuyerStats() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const myOrders = orders.filter(o => o.buyerId === currentUser.id);

    updateElement('buyerOrderCount', myOrders.length);
    updateElement('deliveredCount', myOrders.filter(o => o.status === 'delivered').length);
    updateElement('wishlistCount', wishlist.length);
    updateElement('totalSpent', 'PKR ' + myOrders.reduce((sum, o) => sum + (o.total || 0), 0).toFixed(2));

    loadBuyerOverview();
    loadBuyerWishlist();
}

function getBuyerAddresses() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const addresses = JSON.parse(localStorage.getItem('addresses')) || [];
    return Array.isArray(addresses) ? addresses.filter(a => a.buyerId === currentUser.id) : [];
}

function renderAddresses() {
    const addressList = document.getElementById('addressList');
    if (!addressList) return;

    const addresses = getBuyerAddresses();
    if (addresses.length === 0) {
        addressList.innerHTML = `<div class="address-card empty-address"><p>No saved addresses yet. Add one to choose it for delivery later.</p></div>`;
        return;
    }

    addressList.innerHTML = addresses.map(address => `
        <div class="address-card" data-id="${address.id}">
            <div class="address-header">
                <span class="badge default">${address.label || 'Address'}</span>
                <div class="address-actions">
                    <button class="btn-icon" onclick="showAddressForm('${address.id}')"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon" onclick="deleteAddress('${address.id}')"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <p><strong>${address.label || 'Address'}</strong></p>
            <p>${address.line}</p>
            <p>${address.city}, ${address.region}</p>
            <p>${address.country} ${address.postalCode || ''}</p>
            <p><i class="fas fa-phone"></i> ${address.phone}</p>
        </div>
    `).join('');
}

function showAddressForm(addressId = '') {
    const formCard = document.getElementById('addressFormCard');
    if (!formCard) return;

    const addressIdInput = document.getElementById('addressId');
    const labelInput = document.getElementById('addressLabel');
    const phoneInput = document.getElementById('addressPhone');
    const lineInput = document.getElementById('addressLine');
    const cityInput = document.getElementById('addressCity');
    const regionInput = document.getElementById('addressRegion');
    const countryInput = document.getElementById('addressCountry');
    const postalInput = document.getElementById('addressPostal');

    if (addressId) {
        const address = getBuyerAddresses().find(a => String(a.id) === String(addressId));
        if (address) {
            addressIdInput.value = address.id;
            labelInput.value = address.label;
            phoneInput.value = address.phone;
            lineInput.value = address.line;
            cityInput.value = address.city;
            regionInput.value = address.region;
            countryInput.value = address.country;
            postalInput.value = address.postalCode || '';
        }
    } else {
        addressIdInput.value = '';
        labelInput.value = '';
        phoneInput.value = '';
        lineInput.value = '';
        cityInput.value = '';
        regionInput.value = '';
        countryInput.value = '';
        postalInput.value = '';
    }

    formCard.style.display = 'block';
    formCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function hideAddressForm() {
    const formCard = document.getElementById('addressFormCard');
    if (!formCard) return;
    formCard.style.display = 'none';
}

function saveAddress(event) {
    event.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    if (!currentUser.id) return;

    const addressId = document.getElementById('addressId')?.value;
    const label = document.getElementById('addressLabel')?.value.trim();
    const phone = document.getElementById('addressPhone')?.value.trim();
    const line = document.getElementById('addressLine')?.value.trim();
    const city = document.getElementById('addressCity')?.value.trim();
    const region = document.getElementById('addressRegion')?.value.trim();
    const country = document.getElementById('addressCountry')?.value.trim();
    const postalCode = document.getElementById('addressPostal')?.value.trim();

    if (!label || !phone || !line || !city || !region || !country) {
        return showToast('Please complete all address fields.', 'error');
    }

    const addresses = JSON.parse(localStorage.getItem('addresses')) || [];
    if (addressId) {
        const idx = addresses.findIndex(a => String(a.id) === String(addressId));
        if (idx !== -1) {
            addresses[idx] = {
                ...addresses[idx],
                label,
                phone,
                line,
                city,
                region,
                country,
                postalCode
            };
        }
    } else {
        addresses.push({
            id: 'addr_' + Date.now(),
            buyerId: currentUser.id,
            label,
            phone,
            line,
            city,
            region,
            country,
            postalCode,
            createdAt: new Date().toISOString()
        });
    }

    localStorage.setItem('addresses', JSON.stringify(addresses));
    hideAddressForm();
    renderAddresses();
    showToast('Address saved successfully.');
}

function deleteAddress(addressId) {
    const addresses = JSON.parse(localStorage.getItem('addresses')) || [];
    const filtered = addresses.filter(a => String(a.id) !== String(addressId));
    localStorage.setItem('addresses', JSON.stringify(filtered));
    renderAddresses();
    showToast('Address removed.');
}

function loadBuyerWishlist() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const preview = document.getElementById('wishlistPreview');
    const grid = document.getElementById('wishlistGrid');

    if (preview) {
        preview.innerHTML = wishlist.slice(0, 3).map(item => `
            <div class="wishlist-preview-item">
                <span>${item.name || item.title}</span>
                <span>PKR ${(item.price || 0).toFixed(2)}</span>
            </div>
        `).join('') || '<p>No wishlist items yet.</p>';
    }

    if (grid) {
        grid.innerHTML = wishlist.map(item => `
            <div class="product-card wishlist-card">
                <div class="product-img" style="background-image: url('${item.image}')"></div>
                <div class="product-info">
                    <h3 class="product-title">${item.name || item.title}</h3>
                    <p class="product-price">PKR ${(item.price || 0).toFixed(2)}</p>
                    <button class="btn btn-outline" onclick="removeFromWishlist('${item.id}')">Remove</button>
                </div>
            </div>
        `).join('') || '<p>Your wishlist is empty.</p>';
    }
}

function removeFromWishlist(itemId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter(item => String(item.id) !== String(itemId));
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    loadBuyerWishlist();
    loadBuyerStats();
}

function loadBuyerProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const profileName = document.getElementById('buyerProfileName');
    const profileEmail = document.getElementById('buyerProfileEmail');
    const profilePhone = document.getElementById('buyerProfilePhone');
    const profileDob = document.getElementById('buyerProfileDob');
    const buyerName = document.getElementById('buyerName');
    const headerBuyerName = document.getElementById('headerBuyerName');
    const buyerAvatar = document.getElementById('buyerAvatar');
    const headerBuyerAvatar = document.getElementById('headerBuyerAvatar');

    if (profileName) profileName.value = currentUser.name || '';
    if (profileEmail) profileEmail.value = currentUser.email || '';
    if (profilePhone) profilePhone.value = currentUser.phone || '';
    if (profileDob) profileDob.value = currentUser.dob || '';
    if (buyerName) buyerName.textContent = currentUser.name || 'Buyer';
    if (headerBuyerName) headerBuyerName.textContent = currentUser.name || 'Buyer';
    if (buyerAvatar) buyerAvatar.textContent = (currentUser.name || 'Buyer').charAt(0).toUpperCase();
    if (headerBuyerAvatar) headerBuyerAvatar.textContent = (currentUser.name || 'Buyer').charAt(0).toUpperCase();
}

function updateBuyerProfile(event) {
    event.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const name = document.getElementById('buyerProfileName')?.value.trim();
    const phone = document.getElementById('buyerProfilePhone')?.value.trim();
    const dob = document.getElementById('buyerProfileDob')?.value;

    if (!name) {
        return showToast('Please enter your full name.', 'error');
    }

    currentUser.name = name;
    currentUser.phone = phone;
    currentUser.dob = dob;

    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...currentUser };
        localStorage.setItem('users', JSON.stringify(users));
    }

    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    loadBuyerProfile();
    showToast('Profile updated successfully.');
}

function loadBuyerOverview() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const myOrders = orders.filter(o => o.buyerId === currentUser.id);

    const recentOrdersList = document.getElementById('recentOrdersList');
    if (recentOrdersList) {
        recentOrdersList.innerHTML = myOrders.slice(-3).reverse().map(o => `
            <div class="order-card">
                <div class="order-card-header">
                    <span>Order ${o.id}</span>
                    <span class="status-badge ${o.status}">${o.status || 'pending'}</span>
                </div>
                <p><strong>Total:</strong> PKR ${((o.total)||0).toFixed(2)}</p>
                <p><strong>Placed:</strong> ${new Date(o.createdAt).toLocaleDateString()}</p>
            </div>
        `).join('') || '<p>No recent orders yet.</p>';
    }
}

// ==================== HELPER FUNCTIONS ====================
function updateElement(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

function loadSectionData(sectionId) {
    switch(sectionId) {
        case 'overview':
            if (JSON.parse(localStorage.getItem('currentUser'))?.role === 'admin') {
                loadAdminActivity();
            }
            break;
        case 'sellers':
            loadSellersTable('all');
            break;
        case 'buyers':
            loadBuyersTable();
            break;
        case 'products':
            loadProductsTable('all');
            break;
        case 'myProducts':
            loadSellerProducts('all');
            break;
        case 'orders':
            loadOrdersTable();
            break;
        case 'wishlist':
            loadBuyerWishlist();
            break;
        case 'addresses':
            renderAddresses();
            break;
    }
}

// Orders listing and utilities
function loadOrdersTable() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};

    let list = orders;
    if (currentUser.role === 'seller') {
        list = orders.filter(o => (o.items || []).some(i => i.sellerId === currentUser.id));
    } else if (currentUser.role === 'buyer') {
        list = orders.filter(o => o.buyerId === currentUser.id);
    }

    const tbody = document.getElementById('ordersTableBody') || document.getElementById('buyerOrdersTableBody') || document.getElementById('sellerOrdersTableBody');
    if (!tbody) return;

    tbody.innerHTML = list.map(o => {
        // Admin: show full order including commission
        if (currentUser.role === 'admin') {
            return `
                <tr>
                    <td>${o.id || ('ord_' + o.createdAt)}</td>
                    <td>${o.buyerName || 'N/A'}</td>
                    <td>${(o.items || []).length}</td>
                    <td>PKR ${((o.total)||0).toFixed(2)}</td>
                    <td>PKR ${((o.platformCommission)||0).toFixed(2)}</td>
                    <td>${o.status || 'pending'}</td>
                    <td>${new Date(o.createdAt).toLocaleDateString()}</td>
                    <td>
                        <button class="btn-action view" onclick="viewOrder('${o.id}')">View</button>
                    </td>
                </tr>
            `;
        }

        // Seller: only include items that belong to this seller and compute seller-specific totals
        if (currentUser.role === 'seller') {
            const sellerItems = (o.items || []).filter(i => String(i.sellerId) === String(currentUser.id));
            if (!sellerItems.length) return '';

            const sellerItemCount = sellerItems.reduce((c, it) => c + (it.quantity || it.qty || 1), 0);
            const sellerTotal = sellerItems.reduce((s, it) => s + ((it.price || 0) * (it.quantity || it.qty || 1)), 0);

            return `
                <tr>
                    <td>${o.id || ('ord_' + o.createdAt)}</td>
                    <td>${o.buyerName || 'N/A'}</td>
                    <td>${sellerItemCount}</td>
                    <td>PKR ${sellerTotal.toFixed(2)}</td>
                    <td>${o.status || 'pending'}</td>
                    <td>${new Date(o.createdAt).toLocaleDateString()}</td>
                    <td>
                        <button class="btn-action view" onclick="viewOrder('${o.id}')">View</button>
                        ${o.status === 'pending' ? `
                            <button class="btn-action approve" onclick="updateOrderStatus('${o.id}', 'shipped')" title="Mark Shipped">
                                <i class="fas fa-truck"></i>
                            </button>
                        ` : ''}
                        ${o.status !== 'delivered' && o.status !== 'cancelled' ? `
                            <button class="btn-action approve" onclick="updateOrderStatus('${o.id}', 'delivered')" title="Mark Delivered">
                                <i class="fas fa-check"></i>
                            </button>
                            <button class="btn-action reject" onclick="updateOrderStatus('${o.id}', 'cancelled')" title="Cancel Order">
                                <i class="fas fa-times"></i>
                            </button>
                        ` : ''}
                    </td>
                </tr>
            `;
        }

        // Buyer / fallback: show full order
        return `
            <tr>
                <td>${o.id || ('ord_' + o.createdAt)}</td>
                <td>${o.buyerName || 'N/A'}</td>
                <td>${(o.items || []).length}</td>
                <td>PKR ${((o.total)||0).toFixed(2)}</td>
                <td>${o.status || 'pending'}</td>
                <td>${new Date(o.createdAt).toLocaleDateString()}</td>
                <td>
                    <button class="btn-action view" onclick="viewOrder('${o.id}')">View</button>
                </td>
            </tr>
        `;
    }).join('');
}

function viewOrder(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const o = orders.find(x => String(x.id) === String(orderId));
    if (!o) return showToast('Order not found', 'error');
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    let itemsToShow = o.items || [];
    if (currentUser.role === 'seller') {
        itemsToShow = (o.items || []).filter(i => String(i.sellerId) === String(currentUser.id));
    }
    const items = itemsToShow.map(i => `${i.name} x${i.quantity || i.qty || 1} - PKR ${((i.price)||0).toFixed(2)}`).join('\n');
    const instructions = o.deliveryInstruction ? `\nDelivery Instructions: ${o.deliveryInstruction}` : '';
    const address = o.deliveryAddress ? `\nDelivery Address: ${o.deliveryAddress}` : '';
    const totalToShow = (currentUser.role === 'seller')
        ? itemsToShow.reduce((s, it) => s + ((it.price || 0) * (it.quantity || it.qty || 1)), 0)
        : (o.total || 0);

    alert(`Order ${o.id}\nBuyer: ${o.buyerName}\nEmail: ${o.buyerEmail || 'N/A'}\nPhone: ${o.buyerPhone || 'N/A'}\nItems:\n${items}\n\nTotal: PKR ${((totalToShow)||0).toFixed(2)}\nStatus: ${o.status || 'pending'}\nPayment: ${o.paymentMethod}\nReference: ${o.paymentRef}${address}${instructions}`);
}

function updateOrderStatus(orderId, status) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(x => String(x.id) === String(orderId));
    if (!order) {
        return showToast('Order not found', 'error');
    }

    order.status = status;
    localStorage.setItem('orders', JSON.stringify(orders));
    showToast(`Order marked ${status}.`);
    loadOrdersTable();
    loadAdminStats();
    loadSellerStats();
}

function viewProduct(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const p = products.find(x => String(x.id) === String(productId));
    if (!p) return showToast('Product not found', 'error');
    alert(`Product:\nName: ${p.name || p.title}\nCategory: ${p.category}\nPrice: PKR ${p.price.toFixed(2)}\nStock: ${p.stock || 0}\nDescription: ${p.description || ''}`);
}

function viewSeller(sellerId) { viewUser(sellerId); }
function viewBuyer(buyerId) { viewUser(buyerId); }

function filterSellers(status) {
    loadSellersTable(status);
}

function filterProducts(status) {
    loadProductsTable(status);
}

function filterMyProducts(status) {
    loadSellerProducts(status);
}

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

// ============ ADMIN QUICK USERS (overview) ============
let _adminUsersPage = 1;
const _adminUsersPageSize = 6;

function renderAdminUsersSection(page = _adminUsersPage) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const list = _usersState.showAdmins ? users.slice() : users.filter(u => u.role !== 'admin');
    const start = (page - 1) * _adminUsersPageSize;
    const subset = list.slice().reverse().slice(start, start + _adminUsersPageSize);
    const tbody = document.getElementById('adminUsersTableBody');
    if (!tbody) return;

    tbody.innerHTML = subset.map(u => `
        <tr>
            <td>${u.role}</td>
            <td>${u.shopName ? `<strong>${u.shopName}</strong><br/><small>${u.name}</small>` : u.name}</td>
            <td>${u.email}</td>
            <td>${u.status || 'N/A'}</td>
        </tr>
    `).join('');
}

function prevAdminUsersPage() {
    if (_adminUsersPage > 1) {
        _adminUsersPage--;
        renderAdminUsersSection();
    }
}

function nextAdminUsersPage() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const list = _usersState.showAdmins ? users.slice() : users.filter(u => u.role !== 'admin');
    const max = Math.ceil(list.length / _adminUsersPageSize) || 1;
    if (_adminUsersPage < max) {
        _adminUsersPage++;
        renderAdminUsersSection();
    }
}