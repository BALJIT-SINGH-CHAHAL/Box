//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
var express = require("express");
var exp = express();

let Stop_Loss_Hit_or_Profit_booked_or_Buy_Action = '-', Buy_Lock = 0;
let test1;

let Online_client_Disconnected_with_server_count = 0, Online_client = 20;

let t = 0;

let x;

let kl = 231;

let from_client_side_data = 78;

let percent_of_profit, percent_of_stop_loss;

let ma = [], sig = [], complete_data_of_price_macd = [], complete_data_of_price_signal = [], complete_data_of_price_Histogram = [];

let Buy = 0, Sell = 0, Last_Transaction_Profit = 0, Total_Profit = 0;
let Buy_count = 0, Sell_count = 0, Pending_Transactions_status = 0;
let Return_buy_stop_loss_sell_display_in_file = "", x0 = 0;
var macd = 0, Buy_macd_position = 0, Sell_macd_position = 0, Peak_macd = 0, Down_macd = 0;
var signal = 0, histogram = 0;

let Tema_of_Price = [], Tema_of_volume = [], TEMA = [], TEMA_raw_Volume = [];

let Volume_EMA_9 = [], Volume_EMA_26 = [], Volume_EMA_55 = [];

var Live_candles_data_input = 0, Volume = 0, raw_Volume = 0;
let Volume_macd = 0, Volume_signal = 0, Volume_histogram = 0;

let candle_sign = 0, L = 0, V, Profit_Booked_at_hit = 0, Stop_Loss_hit_at = 0;

let cci = [0];

// var bodyparser = require("body-parser");
// exp.use(bodyparser.json());write_information_in_file()
// exp.use(bodyparser.urlencoded({extented:true}));

// var ss;

// exp.get('/register',function(req,res)
// {
//     res.sendFile(__dirname+"/register.html");
// });

// exp.get('/value_read',function(req,res)
// {
//       var v = {macd:macd,signal:signal,Live_candles_data_input:Live_candles_data_input[499]};
//       res.send(v);
// });

// exp.listen(8000);
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const hostname = "0.0.0.0";
//----------------------------------------------------------
exp.listen(8000, hostname, function () {
  console.log('Example app listening on port 8000!')
})

exp.get('/T2', function (req, res) {
  res.sendFile(__dirname + "/T2.html");
  //res.sendFile(__dirname+"/copy_of_T_.html");
});

exp.get('/T', function (req, res) {
  res.sendFile(__dirname + "/T.html");
  //res.sendFile(__dirname+"/copy_of_T_.html");
});

exp.get('/v', function (req, res) {
  res.sendFile(__dirname + "/v.html");
});

exp.get('/Admin_user_details', function (req, res) {
  res.sendFile(__dirname + "/Admin_user_details.html");
});
//-------------------------------------------------------------

// Importing the required modules
const WebSocketServer = require('ws');

// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: 8081, ip: hostname })

// wss.on('connection', function connection(ws) 
// {
//   ws.on('message', function message(data) 
//   {
//     console.log('received:======>>>> %s', data);
//   });

//  // ws.send('something');
//   });  /// tested ok hai

