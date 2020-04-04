const {
    acceptFriend,
    addFriend,
    crush,
    getAllFriends,
    getAllRecievedFriendRequest,
    getAllSentFriendRequest,
    getAllMatches
} = require('../services/contactsServices')

module.exports = function () {

    this.addFriend = (req, res, next) => {

        addFriend(req.body).then(result => {
            // console.log(result)
            res.status(200).send({
                success: true,
                message: "successfuly added contact",
                data: result
            })
        }).catch(err => {
            res.status(401).send(err)
        })
    }

    this.acceptFriend = (req, res, next) => {
        
        acceptFriend(req.body).then(result => {
            res.status(200).send({
                success: true,
                message: "friend accepted Successfully",
                data: result
            })
        }).catch(err => {
            res.status(401).send(err)

        })
    }

    this.getAllFriends = (req, res, next) => {

    }

    this.getAllRecievedFriendRequests = (req, res, next) => {

    }

    this.getAllSentFriendRequests = (req, res, next) => {

    }
}