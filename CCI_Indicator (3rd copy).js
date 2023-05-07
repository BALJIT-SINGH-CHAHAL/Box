const Binance = require('node-binance-api'); // API tested 

const EMA = require('technicalindicators').EMA;
const CCI = require('technicalindicators').CCI;

const readline = require("readline-sync"); // for inputs

//----------------------------------------------//

const fs = require("fs");
const { time } = require('console');
const { getSystemErrorMap } = require('util');
//const time = require('console');
let time_related = new Date();

//----------------------------------------------//

const binance = new Binance().options({
  APIKEY: '2qkbaBE1f9YrssJewTk8WKaFpnyWl4RDxSXdW1834TlU6E6QQLOqSqh79xxVPKk0',
  APISECRET: 'P7xTTVKPKj76PJ3rZUcoolWoltVRi8zSU75HPQDZdHRYpp8wtR6X6KDfcTAYAW11'
});
let Stop_Loss_Hit_or_Profit_booked_or_Buy = '-', Buy_Lock = 0;

let test1;

let Buy = 0, Sell = 0, Last_Transaction_Profit = 0, Total_Profit = 0;
let Buy_count = 0, Sell_count = 0, Pending_Transactions_status = 0;
let Return_buy_stop_loss_sell_display_in_file="",x0 = 0,z=0,ssss="";
var cci_position = 0, Buy_cci_position = 0, Sell_cci_position = 0, Peak = 0, Down_cci = 0, Peak_reset = 0;
///--------------------------------------------------------------------------------------------------
(async () => {

  binance.websockets.miniTicker(markets => {
    //   console.clear();
    //   console.info(markets.BTCUSDT);
    t = markets.BTCUSDT;  //// <<<-----------------------------0-
  });

// webSocket
  binance.websockets.chart("BTCUSDT", "1m", (symbol, interval, chart) => {
    //--------------------------------------------------------------------------------------------
    let ohlc = binance.ohlc(chart); 
    let x = (symbol, ohlc); 
    Live_candles_data_input = x.close; //[499]; 

    // const writeStream = fs.createWriteStream('./write.txt');

//---------------------------//
console.clear(); 
    //----------------------------------------------------------------------------------------------------
    var inputCCI = ({
      open: x.open,
      high: x.high,
      low: x.low,
      close: x.close,
      period: 20
    });
    let cci = CCI.calculate(inputCCI);
    cci_position = cci[480];
    //cci_position = -56;

    //console.log(cci_position);

    // if(percentage(cci_position,5)>cci[479])
    // {
    // // console.log('Greater than 5 percent ^ ');
    // }
    //----------------------------------------------------------------//
    if (x0 < 1) {//At starting
      Peak = Live_candles_data_input[499];
      // if(-110<cci_position)
      // {
      Down_cci = cci_position;
      //}
      x0 = 5;
    }
    //---------------------------------------------------//
    if (Peak < Live_candles_data_input[499]) {//In continued mode
      //Ref = Ref + 1;
      Peak = Live_candles_data_input[499];
    }
    //---------------------------------------------------//
    if (Down_cci > cci_position) {//In continued mode
      //Ref = Ref + 1;
      Down_cci = cci_position;
    }
    //-------------------------------------------------------------------------------------//
    if ((Down_cci + 30) > cci_position && cci_position < -210) //< 0)
    {
      //if(-75 > cci_position && -85 < cci_position) // Oreder Place hear means BUY here
      //  {

      if (Buy_Lock == 0) 
      {
        if (Pending_Transactions_status == 0) 
        {
          // Ref = 3+Live_candles_data_input[499];
          Buy_cci_position = cci_position;
          Buy = Live_candles_data_input[499]; //<<<----------------

             if (Peak_reset == 0) 
             {
                Peak = Live_candles_data_input[499];
                Peak_reset = 1;
             }
          Buy_count++;
          Pending_Transactions_status = 1;
          Stop_Loss_Hit_or_Profit_booked_or_Buy = '-';
          
          Buy_Lock = 1;
          Stop_Loss_Hit_or_Profit_booked_or_Buy = 'Buy';
        //  write_information_in_file();
        }
        
      }
      test1 = 'in side Buy';
    }
    else {
      Buy_Lock = 0; /// Near about working as Pending_Transactions_status 
      test1 = 'cci up from Buy_cci';
    }
    //--------------------------------------------------------------------------------//
    if ((Peak - 10) > Live_candles_data_input[499]) {
      if ((Buy + 50) < Live_candles_data_input[499]) //.... Only Profit Booked
      {
        if (Pending_Transactions_status == 1) 
        {
          Sell_cci_position = cci_position;
          Sell = Live_candles_data_input[499];
          Sell_count++;
          Last_Transaction_Profit = Sell - Buy;
          Total_Profit = Total_Profit + Last_Transaction_Profit;
          Pending_Transactions_status = 0;
          Peak_reset = 0;
          Stop_Loss_Hit_or_Profit_booked_or_Buy = 'Sell';
          write_information_in_file();

          Buy=0;
        }
        test1 = 'inside Ready to Sell Decision';
      }
    }
    //------------------------------------------------------------------//
    if ((Buy - 20) > Live_candles_data_input[499]) 
    //if ((Peak - 20) > Live_candles_data_input[499])
    {
    //  if ((Buy + 50) > Live_candles_data_input[499])//.... Stop Loss hit
    //  {
        if (Pending_Transactions_status == 1) 
        {
          Sell_cci_position = cci_position;
          Sell = Live_candles_data_input[499];
          Sell_count++;
          Last_Transaction_Profit = Sell - Buy;
          Total_Profit = Total_Profit + Last_Transaction_Profit;
          Pending_Transactions_status = 0;
          Peak_reset = 0;
          Stop_Loss_Hit_or_Profit_booked_or_Buy = 'Stop Loss hit';
          write_information_in_file();

          Buy=0;
        }
        test1 = 'in side STOP LOSS ';
      //}
    }

//---------------------------------------------------------------------------------------------//
    
    //let ex = "Live price "+Live_candles_data_input[499]+" "+Date()+'\n';

    //let ex = "Live price "+Live_candles_data_input[499]+" Peak"+Peak+" Down"+Down+" "
    

/*    
    const d = new Date();

    let ex = " "+Live_candles_data_input[499]+" "+Peak+" "+String(Down_cci).slice(0, 6)+" "+String(Buy_cci_position).slice(0, 6)+" "+Buy+" "

    +Sell+" "+String(Last_Transaction_Profit).slice(0, 6)+" "+String(Total_Profit).slice(0, 6)+" "+Stop_Loss_Hit_or_Profit_booked_or_Buy+
    " "+d.getHours()+"-"+d.getMinutes()+"-"+d.getSeconds()+" "+d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear()+" "+Return_buy_stop_loss_sell_display_in_file+'\n';
    //"+Date()+'\n';//+buy_stop_loss_sell_display_in_file("Buyy")+'\n';
    //"+Date()+'\n';

//    fs.appendFile("write.txt",ex,(error)=>{/*console.log("My files created");*/ // console.log(error);});
 
write_always_information_in_file();

    //---------------------------------------------------------------------------------------------//

    console.log('Live_candles_data_input', Live_candles_data_input[499]);
    console.log('Peak-Live price', Live_candles_data_input[499] - Peak);

    if (Buy > 0) {
      console.log('Current Profit Situation', Live_candles_data_input[499] - Buy);
    }
    console.log();
    console.log('Present_cci_position', String(cci_position).slice(0,8));

    console.log(test1);

    console.log('Peak', Peak);
    console.log();

    console.log('Down_cci', Down_cci);

    console.log();
    console.log('Buy_cci_position', String(Buy_cci_position).slice(0, 8));
    console.log('Buy = ', Buy);
    console.log('Sell = ', Sell);
    console.log();

    console.log('Sell_cci_position', Sell_cci_position);
    console.log('Sell_count = ', Sell_count);
    console.log('Buy_count = ', Buy_count);
    console.log('Last Transaction Profit = ', Last_Transaction_Profit);
    console.log('Total Profit = ', Total_Profit);
    console.log();
    console.log('Pending_Transactions_status ', Pending_Transactions_status);
    if (Stop_Loss_Hit_or_Profit_booked_or_Buy == 'Stop Loss') {
      console.log('Stop Loss Hit');
    }
    if (Stop_Loss_Hit_or_Profit_booked_or_Buy == 'Profit Booked') {
      console.log('Profit is Booked');
    }
    console.log('Buy_Lock', Buy_Lock);
   
   // console.log(d.getHours(),d.getMinutes(),d.getSeconds(),d.getDate(),d.getMonth()+1,d.getFullYear());
         
  }); //<<<<<<<<<-------------------------------------

})()

