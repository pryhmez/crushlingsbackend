const userRoutes = require("./userRoutes");
const contactsRoutes = require("./contactsRoutes");
const crushRoutes = require("./crushRoutes");
const {mySocket} = require('../sockets');


module.exports = function (router) {
    router.use("/user", userRoutes());
    router.use("/contact", contactsRoutes());
    router.use("/crushes", crushRoutes());


    return router;
}