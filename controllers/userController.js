const { searchAndFindUsers, getUserProfile, recievedRequests } = require("../services/userServices");
const { verifyUserAccountToken } = require("../services/authServices");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const AppError = require("../utils/appError");
const checkAuth = require("../middleWares/checkAuth");

module.exports = function userController() {

  //searches and finds a user
  this.searchAndFindUsers = (req, res, next) => {
    
    searchAndFindUsers(req.body).then(result => {
      res.send({
        success: true,
        entry: req.body,
        data: result
      })
    }).catch(err => {
      res.send({
        success: false,
        data: err
      })
    })

  }


  //get the users profie details and then returns the value
  this.getUserProfile = (req, res, next) => {

    getUserProfile(req.body).then(result => {
      res.send({
        success: true,
        entry: req.body,
        data: result
      })
    }).catch(err => {
      res.send({
        success: false,
        data: err
      })
    })
  }



};
