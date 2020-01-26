var http = require('http'); 


httpserver = http.createServer(function (req, res) {
  console.log('Un utilisateur a afficher la page ')
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
});
httpserver.listen(8080); //the server object listens on port 8080

var io = require('socket.io')(http).listen(httpserver);
var users = {};

io.sockets.on('connection', (socket) => {
  var me = false

  io.sockets.emit('newuser',users)

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


})
