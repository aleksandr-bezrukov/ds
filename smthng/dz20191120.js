const fs = require('fs');

let fileName = 0;
let text4Writing = 0;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter file name: ', (answer) => {
    fileName = answer;
    console.log(`You entered ${fileName}`);
    rl.question('Text for writing: ', (answer) => {
        text4Writing = answer;
        fs.access(fileName, fs.constants.F_OK | fs.constants.W_OK, (err) => {
          if(err){
            console.log(`creating ${fileName}`);
            let writeStream = fs.createWriteStream(fileName);
            writeStream.write(text4Writing);
            writeStream.on('close', () => {
              console.log('wrote all data to new file ${fileName}');
            });
          }
          else{
            console.log(`appending to ${fileName}`);
            let writeStream = fs.createWriteStream(fileName,{flags:'a',autoClose:true});
            writeStream.write('\n'+text4Writing);
            writeStream.on('close', () => {
              console.log('wrote all data to existing file ${fileName}');
            });

          };
        });

        rl.close();
    });
});
