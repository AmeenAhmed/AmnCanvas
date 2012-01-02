var can;
var con;
var can1;
var con1;
var list;
var listCon;
var canvases = {};
var pressed = false;
var users = [];
var colors = {};
var count = 0;
function init() {
  now.name = prompt("Enter your name:");
  now.color = prompt("Enter you color:");
  list = document.createElement('canvas');
  list.setAttribute('id','list');
  list.style.position = 'absolute';
  list.style.left = window.innerWidth-200+'px';
  list.style.top = '0px';
  list.width = 200;
  list.height = window.innerHeight;
  document.getElementsByTagName('body')[0].appendChild(list);
  listCon = list.getContext('2d');  
  listCon.fillStyle = "#333333";
  listCon.fillRect(0,0,list.width,list.height);

  can = document.createElement('canvas');
  can.setAttribute('id','can');
  can.style.position = 'absolute';
  can.style.left ='0px';
  can.style.top = '0px';
  can.width = window.innerWidth-200;
  can.height = window.innerHeight;
  document.getElementsByTagName('body')[0].appendChild(can);
  con = can.getContext('2d');

  con.fillStyle = "#DDDDFF";
  con.fillRect(0,0,can.width,can.height);
  con.strokeStyle = now.color;

 /* can1 = document.createElement('canvas');
  can1.setAttribute('id','can1');
  can1.style.position = 'absolute';
  can1.style.left ='0px';
  can1.style.top = '0px';
  can1.width = window.innerWidth-200;
  can1.height = window.innerHeight;

  document.getElementsByTagName('body')[0].appendChild(can1);
  con1 = can1.getContext('2d');

  //con1.fillStyle = "#DDFFFF";
  //con1.fillRect(0,0,can1.width,can1.height);
  */
  now.updateList = function(c) {
    count = c;
    var i;
    for(i=0;i<count;i++) {
      now.getUser(i);
    }
    	listCon.fillStyle = "#333333";
	listCon.fillRect(0,0,list.width,list.height);
    setTimeout(function() {
      for(var i=0;i<count;i++) {
        canvases[users[i]] = document.createElement('canvas');
        canvases[users[i]].setAttribute('id',users[i] + 'Can');
        canvases[users[i]].style.position = 'absolute';
        canvases[users[i]].style.left = '0px';
        canvases[users[i]].style.top = '0px';
        canvases[users[i]].width = window.innerWidth-200;
        canvases[users[i]].height = window.innerHeight;
        document.getElementsByTagName('body')[0].appendChild(canvases[users[i]]);
        listCon.save();
        listCon.fillStyle = colors[users[i]];
        listCon.fillRect(20,i*40+20,20,20);
        listCon.fillStyle = "#FFFFFF";
        listCon.font = '12pt Arial';
        listCon.fillText(users[i],50,i*40+35);
        listCon.restore();
      }
    },100);
  }
  now.retUser = function(c,name,color) {
    users[c] = name;
    colors[name] = color;
  }

  
  now.moveTo = function(name,x,y) {
     var uCon = canvases[name].getContext('2d');
     if(name !== now.name) {
       uCon.moveTo(x,y);
     }
  }
  now.lineTo = function(name,color,x,y) {
      var uCon = canvases[name].getContext('2d');
      if(name !== now.name) {
        uCon.save();
        uCon.strokeStyle = color;
        uCon.lineTo(x,y);
        uCon.stroke();
        uCon.restore();
      }
  }
  document.onmousedown = function(e) {
    if(!event) event = e;
    con.moveTo(event.x,event.y);
    now.SmoveTo(now.name,event.x,event.y);
    pressed = true;
  }
  document.onmousemove = function(event) {
    if(!event) event = e;
    if(pressed) {
      con.lineTo(event.x,event.y);
      now.SlineTo(now.name,event.x,event.y);
      con.stroke();
    }
  }
  document.onmouseup = function(event) {
    if(!event) event = e;
    pressed = false;
  }

}
