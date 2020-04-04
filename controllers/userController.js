const { signUpUser, loginUser, editUser, dashboard } = require("../services/userServices");
const { verifyUserAccountToken } = require("../services/authServices");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const AppError = require("../utils/appError");
const checkAuth = require("../middleWares/checkAuth");

module.exports = function userController() {
  this.editUserProfile = (req, res, next) => {
    const verify = verifyUserAccountToken(req.params.id, req.params.token);
    if (!verify) {
      return next(new AppError("cant perform operation", 400));
    }
    editUser(req.body, req.params.id)
      .then(result => {
        res.send({
          success: true,
          message: "user profile updated",
          data: result
        });
        console.log(result);
      })
      .catch(error => {
        res.send({
          success: false,
          message: "could not user",
          data: error
        });
      });
  };

  this.getDashboard = (req, res, next) => {
    dashboard(req.query).then(result => {
      res.send({
        success: true,
        data: result
      })
    }).catch(err => {
      res.send({
        success: false,
        data: err
      })
    })
  }

  this.getAllUsers = (req, res, next) => {

  }
};
