// var router = require('express').Router();
const userRoutes = require("./userRoutes");
const contactsRoutes = require("./contactsRoutes");
const crushRoutes = require("./crushRoutes")


module.exports = function (router, app) {
    router.use("/user", userRoutes());
    router.use("/contact", contactsRoutes());
    router.use("/crushes", crushRoutes());

    return router;
}