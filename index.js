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

  // socket.on('login', (user) => {
  //   user.socket = socket.id; 
  //   users[socket.id] = user; 
  //   io.sockets.emit('newuser',users)

  //   console.log('nouvelle connection')
  // });


  socket.on('StartToWaitPaiementFor', (user) => {
    user.socket = socket.id; 
    users[socket.id] = user; 
    io.sockets.emit('newuser',users)
  });

  socket.on('confirme', (transaction) => {
    
    io.to(socket_ID).emit('valider',({code:transaction.socket_ID,amound:transaction.amound}));
  });


  socket.on('paiement', (transaction) => {
    console.log(transaction)   
  });
  socket.on('disconnect', (transaction) => {
    if(!me){
      delete users[socket.id]
      console.log('deconnection')   
    }
    
  });

})
