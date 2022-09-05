const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
    res.status(200);
    res.json({
        status: "success",
        message: "get data done successfully",
        data: [
            {
                id: 1,
                name: "John Doe",
                age: "22"
            },
            {
                id: 2,
                name: "Jane Doe",
                age: "20"
            }
        ]
    })
})

router.get('/users/:id', (req, res) => {
    const {id} = req.params;
    res.status(200);
    res.json({
        status: "success",
        message: "User data get done successfully",
        data: {
            id,
            name: "fulan"
        }
    })
})

module.exports = router;