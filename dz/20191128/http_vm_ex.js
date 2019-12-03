'use strict';
const vm = require('vm');
const httpMain = require('http');
let cntr = 0;

function makeCounter() {
    let count = 0;
  
    return function() {
      return count++; // has access to the outer "count"
    };
  }

let counter = makeCounter();

httpMain.createServer((request, response) => {
    //response.writeHead(200, { 'Content-Type': 'text/plain' });
    //response.end('Hello World\\n');
    


    switch(request.url){
        case '/':
          response.writeHead(200, { 'Content-Type': 'text/plain' });
          response.end('Hello World\n');
          break;
        case '/reload':
            //cntr = cntr + 2;
            cntr = counter();
            console.log('cntr=' + cntr);
                let coden = `
                  ((require) => {
                      const http = require('http');

                      http.createServer((request, response) => {
                        response.writeHead(200, { 'Content-Type': 'text/plain' });
                        response.end('Hello World ${cntr}\\n');
                      }).listen(8124);

                      console.log('Server running at http://127.0.0.1:8124/');
                    })`;
vm.runInThisContext(coden)(require);
            break;
    }

    
}).listen(8130);

  console.log('Server running at http://127.0.0.1:8130/');

const code = `
((require) => {
  const http = require('http');

  http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hello World\\n');
  }).listen(8124);

  console.log('Server running at http://127.0.0.1:8124/');
})`;

const code1 = `
((require) => {
  const http = require('http');

  http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hello World2\\n');
  }).listen(8126);

  console.log('Server running at http://127.0.0.1:8126/');
})`;

//vm.runInThisContext(code)(require);
//vm.runInThisContext(code1)(require);

