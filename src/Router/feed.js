const express  = require('express');
const router = express.Router();
const validateToken = require('../middleware/auth');
const UserModel = require("../models/User");

router.get('/feed', validateToken, async (req, res) => {
   try {
    const { interestedCategory } = req.query;

    if (!interestedCategory) {
        return res.status(400).send("InterestedCategory is missing");
    }

    const allowedCategories = ["male", "female", "other", "all"];

    const isCategoryAllowed = allowedCategories.includes(interestedCategory.trim());

    console.log(isCategoryAllowed,interestedCategory)
    if (!isCategoryAllowed) {
        return res.status(400).json({
            status: false,
            message: 'Allowed categories are male, female, other, and all'
        });
    }

    const userFeed = interestedCategory === 'all' 
        ? await UserModel.find({}).limit(20) 
        : await UserModel.find({ gender: interestedCategory }).limit(20);

    res.status(200).json({
        status: true,
        userFeed
    });
   } catch (error) {
    console.error(error);
    res.status(500).send("Error: " + error.message);
   }
});


module.exports = router;