//----------------------------------------------
// Creating connection using websocket
wss.on("connection", ws => 
{
  //console.log("new client connected");

  Online_client++;

  ws.onmessage = function (evt) {
    //var received_msg = evt.data;

    // console.log("Message is received...",received_msg);
  }; /// tested ok hai 

  // // sending message
  // ws.on("message", data => {

  //   //Date = new Date();
  //   console.log(`Client has sent usfffffffffffffffffffffffffffff: ${data}`);

  //   // from_client_side_data = JSON.parse(data);
  //   // console.log("from_data ",from_client_side_data );

  //  from_client_side_data = (data);
  //  console.log("data",from_client_side_data );

  // //   //ws.send("Server has sent us: How are you?");
  // //   //ws.send(d.getSeconds());
  // });

  // ws.on("/register", function (req, res) {
  //   //res.sendFile(__dirname+"/register.html");
  //   ws.send(__dirname + "/register.html");
  // });

  // handling what to do when clients disconnects from server
  // ws.on("close", () => 
  // {
  //   //console.log("the client has Disconnected");
  //   Online_client--;
  // });

  // // you can write these code withe same following statement
  ws.addEventListener('close', (event) => {
    console.log('The connection has been closed successfully.');
    Online_client--;
    Online_client_Disconnected_with_server_count++;
  });

  ws.addEventListener('message', function (event) {
    //from_client_side_data 
    let dh = JSON.parse(event.data);

    console.log("from_client_side_data === >> ", dh);

    t.close = dh.t_close;
    macd = dh.macd;
    Peak_macd = dh.Peak_macd;
    Down_macd = dh.Down_macd;
    Volume_EMA_9[491] = dh.Volume_EMA_9;
    Volume_EMA_26[474] = dh.Volume_EMA_26;

  });

  // ws.onclose = (event) => {
  //   console.log('The connection has been closed successfully.');
  // };

  console.log("The WebSocket server is running on port 8081");

  setInterval(() => {

    let v =
    {

      from_client_side_data: from_client_side_data,
      kl: kl,

      Online_client_Disconnected_with_server_count: Online_client_Disconnected_with_server_count,
      Online_client: Online_client,

      cci: cci,

      x_All: x,

      Buy_Lock:Buy_Lock,

      t: t,

      percent_of_profit: percent_of_profit, percent_of_stop_loss: percent_of_stop_loss,
      Stop_Loss_Hit_or_Profit_booked_or_Buy: Stop_Loss_Hit_or_Profit_booked_or_Buy_Action,
      test1: test1,
      //Live_candles_data_input_Total_data:Live_candles_data_input,

      Live_candles_data_input: L, /// with sign + , -

      Volume_EMA_9: Volume_EMA_9,
      Volume_EMA_26: Volume_EMA_26,
      Volume_EMA_55: Volume_EMA_55,

      //     Live_candles_data_input_last:Live_candles_data_input[499],
      //     Live_candles_data_input_before_latest:Live_candles_data_input[498],

      raw_Volume_macd: ma,
      raw_Volume_signal: sig,

      Tema_of_Price: Tema_of_Price,
      Tema_of_volume: Tema_of_volume,

      complete_data_of_price_macd: complete_data_of_price_macd,
      complete_data_of_price_signal: complete_data_of_price_signal,
      complete_data_of_price_Histogram: complete_data_of_price_Histogram,

      macd: String(macd).slice(0, 6),
      signal: String(signal).slice(0, 6),
      histogram: String(histogram).slice(0, 6),
      Peak_macd: Peak_macd,//.slice(0, 6),
      Down_macd: String(Down_macd).slice(0, 6),
      Buy_macd_position: String(Buy_macd_position).slice(0, 6),
      Sell_macd_position: String(Sell_macd_position).slice(0, 6),

      Buy: Buy,
      Sell: Sell,
      Total_Profit: Total_Profit,

      Stop_Loss_hit_at: Stop_Loss_hit_at,
      Profit_Booked_at_hit: Profit_Booked_at_hit,

      //Volume:String(raw_Volume_input).slice(0,8),

      Volume: V,//raw_Volume_input[499],

      // raw_Volume:raw_Volume,

      Volume_macd: String(Volume_macd).slice(0, 6),
      Volume_signal: String(Volume_signal).slice(0, 6),
      Volume_histogram: String(Volume_histogram).slice(0, 6)
    };

    ws.send(JSON.stringify(v));

  }, 100);

});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
const Binance = require('node-binance-api'); // API tested 

var request = require("request");
const router = express.Router();

const EMA = require('technicalindicators').EMA;
const CCI = require('technicalindicators').CCI;
var MACD = require('technicalindicators').MACD;
//const readline = require("readline-sync"); // for inputs

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});
//-------------------------------------------------------------------------------------------//
const fs = require("fs");
const { url } = require('inspector');
const { sign } = require("crypto");

///const { cci } = require('technicalindicators');

//----------------------------------------------//
// var imp = require('./export.js');

const binance = new Binance().options({
  APIKEY: '2qkbaBE1f9YrssJewTk8WKaFpnyWl4RDxSXdW1834TlU6E6QQLOqSqh79xxVPKk0',
  APISECRET: 'P7xTTVKPKj76PJ3rZUcoolWoltVRi8zSU75HPQDZdHRYpp8wtR6X6KDfcTAYAW11'
});

///--------------------------------------------------------------------------------------------------
function sign_Plus_minius() {
  //if (Live_candles_data_input[499] > Live_candles_data_input[498]) {
  if (t.close > Live_candles_data_input[498]) {

    candle_sign = " ";
    L = candle_sign.concat(" ", t.close).slice(0, 10);//,Live_candles_data_input[499]);
    V = candle_sign.concat(" ", raw_Volume[499]);
  }

  else {
    candle_sign = "-";
    L = candle_sign.concat(" ", t.close).slice(0, 10);//,Live_candles_data_input[499]);
    V = candle_sign.concat(" ", raw_Volume[499]);
  }
}

