  var io = require('socket.io-client');
  var os = require('os');
  var poppler = io('http://10.1.7.25:1235');
  var id = 'MacMini Dev Vlad';

  poppler.on('connect', function(){
      console.log('CONECTADO');
      setInterval(function(){
          enviar_ip();
      },20000);
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
    //console.log(red);
    ips = [];
    if(so == 'win32'){
        arr = Object.keys(red);
        w = arr[0];
        ent = red[w];
        ent.forEach(function(e){
        ips.push(e.family + ' = ' + e.address);
        });
    }
    else if(so == 'darwin'){
        ent = red['en0'];
        ent.forEach(function(e){
        ips.push(e.family + ' = ' + e.address);
        });
    }
    //console.log(ips);
    //user = os.userInfo();
    //console.log(user);
    mensaje  = 'Soy ' + id + ',  mi OS es '+ so + ' y mi IP es ' + ips;
    //console.log(mensaje);
    poppler.emit('my_ip',mensaje);
}
