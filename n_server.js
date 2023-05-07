var express = require("express");
var exp = express();
var request = require("request");
const ws = require('ws');
const wss = new ws.Server({ port: 8080, ip: "0.0.0.0" })

// const server = createServer({
// //   cert: readFileSync('/path/to/cert.pem'),
// //   key: readFileSync('/path/to/key.pem')
// });

//const wss = new WebSocketServer({ server });

exp.listen(8000, "0.0.0.0", function () {
  console.log('Example app listening on port 8080!');
})

exp.get('/Admin_user_details', function (req, res) {
  res.sendFile(__dirname + "/Admin_user_details.html");
});

wss.on('connection', function (ws) 
{

  ws.on('message', function (message) 
  {

   // console.log('received: %s', message);

  let dh = JSON.parse(message);
  // JSON.parse(JSON.stringify(error))

  console.log("from_client_side_data ", dh.t_close);
  // console.log("from_client_side_data ",message);
  });

  let v = {Online_client:234}
  ws.send(JSON.stringify(v));
  //ws.send(v);
});


// setInterval(() => {
// let v = {Online_client:234}
// ws.send(v);
// }, 100);




