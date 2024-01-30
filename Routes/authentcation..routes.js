const controllers = require("../Controllers/authentcation");
const express = require("express");
const { check, validationResult } = require("express-validator");
const { logout } = require("../middleware/delete_token");
const routes = express.Router();

routes
  .route("/register")
  .get(controllers.registerpage)
  .post(
    [
      check("name").notEmpty().withMessage("Name Is Required"),
      check("email")
        .notEmpty()
        .withMessage("Email Is Required")
        .normalizeEmail()
        .isEmail()
        .withMessage("Invalid Email Address"),
      check("password")
        .notEmpty()
        .withMessage("Password Is Required")
        .isLength({ min: 5 })
        .withMessage("Minimum Length Of Password Should Be 5 Characters"),
    ],
    controllers.adduser
  );
routes.route("/login").get(logout,controllers.loginpage)
    .post([
    check('email').notEmpty().withMessage("Email Is Required")
    ,check('password').notEmpty().withMessage("Password Is Required")
],controllers.login);

module.exports = routes;
