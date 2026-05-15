const products = [
    { 
        id: 1, 
        name: "MacBook Air M2", 
        price: 1099,
        category: "laptop",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80", 
        desc: "Sức mạnh bùng nổ từ chip M2 thế hệ mới trong một thiết kế mỏng nhẹ kỷ lục. Hiệu suất tuyệt vời cho công việc và sáng tạo.",
        specs: { 
            "Vi xử lý": "Apple M2 8-Core CPU", 
            "RAM": "8GB Unified Memory", 
            "Ổ cứng": "256GB SSD", 
            "Màn hình": "13.6 inch Liquid Retina" 
        }
    },
    { 
        id: 2, 
        name: "iPhone 15 Pro", 
        price: 999,
        category: "phone",
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80", 
        desc: "Đột phá với khung viền Titan cấp độ vũ trụ và hệ thống camera chuyên nghiệp 48MP. Hiệu năng vô địch.",
        specs: { 
            "Chip": "A17 Pro độc quyền", 
            "Camera": "48MP | Zoom 3x", 
            "Chất liệu": "Titan Grade 5", 
            "Màn hình": "6.1 inch Super Retina XDR" 
        }
    },
    { 
        id: 3, 
        name: "Sony WH-1000XM5", 
        price: 349,
        category: "accessory",
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80", 
        desc: "Đỉnh cao chống ồn chủ động với âm thanh Hi-Res chân thực đến từng nốt nhạc. Thoải mái cả ngày.",
        specs: { 
            "Pin": "30 giờ liên tục", 
            "Chống ồn": "HD Noise Cancelling QN1", 
            "Kết nối": "Bluetooth 5.2", 
            "Trọng lượng": "250g" 
        }
    },
    { 
        id: 4, 
        name: "Apple Watch Series 9", 
        price: 399,
        category: "accessory",
        image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=800&q=80", 
        desc: "Thao tác Chạm hai lần (Double Tap) kỳ diệu cùng màn hình sáng nhất từ trước đến nay. Bạn đồng hành hoàn hảo.",
        specs: { 
            "Vi xử lý": "S9 SiP mạnh mẽ", 
            "Màn hình": "Always-On 2000 nits", 
            "Tính năng": "ECG, SpO2, Heart Rate", 
            "Kháng nước": "50 mét" 
        }
    },
    { 
        id: 5, 
        name: "Samsung Galaxy S24 Ultra", 
        price: 1299,
        category: "phone",
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80", 
        desc: "Kỷ nguyên Galaxy AI mới với bút S-Pen quyền năng và khả năng zoom quang học đỉnh cao. Sáng tạo không giới hạn.",
        specs: { 
            "CPU": "Snapdragon 8 Gen 3", 
            "RAM": "12GB", 
            "Camera": "200MP Quad-Tele", 
            "Màn hình": "6.8 inch QHD+" 
        }
    },
    { 
        id: 6, 
        name: "iPad Pro M2", 
        price: 799,
        category: "laptop",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80", 
        desc: "Hiệu năng bùng nổ vượt giới hạn cho các tác vụ sáng tạo chuyên nghiệp. Một chiếc máy tính trong tay bạn.",
        specs: { 
            "Chip": "Apple M2 8-core", 
            "Màn hình": "11 inch ProMotion", 
            "Wifi": "Wifi 6E siêu tốc", 
            "Bảo mật": "Face ID" 
        }
    }
];

let currentFilter = 'all';

// Render products with filter support
function renderProducts(filter = 'all') {
    const list = document.getElementById('product-list');
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter);
    
    if (filteredProducts.length === 0) {
        list.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem;"><p style="color: #64748b; font-size: 1.1rem;">Không có sản phẩm trong danh mục này</p></div>';
        return;
    }

    list.innerHTML = filteredProducts.map(p => `
        <div class="product-card">
            <div class="img-container">
                <img src="${p.image}" alt="${p.name}" loading="lazy">
            </div>
            <h3 class="product-title">${p.name}</h3>
            <p class="product-price">$${p.price.toLocaleString()}</p>
            <div class="button-group">
                <button class="btn-detail" onclick="showDetail(${p.id})">
                    <i class="fas fa-info-circle"></i> Chi tiết
                </button>
                <button class="btn-buy" onclick="buyNow('${p.name}')">
                    <i class="fas fa-bolt"></i> Mua ngay
                </button>
            </div>
        </div>
    `).join('');
}

// Show product detail in modal
function showDetail(id) {
    const p = products.find(item => item.id === id);
    const modal = document.getElementById('productModal');
    const body = document.getElementById('modalBody');

    let specsHtml = '';
    for (const [label, value] of Object.entries(p.specs)) {
        specsHtml += `
            <div class="spec-item">
                <span class="spec-label">${label}</span>
                <span class="spec-value">${value}</span>
            </div>
        `;
    }

    body.innerHTML = `
        <div class="modal-flex">
            <div class="modal-image">
                <img src="${p.image}" alt="${p.name}">
            </div>
            <div class="modal-info">
                <span class="badge">⭐ CHÍNH HÃNG</span>
                <h2>${p.name}</h2>
                <p class="modal-price">$${p.price.toLocaleString()}</p>
                <p class="modal-desc">${p.desc}</p>
                
                <div class="specs-box">
                    <h4><i class="fas fa-microchip"></i> Thông số kỹ thuật</h4>
                    ${specsHtml}
                </div>
                
                <button class="btn-buy-large" onclick="buyNow('${p.name}')">
                    <i class="fas fa-shopping-cart"></i> MUA NGAY BÂY GIỜ
                </button>
            </div>
        </div>
    `;
    modal.style.display = "block";
}

// Buy now action
function buyNow(name) {
    alert(`⚡ Đang kết nối đến cổng thanh toán cho ${name}...`);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();

    // Setup modal
    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.close-btn');
    
    closeBtn.onclick = () => {
        modal.style.display = "none";
    };
    
    window.onclick = (e) => { 
        if (e.target === modal) modal.style.display = "none"; 
    };

    // Setup filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            currentFilter = filter;
            renderProducts(filter);
        });
    });

    // Setup price slider
    const priceSlider = document.querySelector('.price-slider');
    if (priceSlider) {
        priceSlider.addEventListener('input', (e) => {
            document.querySelector('.price-value').textContent = '$' + e.target.value;
        });
    }

    // Smooth scroll for hero button
    const heroBtn = document.querySelector('.hero-banner .btn-primary');
    if (heroBtn) {
        heroBtn.addEventListener('click', () => {
            document.querySelector('.product-grid').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Add to favorites functionality
    const favoriteButtons = document.querySelectorAll('.icon-btn[title="Yêu thích"]');
    if (favoriteButtons.length > 0) {
        favoriteButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const icon = btn.querySelector('i');
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    icon.parentElement.style.color = '#ef4444';
                    updateBadge('.icon-btn[title="Yêu thích"]', 1);
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    icon.parentElement.style.color = 'white';
                    updateBadge('.icon-btn[title="Yêu thích"]', -1);
                }
            });
        });
    }
});

// Update badge count
function updateBadge(selector, increment) {
    const badge = document.querySelector(`${selector} .badge`);
    if (badge) {
        let count = parseInt(badge.textContent) || 0;
        count += increment;
        badge.textContent = count > 0 ? count : '0';
    }
}

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}
