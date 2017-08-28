var https = require('https');
var fs = require('fs');
var users= [];
var refresh = "no";
var numero;







var options = {
  key: fs.readFileSync('../etc/letsencrypt/live/websocket.survive-in-hell.fr/privkey.pem'),
  cert: fs.readFileSync('../etc/letsencrypt/live/websocket.survive-in-hell.fr/cert.pem'),
  ca: fs.readFileSync('../etc/letsencrypt/live/websocket.survive-in-hell.fr/chain.pem')
};

var app = https.createServer(options);
var io = require('socket.io').listen(app);
app.listen(8000);
console.log('serveur demarer')

io.on('connection', function(socket){


 	socket.on('connexion', function(name,x,y){
      
      console.log(name + " c'est connecter ");
      users.push({id:socket.id,name:name});
      console.log(Object.keys(users));
      socket.username = name;
      console.log("socket id tab de " + socket.username + " es egal a " + socket.idtab);
      io.emit('joueur',users);
      socket.x = x;
      socket.y = y;
      socket.pos = "" + x + "" + y + "";
      socket.join(socket.pos);
     var ok = io.sockets.connected[socket.id].username;
     console.log(ok);

 

  });


  socket.on('action', function(pts,x,y,vie,id){
    console.log("points " + pts + " x et y " + x,y + " vie " + vie + " id " + id);
    io.emit('rafraichir',pts,x,y,vie,id);


  });

  socket.on('deplacement', function(x,y,dir,id,nom,pts,kill,vie,avatar){

    if(socket.x != x || socket.y != y){
      socket.leave(socket.pos);
    }

    if(dir == "gauche"){
      /* vers le moin*/
      io.to("" + (socket.x+2) + "" + (socket.y-1) + "").emit('sort',id);
      io.to("" + (socket.x+2) + "" + (socket.y-2) + "").emit('sort',id);
      io.to("" + (socket.x+2) + "" + (socket.y) + "").emit('sort',id);
      io.to("" + (socket.x+2) + "" + (socket.y+1) + "").emit('sort',id);
      io.to("" + (socket.x+2) + "" + (socket.y+2) + "").emit('sort',id);

      io.to("" + (socket.x-3) + "" + (socket.y-1) + "").emit('entre',id,nom,pts,kill,vie,avatar);
      io.to("" + (socket.x-3) + "" + (socket.y-2) + "").emit('entre',id,nom,pts,kill,vie,avatar);
      io.to("" + (socket.x-3) + "" + (socket.y) + "").emit('entre',id,nom,pts,kill,vie,avatar);
      io.to("" + (socket.x-3) + "" + (socket.y+1) + "").emit('entre',id,nom,pts,kill,vie,avatar);
      io.to("" + (socket.x-3) + "" + (socket.y+2) + "").emit('entre',id,nom,pts,kill,vie,avatar);

    }

    else if(dir == "droite"){
      io.to("" + (socket.x-2) + "" + (socket.y-1) + "").emit('sort',id);
      io.to("" + (socket.x-2) + "" + (socket.y-2) + "").emit('sort',id);
      io.to("" + (socket.x-2) + "" + (socket.y) + "").emit('sort',id);
      io.to("" + (socket.x-2) + "" + (socket.y+1) + "").emit('sort',id);
      io.to("" + (socket.x-2) + "" + (socket.y+2) + "").emit('sort',id);

      io.to("" + (socket.x+3) + "" + (socket.y-1) + "").emit('entre',id,nom,pts,kill,vie,avatar);
      io.to("" + (socket.x+3) + "" + (socket.y-2) + "").emit('entre',id,nom,pts,kill,vie,avatar);
      io.to("" + (socket.x+3) + "" + (socket.y) + "").emit('entre',id,nom,pts,kill,vie,avatar);
      io.to("" + (socket.x+3) + "" + (socket.y+1) + "").emit('entre',id,nom,pts,kill,vie,avatar);
      io.to("" + (socket.x+3) + "" + (socket.y+2) + "").emit('entre',id,nom,pts,kill,vie,avatar);
    }

    else if(dir == "haut"){

      /* en moin*/
      io.to("" + (socket.x-1) + "" + (socket.y+2) + "").emit('sort',id);
      io.to("" + (socket.x-2) + "" + (socket.y+2) + "").emit('sort',id);
      io.to("" + (socket.x) + "" + (socket.y+2) + "").emit('sort',id);
      io.to("" + (socket.x+1) + "" + (socket.y+2) + "").emit('sort',id);
      io.to("" + (socket.x+2) + "" + (socket.y+2) + "").emit('sort',id);

      io.to("" + (socket.x-1) + "" + (socket.y-3) + "").emit('entre',id,nom,pts,kill,vie,avatar);
      io.to("" + (socket.x-2) + "" + (socket.y-3) + "").emit('entre',id,nom,pts,kill,vie,avatar);
      io.to("" + (socket.x) + "" + (socket.y-3) + "").emit('entre',id,nom,pts,kill,vie,avatar);
      io.to("" + (socket.x+1) + "" + (socket.y-3) + "").emit('entre',id,nom,pts,kill,vie,avatar);
      io.to("" + (socket.x+2) + "" + (socket.y-3) + "").emit('entre',id,nom,pts,kill,vie,avatar);
    }

    else if(dir == "bas"){

      io.to("" + (socket.x-1) + "" + (socket.y-2) + "").emit('sort',id);
      io.to("" + (socket.x-2) + "" + (socket.y-2) + "").emit('sort',id);
      io.to("" + (socket.x) + "" + (socket.y-2) + "").emit('sort',id);
      io.to("" + (socket.x+2) + "" + (socket.y-2) + "").emit('sort',id);
      io.to("" + (socket.x+1) + "" + (socket.y-2) + "").emit('sort',id);

      io.to("" + (socket.x-1) + "" + (socket.y+3) + "").emit('entre',id,nom,pts,kill,vie,avatar);
      io.to("" + (socket.x-2) + "" + (socket.y+3) + "").emit('entre',id,nom,pts,kill,vie,avatar);
      io.to("" + (socket.x) + "" + (socket.y+3) + "").emit('entre',id,nom,pts,kill,vie,avatar);
      io.to("" + (socket.x+1) + "" + (socket.y+3) + "").emit('entre',id,nom,pts,kill,vie,avatar);
      io.to("" + (socket.x+2) + "" + (socket.y+3) + "").emit('entre',id,nom,pts,kill,vie,avatar);
    }
    
    socket.x = x;
    socket.y = y;
    socket.pos = "" + x + "" + y + "";
    socket.join(socket.pos);
    console.log(socket.pos);
    io.to(socket.pos).emit('mess',"salut toi");

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
