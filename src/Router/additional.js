const express = require("express");
const validateToken = require("../middleware/auth");
const UserModel = require("../models/User");
const router = express.Router();

router.get("/search", validateToken, async (req, res) => {
  try {
    let { searchValue } = req?.query;

    // Trim and sanitize the search value
    searchValue = searchValue?.trim();

    if (!searchValue) {
      return res.status(400).json({ status: false, message: "Search Value is not provided or missing!!" });
    }

    // $options: 'i' makes the search case-insensitive, so 'abhi' and 'ABHI' are treated as the same
    const searchResult = await UserModel.find({
      username: { $regex: searchValue, $options: "i" },
    });

    res.status(200).json({
      status: true,
      users: searchResult,
    });
  } catch (error) {
    res.status(500).send("Error : " + error.message);
  }
});

module.exports = router;
