const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true, // Consider making this required
      ref: "User", // Reference to the User model (if applicable)
    },
    connectionRequestInfo: [
      {
        fromUserId: {
          type: mongoose.Types.ObjectId,
          validate: {
            validator: (v) => mongoose.Types.ObjectId.isValid(v),
            message: "Invalid user ID",
          },
          ref: "User",
        },
        toUserId: {
          type: mongoose.Types.ObjectId,
          ref: "User",
          validate: {
            validator: (v) => mongoose.Types.ObjectId.isValid(v),
            message: "Invalid user ID",
          },
        },
        status: {
          type: String,
        },
        timeStampForRequest: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);