async function b() {
  binance.websockets.miniTicker(markets => {
    //console.clear();
    //   console.info(markets.BTCUSDT);
    t = markets.BTCUSDT;  //// <<<------------------------------
    //console.log("tttttttttt ",t.close);
    sign_Plus_minius();
  });
}

b();

(async () => {
  // webSocket
  binance.websockets.chart("BTCUSDT", "5m", (symbol, interval, chart) => {
    //----------------------------------------------------------------------------------------------
    let ohlc = binance.ohlc(chart);
    x = (symbol, ohlc);
    Live_candles_data_input = x.close; //[499];

    raw_Volume = x.volume;

    //Volume_T = raw_Volume_input[474];
    // console.log("Volume ",Volume);
    //------------------------------------------------------------------------------//
    var inputCCI =
      ({
        open: x.open,
        high: x.high,
        low: x.low,
        close: x.close,
        period: 26
      });
    cci = CCI.calculate(inputCCI);
    // macd = cci[480];
    //------------------------------------------------------------------------------//
    var macdInput =
    {
      values: Live_candles_data_input,
      fastPeriod: 12,
      slowPeriod: 26,
      signalPeriod: 9,

      // fastPeriod        : 6,
      // slowPeriod        : 13,
      // signalPeriod      : 4,
      SimpleMAOscillator: false,
      SimpleMASignal: false
    }

    let raw_complete_data_out_of_macd = [];

    raw_complete_data_out_of_macd = MACD.calculate(macdInput); //total length 488
    // console.log("eeeeeee ========>>>>>>>>",e);

    let b = 0;

    for (b = 0; b < 474; b++) {
      complete_data_of_price_macd[b] = raw_complete_data_out_of_macd[b].MACD;
      complete_data_of_price_signal[b] = raw_complete_data_out_of_macd[b].signal;
      complete_data_of_price_Histogram[b] = raw_complete_data_out_of_macd[b].histogram;
    }
    //---------------------------------------------------------------
    var macdInput_volume =
    {

      values: raw_Volume,

      fastPeriod: 12,
      slowPeriod: 26,
      signalPeriod: 9,

      //  fastPeriod        : 6,
      //  slowPeriod        : 13,
      //  signalPeriod      : 4,
      SimpleMAOscillator: false,
      SimpleMASignal: false
    }
    let e = [];

    e = MACD.calculate(macdInput_volume); //total length 488
    // console.log("eeeeeee ========>>>>>>>>",e);

    b = 0;

    for (b = 0; b < 474; b++) {
      ma[b] = e[b].MACD;
      sig[b] = e[b].signal;
    }

    //console.log("ma========>>>>>>>>",e);

    Volume = MACD.calculate(macdInput_volume);
    raw_Volume_macd = Volume[474].MACD;

    Volume_macd = Volume[474].MACD;
    Volume_signal = Volume[474].signal;
    Volume_histogram = Volume[474].histogram;

    //console.log(Result_macd);
    //let macd = Result_macd.length

    var imp = require('./export.js');

    let Result_macd = MACD.calculate(macdInput);
    //console.log("Result_macd ++++++ " ,Result_macd);

    macd = Result_macd[474].MACD;
    signal = Result_macd[474].signal;
    histogram = Result_macd[474].histogram;

    //-------------------------------------------------
    Volume_EMA_9 = EMA.calculate({ period: 9, values: raw_Volume });
    Volume_EMA_26 = EMA.calculate({ period: 26, values: raw_Volume });
    Volume_EMA_55 = EMA.calculate({ period: 55, values: raw_Volume });

    Tema_find(1, Live_candles_data_input);
    Tema_of_Price = TEMA;

    Tema_find_2(1, raw_Volume);
    Tema_of_volume = TEMA_raw_Volume;
    //---------------------------------------------------------
    //  console.log('Tema ======>',Tema_of_Price);//Tema_of_Price);
    /*
      readline.question(`Enter macd = `, read_0 => {
    
        macd = read_0;
    
        console.log(`Hi ${macd}!`);
        readline.close();
      });
    
      readline.question(`Enter signal = `, read_1 => {
    
        signal = read_1;
    
        console.log(`Hi ${macd}!`);
        readline.close();
      });
    */
    //  console.log("macd = ",macd);
    //  console.log("signal = ",signal);
    //  console.log("histogram = ",histogram);

    /*
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
      var ip = {url: "http://127.0.0.1:7000"+request_url_address};
      request(ip,callback);
      return request_responce;
      }
      const ret = send_request_and_receive_response("/value_read");
    */
    //--------------------------------------------------------------------------------------//
    // macd = ret.macd;
    // signal = ret.signal;
    //------------------------------------------------------------------------------------//
    if (x0 < 1) {//At starting
      Peak_macd = macd;
      Down_macd = macd;
      // write_information_in_file();
      x0 = 5;
    }
    //--------------------------------------------------------//
    if (Peak_macd < macd) {//In continued mode
      Peak_macd = macd;
    }
    //--------------------------------------------------------//
    if (Down_macd > macd) {//In continued mode
      Down_macd = macd;
    }
    //-------------------------------------------------------------------------------------//

    // if((Down_macd + 2 < macd) && (signal + 1 < macd) && (Volume_EMA_9[491]+50 > Volume_EMA_26[474])) // Buy here 
 
 // if ((macd > Down_macd) && (Volume_EMA_9[491] + 15 > Volume_EMA_26[474])) // Buy here 
   
    if ((macd > Down_macd+1)) // && (Volume_EMA_9[491] + 15 > Volume_EMA_26[474])) // Buy here 

    { //< 0) // Buy here
      if (Buy_Lock == 0) {
        if (Pending_Transactions_status == 0) {
          Buy_macd_position = macd;
          Buy = t.close;//Live_candles_data_input[499]; //<<<----------------

          Buy_count++;
          Pending_Transactions_status = 1;
          //Stop_Loss_Hit_or_Profit_booked_or_Buy = '-';

          Buy_Lock = 1;
          Stop_Loss_Hit_or_Profit_booked_or_Buy_Action = 'Buy';
          //  write_information_in_file();

          // Peak_macd = macd;
          // Down_macd = macd;
        }
      }
      test1 = 'in side Buy';
    }

    else {
      Buy_Lock = 0; /// Near about working as Pending_Transactions_status 
      test1 = 'Software searching to Buy situation';
    }
    //--------------------------------------------------------------------------------//
    //if ((Peak - 5) > macd && (Buy_macd_position + 20) < macd) //.... Only Profit Booked "Sell"
    //Buy = t.close;

    // Buy = t.close;

    percent_of_profit = 100 * (50 / Buy);
    Profit_Booked_at_hit = macd - percentage(macd, percent_of_profit);
/*
    if (Peak_macd > Profit_Booked_at_hit)//Live_candles_data_input[499]) //.... Only Profit Booked
    { //.... Only Profit Booked

      // if ((Buy + 50) < macd )
      // {
      if (Pending_Transactions_status == 1) {
        Sell_macd_position = macd;
        Sell = t.close;//Live_candles_data_input[499];
        Sell_count++;
        Last_Transaction_Profit = Sell - Buy;
        Total_Profit = Total_Profit + Last_Transaction_Profit;
        Pending_Transactions_status = 0;

        Stop_Loss_Hit_or_Profit_booked_or_Buy_Action = 'Profit';

        write_information_in_file();

        Peak_macd = macd;
        Down_macd = macd;

        Buy_macd_position = 0;
        Buy = 0;
      }
      test1 = 'inside Ready to Sell Decision';
      //}
    } 
*/
    //------------------------------------------------------------------//
    // if ((Buy_macd_position - 10) > macd)//.... Stop Loss hit

    percent_of_stop_loss = 100 * (25 / Buy);
    Stop_Loss_hit_at = macd - percentage(macd, percent_of_stop_loss);

    if (Buy_macd_position > Stop_Loss_hit_at)//Live_candles_data_input[499]) //.... Only Profit Booked
    {
      // if ((Buy + 50) > macd)//.... Stop Loss hit
      //  {
      if (Pending_Transactions_status == 1) 
      {
        Sell_macd_position = macd;
        Sell = t.close;//Live_candles_data_input[499];
        Sell_count++;
        Last_Transaction_Profit = Sell - Buy;
        Total_Profit = Total_Profit + Last_Transaction_Profit;
        Pending_Transactions_status = 0;
        Stop_Loss_Hit_or_Profit_booked_or_Buy_Action = 'Stop Loss hit';

        write_information_in_file();

        Peak_macd = macd;
        Down_macd = macd;
        Buy_macd_position = 0;
        Buy = 0;
      }
      //test1 = 'in side Stop_Loss_hit_at > macd';
      test1 = 'Buy_macd_position > Stop_Loss_hit_at';
      // }
    }
//---------------------------------------------------------------------------------------------//
    write_always_information_in_file();
//---------------------------------------------------------------------------------------------//
    
        console.clear();
        console.log('Live_candles_data_input', x);

   /* 
        console.log('Live_candles_data_input', Live_candles_data_input[499]);
        console.log('Peak-Live price', macd - Peak_macd);
        console.log();
    
        if (Buy > 0) {
          console.log('Current Profit Situation', Live_candles_data_input[499] - Buy);
        }
    
        let difference = macd - Buy_macd_position;
        console.log('macd - Buy_macd_position Difference', String(difference).slice(0, 8));
        console.log('Difference * Peak', String(difference * Peak_macd).slice(0, 8));
        console.log('Difference * Down_macd', String(difference * Down_macd).slice(0, 8));
        console.log();
    
        console.log('Present_macd_position', +String(macd).slice(0, 8));
        console.log('Present_signal_position', +String(signal).slice(0, 8));
    
        console.log(test1);
    
        console.log('Peak', Number(Peak_macd));
        console.log();
    
        console.log('Down_macd', Down_macd);
    
        console.log();
        console.log('Buy_macd_position', String(Buy_macd_position).slice(0, 8));
        console.log('Buy = ', Buy);
        console.log('Sell = ', Sell);
        console.log();
    
        console.log('Sell_macd_position', Sell_macd_position);
        console.log('Sell_count = ', Sell_count);
        console.log('Buy_count = ', Buy_count);
        console.log('Last Transaction Profit = ', Last_Transaction_Profit);
        console.log('Total Profit = ', Total_Profit);
        console.log();
        console.log('Pending_Transactions_status ', Pending_Transactions_status);
    
        if (Stop_Loss_Hit_or_Profit_booked_or_Buy_Action == 'Stop Loss hit') {
          console.log('Stop Loss Hit');
        }
        if (Stop_Loss_Hit_or_Profit_booked_or_Buy_Action == 'Profit') {
          console.log('Profit is Booked');
        }
        console.log('Profit_Booked_at_hit', Profit_Booked_at_hit);
        console.log('Stop_Loss_hit_at', Stop_Loss_hit_at);
        console.log('Buy_Lock', Buy_Lock);
    
        console.log("Online_client_Disconnected_with_server_count ", Online_client_Disconnected_with_server_count);
        console.log("Online_client ", Online_client);
    */
    // console.log("address.ip ",address.ip);

    // console.log(d.getHours(),d.getMinutes(),d.getSeconds(),d.getDate(),d.getMonth()+1,d.getFullYear());

    //  exp.on;
    //  exp.my_Get_request_Function();close;
  }); //<<<<<<<<<-------------------------------------
})()

