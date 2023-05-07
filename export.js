var  set = 555;

module.exports = set;

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  readline.question(`Enter a value = `, read => {
    set = read;
    module.exports = set;

    console.log(`Hi ${read}!`);
    readline.close();
  });




  