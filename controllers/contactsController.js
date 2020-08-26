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

    this.getAllRecievedFriendRequests = (req, res, next) => {
        getAllRecievedFriendRequest(req.body).then(result => {
            res.status(200).send({
                success: true,
                userId: req.body,
                data: result
            })
        }).catch(err => {
            res.status(400).send({
                message: err + "jfdifn"
            })
        })
    }

    this.getAllFriends = (req, res, next) => {
        getAllFriends(req.body).then(result => {
            res.status(200).send({
                success: true,
                userId: req.body,
                data: result
            })
        }).catch(err => {
            res.status(400).send({
                message: err + "jfdifn"
            })
        })
    }

    this.getAllSentFriendRequests = (req, res, next) => {
        getAllSentFriendRequest(req.body).then(result => {
            res.status(200).send({
                success: true,
                userId: req.body,
                data: result
            })
        }).catch(err => {
            res.status(400).send({
                message: err + "jfdifn"
            })
        })
    }
}