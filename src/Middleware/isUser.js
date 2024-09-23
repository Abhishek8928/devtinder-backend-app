const isUser = (req, res, next) => {
  console.log("moiddlweware for auth user");

  const userToken = "VEERhanuman";

  const isUser = userToken === "VEERhanuman";

  if (!isUser) {
    return res.json({
      status: false,
      message: "you are not logged in",
    });
  }

  next();
};

module.exports = isUser;
