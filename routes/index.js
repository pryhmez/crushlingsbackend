const userRoutes = require("./userRoutes");
const contactsRoutes = require("./contactsRoutes");
const crushRoutes = require("./crushRoutes");
const {mySocket} = require('../sockets');


module.exports = function (router, app, io) {
    router.use("/user", userRoutes());
    router.use("/contact", contactsRoutes());
    router.use("/crushes", crushRoutes());

    io.on('connection', (socket) => {
        mySocket(io, socket )
  
    })

    return router;
}