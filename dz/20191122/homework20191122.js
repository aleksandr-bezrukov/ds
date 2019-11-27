const http = require('http');
const https = require('https');
const hostname = '127.0.0.1';
const port = 8008;
const coursesUrl = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=3&fbclid=IwAR1QanjXaPkLLw9nQMXDiESZnQKm8stmGs1crDDKekIv7prkuwoH3R0hzjs';

const servak = http.createServer((req,res) =>{
//res.setHeader('Content-Type','text/plain');

function sendResponse(msg){
  res.setHeader('Content-Type','text/plain');
  res.statusCode = 404;
  res.write(msg+'\n');
  res.end();
}

function sendEmail(msg)
{
  const nodemailer = require('nodemailer');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bezrukov.aleksandr.victorovich@gmail.com',
      pass: 'Ns<kznm1!'
    }
  });

  let mailOptions = {
    from: 'bezrukov.aleksandr.victorovich@gmail.com'
    ,to: 'aleksandr.bezrukov@privatbank.ua'
    ,subject: 'currency'
    ,text: 'nihao'
  }

  mailOptions['text'] = msg;

  transporter.sendMail(mailOptions,function(error,info){
    if(error){console.log(error);}
    else{console.log('Email sent: ' + info.response);}
  })

  
}

switch(req.url){
    case '/':
      sendResponse('Hello, hello');
      break;
    
      case '/mailme':
        

        https.get(coursesUrl, (resp) => {
  
          let data = '';
  
            resp.on('data', (chunk) => {
              data += chunk;
            });
  
            resp.on('end', () => {
              console.log(JSON.parse(data));
              sendEmail(data);
            });
  
        }).on("error", (err) => {
            console.log("Error: " + err.message);
           });

      break;

    case '/contact':
      const fs = require('fs');
      let fileName = 'index.html';
      fs.access(fileName, fs.constants.F_OK | fs.constants.R_OK, (err) => {
        if(err){

          sendResponse(`Could not read file ${fileName}`);

        }
        else{

            readStream = fs.createReadStream(fileName);
            let fileData = '';
            readStream.on('data', (chunk) => {
               fileData += chunk;
            });
            readStream.on('end',()=>{
              sendResponse(fileData);
            })

        };
      });
      break;

    case '/courses':
        

        https.get(coursesUrl, (resp) => {

        let data = '';

          resp.on('data', (chunk) => {
            data += chunk;
          });

          resp.on('end', () => {
            console.log(JSON.parse(data));
            sendResponse(data);
          });

        }).on("error", (err) => {
          console.log("Error: " + err.message);
          });
        break;

    default: sendResponse('404 not found');

}

});

servak.listen(port,hostname,() => {
    console.log(`Servak are listenning at http://${hostname}:${port}`);
});
