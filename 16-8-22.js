
//for testing const API_KEY = 'a08f6a8b94ef8fdc046a599a27de65c1bbbd148ee7a5d26e0c96a8ba6e4eceb2';
//for testing const API_SECRET = '7692e762a412f9a2404c414b20a6218a0bfc66107aa321823c8b0a0b228eeea5';

API_SECRET = 'qIeAVymUdyu4dQQkPuzKKl74yrozVveCrza5vjanDsq8SQZLpg1LAZPQNzc666Is';
API_KEY ='NpKUhWH1nEovIrZCWMOaBZicCjPGFScwrTjb4sypKjjowu5BRHJED22m7MfCq4Aj';

const Binance = require('node-binance-api');

var Save_Result_High=0,Save_Result_Low=0;
var percentage_High,percentage_Low;
var invest_amount,Total_Profit=0,Startup_Purchased_tester_flag=0,Purchaesd_BTC,s0,s1;

var Profit_P1=0,Profit_P2=0,Profit_P3=0,Profit_P4=0;

var Only_Buy_flag_1st = 1,Only_Buy_flag_2nd = 0,Only_Buy_flag_3rd = 0,Only_Buy_flag_4rd = 0,Only_Sell_flag = 0;

var BTCUSD_instant_Price_Result,Sell_Plus=0,Sell_Minus=0;

var Total_Sell=0,Total_Buy=0,Total_Buy_2=0,Total_Buy_3=0,Total_Buy_4=0;

let TTstatus;

var temp1=0,temp2=0,temp2=0,temp4=0,buy_total=0;

var Buy1=0,Buy2=0,Buy3=0,Buy4=0,Sell=0;

var Buy_Bit1=1,Buy_Bit2=0,Buy_Bit3=0,Buy_Bit4=0,Sell=0;

var Price1=0,Price2=0,Price3=0,Price4=0;

let Status0,Status1;

const binance = new Binance().options({
  APIKEY: API_KEY,
  APISECRET: API_SECRET
});

///--------------------------------------------------------------------------------------------////
/// Websocket Start from here 

// binance.websockets.chart("BTCUSDT", "1m", (symbol, interval, chart) => 

