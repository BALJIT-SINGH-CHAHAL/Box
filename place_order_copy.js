const Binance = require('node-binance-api'); // API tested 

const EMA = require('technicalindicators').EMA;
const CCI = require('technicalindicators').CCI;

const readline = require("readline-sync");

const binance = new Binance().options({
  APIKEY: '2qkbaBE1f9YrssJewTk8WKaFpnyWl4RDxSXdW1834TlU6E6QQLOqSqh79xxVPKk0',
  APISECRET: 'P7xTTVKPKj76PJ3rZUcoolWoltVRi8zSU75HPQDZdHRYpp8wtR6X6KDfcTAYAW11'
});
let which_type_of_oreder_execuited=2,Buy_Lock=0;

let test,test1;

let Buy = 0, Sell = 0, Last_Transaction_Profit = 0, Total_Profit = 0;
let Buy_count = 0, Sell_count = 0,Pending_Transactions_status=0;
let x0=0,a,b;
var cci_position = 0,Buy_cci_position = 0,Sell_cci_position = 0,Peak=0,Peack_reset=0;
///--------------------------------------------------------------------------------------------------
(async () => {

  binance.websockets.miniTicker(markets => {
    //   console.clear();
    //   console.info(markets.BTCUSDT);
    t = markets.BTCUSDT;  //// <<<------------------------------
  });

 // webSocket
  binance.websockets.chart("BTCUSDT", "1m", (symbol, interval, chart) => {
//--------------------------------------------------------------------------------------------
    let ohlc = binance.ohlc(chart);
    let x = (symbol, ohlc);
    Live_candles_data_input = x.close; //[499];
    console.clear();
//-------------------------------------------------------------------------------------------------
    var inputCCI =({
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
//          if(a > cci_position && b < cci_position) // Oreder Place hear means BUY here
//            if(80 > cci_position && 85 < cci_position) // Oreder Place hear means BUY here
            if(-250 > cci_position && -260 < cci_position) // Oreder Place hear means BUY here
            {
              if(Buy_Lock == 0)
              {
                if(Pending_Transactions_status == 0)
                {
                 // Ref = 3+Live_candles_data_input[499];
                  Buy_cci_position = cci_position;
                  Buy = Live_candles_data_input[499]; //<<<----------------
                  
                    if(Peack_reset == 0)
                    {
                    Peak = Live_candles_data_input[499];
                    Peack_reset = 1;
                    }
                  Buy_count++;
                  Pending_Transactions_status = 1;
                  which_type_of_oreder_execuited = 2;
                  test1 = 'in side ';
                  test = '';
                  Buy_Lock = 1;
                }
              }
            }
            else
            {
                Buy_Lock = 0; /// Near about working as Pending_Transactions_status 
                test1 = 'out side ';
                test = '';
            }

                              //-------------------------------//
                                if(x0<1)
                                {//At starting
                                Peak = Live_candles_data_input[499];
                                x0=5;
                                }
                                //---------------------------------------------//
                                if(Peak < Live_candles_data_input[499])
                                {//In continued mode
                                  //Ref = Ref + 1;
                                  Peak = Live_candles_data_input[499];
                                }
                         //--------------------------------------------------------------------//
                         if(Peak-10 > Live_candles_data_input[499]) 
                          {
                            if(Buy+25 < Live_candles_data_input[499]) //.... Only Profit Booked
                              {
                                  if(Pending_Transactions_status == 1)
                                  {
                                    Sell_cci_position = cci_position;
                                    Sell = Live_candles_data_input[499];
                                    Sell_count++;
                                    Last_Transaction_Profit = Sell - Buy;
                                    Total_Profit = Total_Profit + Last_Transaction_Profit;
                                    Pending_Transactions_status = 0;
                                    //Buy=0;
                                    Peack_reset = 0;
                                    which_type_of_oreder_execuited = 1;
                                  }
                              }
                          }
                          //------------------------------------------------------------------//
                          if(Peak-10 > Live_candles_data_input[499]) 
                          {
                            if(Buy+25 > Live_candles_data_input[499])//.... Stop Loss hit
                              {
                                  if(Pending_Transactions_status == 1)
                                  {
                                    Sell_cci_position = cci_position;
                                    Sell = Live_candles_data_input[499];
                                    Sell_count++;
                                    Last_Transaction_Profit = Sell - Buy;
                                    Total_Profit = Total_Profit + Last_Transaction_Profit;
                                    Pending_Transactions_status = 0;
                                    //Buy=0;
                                    Peack_reset = 0;
                                    which_type_of_oreder_execuited = 0;
                               }
                              }
                          }
            // if(a < cci_position && b > cci_position) // To unlock Buy_Lock
            //               {
            //                 Buy_Lock == 0; /// Near about working as Pending_Transactions_status 
            //                 test = 'inside ';
            //               }                          

//---------------------------------------------------------------------------------------------//
          console.log('Live_candles_data_input',Live_candles_data_input[499]);
          console.log();
          console.log('Present_cci_position',cci_position );
          
          if(Buy>0)
          {
            console.log('Current Profit Situation',Live_candles_data_input[499]-Buy);
          }
          
          console.log(test);
          console.log(test1);

          console.log('Peak',Peak);
          console.log('Peak-Live price',Live_candles_data_input[499]-Peak);
          
          console.log('Buy_cci_position', Buy_cci_position);
          console.log('Buy = ', Buy);
          console.log('Sell = ', Sell);
          console.log();
          
          console.log('Sell_cci_position', Sell_cci_position);
          console.log('Sell_count = ',Sell_count);
          console.log('Buy_count = ',Buy_count);
          console.log('Last Transaction Profit = ', Last_Transaction_Profit);
          console.log('Total Profit = ', Total_Profit);
          console.log();
          console.log('Pending_Transactions_status ',Pending_Transactions_status);
         if(which_type_of_oreder_execuited == 0)
         {
          console.log('Stop Loss Hit');
         }
         if(which_type_of_oreder_execuited == 1)
         {
          console.log('Profit is Booked');
         }
         console.log('Buy_Lock',Buy_Lock);

 //a = readlineSync.question('Now Enter value of a ? ');
 //b = readlineSync.question('Now Enter value of b ? ');

  }); //<<<<<<<<<-------------------------------------
 
})()

function percentage(num, per)
{
   return (num / 100) * per;
}












