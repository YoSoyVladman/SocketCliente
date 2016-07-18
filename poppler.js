  var io = require('socket.io-client');
  var os = require('os');
  var poppler = io('http://10.1.7.25:1235');
  var id = 'MAC_VLAD';

  poppler.on('connect', function(){
      console.log('CONECTADO');
      setInterval(function(){
          enviar_ip();
      },15000);
  });

  poppler.on('hi',function(data){
  	console.log(data);
  });

  poppler.on('disconnect', function(){
    console.log('DESCONECTADO');
  });


function enviar_ip(){
    so = os.platform();
    //console.log(so);
    red = os.networkInterfaces();
<<<<<<< HEAD
    ent = red.en0;
    console.log(red);
=======
    //console.log(red);
    arr = Object.keys(red);
    w = arr[0];
    ent = red[w];
>>>>>>> 4a10012dfcdb234398a4f5f2b9e23fc62f65e1b6
    ips = [];
    
    ent.forEach(function(e){
        ips.push(e.family + ' = ' + e.address);
    });
    
    //console.log(ips);
    //user = os.userInfo();
    //console.log(user);
    mensaje  = 'Soy ' + id + ',  mi OS es '+ so + ' y mi IP es ' + ips;
    //console.log(mensaje);
    poppler.emit('my_ip',mensaje);
}