function percentage(num, per) {
  return (num / 100) * per;
}

function write_information_in_file() {

  const Time_Date_Read_From_System = new Date();
  let ex = "" + String(Peak_macd).slice(0, 6) + "     " + String(Down_macd).slice(0, 6) + "     " + String(Buy_macd_position).slice(0, 6) + "                  " + String(Sell_macd_position).slice(0, 6) + "                   " + String(Buy).slice(0, 8) + "          "

    + String(Sell).slice(0, 8) + "          " + String(Last_Transaction_Profit).slice(0, 6) + "                 " /*+ String(Total_Profit).slice(0, 6) + "   "*/ + Stop_Loss_Hit_or_Profit_booked_or_Buy_Action + '\n'; // +
  //   "          " + Time_Date_Read_From_System.getHours() + "-" + Time_Date_Read_From_System.getMinutes() + "-" + Time_Date_Read_From_System.getSeconds() + "  " + Time_Date_Read_From_System.getDate() + "/" + (Time_Date_Read_From_System.getMonth() + 1) + "/" + Time_Date_Read_From_System.getFullYear() + "   " + Return_buy_stop_loss_sell_display_in_file + '\n';


  //"+Date()+'\n';//+buy_stop_loss_sell_display_in_file("Buyy")+'\n';
  //"+Date()+'\n';

  fs.appendFile("write.txt", ex, (error) => { console.log(error); });
}

