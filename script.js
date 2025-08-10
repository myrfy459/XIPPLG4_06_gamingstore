// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(107, 70, 193, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(107, 70, 193, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.querySelector('.name').value;
    const email = document.querySelector('.email').value;
    const message = document.querySelector('.message').value;

    // Validasi sederhana
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Kirim ke WhatsApp
    sendwhatsapp(name, email, message);


});

// Fungsi kirim ke WhatsApp
function sendwhatsapp(name, email, message) {
    var phonenumber = "6285842363036"; // Ganti dengan nomor WA kamu

    var url = "https://wa.me/" + phonenumber + "?text="
        + "*Name :* " + name + "%0a"
        + "*Email :* " + email + "%0a"
        + "*Message :* " + message + "%0a%0a"
        + "Ini adalah pesan dari website game zone";

    window.open(url, '_blank').focus();
}

// Fungsi validasi email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 1rem;
        padding: 0;
        line-height: 1;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;
document.head.appendChild(style);

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const floatingItems = document.querySelectorAll('.floating-item');
    const scrolled = window.pageYOffset;
    
    floatingItems.forEach(item => {
        const speed = item.getAttribute('data-speed') || 1;
        const yPos = -(scrolled * speed * 0.5);
        item.style.transform = `translateY(${yPos}px)`;
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .contact-item, .footer-section');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Button hover effects
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Feature card hover effects
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Social links hover effects
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Shopping Cart Functionality
let cart = JSON.parse(localStorage.getItem('gamezone_cart')) || [];
let cartTotal = 0;

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('gamezone_cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('gamezone_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Product data with extended properties
const products = [
    { 
        id: 1, 
        name: 'Headset Pro X99', 
        brand: 'GamingTech', 
        type: 'Headset', 
        price: 1250000, 
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
        description: 'Headset gaming premium dengan suara surround 7.1, mikrofon noise-cancelling, dan kenyamanan maksimal untuk gaming marathon.'
    },
    { 
        id: 2, 
        name: 'Keyboard RGB Ultra', 
        brand: 'MechanicalPro', 
        type: 'Keyboard', 
        price: 2500000, 
        image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
        description: 'Keyboard mekanikal dengan switch Cherry MX Blue, lampu RGB yang dapat dikustomisasi, dan desain ergonomis untuk gaming.'
    },
    { 
        id: 3, 
        name: 'Mouse Elite 5000', 
        brand: 'GamingTech', 
        type: 'Mouse', 
        price: 850000, 
        image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80',
        description: 'Mouse gaming dengan sensor 25,600 DPI, 8 tombol yang dapat diprogram, dan desain ergonomis untuk tangan kanan.'
    },
    { 
        id: 4, 
        name: 'Gaming Controller Pro', 
        brand: 'ConsoleMaster', 
        type: 'Controller', 
        price: 1800000, 
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80',
        description: 'Controller wireless dengan dual vibration, trigger buttons yang responsif, dan kompatibel dengan PC, PS4, dan PS5.'
    },
    { 
        id: 5, 
        name: 'Gaming Monitor 27"', 
        brand: 'DisplayPro', 
        type: 'Monitor', 
        price: 4500000, 
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=400&q=80',
        description: 'Monitor gaming 27" dengan refresh rate 165Hz, response time 1ms, dan resolusi 2560x1440 untuk pengalaman gaming yang smooth.'
    },
    { 
        id: 6, 
        name: 'Gaming Chair Premium', 
        brand: 'ComfortMax', 
        type: 'Chair', 
        price: 3200000, 
        image: 'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?auto=format&fit=crop&w=400&q=80',
        description: 'Kursi gaming ergonomis dengan lumbar support, headrest yang dapat disesuaikan, dan material premium untuk kenyamanan maksimal.'
    },
    { 
        id: 7, 
        name: 'Gaming Mousepad XL', 
        brand: 'GamingTech', 
        type: 'Mousepad', 
        price: 350000, 
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
        description: 'Mousepad gaming extra large dengan permukaan yang halus dan anti-slip untuk kontrol yang presisi.'
    },
    { 
        id: 8, 
        name: 'Gaming Microphone Pro', 
        brand: 'AudioMaster', 
        type: 'Microphone', 
        price: 1200000, 
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
        description: 'Mikrofon gaming dengan noise-cancelling dan suara yang jernih untuk streaming dan komunikasi gaming.'
    },
    { 
        id: 9, 
        name: 'Gaming Laptop RTX 4080', 
        brand: 'TechGaming', 
        type: 'Laptop', 
        price: 25000000, 
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=400&q=80',
        description: 'Laptop gaming premium dengan RTX 4080, Intel i9-13900H, 32GB RAM, dan layar 17" 240Hz untuk performa gaming maksimal.'
    },
    { 
        id: 10, 
        name: 'Gaming Desk Pro', 
        brand: 'FurnitureMax', 
        type: 'Desk', 
        price: 2800000, 
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80',
        description: 'Meja gaming dengan cable management, LED strip RGB, dan ruang yang luas untuk setup gaming yang lengkap.'
    },
    { 
        id: 11, 
        name: 'Gaming Webcam 4K', 
        brand: 'StreamTech', 
        type: 'Webcam', 
        price: 1800000, 
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
        description: 'Webcam 4K dengan autofocus, noise-cancelling microphone, dan low-light enhancement untuk streaming berkualitas tinggi.'
    },
    { 
        id: 12, 
        name: 'Gaming Headset Stand', 
        brand: 'AccessoryPro', 
        type: 'Accessory', 
        price: 450000, 
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
        description: 'Stand headset dengan USB hub, audio passthrough, dan LED RGB untuk organisasi setup gaming yang rapi.'
    },
    { 
        id: 13, 
        name: 'Gaming Console PS5', 
        brand: 'Sony', 
        type: 'Console', 
        price: 8500000, 
        image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=400&q=80',
        description: 'PlayStation 5 dengan DualSense controller, SSD ultra-fast, dan grafis ray-tracing untuk pengalaman gaming next-gen.'
    },
    { 
        id: 14, 
        name: 'Gaming Console Xbox Series X', 
        brand: 'Microsoft', 
        type: 'Console', 
        price: 7800000, 
        image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=400&q=80',
        description: 'Xbox Series X dengan Game Pass, Quick Resume, dan performa 4K 120fps untuk gaming yang smooth.'
    },
    { 
        id: 15, 
        name: 'Gaming Router WiFi 6', 
        brand: 'NetGaming', 
        type: 'Router', 
        price: 2200000, 
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
        description: 'Router gaming dengan WiFi 6, QoS gaming, dan latency optimization untuk koneksi online yang stabil.'
    },
    { 
        id: 16, 
        name: 'Gaming SSD 2TB NVMe', 
        brand: 'StoragePro', 
        type: 'Storage', 
        price: 1800000, 
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
        description: 'SSD NVMe 2TB dengan read speed 7000MB/s untuk loading game yang super cepat dan performa sistem optimal.'
    },
    { 
        id: 17, 
        name: 'Gaming RAM 32GB DDR5', 
        brand: 'MemoryMax', 
        type: 'RAM', 
        price: 1200000, 
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
        description: 'RAM DDR5 32GB dengan RGB lighting dan timing yang optimal untuk gaming dan multitasking yang smooth.'
    },
    { 
        id: 18, 
        name: 'Gaming CPU Cooler RGB', 
        brand: 'CoolingPro', 
        type: 'Cooling', 
        price: 950000, 
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
        description: 'CPU cooler dengan RGB fan, thermal paste premium, dan performa pendinginan yang optimal untuk overclocking.'
    },
    { 
        id: 19, 
        name: 'Gaming Power Supply 850W', 
        brand: 'PowerMax', 
        type: 'Power Supply', 
        price: 1500000, 
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
        description: 'Power supply 850W 80+ Gold dengan modular cables dan proteksi lengkap untuk sistem gaming yang stabil.'
    },
    { 
        id: 20, 
        name: 'Gaming Case RGB', 
        brand: 'CaseMaster', 
        type: 'Case', 
        price: 2100000, 
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
        description: 'PC case dengan RGB fans, tempered glass, dan airflow yang optimal untuk sistem gaming yang keren dan performa tinggi.'
    }
];

// Convert to object for cart functionality
const productsObj = {};
products.forEach(product => {
    productsObj[product.id] = {
        name: product.name,
        price: product.price,
        image: product.image
    };
});

// Search and Filter Functionality
let filteredProducts = [...products];

// Initialize search and filter
document.addEventListener('DOMContentLoaded', () => {
    // Load cart from localStorage
    loadCart();
    
    // Initialize search and filter if on products page
    if (document.getElementById('searchName')) {
        initializeSearchAndFilter();
        renderProducts(products);
    }
    
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            addToCart(productId);
        });
    });

    // Buy now buttons
    document.querySelectorAll('.buy-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            buyNow(productId);
        });
    });

    // Cart icon click
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', showCart);
    }
});

