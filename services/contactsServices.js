const contactsModel = require('../models/contacts');
const userModel = require('../models/users');

//<--------------------------------------functions------------------------------------------>


const addup = async (userId, friendsId, type, status) => {
    const user = await contactsModel.findOne({ userId: userId });

    if (user) {

        const friendsRetrievedData = await userModel.findOne({ _id: friendsId });
        const gut = await contactsModel.findOne({ userId, "contacts.friendsId": friendsId });
        if (gut) {
            return "friend has been added already"
        }

        const users = await contactsModel.updateOne({
            userId: userId
        }, {
            $push: {
                contacts: {
                    friendsId,
                    friendsFirstName: friendsRetrievedData.firstName,
                    friendsLastName: friendsRetrievedData.lastName,
                    friendsNickName: friendsRetrievedData.nickName,
                    friendsAge: friendsRetrievedData.age,
                    friendsGender: friendsRetrievedData.gender,
                    requestType: type,
                    requestStatus: status
                }
            }
        })
        // .exec(cb);
        // console.log(user);
        return user;
    } else {
        const userRetrievedData = await userModel.findOne({ _id: userId });
        const friendsRetrievedData = await userModel.findOne({ _id: friendsId });
        // console.log("------------------------------------------------------")
        // console.log(friendsId)
        // await console.log(friendsRetrievedData, userRetrievedData);

        const newRequest = await new contactsModel({
            userId,
            firstName: userRetrievedData.firstName,
            lastName: userRetrievedData.lastName,
            contacts: [
                {
                    friendsId,
                    friendsFirstName: friendsRetrievedData.firstName,
                    friendsLastName: friendsRetrievedData.lastName,
                    friendsNickName: friendsRetrievedData.nickName,
                    friendsAge: friendsRetrievedData.age,
                    friendsGender: friendsRetrievedData.gender,
                    requestType: type,
                    requestStatus: status
                }
            ]
        })
        return await newRequest.save();
    }
}

const accept = async (userId, friendsId, type) => {
    const check = await contactsModel.findOne({userId, "contacts.friendsId": friendsId, "contacts.requestType": type})
    // await console.log(check)

    const users = await contactsModel.findOneAndUpdate({
        userId, "contacts.friendsId": friendsId, "contacts.requestType": type
    }, {
        $set: {
            "contacts.$.requestStatus": "accepted"
        }
    }, { new: true})
    return await users
}


//<--------------------------------------functions------------------------------------------>

const addFriend = async function (data) {
    // console.log(data)
    let userId = data.userid;
    let friendsId = data.friendsid;
    addup(friendsId, userId, "recieved", "pending");
    return addup(userId, friendsId, "sent", "pending");

}

const acceptFriend = function (data) {

    let friendsId = data.friendsid;
    let userId = data.userid;

    accept(userId, friendsId, "recieved");
    return accept( friendsId, userId, "sent");

   
}

const getAllFriends = function (data) {

}

const getAllRecievedFriendRequest = function (data) {

}

const getAllSentFriendRequest = function (data) {

}


module.exports = {
    addFriend,
    acceptFriend,
    getAllFriends,
    getAllRecievedFriendRequest,
    getAllSentFriendRequest
}