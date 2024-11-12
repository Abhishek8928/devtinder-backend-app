const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");
const ConnectionRequestModel = require("../models/connectionRequest");

// helper function
const validateObjectId = require("../utils/validateObjectId");

// middleware
const validateToken = require("../middleware/auth");
const validateUserIds = require("../middleware/validateIds");
const Notification = require("../models/Notification");

router.post("/review/:status/:requestId", validateToken, async (req, res) => {
  try {
    // validate the request id

    const { requestId } = req.params;
    const { status } = req.params;
    const loggedInUser = req?.user;
    const ALLOWED_STATUS = ["accepted", "rejected"];

    const isValidId = validateObjectId(requestId);

    if (!isValidId) {
      return res.status(400).json({
        message: "request id is not valid",
      });
    }
    // validate status

    const isValidStatus = ALLOWED_STATUS.includes(status);

    if (!isValidStatus) {
      return res.status(400).json({
        message: "request status is invalid",
      });
    }

    const interestedConnectionRequest = await ConnectionRequestModel.findOne({
      _id: requestId,
      toUserId: loggedInUser?._id,
      status: "interested",
    });

    

    if (!interestedConnectionRequest) {
      return res.status(404).json({
        message: "no connection request has found",
      });
    }

    interestedConnectionRequest.status = status;

    const fromUserNotification = await Notification.findOne({
      userId: interestedConnectionRequest.fromUserId,
    });

    if (!fromUserNotification) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    fromUserNotification?.connectionRequestInfo?.push({
      fromUserId: interestedConnectionRequest?.fromUserId,
      toUserId: interestedConnectionRequest?.toUserId,
      status: interestedConnectionRequest?.status,
    });

    await interestedConnectionRequest.save();
    await fromUserNotification.save();
    return res.status(200).json({
      message: "Connection request status updated successfully.",
    });
  } catch (error) {
    console.error("Error processing review request:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

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
          message: "Status provided by user is invalid",
        });
      }

      const userExists = await UserModel.findById(toUserId);
      if (!userExists) {
        return res.status(404).json({
          message: "User not found, cannot send the connection request.",
        });
      }

      const existingRequestConnection = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingRequestConnection) {
        return res.status(400).json({
          message: "A connection request has already been sent!",
        });
      }

      const request = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      const toUserNotification = await Notification.findOne({
        userId: toUserId,
      });

      if (!toUserNotification) {
        return res.status(500).json({
          message: "Internal Server Error",
        });
      }

      toUserNotification.connectionRequestInfo.push({
        fromUserId: request?.fromUserId,
        toUserId: request?.toUserId,
        status: request?.status,
      });

      await toUserNotification.save();
      await request.save();

      res.status(200).json({
        message: `${req?.user?.firstName} has ${status} ${userExists.firstName}.`,
      });
    } catch (error) {
      console.error("Error processing request:", error);
      res
        .status(500)
        .send("An unexpected error occurred while processing the request.");
    }
  }
);

module.exports = router;
