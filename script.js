document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartTableBody = document.querySelector('#cart-table tbody');
    const totalPriceElement = document.querySelector('#total-price');

    // Update cart table and total price
    const updateCart = () => {
        cartTableBody.innerHTML = '';
        let totalPrice = 0;

        cart.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>Ghs${item.price}</td>
                <td>${item.quantity}</td>
                <td>Ghs${item.price * item.quantity}</td>
                <td><button class="remove-btn" data-index="${index}">Remove</button></td>
            `;
            cartTableBody.appendChild(row);
            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = totalPrice;
    };

    // Add item to cart
    document.querySelectorAll('.pricing-card .btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.pricing-card');
            const name = card.dataset.name;
            const price = parseFloat(card.dataset.price);

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            updateCart();
        });
    });

    // Remove item from cart
    cartTableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
            const index = event.target.dataset.index;
            cart.splice(index, 1);
            updateCart();
        }
    });
});
