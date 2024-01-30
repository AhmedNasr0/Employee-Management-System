const jwt = require("jsonwebtoken");
const verify_token = (req, res, next) => {
  const token=req.cookies.jwt;
  if (token==undefined) {
    return res.redirect('/auth/login');
  } else {
     const decodedToken=jwt.verify(token, "121344tmknckj32i456u765432ksj3r452n3bev")
  }
  next();
};

module.exports = { verify_token };
