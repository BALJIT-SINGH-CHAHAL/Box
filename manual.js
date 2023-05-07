//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
var express = require("express");
var exp = express();

let Stop_Loss_Hit_or_Profit_booked_or_Buy_Action = '-', Buy_Lock = 0;
let test1;

let Online_client_Disconnected_with_server_count = 0, Online_client = 20;

let t = 0 ,t_close = 0 ,volume_v = 0 , dh = 0 , if_Buy = 0;

let x;

let check_true_or_not=0;

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

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const hostname = "0.0.0.0";
//----------------------------------------------------------
exp.listen(8000, hostname, function () {
  console.log('Example app listening on port 8000!')
})

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

const WebSocketServer = require('ws');

// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: 8080, ip: hostname })

wss.on("connection", ws => 
{
  //console.log("new client connected");

  Online_client++;

  // // you can write these code withe same following statement
  ws.addEventListener('close', (event) => {

    console.log('The connection has been closed successfully.');
    Online_client--;
    Online_client_Disconnected_with_server_count++;
  });

  ws.addEventListener('message', function (event) {

    dh = JSON.parse(event.data);

    console.log("from client side data === >> ", dh);

      volume_v = dh.volume_v;

       t_close = dh.t_close;
       macd = dh.macd;
       Peak_macd = dh.Peak_macd;
       Down_macd = dh.Down_macd;
       Volume_EMA_9[491] = dh.Volume_EMA_9;
       Volume_EMA_26[474] = dh.Volume_EMA_26;
  });

  console.log("The WebSocket server is running on port 8080");

  setInterval(() => 
  {

    let v =
    {

      Online_client_Disconnected_with_server_count: Online_client_Disconnected_with_server_count,
      Online_client: Online_client,

      cci: cci,

      x_All: x,

      t: t,

      percent_of_profit: percent_of_profit, percent_Stop: percent_of_stop_loss,

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

     // Volume: V,//raw_Volume_input[499], // <<-----
      Volume: volume_v,

      check_true_or_no: check_true_or_not,

     raw_Volume:raw_Volume,

     percent_of_profit:percent_of_profit,

     Pending_Transactions_status:Pending_Transactions_status,

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

//t = markets.BTCUSDT;  //// <<<------------------------------

//t = {close:'21000.1'};

t = {close: String(t_close)};

console.log("T",t.close);

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

    //raw_Volume = x.volume;

    raw_Volume[499] = volume_v;

    console.log("Dowon_macd",Down_macd);
    console.log("Peak_macd",Peak_macd);
    //Volume_T = raw_Volume_input[474];
    // console.log("Volume ",Volume);
//------------------------------------------------------------------------------//
    var imp = require('./export.js');
//------------------------------------------------------------------------------------//
    if (x0 < 1) {//At starting
      Peak_macd = 18;//macd;
      macd = 15;
      Down_macd = 14;//macd;
      // write_information_in_file();
      x0 = 5;
      console.log("in side Starting macd x0 = 5");
    }
    //--------------------------------------------------------//
    if (Peak_macd < macd) {//In continued mode
      Peak_macd = macd;
      console.log("in side Peak_macd < macd");
    }
    //--------------------------------------------------------//
    if (Down_macd > macd) {//In continued mode
      Down_macd = macd;
      console.log("in side Down_macd > macd");
    }
    //-------------------------------------------------------------------------------------//

check_true_or_not=50;

    // if((Down_macd + 2 < macd) && (signal + 1 < macd) && (Volume_EMA_9[491]+50 > Volume_EMA_26[474])) // Buy here 
    if ((Down_macd + 1 < macd) && (Volume_EMA_9[491] + 25 > Volume_EMA_26[474])) // Buy here 
    { //< 0) // Buy here

      check_true_or_not=0;
      
      if (Buy_Lock == 0) {
        if (Pending_Transactions_status == 0) {
          Buy_macd_position = macd;
          Buy = t.close;//Live_candles_data_input[499]; //<<<----------------

          Buy_count++;
          Pending_Transactions_status = 1;
          //Stop_Loss_Hit_or_Profit_booked_or_Buy = '-';

          if_Buy = 0;

          Buy_Lock = 1;
          Stop_Loss_Hit_or_Profit_booked_or_Buy_Action = 'Buy';
          write_information_in_file();

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

    percent_of_profit = 100 * (50 / Buy); // Here 50 means Doller

    Profit_Booked_at_hit = macd - percentage(macd, percent_of_profit);

 //   Profit_Booked_at_hit = Peak_macd - percentage(Peak_macd, percent_of_profit);


    console.log("percent_of_profit",percent_of_profit);
    console.log("Profit_Booked_at_hit",Profit_Booked_at_hit);

    console.log("++++++++++++");

if(if_Buy ==1)
{
    if (Peak_macd > Profit_Booked_at_hit)//Live_candles_data_input[499]) //.... Only Profit Booked
    { //.... Only Profit Booked


      check_true_or_not=1;

      // if ((Buy + 50) < macd )
      // {
      if (Pending_Transactions_status == 1) 
      {
        Sell_macd_position = macd;
        Sell = t.close;//Live_candles_data_input[499];
        Sell_count++;
        Last_Transaction_Profit = Sell - Buy;
        Total_Profit = Total_Profit + Last_Transaction_Profit;
        Pending_Transactions_status = 0;

        Stop_Loss_Hit_or_Profit_booked_or_Buy_Action = 'Profit';

        write_information_in_file();

        Peak_macd = macd;
      //  Down_macd = macd;

        Buy_macd_position = 0;
        Buy = 0;
        Buy_Lock = 0;
      }
      test1 = 'inside Ready to Sell Decision';
      //}
    }

}    
/*
    
    //------------------------------------------------------------------//
    // if ((Buy_macd_position - 10) > macd)//.... Stop Loss hit

    percent_of_stop_loss = 100 * (25 / Buy);
    Stop_Loss_hit_at = macd - percentage(macd, percent_of_stop_loss);

    if (Buy_macd_position > Stop_Loss_hit_at)//Live_candles_data_input[499]) //.... Only Profit Booked
    {
      // if ((Buy + 50) > macd)//.... Stop Loss hit
      //  {
      if (Pending_Transactions_status == 1) {
        Sell_macd_position = macd;
        Sell = t.close;//Live_candles_data_input[499];
        Sell_count++;
        Last_Transaction_Profit = Sell - Buy;
        Total_Profit = Total_Profit + Last_Transaction_Profit;
        Pending_Transactions_status = 0;
        Stop_Loss_Hit_or_Profit_booked_or_Buy_Action = 'Stop Loss hit';

        write_information_in_file();

        Peak_macd = macd;
    //    Down_macd = macd;
        Buy_macd_position = 0;
        Buy = 0;
      }
      test1 = 'in side Stop_Loss_hit_at > macd';
      // }
    }

    */
    //---------------------------------------------------------------------------------------------//
    write_always_information_in_file();
    //---------------------------------------------------------------------------------------------//
    /*
        console.clear();
    
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






