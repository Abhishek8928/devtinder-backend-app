const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Types.ObjectId,
      required: true,
      validate: {
        validator: (v) => mongoose.Types.ObjectId.isValid(v),
        message: "Invalid user ID",
      },
    },
    toUserId: {
      type: mongoose.Types.ObjectId,
      required: true,
      validate: {
        validator: (v) => mongoose.Types.ObjectId.isValid(v),
        message: "Invalid user ID",
      },
    },
    status: {
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: "{VALUE} is not supported",
      },
      type: String,
      required: [true, "Status is required"],
    },
  },
  { timestamps: true }
);

connectionRequestSchema.index({fromUserId : 1 , toUserId : 1})

connectionRequestSchema.pre("save", function (next) {
  const { fromUserId, toUserId } = this;
  if (fromUserId.equals(toUserId)) {
    throw new Error("Cannot Send the connection request to himself");
  }

  next();
});

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
