// Extended product data
const allProducts = [
    {
        id: 1,
        name: "Organic Apples",
        category: "Fruits",
        image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
        price: "₹374.25/kg",
        description: "Fresh, crisp organic apples picked from local orchards. Rich in fiber and antioxidants.",
        benefits: ["High in fiber", "Rich in antioxidants", "Promotes heart health"],
        origin: "Local Farms"
    },
    {
        id: 2,
        name: "Fresh Spinach",
        category: "Vegetables",
        image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb",
        price: "₹299.25/bunch",
        description: "Nutrient-rich organic spinach leaves, perfect for salads and cooking.",
        benefits: ["Iron-rich", "Low calories", "Vitamin K"],
        origin: "Organic Valley Farms"
    },
    {
        id: 3,
        name: "Organic Quinoa",
        category: "Organic Grains",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
        price: "₹524.25/kg",
        description: "Premium organic quinoa, packed with protein and essential nutrients.",
        benefits: ["High protein", "Gluten-free", "Rich in minerals"],
        origin: "Andean Farms"
    },
    {
        id: 4,
        name: "Fresh Basil",
        category: "Herbs",
        image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec",
        price: "₹224.25/bunch",
        description: "Aromatic fresh basil, perfect for cooking and garnishing.",
        benefits: ["Anti-inflammatory", "Antioxidant properties", "Vitamin K"],
        origin: "Local Greenhouse"
    },
    {
        id: 5,
        name: "Organic Strawberries",
        category: "Fruits",
        image: "strawberry.jpg",
        price: "₹449.25/pack",
        description: "Sweet and juicy organic strawberries, freshly picked.",
        benefits: ["Vitamin C", "Antioxidants", "Heart health"],
        origin: "Berry Fields Farm"
    }
    // Add more products as needed
];

function createProductGrid(products) {
    const productGrid = document.getElementById('fullProductGrid');
    productGrid.innerHTML = ''; // Clear existing products
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-lg-4 col-md-6 mb-4';
        productCard.innerHTML = `
            <div class="card product-card" data-id="${product.id}">
                <div class="product-category-badge">${product.category}</div>
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="product-price">${product.price}</p>
                    <p class="card-text">${product.description.substring(0, 100)}...</p>
                    <button class="btn btn-outline-success btn-sm view-details">View Details</button>
                </div>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

function showProductDetails(productId) {
    const product = allProducts.find(p => p.id === productId);
    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    
    document.querySelector('.modal-title').textContent = product.name;
    document.querySelector('.product-modal-image').src = product.image;
    
    const detailsHtml = `
        <h4>${product.price}</h4>
        <p>${product.description}</p>
        <h5>Benefits:</h5>
        <ul>
            ${product.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
        </ul>
        <p><strong>Origin:</strong> ${product.origin}</p>
    `;
    
    document.querySelector('.product-details').innerHTML = detailsHtml;
    modal.show();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    createProductGrid(allProducts);
    
    // Product click handler
    document.getElementById('fullProductGrid').addEventListener('click', (e) => {
        if (e.target.classList.contains('view-details')) {
            const productCard = e.target.closest('.product-card');
            const productId = parseInt(productCard.dataset.id);
            showProductDetails(productId);
        }
    });
    
    // Category filter handler
    document.getElementById('categoryFilter').addEventListener('change', (e) => {
        const category = e.target.value;
        const filteredProducts = category === 'all' 
            ? allProducts 
            : allProducts.filter(p => p.category === category);
        createProductGrid(filteredProducts);
    });
    
    // Search handler
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = allProducts.filter(p => 
            p.name.toLowerCase().includes(searchTerm) || 
            p.description.toLowerCase().includes(searchTerm)
        );
        createProductGrid(filteredProducts);
    });
}); 