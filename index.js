var express = require("express");
var exp = express();

var request = require("request");

var request_responce;

var bodyparser = require("body-parser");
exp.use(bodyparser.json());
exp.use(bodyparser.urlencoded({extented:true}));

exp.get('/register',function(req,res)
{
    res.sendFile(__dirname+"/register.html");
});
//-----------------------------------------------------------------
var macd=0,signal=0;

exp.get('/signal',function(req,res)
{ 
     signal = (req.query.signal);
     res.send(signal);
     console.log("signal = ",Number(signal));
});

exp.get('/macd',function(req,res)
{
     macd = (req.query.macd);
     res.send(macd);
     console.log("macd = ",Number(macd));
});

exp.get('/value_read',function(req,res)
{
   
     var v={macd:macd,signal:signal}; // This is in json format 
     
     // var v={macd:56,signal:90};

     res.send(ret);
     console.log("macd_read = ",Number(macd));
});

exp.listen(7000);

// exp.post('/value_set',function(req,res)
// {
// //  res.send(req.query.name);  // ... only in Get
// //  res.send(req.body.email);  // ... only in Post

//      sl = (req.body.value_set);
//      res.send(sl);
// });

exp.get('/value_L',function(req,res)
{
  
  var v = send_request_and_receive_response("/form-L");
  
  const ret = {macd:macd,signal:signal,Live_candles_data_input:v};

  res.send(ret);


});

callback = (error, response, body) =>
   {
    if (!error && response.statusCode == 200) {

      request_responce = 0;
      request_responce = JSON.parse(body);
     //console.log("This is our request result ========== ",request_responce);
     }
   }

  function send_request_and_receive_response(request_url_address)
  {
  var ip = {url: "http://127.0.0.1:8000"+request_url_address};
  request(ip,callback);
  return request_responce;
  }


















  