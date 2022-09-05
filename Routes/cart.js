const express = require('express');
const router = express.Router();

router.get('/cart', (req, res) => {
    res.status(200);
    res.json({
        status: "success",
        message: "Cart data get done successfully",
        id: 1,
        data: [
            {
                itemid: 1,
                name: "socks",
                amount: 2,
                price: 10000
            },
            {
                itemid: 2,
                name: "tie",
                amount: 2,
                price: 2300
            },
            {
                itemid: 3,
                name: "shoes",
                amount: 1,
                price: 124000
            }
        ]
    })
})

module.exports = router;