function write_always_information_in_file() {

  const Time_Date_Read_From_System = new Date();

  let ex = "" + String(Live_candles_data_input[499]).slice(0, 10) + "   " + String(Peak_macd).slice(0, 6) + "   " + String(Down_macd).slice(0, 6) + "   " + String(Buy_macd_position).slice(0, 6) + "   " + Buy + "   "

    + Sell + "   " + String(Last_Transaction_Profit).slice(0, 6) + "   " + String(Total_Profit).slice(0, 6) + "   " + Stop_Loss_Hit_or_Profit_booked_or_Buy_Action +
    "   " + Time_Date_Read_From_System.getHours() + "-" + Time_Date_Read_From_System.getMinutes() + "-" + Time_Date_Read_From_System.getSeconds() + "   " + Time_Date_Read_From_System.getDate() + "/" + (Time_Date_Read_From_System.getMonth() + 1) + "/" + Time_Date_Read_From_System.getFullYear() + "   " + Return_buy_stop_loss_sell_display_in_file + '\n';
  //"+Date()+'\n';//+buy_stop_loss_sell_display_in_file("Buyy")+'\n';
  //"+Date()+'\n';

  fs.appendFile("write_always.txt", ex, (error) => { console.log(error); });
}

function Tema_find(TEMA_Setting, Tema_input) {
  let TEMA_1 = [], TEMA_2 = [], TEMA_3 = [];

  TEMA_1 = EMA.calculate({ period: TEMA_Setting, values: Tema_input });
  // console.log('period of ',String(EMA_Setting),' EMA_1  = >', EMA_1[500 - EMA_Setting]);
  // console.log();

  TEMA_2 = EMA.calculate({ period: TEMA_Setting, values: TEMA_1 });
  // console.log('period of ',String(EMA_Setting),' EMA_2   = >', EMA_2[500 - (EMA_Setting*2)]);
  // console.log();

  TEMA_3 = EMA.calculate({ period: TEMA_Setting, values: TEMA_2 });
  // console.log('period of ',String(EMA_Setting),' EMA_3   = >', EMA_3[500 - (EMA_Setting*3)]);
  // console.log();

  let y;

  for (y = 0; y < 500; y++) {
    TEMA[y] = (3 * TEMA_1[y]) - (3 * TEMA_2[y]) + TEMA_3[y];
    //TEMA = (3 * TEMA_1[500-TEMA_Setting]) - (3 * TEMA_2[500-(TEMA_Setting*2)]) + TEMA_3[500 - (TEMA_Setting*3)];  

    //console.log('period of ',String(TEMA_Setting),' TEMA     = >', TEMA);//[500-EMA_Setting*3]);
  }

  //return TEMA;

  // let DEMA = (2 * EMA_1[500-100]) - EMA_2[500-200];
  // console.log('period of 100 DEMA = >', DEMA);
  // console.log();

}

