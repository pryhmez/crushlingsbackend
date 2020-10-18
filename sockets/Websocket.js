const { saveMessage} = require('../services/messageServices');

    let users = [];

    function findValue(arr, key){
      return arr.find(function(o){ return o.userId===key });
    }


    const connection = function (client) {
      console.log('new user connected')
      // event fired when the chat room is disconnected
      client.on("disconnect", () => {
        users = users.filter((user) => user.socketId !== client.id);
        console.log(users)
      });

      //private message messenger for sending private messages
      client.on("privatemessage", (data) => {
        // console.log(data);
        
        // console.log(findValue(users, data.recieverId).socketId)
        io.to(findValue(users, data.recieverId).socketId).emit('privatemessage', data)
      })

      // add identity of user mapped to the socket id
      client.on("identity", ({userId}) => {
        users.push({
          socketId: client.id,
          userId: userId,
        });
        console.log(users)
      });

      // subscribe person to chat & other user as well
      client.on("subscribe", (room, otherUserId = "") => {
        subscribeOtherUser(room, otherUserId);
        client.join(room);
      });
      // mute a chat room
      client.on("unsubscribe", (room) => {
        client.leave(room);
      });
    }
  
    const subscribeOtherUser = function (room, otherUserId) {
      const userSockets = this.users.filter(
        (user) => user.userId === otherUserId
      );
      userSockets.map((userInfo) => {
        const socketConn = global.io.sockets.connected(userInfo.socketId);
        if (socketConn) {
          socketConn.join(room);
        }
      });
    }
  
  
  // export default new WebSockets();

  module.exports = {
    connection,
    subscribeOtherUser
  }