// binance.websockets.chart("BTCUSDT", "1m", (symbol, interval, chart) => 
//-----------------------------------------------------------------------------------------
binance.websockets.trades(['BTCUSDT'], (trades) => {
  let {e:eventType, E:eventTime, s:symbol, p:price, q:quantity, m:maker, a:tradeId} = trades;

  BTCUSD_instant_Price_Result = price;
 // console.info(symbol+" trade update. price: "+price+", quantity: "+quantity+", maker: "+maker);
// });
//-----------------------------------------------------------------------------------------
//binance.websockets.chart("XRPUSDT", "1m", (symbol, interval, chart) => 
//{
 
      //  let tick = binance.last(chart);
      //  const last = chart[tick].close;
                                          //   console.info(chart);
                                          // Optionally convert 'chart' object to array:

      //  let ohlc = binance.ohlc(chart);
      //  console.info(symbol, ohlc);

       // console.info(symbol+" last price: "+last)

        //console.clear();

        // let v = binance.ohlc(chart);
        // console.info(symbol,v);

      //  var Result = (symbol+" last price: "+last);
      //  console.log(Result);
      //  console.log('\n');
        
        // BTCUSD_instant_Price_Result = Number(last);

         console.log('\n','BTC Bitcoin in USD =>',BTCUSD_instant_Price_Result);

        s0 = 1000000/BTCUSD_instant_Price_Result;

      if(Startup_Purchased_tester_flag==0)
      {
        invest_amount = 1000; //Like investment amount in USD
        Purchaesd_BTC = s0*invest_amount;
        Startup_Purchased_tester = 1;
      }

        s1 = BTCUSD_instant_Price_Result/1000000;
        instant_value_price = s1*Purchaesd_BTC;
              
        // console.log('\n','Purchaesd_BTC in instant_value => '+instant_value_price);
        // console.log('  Purchaesd_BTC in Bits => '+Purchaesd_BTC);
      //-------------------------------------------------------------------Sell/ When Low
            if((Save_Result_High-percentage_Low) > BTCUSD_instant_Price_Result)
            {
              if(Only_Sell_flag == 1)
              {
            //  console.log('\n','Sell Sell Sell Sell Sell Sell Sell');

              Sell = BTCUSD_instant_Price_Result;
              Save_Result_High = BTCUSD_instant_Price_Result; /// <<<<<< Second time saved
              
              //Profit0 = Sell-Buy1-Buy2-Buy3;

              // Profit_P1 = (Sell/2)-Buy1;
              // Profit_P2 = (Sell/4)-Buy2;
              // Profit_P3 = (Sell/4)-Buy3;

              if(Buy_Bit1 == 1)
              {
                  Profit_P1 = Sell*(1/4)-Buy1;
                  Buy_Bit1 = 0;
              }

              if(Buy_Bit2 == 1)
              {
                  Profit_P2 = Sell*(1/2)-Buy2;
                  Buy_Bit2 = 0;
              }

              if(Buy_Bit3 == 1)
              {
                  Profit_P3 = (Sell*(1/4))-Buy3;
                  Buy_Bit3 = 0;
              }

              if(Buy_Bit4 == 1)
              {
                  Profit_P4 = (Sell*(1/4))-Buy4;
                  Buy_Bit4 = 0;
              }

              Total_Profit = Total_Profit + Profit_P1 + Profit_P2 + Profit_P3;

              Total_Sell++;
//---------------------------------------------------
              if(0<Profit_P1+Profit_P2+Profit_P3)
              {
                Sell_Plus++;
              }
              if(0>Profit_P1+Profit_P2+Profit_P3)
              {
                Sell_Minus++;
              }
//----------------------------------------------------
              buy_total=0; 

              Buy1=0;
              Buy2=0;
              Buy3=0;
            //   Price1=0;
            //   Price2=0;
            //   Price3=0;

              Only_Buy_flag_1st = 1;
              Only_Buy_flag_2nd = 0;
              Only_Buy_flag_3rd = 0;

              Only_Sell_flag  = 0;
              // Status0 = Only_Sell_flag;
              // Status1 = Only_Buy_flag;
              TTstatus = '-'
              }
            }
//----------------------------------------------------------Buy--------------------------Buy
      if(Only_Buy_flag_1st == 1)
      {
        if(Save_Result_Low+percentage_High < BTCUSD_instant_Price_Result)
        {
          // console.log('\n','Buy %50 Buy %50 Buy %50 Buy %50');

          Buy1 = BTCUSD_instant_Price_Result*(1/4);
          temp1 = BTCUSD_instant_Price_Result;
          Price1 = BTCUSD_instant_Price_Result;
          Buy_Bit1 = 1;
          Save_Result_Low = BTCUSD_instant_Price_Result; /// <<<<<< Second time saved 

          Sell=0;

          Only_Buy_flag_1st = 0;
          Only_Buy_flag_2nd = 1;
          Only_Buy_flag_3rd = 0;

          Profit_P1 = 0;
          Profit_P2 = 0;
          Profit_P3 = 0;

              Price2=0;
              Price3=0;

         // buy_total=0;

          Total_Buy++;

          Only_Sell_flag  = 1;
        //  Status0 = Only_Sell_flag;
        //  Status1 = Only_Buy_flag;
          TTstatus = '50%'
        }
      }

     if(Only_Buy_flag_2nd == 1)
      {
        if(temp1+percentage_High+1 < BTCUSD_instant_Price_Result)
        {
        //  console.log('\n','Buy 25% Buy 25% Buy 25% Buy 25% ');

          Buy2 = BTCUSD_instant_Price_Result*(1/2);
          temp2 = BTCUSD_instant_Price_Result;
          Price2 = BTCUSD_instant_Price_Result;

          Buy_Bit2 = 1;

          Total_Buy_2++;
        ///  Buy_Bit1 = 0;
          Save_Result_Low = BTCUSD_instant_Price_Result; /// <<<<<< Second time saved 

          Sell=0;

          Only_Buy_flag_1st = 0;
          Only_Buy_flag_2nd = 0;
          Only_Buy_flag_3rd = 1;

          Only_Sell_flag  = 1;
        //  Status0 = Only_Sell_flag;
        //  Status1 = Only_Buy_flag;
          TTstatus = '75%'
        }
      }

    if(Only_Buy_flag_3rd == 1)
      {
        if(temp2+percentage_High+1 < BTCUSD_instant_Price_Result)
        {
         // console.log('\n','Buy 25% Next Buy 25% Next Buy 25% Next');

          Buy3 = BTCUSD_instant_Price_Result*(1/4);
          temp3 = BTCUSD_instant_Price_Result;
          Price3 = BTCUSD_instant_Price_Result;
          Save_Result_Low = BTCUSD_instant_Price_Result; /// <<<<<< Second time saved 

          Buy_Bit3 = 1;

          Total_Buy_3++;
       //   Buy_Bit2 = 0;
       //   Buy_Bit1 = 0;
          Sell=0;

          Only_Buy_flag_1st = 0;
          Only_Buy_flag_2nd = 0;
          Only_Buy_flag_3rd = 0;

          Only_Sell_flag  = 1;
        //  Status0 = Only_Sell_flag;
        //  Status1 = Only_Buy_flag;
          TTstatus = '75%'
        }
      }

     if(Only_Buy_flag_4rd == 1)
      {
        if(temp3+percentage_High+1 < BTCUSD_instant_Price_Result)
        {
         // console.log('\n','Buy 25% Next Buy 25% Next Buy 25% Next');

          Buy4 = BTCUSD_instant_Price_Result*(1/4);
          Price4 = BTCUSD_instant_Price_Result;
          Save_Result_Low = BTCUSD_instant_Price_Result; /// <<<<<< Second time saved 

          Buy_Bit4 = 1;

          Total_Buy_3++;
       //   Buy_Bit2 = 0;
       //   Buy_Bit1 = 0;
          Sell=0;

          Only_Buy_flag_1st = 0;
          Only_Buy_flag_2nd = 0;
          Only_Buy_flag_3rd = 0;

          Only_Sell_flag  = 1;
        //  Status0 = Only_Sell_flag;
        //  Status1 = Only_Buy_flag;
          TTstatus = '100%'
        }
      }
//--------------------------------------------------------------------------------
        if(Save_Result_High < BTCUSD_instant_Price_Result) /// find High
        {
          Save_Result_High = BTCUSD_instant_Price_Result;
        }
    
        if(Save_Result_Low > BTCUSD_instant_Price_Result) // find Low
        {
          Save_Result_Low = BTCUSD_instant_Price_Result;
        }
          console.log('\n','Save_Result_Low = ',Save_Result_Low);
          console.log('Save_Result_High = ',Save_Result_High);
         
          percentage_Low = 10;//percentage(BTCUSD_instant_Price_Result,.007); ///<<<-------
          percentage_High = 15;//percentage(BTCUSD_instant_Price_Result,.007); ///<<<-------

          console.log('\n','Bye_Sell_Profit_Total_Single_Transaction  = ',Profit_P1+Profit_P2+Profit_P3,'\n');
          
          console.log('\x1b[31m Sell  = \x1b[0m',Sell,'\n');

          // console.log('\x1b[31m%s\x1b[0m', 'I am red')

          console.log('Buy1 = ',+Buy1,', Price => ',+Price1, ', Profit_P1 => ',+Profit_P1);
          console.log('Buy2 = ',+Buy2,', Price => ',+Price2, ', Profit_P2 => ',+Profit_P2);
          console.log('Buy3 = ',+Buy3,', Price => ',+Price3, ', Profit_P3 => ',+Profit_P3);
          console.log('Buy4 = ',+Buy4,', Price => ',+Price4, ', Profit_P4 => ',+Profit_P4);

          buy_total = Buy1+Buy2+Buy3,Buy4;

          console.log('\n','buy_total ',buy_total,',     Total_Profit ',Total_Profit);

          console.log('\n','Total_Sell ',Total_Sell,',  Total_Buy at 25% ',Total_Buy,', Total_Buy_2 at 50% ',Total_Buy_2,', Total_Buy_3 at 25%',Total_Buy_3,', Total_Buy_4 at 25%',Total_Buy_4);
        
          console.log('\n','Sell_Plus ',Sell_Plus,' Sell_Minus ',Sell_Minus);

          // console.log('\n',Status0);,'Total_Buy ',Total_Buy)
          // console.log('\n',Status1);
          // console.log('\n',TTstatus);
//--------------------------------------------------------------------------//
      function percentage(num, per)
      {
       return (num/100)*per;
      }
//-----------------------------------------------------//

// const macd = require('trading-indicator').macd
// console.log(macd(12, 26, 9, "close", "binance", "BTC/USDT", "15m", true))


});














