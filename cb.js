const http = require('http');
const request = require('request');
const pburl = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

function jsonData(cb){
  request(pburl, function(error,response,body){
    return cb(body);
  })
}

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  jsonData(function(data){
    res.write(data);
    res.end();

  })
  //res.statusCode = 200;
  //res.setHeader('Content-Type', 'text/plain');
  //res.end('Hello, World!\n');

 /* request(pburl, function(error,response,body){
    console.log('body:',body);
    res.write(body);
    res.end();
  });
*/

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

/*const http = require('http');
const request = require('request');
const port = 3000;
const pburl = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

http.createServer(function(req,res){
  console.log('HERE');
  request(url, function(error,response,body){
    console.log('body:',body);
    res.write(body);
    res.end();
  });


}).listen(port, function(){
  console.log('Server is running at http://localhost:3000');
});*/
