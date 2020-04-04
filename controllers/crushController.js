const { crush, getAllMatches, unCrush} = require('../services/crushServices');

module.exports = function () {

    this.crush = (req, res, next) => {
        crush(req.body).then(result => {
            res.status(200).send({
                success: true,
                message: "crushed successfully",
                data: result
            })
        }).catch(err => {
            res.status(201).send({
                success: false,
                message: "crush was Unsuccessful",
                data: err
            })
        })
    }

    this.unCrush = (req, res, next) => {
        unCrush(req.body).then(result => {
            res.status(200).send({
                success: true,
                message: "uncrushed successfully",
                data: result
            })
        }).catch(err => {
            res.status(201).send({
                success: false,
                message: "uncrush unsuccessful",
                data: err
            })
        })
    }

    this.getAllMatches = (req, res, next) => {

    }
}