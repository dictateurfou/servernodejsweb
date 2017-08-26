var https = require('https');
var fs = require('fs');
var users= [];
var refresh = "no";
var numero;







var options = {
  key: fs.readFileSync('../../../etc/letsencrypt/live/websocket.survive-in-hell.fr/privkey.pem'),
  cert: fs.readFileSync('../../../etc/letsencrypt/live/websocket.survive-in-hell.fr/cert.pem'),
  ca: fs.readFileSync('../../../etc/letsencrypt/live/websocket.survive-in-hell.fr/chain.pem')
};

var app = https.createServer(options);
var io = require('socket.io').listen(app);
app.listen(8000);


io.on('connection', function(socket){


 	socket.on('connexion', function(name){

     console.log(name + " c'est connecter ");
     users.push({id:socket.id,name:name});
     console.log(users);
     socket.username = name;
     socket.idtab = users.length - 1;
     console.log("socket id tab de " + socket.username + " es egal a " + socket.idtab);
     io.emit('joueur',users);
     
     var allConnectedClients = Object.keys(io.sockets.connected);
console.log("allconnected client " + allConnectedClients);
  });


  socket.on('action', function(pts,x,y,vie,id){
    console.log("points " + pts + " x et y " + x,y + " vie " + vie + " id " + id);
    io.emit('rafraichir',pts,x,y,vie,id);


  });

  socket.on('deplacement', function(x,z){

    socket.z = z;
    socket.y = y;

  });



   socket.on('disconnect', function(){

   

     for(var i=0;i<users.length;i++){
        if(users[i].id==socket.id){
        console.log(users[i].name + " c'est deconnecter");
          users.splice(i,1); //Removing single user

        }
      }

      io.emit('joueur',users);
  });


});


