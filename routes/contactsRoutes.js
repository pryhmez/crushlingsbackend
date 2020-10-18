const router = require("express").Router();
const contactsController = require("../controllers/contactsController");
const auth = require("../middleWares/checkAuth");


module.exports = function () {
  // var contactCtl = new userController();
  var contactsCtl = new contactsController();

  // router.post("/signup", authCtl.signUp);
  router.post("/addfriend", contactsCtl.addFriend);
  router.post("/acceptfriend", contactsCtl.acceptFriend);


  router.post("/getallfriends", contactsCtl.getAllFriends);
  router.post("/getallrecievedfriendsrequest", contactsCtl.getAllRecievedFriendRequests);
  router.post("/getallsentfriendsrequest", contactsCtl.getAllSentFriendRequests);

  return router;
};

