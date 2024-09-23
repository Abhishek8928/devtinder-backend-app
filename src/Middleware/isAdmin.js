
const isAdmin = (req, res, next) => {
  const token = "damda";
  const isAutheticated = token === "damdam";
  if (!isAutheticated) {
    return res.status(401).json({
      message: "authorized access",
      status: false,
    });
  }
  next();
};


module.exports = isAdmin;
