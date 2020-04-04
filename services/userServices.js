const userModel = require("../models/users");
const bcrypt = require("bcrypt");

const findUserWithId = function (_id) {
  return userModel.findOne({ _id }).select('-password')
}

const loginUser = function (userData) {
  return userModel.find({ email: userData.email });
};

const findUserWithEmail = function (email) {
  return userModel.findOne({ email });
};
const saveChangesToUser = function (user) {
  return user.save();
};

const editUser = async function (userData, userParams) {
  if (userData.password) {
    var hash = await bcrypt.hash(userData.password, 10);
  }
  const user = await userModel.findOne({ _id: userParams });
  user.firstName = userData.firstName;
  user.lastname = userData.lastName;
  user.email = userData.email;
  user.phone = userData.phone;
  user.password = hash;
  user.businessname = userData.businessName;
  user.businessphone = userData.businessPhone;
  user.businesstype = userData.businessType;
  user.businesscategory = userData.businessCategory;
  user.cardDetails.CardNumber = userData.CardNumber;
  user.cardDetails.cardHolderName = userData.cardHolderName;
  user.cardDetails.expiryDate = userData.expiryDate;

  return user.save();
};

const dashboard = async function (queryId) {
  let open = 0;
  let closed = 0;
  let pending = 0;

  let wallet = await walletModel.find({ userId: queryId.id });
  let schedules = await scheduleModel.find({ sendersId: queryId.id });
  schedules.forEach(schedule => {
    if (schedule.status == "open") {
      open++;
    }
    if (schedule.status == "closed") {
      closed++
    }
    if (schedule.status == "pending") {
      pending++
    }
  });

  return {
    status: { open, closed, pending },
    wallet,
    schedules,
  }

}

module.exports = {
  findUserWithId,
  loginUser,
  findUserWithEmail,
  saveChangesToUser,
  editUser,
  dashboard
}
