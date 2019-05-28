let app = require('express')();

let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on('connection', (socket) => {
  
  socket.on('disconnect', function(){
    io.emit('users-changed', {user: socket.nickname, event: 'left'});   
  });

  socket.on('set-nickname', (nickname) => {
    socket.nickname = nickname;
    io.emit('users-changed', {user: nickname, event: 'joined'});    
  });



  socket.on('validate-sos', () => {
    console.log("valider")
    io.emit('consultation', {code: "693855215"});    
  });
  
  socket.on('add-message', (message) => {
    io.emit('message', {text: message.text, from: socket.nickname, created: new Date()});    
  });


});

//var port = process.env.PORT || 3001;
var port = 8080;

// http.listen(port,"sossante", function(){
//    console.log('listening in http://localhost:' + port);
// });

http.listen( port, function(){
  console.log( "Server listening on port:%s", port );
});
