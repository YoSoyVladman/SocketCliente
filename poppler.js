  var io = require('socket.io-client');
  var os = require('os');
  var poppler = io('http://172.1.1.201:1235');
  //var poppler = io('http://192.168.1.75:1235');
  var id = 'SumaPuntos4';

  poppler.on('connect', function(){
      console.log('CONECTADO');
      setInterval(function(){
          enviar_ip();
      },5000);
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
        ips.push(e.address);
        });
    }
    else if(so == 'darwin'){
        ent = red['en0'];
        ent.forEach(function(e){
        ips.push(e.address);
        });
    }
    else if(so == 'linux'){
        ent = red['eth0'];
        ent.forEach(function(e){
        ips.push(e.address);
        });
    }
    //console.log(ips);
    //user = os.userInfo();
    //console.log(user);
    mensaje = [];
    mensaje.push(id);
    mensaje.push(so);
    mensaje.push(ips);
    //console.log(mensaje);
    poppler.emit('my_ip',mensaje);
}
