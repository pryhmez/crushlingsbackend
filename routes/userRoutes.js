const router = require("express").Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const auth = require("../middleWares/checkAuth");
const {
  signUpValidation,
  loginValidation
} = require("../middleWares/userValidation");

module.exports = function() {
  var userCtl = new userController();
  var authCtl = new authController();

  // router.post("/signup", authCtl.signUp);
  router.post("/signup", signUpValidation, authCtl.signUp);
  router.post("/login", loginValidation, authCtl.login);

  router.post("/finduser", userCtl.searchAndFindUsers);

  router.post("/getmyprofile", userCtl.getUserProfile);
  return router;
};
