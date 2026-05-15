const products = [
    { 
        id: 1, 
        name: "MacBook Air M2", 
        price: 1099, 
        category: "laptop",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80", 
        desc: "Sức mạnh bùng nổ từ chip M2 thế hệ mới trong một thiết kế mỏng nhẹ kỷ lục.",
        specs: { "Vi xử lý": "Apple M2 8-Core CPU", "RAM": "8GB Unified Memory", "Ổ cứng": "256GB SSD", "Màn hình": "13.6 inch Liquid Retina" }
    },
    { 
        id: 2, 
        name: "iPhone 15 Pro", 
        price: 999, 
        category: "phone",
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80", 
        desc: "Đột phá với khung viền Titan cấp độ vũ trụ và hệ thống camera chuyên nghiệp 48MP.",
        specs: { "Chip": "A17 Pro độc quyền", "Camera": "48MP | Zoom 3x", "Chất liệu": "Titan Grade 5", "Màn hình": "6.1 inch Super Retina XDR" }
    },
    { 
        id: 3, 
        name: "Sony WH-1000XM5", 
        price: 349, 
        category: "accessories",
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80", 
        desc: "Đỉnh cao chống ồn chủ động với âm thanh Hi-Res chân thực đến từng nốt nhạc.",
        specs: { "Pin": "30 giờ liên tục", "Chống ồn": "HD Noise Cancelling QN1", "Kết nối": "Bluetooth 5.2", "Trọng lượng": "250g" }
    },
    { 
        id: 4, 
        name: "Apple Watch Series 9", 
        price: 399, 
        category: "accessories",
        image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=800&q=80", 
        desc: "Thao tác Chạm hai lần (Double Tap) kỳ diệu cùng màn hình sáng nhất từ trước đến nay.",
        specs: { "Vi xử lý": "S9 SiP mạnh mẽ", "Màn hình": "Always-On 2000 nits", "Tính năng": "ECG, SpO2, Heart Rate", "Kháng nước": "50 mét" }
    },
    { 
        id: 5, 
        name: "Samsung Galaxy S24 Ultra", 
        price: 1299, 
        category: "phone",
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80", 
        desc: "Kỷ nguyên Galaxy AI mới với bút S-Pen quyền năng và khả năng zoom quang học đỉnh cao.",
        specs: { "CPU": "Snapdragon 8 Gen 3", "RAM": "12GB", "Camera": "200MP Quad-Tele", "Màn hình": "6.8 inch QHD+" }
    },
    { 
        id: 6, 
        name: "iPad Pro M2", 
        price: 799, 
        category: "laptop",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80", 
        desc: "Hiệu năng bùng nổ vượt giới hạn cho các tác vụ sáng tạo chuyên nghiệp.",
        specs: { "Chip": "Apple M2 8-core", "Màn hình": "11 inch ProMotion", "Wifi": "Wifi 6E siêu tốc", "Bảo mật": "Face ID" }
    }
];

let filteredProducts = [...products];

function renderProducts() {
    const list = document.getElementById('product-list');
    list.innerHTML = filteredProducts.map(p => `
        <div class="product-card">
            <div class="img-container">
                <img src="${p.image}" alt="${p.name}">
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

function filterProducts(category) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Filter products
    if (category === 'all') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(p => p.category === category);
    }
    
    renderProducts();
}

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
                <span class="badge"><i class="fas fa-check-circle"></i> CHÍNH HÃNG</span>
                <h2>${p.name}</h2>
                <p class="modal-price">$${p.price.toLocaleString()}</p>
                <p class="modal-desc">${p.desc}</p>
                
                <div class="specs-box">
                    <h4><i class="fas fa-microchip"></i> Thông số kỹ thuật</h4>
                    ${specsHtml}
                </div>
                
                <button class="btn-buy-large" onclick="buyNow('${p.name}')">
                    MUA NGAY BÂY GIỜ <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `;
    modal.classList.add('active');
}

function buyNow(name) {
    alert(`⚡ Đang kết nối đến cổng thanh toán cho ${name}...`);
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    const modal = document.getElementById('productModal');
    
    document.querySelector('.close-btn').onclick = () => {
        modal.classList.remove('active');
    };
    
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    };
});