function Tema_find_2(TEMA_Setting, Tema_input) {
  let TEMA_1 = [], TEMA_2 = [], TEMA_3 = [];

  TEMA_1 = EMA.calculate({ period: TEMA_Setting, values: Tema_input });
  // console.log('period of ',String(EMA_Setting),' EMA_1  = >', EMA_1[500 - EMA_Setting]);
  // console.log();

  TEMA_2 = EMA.calculate({ period: TEMA_Setting, values: TEMA_1 });
  // console.log('period of ',String(EMA_Setting),' EMA_2   = >', EMA_2[500 - (EMA_Setting*2)]);
  // console.log();

  TEMA_3 = EMA.calculate({ period: TEMA_Setting, values: TEMA_2 });
  // console.log('period of ',String(EMA_Setting),' EMA_3   = >', EMA_3[500 - (EMA_Setting*3)]);
  // console.log();

  let y;

  for (y = 0; y < 500; y++) {
    TEMA_raw_Volume[y] = (3 * TEMA_1[y]) - (3 * TEMA_2[y]) + TEMA_3[y];
    //TEMA = (3 * TEMA_1[500-TEMA_Setting]) - (3 * TEMA_2[500-(TEMA_Setting*2)]) + TEMA_3[500 - (TEMA_Setting*3)];  

    //console.log('period of ',String(TEMA_Setting),' TEMA     = >', TEMA);//[500-EMA_Setting*3]);
  }

  //return TEMA;

  // let DEMA = (2 * EMA_1[500-100]) - EMA_2[500-200];
  // console.log('period of 100 DEMA = >', DEMA);
  // console.log();

}






