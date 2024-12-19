const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/cartdb', { useNewUrlParser: true, useUnifiedTopology: true });

const cartItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

app.use(express.json());

app.post('/api/cart/add', async (req, res) => {
    const { name, price } = req.body;
    let item = await CartItem.findOne({ name });
    if (item) {
        item.quantity += 1;
    } else {
        item = new CartItem({ name, price, quantity: 1 });
    }
    await item.save();
    const cart = await CartItem.find();
    res.json(cart);
});

app.delete('/api/cart/remove/:name', async (req, res) => {
    await CartItem.deleteOne({ name: req.params.name });
    const cart = await CartItem.find();
    res.json(cart);
});

app.get('/api/cart', async (req, res) => {
    const cart = await CartItem.find();
    res.json(cart);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
