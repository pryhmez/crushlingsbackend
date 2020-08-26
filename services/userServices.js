var mongoose = require('mongoose');
const userModel = require("../models/users");
const crushModel = require('../models/crushes');
const contactsModel = require('../models/contacts');
const ObjectId = mongoose.Types.ObjectId;

const bcrypt = require("bcrypt");

//searches and finds users with name
const searchAndFindUsers = async function (searchData) {
  const arr = await userModel.aggregate([
    {
      $match:
      {
        $or:
          [
            { firstName: searchData.search },
            { phone: searchData.search },
            { lastName: searchData.search }
          ]
      }
    },
    // { $group: { _id: null, count: { $sum: 1 } } }
  ]);

  const filtered = await arr.reduce((a, o) => (a.push(
    {
      _id: o._id,
      firstName: o.firstName,
      lastName: o.lastName,
      email: o.email
    }), a), [])

  return await filtered;

}


//gets the users profil details for th profile page
const getUserProfile = async function (data) {

  //gets the number of friends
  const friends = await contactsModel.aggregate(
    [
      {
        $match: { userId: ObjectId(data.userId), "contacts.requestStatus": "pending" }
      },
      {
        $group: {
          _id: "$userId",
          total: { $sum: { $size: "$contacts" } }
        }
      }
    ]
  );

  //gets the number of crushes
  const crushes = await crushModel.aggregate(
    [
      {
        $match: { userId: ObjectId(data.userId) }
      },
      {
        $group: {
          _id: "$userId",
          total: { $sum: { $size: "$crushs" } }
        }
      }
    ]
  );

  //gets the user details
  const user = await userModel.findOne({ _id: data.userId });


  return await { user, crushes, friends }
}


//gets all my pending and unaccepted friend requests
const recievedRequests = async function (userId) {

}







module.exports = {
  searchAndFindUsers,
  getUserProfile,
  // findUserWithId,
  // loginUser,
  // findUserWithEmail,
  // saveChangesToUser,
  // editUser,
  // dashboard
}

// //----------------------------------------------------------------------------
// //----------------------------------------------------------------------------
// const findUserWithId = function (_id) {
//   return userModel.findOne({ _id }).select('-password')
// }

// const loginUser = function (userData) {
//   return userModel.find({ email: userData.email });
// };

// const findUserWithEmail = function (email) {
//   return userModel.findOne({ email });
// };
// const saveChangesToUser = function (user) {
//   return user.save();
// };

// const editUser = async function (userData, userParams) {
//   if (userData.password) {
//     var hash = await bcrypt.hash(userData.password, 10);
//   }
//   const user = await userModel.findOne({ _id: userParams });
//   user.firstName = userData.firstName;
//   user.lastname = userData.lastName;
//   user.email = userData.email;
//   user.phone = userData.phone;
//   user.password = hash;
//   user.businessname = userData.businessName;
//   user.businessphone = userData.businessPhone;
//   user.businesstype = userData.businessType;
//   user.businesscategory = userData.businessCategory;
//   user.cardDetails.CardNumber = userData.CardNumber;
//   user.cardDetails.cardHolderName = userData.cardHolderName;
//   user.cardDetails.expiryDate = userData.expiryDate;

//   return user.save();
// };

// const dashboard = async function (queryId) {
//   let open = 0;
//   let closed = 0;
//   let pending = 0;

//   let wallet = await walletModel.find({ userId: queryId.id });
//   let schedules = await scheduleModel.find({ sendersId: queryId.id });
//   schedules.forEach(schedule => {
//     if (schedule.status == "open") {
//       open++;
//     }
//     if (schedule.status == "closed") {
//       closed++
//     }
//     if (schedule.status == "pending") {
//       pending++
//     }
//   });

//   return {
//     status: { open, closed, pending },
//     wallet,
//     schedules,
//   }