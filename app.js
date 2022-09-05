const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

// Routes Module
const index = require('./Routes/index');
const user = require('./Routes/user');
const cart = require('./Routes/cart');

// Routes Use
app.use(index);
app.use(user);
app.use(cart);

app.listen(process.env.PORT || port, () => console.log(`Server running on http://localhost:${port}`))