function percentage(num, per) 
{
  return (num / 100) * per;
}


function write_information_in_file()
{
  const d = new Date();

  let ex = " "+Live_candles_data_input[499]+" "+Peak+" "+String(Down_cci).slice(0, 6)+" "+String(Buy_cci_position).slice(0, 6)+" "+Buy+" "

    +Sell+" "+String(Last_Transaction_Profit).slice(0, 6)+" "+String(Total_Profit).slice(0, 6)+" "+Stop_Loss_Hit_or_Profit_booked_or_Buy+
    " "+d.getHours()+"-"+d.getMinutes()+"-"+d.getSeconds()+" "+d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear()+" "+Return_buy_stop_loss_sell_display_in_file+'\n';
    //"+Date()+'\n';//+buy_stop_loss_sell_display_in_file("Buyy")+'\n';
    //"+Date()+'\n';

    fs.appendFile("write.txt",ex,(error)=>{/*console.log("My files created");*/console.log(error);});
}


function write_always_information_in_file()
{
  const d = new Date();

  let ex = " "+Live_candles_data_input[499]+" "+Peak+" "+String(Down_cci).slice(0, 6)+"  "+String(Buy_cci_position).slice(0, 6)+"  "+Buy+"  "

    +Sell+"  "+String(Last_Transaction_Profit).slice(0, 6)+"  "+String(Total_Profit).slice(0, 6)+"  "+Stop_Loss_Hit_or_Profit_booked_or_Buy+
    "  "+d.getHours()+"-"+d.getMinutes()+"-"+d.getSeconds()+" "+d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear()+" "+Return_buy_stop_loss_sell_display_in_file+'\n';
    //"+Date()+'\n';//+buy_stop_loss_sell_display_in_file("Buyy")+'\n';
    //"+Date()+'\n';

    fs.appendFile("write_always.txt",ex,(error)=>{/*console.log("My files created");*/console.log(error);});
}