var fs = require('fs');

exports.route = function(url,res) {
  if(url === '/') {
    res.end(fs.readFileSync('./Client.html'));
  } else if(url === '/client.js') {
    res.end(fs.readFileSync('./Client.js'));
  } else {
    res.end("404 Not found");
  }

   

}
