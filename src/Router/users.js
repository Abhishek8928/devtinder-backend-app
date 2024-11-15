const express = require("express");
const validateToken = require("../middleware/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const userRouter = express.Router();
const UserModel = require("../models/User");
const NotificationModel = require("../models/Notification");

const allowed_public_data = "username firstName lastName photoUrl bio skills gender age skills";

userRouter.get("/notifications",validateToken , async (req,res)=>{
  const loggedInUser = req.user;
  const notificationList = await NotificationModel.findOne({
    userId: loggedInUser?._id
  }).populate('connectionRequestInfo.fromUserId', 'firstName username photoUrl')  
  .populate('connectionRequestInfo.toUserId', 'firstName username photoUrl');

  res.status(200).json({
    data:notificationList
  })
})
userRouter.get("/request/received", validateToken, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const incomingPendingRequestLists = await ConnectionRequestModel.find({
      toUserId: loggedInUser?._id,
      status: "interested",
    }).populate({
      path: "fromUserId",
      select: allowed_public_data,
    });

    const extractNeccessaryInfo = incomingPendingRequestLists.map((row) => {
      return { _id: row?._id, data: row.fromUserId };
    });

    res.status(200).json({
      message: "pending request list",
      data: extractNeccessaryInfo,
    });
  } catch (error) {
    res.status(400).json({
      message: `Error : ${error.message}`,
    });
  }
});

userRouter.get("/view/connection", validateToken, async (req, res) => {
  try {
    const { _id } = req.user;

    const mutualConnections = await ConnectionRequestModel.find({
      $or: [
        { fromUserId: _id, status: "accepted" },
        { toUserId: _id, status: "accepted" },
      ],
    })
      .populate({
        path: "fromUserId",
        select: allowed_public_data,
      })
      .populate({
        path: "toUserId",
        select: allowed_public_data,
      });

    const extractedData = mutualConnections.map((row) => {
      if (row.fromUserId._id.toString() === _id.toString()) {
        return row.toUserId;
      }

      return row.fromUserId;
    });

    res.status(200).json({
      data: extractedData,
    });
  } catch (error) {
    res.status(400).json({
      message: `Error : ${error.message}`,
    });
  }
});

userRouter.get("/feed", validateToken, async (req, res) => {
  try {
    /*
        requirement :- 
        - loggedInuser sould not able to see his own profile
        - loggedInUser should be able see thr profile whic already be in connection of user or user see connecteion request or either ignore him
       
        */

    const loggedInUser = req?.user;
  

    // find all user either i have send a request or else they me the request

    const connectionRequest = await ConnectionRequestModel.find({
      $or: [
        {
          fromUserId: loggedInUser._id,
        },
        {
          toUserId: loggedInUser._id,
        },
      ],
    }).select("fromUserId toUserId");

    

    // i created a set that can hold unique id and all connection i will store in this set
    // if connection is sent by me or thehy have send to me so i will ignore all thhat users
    // reason beacuase already i have send connection request so no needed to show their feed to loggedInUser
    const hideUserFromFeed = new Set();
    hideUserFromFeed.add(loggedInUser?._id.toString())

    connectionRequest.forEach((row) => {
      hideUserFromFeed.add(row.fromUserId.toString());
      hideUserFromFeed.add(row.toUserId.toString());
    });

    

    const limit = req.query.limit || 10;
    const pageNo = req.query.pageNo || 1;

    const skipValue = (pageNo - 1) * limit;

    const feedUser = await UserModel.find({
      _id: { $nin: Array.from(hideUserFromFeed) },
    })
      .select(allowed_public_data)
      .skip(skipValue).limit(limit);

    res.status(200).json({
      message: "Feed user list",
      data: feedUser,
    });
  } catch (error) {
    res.status(400).json({
      message: `Error : ${error?.message}`,
    });
  }
});

module.exports = userRouter;
