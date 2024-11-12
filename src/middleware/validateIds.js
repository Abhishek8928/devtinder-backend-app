const validateObjectId = require("../utils/validateObjectId");

function  validateUserIds(req, res, next) {
  const isValidId =
    validateObjectId(req?.user?._id) && validateObjectId(req?.params?.toUserId);

 
  if (!isValidId) {
    return res.status(400).send("An unexpected error occurred while processing the request.");
  }
  next();
}


module.exports =  validateUserIds;