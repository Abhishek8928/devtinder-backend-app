const mongoose = require("mongoose");
const CONNECTION_STRING =
  "mongodb+srv://abhishek8928:gQ3zwfl9Bi7NFudr@cluster0.9eu4j.mongodb.net/";
const DB_NAME = "devTinder";



module.exports = async () => {
    await mongoose.connect(CONNECTION_STRING + DB_NAME);
}

