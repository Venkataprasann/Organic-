// Product data
const products = [
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
    // Add more products as needed
];

// Function to create product cards
function createProductGrid() {
    const productGrid = document.getElementById('productGrid');
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-lg-4 col-md-6';
        productCard.innerHTML = `
            <div class="card product-card" data-id="${product.id}">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.category}</p>
                    <p class="card-text text-success">${product.price}</p>
                </div>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Function to show product details in modal
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
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
    createProductGrid();
    
    document.getElementById('productGrid').addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        if (productCard) {
            const productId = parseInt(productCard.dataset.id);
            showProductDetails(productId);
        }
    });
}); 