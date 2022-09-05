const express = require('express');
const app = express();
const port = 3000;

// Routes Module
const index = require('./Routes/index');
const user = require('./Routes/user');
const cart = require('./Routes/cart');

// Routes Use
app.use(index);
app.use(user);
app.use(cart);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`))