class Product {
    constructor(id, name, price, image) {
        this.product = {
            id: id,
            name: name,
            price: price,
            image: image
        };
    }

    createProductCard() {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <img src="${this.product.image}" alt="${this.product.name}">
            <h3>${this.product.name}</h3>
            <p>$${this.product.price.toFixed(2)}</p>
            <button onclick="cart.addToCart(${this.product.id})">Add to Cart</button>
        `;
        return card;
    }
}

class Cart {
    constructor() {
        this.items = [];
        this.cartElement = document.getElementById('cart-items');
        this.totalItemsElement = document.getElementById('total-items');
        this.totalPriceElement = document.getElementById('total-price');
    }

    addToCart(productId) {
        const product = products.find(p => p.product.id === productId);
        if (product) {
            const cartItem = {
                product: product.product,
                quantity: 1,
                addedAt: new Date()
            };
            
            const existingItemIndex = this.items.findIndex(item => item.product.id === productId);
            if (existingItemIndex !== -1) {
                this.items[existingItemIndex].quantity++;
            } else {
                this.items.push(cartItem);
            }
            
            this.updateCart();
        }
    }

    removeFromCart(productId) {
        const itemIndex = this.items.findIndex(item => item.product.id === productId);
        
        if (itemIndex !== -1) {
            if (this.items[itemIndex].quantity > 1) {
                this.items[itemIndex].quantity--;
            } else {
                this.items.splice(itemIndex, 1);
            }
            
            this.updateCart();
        }
    }

    updateCart() {
        this.cartElement.innerHTML = '';
        
        this.items.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            const formattedDate = item.addedAt.toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });

            cartItemElement.innerHTML = `
                <div class="cart-item-details">
                    <span>${item.product.name}</span>
                    <span>Qty: ${item.quantity}</span>
                    <span>$${(item.product.price * item.quantity).toFixed(2)}</span>
                    <span class="cart-item-date">Added: ${formattedDate}</span>
                </div>
                <div class="cart-item-actions">
                    <button onclick="cart.removeFromCart(${item.product.id})" class="remove-btn">✖</button>
                </div>
            `;
            this.cartElement.appendChild(cartItemElement);
        });

        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = this.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

        this.totalItemsElement.textContent = totalItems;
        this.totalPriceElement.textContent = totalPrice.toFixed(2);
    }
}

// Product data
const products = [
    new Product(1, 'Smart Watch', 199.99, 'smart watch.jpg'),
    new Product(2, 'Wireless Earbuds', 129.50, 'earbuds.jpg'),
    new Product(3, 'Portable Speaker', 79.99, 'speaker.jpg'),
    new Product(4, 'Fitness Tracker', 89.99, 'fitness.jpg'),
    new Product(5, 'Power Bank', 49.99, 'power bank.jpg'),
    new Product(6, 'Bluetooth Headphones', 149.99, 'headphones.jpg')
];
document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        productList.appendChild(product.createProductCard());
    });

    window.cart = new Cart();
});