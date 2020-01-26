var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var PORT = process.env.PORT || 4000;
server.listen(PORT, function () {
    console.log('Node app is working on :'+PORT);
});
app.get('/', function (req, res) {
  res.send('Le port est le =>'+PORT)
})

io.on('connection', function (socket) {
    socket.on('onLogin', (user) => {
      user.socket = socket.id; 
      users[socket.id] = user; 
      io.sockets.emit('newuser',users)
    });


    socket.on('onWhriting', (user_to) => {
      for (var i = users.length - 1; i >= 0; i--) {
        if(users[i].user.id == user_to.id){
          user.socket = socket.id; 
          users[socket.id] = user; 
          io.to(user[i].socket).emit('ImOnWhriting');
          break
        }
      }

    });

    socket.on('onSendMessage', (user_to,message) => {
      for (var i = users.length - 1; i >= 0; i--) {
        if(users[i].user.id == user_to.id){
          user.socket = socket.id; 
          users[socket.id] = user; 
          io.to(user[i].socket).emit('IHaveSendMessage',({body:message}));
          break
        }
      }

    });

    socket.on('disconnect', () => {
        delete users[socket.id]
        io.sockets.emit('userDisconnected',users)
    });
});

