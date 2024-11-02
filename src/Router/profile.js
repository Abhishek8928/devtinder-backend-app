const express = require("express");
const { validateEditForm } = require("../utils/validate");
const UserModel = require("../models/User");
const router = express.Router();
const validateToken = require("../middleware/auth");
const bcrypt = require('bcrypt');


router.get("/profile/view", validateToken, async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await UserModel.findById(_id);

    res.status(200).json({
      message: "Profile fetched successfully.",
      data: user
    });
  } catch (error) {
    res.status(400).send(`Token verification failed: ${error.message}`);
  }
});

router.patch("/profile/edit", validateToken, async (req, res) => {
  try {
    const isEditAllowed = validateEditForm(req);
    if (!isEditAllowed) {
      return res.status(400).json({
        status: 0,
        message: "Validation failed. Please check the form fields.",
      });
    }

    const loggedInUserId = req?.user?._id;
    const updatedUserProfile = await UserModel.findByIdAndUpdate(
      loggedInUserId,
      { ...req.body },
      { runValidators: true, new: true }
    );

    if (!updatedUserProfile) {
      return res.status(404).json({
        status: 0,
        message: "User not found.",
      });
    }
    res.status(200).json({
      message: `${updatedUserProfile?.firstName} profile has been updated`,
    });
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

router.patch("/profile/updatePassword", validateToken, async (req, res) => {

  try {
    const { password } = req.body;
    const loggedInUser = req.user;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    loggedInUser.hashPassword = hashedPassword;
    await loggedInUser.save();
  } catch (error) {
    res.status(200).json({
      status: 1,
      message: `Error ${error?.message}`,
    });
  }
})


router.delete("/profile/destroy" , validateToken , async (req,res)=>{

  try{
    const {_id} = req.user;
  const deletedUser = await UserModel.findOneAndDelete({_id},{returnDocument:"after"});

  if (!deletedUser) {
    return res.status(404).json({
      message: "User not found. No account was deleted."
    });
  }

   res.status(200).json({
    message:`Account has been deleted of ${deletedUser?.firstName} `
   })
  }catch(error){
    res.status(500).send("Error : " + error.message);
  }
})

module.exports = router;
