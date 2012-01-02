var http = require('http');
var fs = require('fs');
var router = require('./Router');
var server = http.createServer(function(req, res) {
  router.route(req.url,res);
});
server.listen('8080');
var nowjs = require('now');
var everyone = nowjs.initialize(server);

var users = [];
var colors = {};
var count = 0;

nowjs.on('connect',function() {
  users[count] = this.now.name;
  colors[users[count]] = this.now.color;
  everyone.now.updateList(++count);
//  console.log('user ' + users[count] + ' selected ' + colors[users[count]]);

});
nowjs.on('disconnect',function() {
  var i,x;
  for(i=0;i<count;i++) {
    if(users[i] === this.now.name) {
      x=i;
      console.log("found!");
      break;
    }
  }
  for(i=x;i<count-1;i++) {
    users[i] = users[i+1];
    console.log(users[i]);
  }
  count--;
  everyone.now.updateList(count);
});

everyone.now.getUser = function(c) {
  this.now.retUser(c,users[c],colors[users[c]]);
}

everyone.now.SmoveTo = function(name,x,y) {
  everyone.now.moveTo(name,x,y);
  
}

everyone.now.SlineTo = function(name,x,y) {
  everyone.now.lineTo(name,colors[name],x,y);
//  console.log(name + ' is drawing with ' + colors[name] );
}