function initializeSearchAndFilter() {
    // Populate brand and type dropdowns
    const brands = [...new Set(products.map(p => p.brand))];
    const types = [...new Set(products.map(p => p.type))];
    
    const brandSelect = document.getElementById('searchBrand');
    const typeSelect = document.getElementById('searchType');
    
    brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        brandSelect.appendChild(option);
    });
    
    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        typeSelect.appendChild(option);
    });
    
    // Add event listeners for live filtering
    document.getElementById('searchName').addEventListener('input', filterProducts);
    document.getElementById('searchBrand').addEventListener('change', filterProducts);
    document.getElementById('searchType').addEventListener('change', filterProducts);
    document.getElementById('minPrice').addEventListener('input', filterProducts);
    document.getElementById('maxPrice').addEventListener('input', filterProducts);
    
    // Clear filters button
    document.getElementById('clearFilters').addEventListener('click', clearFilters);
}

function filterProducts() {
    const searchName = document.getElementById('searchName').value.toLowerCase();
    const searchBrand = document.getElementById('searchBrand').value;
    const searchType = document.getElementById('searchType').value;
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    
    // Validate price range
    validatePriceRange(minPrice, maxPrice);
    
    filteredProducts = products.filter(product => {
        // Name filter
        const nameMatch = product.name.toLowerCase().includes(searchName);
        
        // Brand filter
        const brandMatch = !searchBrand || product.brand === searchBrand;
        
        // Type filter
        const typeMatch = !searchType || product.type === searchType;
        
        // Price filter
        let priceMatch = true;
        if (minPrice && product.price < parseInt(minPrice)) {
            priceMatch = false;
        }
        if (maxPrice && product.price > parseInt(maxPrice)) {
            priceMatch = false;
        }
        
        return nameMatch && brandMatch && typeMatch && priceMatch;
    });
    
    renderProducts(filteredProducts);
}

