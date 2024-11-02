const express = require("express");
const validateToken = require("../middleware/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const router = express.Router();
const UserModel = require("../models/User")
const  validateUserIds = require("../middleware/validateIds")

router.post(
  "/request/:status/:toUserId",
  validateToken,
  validateUserIds,
  async (req, res) => {
    try {
      const fromUserId = req?.user?._id;
      const { toUserId, status } = req?.params;
      const ALLOWED_STATUS = ["interested", "ignored"];

      if (!status || !ALLOWED_STATUS.includes(status)) {
        return res.status(400).json({
          message: 'Status provided by user is invalid'
        });
      }
      

      const userExists = await UserModel.findById(toUserId);
      if(!userExists){
        return res.status(404).json({
            message:'User not found, cannot send the connection request.'
        })
      }

      const existingRequestConnection = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId }
        ]
      });

      if (existingRequestConnection) {
        return res.status(400).json({
          message: "A connection request has already been sent!"
        });
      }

      const request = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      await request.save();

      res.status(200).json({
        message: `${req?.user?.firstName} has ${status} ${userExists.firstName}.`
      });
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).send("An unexpected error occurred while processing the request.");
    }
  }
);

module.exports = router;
