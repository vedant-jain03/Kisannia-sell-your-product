const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../schema/user')
const router = express.Router();
const Sell = require('../schema/sellProduct')

// const Donate = require('../schema/donateScrap')

router.post('/register', async (req, res) => {
    try {
        let { name, email, password, phone, location } = req.body;

        if (!name || !email || !password || !phone || !location) {
            return res.status(200).json({
                status: "FAILED",
                message: "Please fill all the fields"
            });
        }

        // check if the user is already exist in the db or not
        const isUserExist = await User.findOne({ email: email });

        if (!!isUserExist) {
            return res.status(401).json({
                status: "FAILED",
                message: "User already exist"
            })
        }

        // save the user in the db
        const newUser = new User({ name, email, password, phone, location });

        const user_registered = await newUser.save();

        if (!user_registered) {
            return res.status(404).json({
                status: "FAILED",
                message: "Failed to register user"
            });
        }
        else {
            return res.status(201).json({
                status: "SUCCESS",
                message: "User registered successfully",
            });
        }
    } catch (err) {
        console.log(err);
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if the user is exist in the db or not
        const user_email = await User.findOne({ email: email });

        if (!!user_email === false) {
            return res.status(401).json({
                status: "FAILED",
                message: "User does not exist"
            });
        }

        // compare the password
        const is_Match = await bcrypt.compare(password, user_email.password);

        if (!is_Match) {
            return res.status(400).json({
                status: "FAILED",
                message: "Password is incorrect"
            });
        }
        else {
            return res.status(200).json({
                status: "SUCCESS",
                message: "User Login Successfully!",
                user: user_email
            })
        }
    } catch (err) {
        console.log(err);
    }
})


router.post('/sellProduct', async (req, res) => {
    try {
        const { url, total, location, phone, description, name, email } = req.body;
        console.log(req.body);

        const newSell = new Sell({ url, total, location, phone, description, name, email });

        const saved = await newSell.save();

        if (saved) {
            res.status(200).json({
                status: "SUCCESS",
                message: "Product added successfully",
            });
            return;
        }
        else {
            res.status(200).json({
                status: "FAILED",
                message: "Failed to add product",
            });
            return;
        }


    } catch (err) {
        return res.status(400).json({
            status: "FAILED",
            message: err.message
        });
    }
    return;
})

router.get('/get-products', async (req, res) => {
    try {
        const products = await Sell.find();
        if (products.length > 0) {
            return res.status(200).json({
                status: "SUCCESS",
                message: "Products found",
                products
            });
        }
        else {
            return res.status(200).json({
                status: "FAILED",
                message: "No products found",
            });
        }
    }
    catch (err) {
        console.log(err);
    }
})

router.get('/product/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const allProduct = await Sell.find({ email: id });
        if (allProduct.length > 0) {
            return res.status(200).json({
                status: "SUCCESS",
                message: "Products found",
                result: allProduct
            });
        }
        else {
            return res.status(200).json({
                status: "FAILED",
                message: "No products found",
            });
        }
    }
    catch (err) {
        console.log(err);
    }
})

// router.post('/donate_scrap', async (req, res) => {
//     try {
//         const { url, donate_to, location, phone, date, email } = req.body;
//         const new_donation = await Donate({ url, donate_to, location, phone, date, email });
//         await new_donation.save();
//         return res.status(201).json({ message: "Thankyou for Donating!" })
//     }
//     catch (err) {
//         console.log(err);
//     }
// })

// router.get('/donated_scrap/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const donated_scrap = await Donate.find({ email: id });
//         return res.status(201).json({ result: donated_scrap });
//     }
//     catch (err) {
//         console.log(err);
//     }
// })

module.exports = router