function validatePriceRange(minPrice, maxPrice) {
    const warning = document.querySelector('.price-warning') || createPriceWarning();
    
    if (minPrice && maxPrice && parseInt(minPrice) > parseInt(maxPrice)) {
        warning.textContent = 'Peringatan: Harga minimal tidak boleh lebih besar dari harga maksimal!';
        warning.classList.add('show');
    } else {
        warning.classList.remove('show');
    }
}

function createPriceWarning() {
    const warning = document.createElement('div');
    warning.className = 'price-warning';
    document.querySelector('.search-filter-section').appendChild(warning);
    return warning;
}

function clearFilters() {
    document.getElementById('searchName').value = '';
    document.getElementById('searchBrand').value = '';
    document.getElementById('searchType').value = '';
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    
    // Hide price warning
    const warning = document.querySelector('.price-warning');
    if (warning) {
        warning.classList.remove('show');
    }
    
    filteredProducts = [...products];
    renderProducts(filteredProducts);
}

function renderProducts(productsToRender) {
    const productsGrid = document.getElementById('productsGrid');
    const resultsCount = document.getElementById('resultsCount');
    
    // Update results count
    resultsCount.textContent = `Menampilkan ${productsToRender.length} dari ${products.length} produk`;
    
    if (productsToRender.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>Produk tidak ditemukan</h3>
                <p>Coba ubah filter pencarian Anda</p>
            </div>
        `;
        return;
    }
    
    productsGrid.innerHTML = productsToRender.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">
                    <span class="price">Rp ${product.price.toLocaleString()}</span>
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary buy-btn" data-id="${product.id}">Beli Sekarang</button>
                    <button class="btn btn-secondary add-to-cart-btn" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i> Keranjang
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Re-attach event listeners to new buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            addToCart(productId);
        });
    });
    
    document.querySelectorAll('.buy-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            buyNow(productId);
        });
    });
}

function addToCart(productId) {
    const product = productsObj[productId];
    if (!product) return;

    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    updateCartCount();
    showNotification(`${product.name} ditambahkan ke keranjang!`, 'success');
    saveCart(); // Save cart after each addition
}

function buyNow(productId) {
    const product = productsObj[productId];
    if (!product) return;

    // Add to cart first
    addToCart(productId);
    
    // Show cart immediately
    setTimeout(() => {
        showCart();
    }, 500);
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function showCart() {
    // Remove existing cart modal
    const existingModal = document.querySelector('.cart-modal');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.className = 'cart-modal';
    
    let cartHTML = `
        <div class="cart-content">
            <div class="cart-header">
                <h3><i class="fas fa-shopping-cart"></i> Keranjang Belanja</h3>
                <button class="close-cart">&times;</button>
            </div>
            <div class="cart-items">
    `;

    if (cart.length === 0) {
        cartHTML += `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Keranjang belanja kosong</p>
            </div>
        `;
    } else {
        let total = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            cartHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p class="cart-item-price">Rp ${item.price.toLocaleString()}</p>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn minus" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        </div>
                    </div>
                    <button class="remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        });

        cartHTML += `
            <div class="cart-total">
                <h4>Total: Rp ${total.toLocaleString()}</h4>
            </div>
            <div class="cart-actions">
                <button class="btn btn-secondary clear-cart">Kosongkan Keranjang</button>
                <button class="btn btn-primary checkout-btn">Checkout</button>
            </div>
        `;
    }

    cartHTML += `
            </div>
        </div>
    `;

    modal.innerHTML = cartHTML;
    document.body.appendChild(modal);

    // Add event listeners
    modal.querySelector('.close-cart').addEventListener('click', () => {
        modal.remove();
    });

    modal.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const isPlus = this.classList.contains('plus');
            updateQuantity(productId, isPlus);
        });
    });

    modal.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            removeFromCart(productId);
        });
    });

    const clearCartBtn = modal.querySelector('.clear-cart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }

    const checkoutBtn = modal.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function updateQuantity(productId, increase) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    if (increase) {
        item.quantity += 1;
    } else {
        item.quantity -= 1;
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
    }

    updateCartCount();
    showCart(); // Refresh cart display
    saveCart(); // Save cart after quantity change
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    showCart(); // Refresh cart display
    showNotification('Produk dihapus dari keranjang', 'success');
    saveCart(); // Save cart after removal
}

function clearCart() {
    cart = [];
    updateCartCount();
    showCart(); // Refresh cart display
    showNotification('Keranjang dikosongkan', 'success');
    saveCart(); // Save cart after clearing
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Keranjang belanja kosong!', 'error');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const message = `Halo! Saya ingin membeli:\n\n${cart.map(item => `${item.name} x${item.quantity} = Rp ${(item.price * item.quantity).toLocaleString()}`).join('\n')}\n\nTotal: Rp ${total.toLocaleString()}`;
    
    // Send to WhatsApp
    const phoneNumber = "6285842363036"; // Ganti dengan nomor WA kamu
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Add some interactive effects to the hero section
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    
    // Stagger animation for hero elements
    setTimeout(() => heroTitle.style.opacity = '1', 200);
    setTimeout(() => heroSubtitle.style.opacity = '1', 400);
    setTimeout(() => heroDescription.style.opacity = '1', 600);
    setTimeout(() => heroButtons.style.opacity = '1', 800);
    
    // Set initial opacity
    [heroTitle, heroSubtitle, heroDescription, heroButtons].forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Close notifications
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.remove();
        }
    }
});

// Add touch support for mobile devices
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could be used for navigation
            console.log('Swipe up detected');
        } else {
            // Swipe down - could be used for navigation
            console.log('Swipe down detected');
        }
    }
} 