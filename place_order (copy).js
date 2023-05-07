const Binance = require('node-binance-api'); // API tested 
const EMA = require('technicalindicators').EMA;

// const detector = ('currency-pattern-detector');

const cs = require('candlestick');

const binance = new Binance().options({
   APIKEY: '2qkbaBE1f9YrssJewTk8WKaFpnyWl4RDxSXdW1834TlU6E6QQLOqSqh79xxVPKk0',
   APISECRET: 'P7xTTVKPKj76PJ3rZUcoolWoltVRi8zSU75HPQDZdHRYpp8wtR6X6KDfcTAYAW11'
});

var Profit=0,Buy_Order=0,Sell_Order=0,Buy_Order_count=0,Sell_Order_count=0;

var Buy_Order_count_array=[],Sell_Order_count_array=[];

let buy_status = 0;

///--------------------------------------------------------------------------------------------------
(async () => {

   binance.websockets.miniTicker(markets => {
      //   console.clear();
      //   console.info(markets.BTCUSDT);
      t = markets.BTCUSDT;  //// <<<------------------------------
   });

   // important ---------->>> TEMA =(3∗EMA1)−(3∗EMA2 )+EMA3 

   // webSocket
   binance.websockets.chart("BTCUSDT", "1m", (symbol, interval, chart) => {
    //--------------------------------------------------------------------------------------------
      let ohlc = binance.ohlc(chart);
      let x = (symbol, ohlc);
      Live_candles_data_input = x.close//[499];

      console.clear();
//-------------------------------------------------------------------------------------------------
      EMA_Setting = 10;

      let EMA_10 = EMA.calculate({ period: EMA_Setting, values: Live_candles_data_input });
      console.log('period of   ',String(EMA_Setting),' EMA_10    = >', EMA_10[500 - EMA_Setting]);

      EMA_Setting = 15;

      let EMA_15 = EMA.calculate({ period: EMA_Setting, values: Live_candles_data_input });
      console.log('period of   ',String(EMA_Setting),' EMA_15    = >', EMA_15[500 - EMA_Setting]);

      let Difference = EMA_10[500-10] - EMA_15[500-15];

      console.log('Difference =>' , Difference);
//----------------------------------------------------------------------------------------------------
if(EMA_15[500-15] < EMA_10[500-10] & Difference > 1)
{
   if(buy_status == 0)
   {
      Buy_Order = Live_candles_data_input[499];
      Buy_Order_count_array[Buy_Order_count] = Buy_Order;
      Buy_Order_count++;
      buy_status = 1;
   }
}

if(EMA_15[500-15] > EMA_10[500-10] & Difference > -1)
{
   if(buy_status == 1)
   {
      Sell_Order = Live_candles_data_input[499];
      Profit = Buy_Order - Sell_Order;
      Sell_Order_count_array[Sell_Order_count]=Sell_Order;
      Sell_Order_count++;
      buy_status = 0;
   }
}
      console.log('Tema_find of Sell 35 ',Tema_find(35,Live_candles_data_input));
      console.log('Tema_find of Buy 70 ',Tema_find(70,Live_candles_data_input));
      console.log('Tema_find of 10 ',Tema_find(10,Live_candles_data_input));

      console.log('Buy_Order  => ',Buy_Order);
      console.log('Sell_Order => ',Sell_Order);
      console.log('Profit     => ',Profit);

      console.log('Buy_Order_count ',Buy_Order_count);
      console.log('Sell_Order_count ',Sell_Order_count);

      console.log('Live_candles_data_input[499] =>',Live_candles_data_input[499]);
      console.log('Current_profit_and_loss =>',Buy_Order - Live_candles_data_input[499]);
      console.log();

      for(let c=0;c<Buy_Order_count_array.length;c++)
      {
      console.log('Buy_Order_count_array ',Buy_Order_count_array[c],' ','Sell_Order_count_array ',Sell_Order_count_array[c]);
      }
      //  console.log('buy_status => ',buy_status);
      /*    
      //----------------------------------------------------------------------------------
      // Patternes is write followings here and tested ok
      let Trend_Total = [];
      let count;
      let High_Level, High_Level_Position = 0, Low_Level = 0, Low_Level_Position = 0;

      // console.log(Live_candles_data_input);
      //Live = [10, 18, 20, 24, 26,28,29,30,20,6,5,10];//,20,25,30, 1000, 800, 600,612, 500, 400, 390, 380, 370, 362, 350, 340, 590, 610, 612, 650,666, 700, 800, 900, 1000, 200, 300, 310, 311, 312, 330, 340, 345, 350.6, 9, 10, 11, 12,13,14,15,25,16,17,55,17];
     
      //let Live = Live_candles_data_input;

      //let Live = TEMA;
      let Live = EMA_1;

      var Support_Resistance_Count_5 = 0, Support_Resistance_Count_10 = 0, Support_Resistance_Count_20 = 0, Support_Resistance_Count_30 = 0, Support_Resistance_Count_40 = 0, Support_Resistance_Count_50 = 0;
      var Support_Resistance_Count_60 = 0, Support_Resistance_Count_70 = 0, Support_Resistance_Count_80 = 0, Support_Resistance_Count_90 = 0, Support_Resistance_Count_100 = 0, Support_Resistance_Count_120 = 0;

      for (count = 0; count < Live.length; count++) {
         if (Live[count] < Live[count + 1]) {
            High_Level = Live[count + 1];
            High_Level_Position = count + 1;//<<<<<<---------------------
         }

         if (Live[count] > Live[count + 1]) {
            if (Live[count + 1] > Live[count + 2]) { }

            else {
               let High_Level_before_low_level = Live[count];

               Low_Level = Live[count + 1];
               Low_Level_Position = count + 1;//<<<<<<---------------------
               //   console.log('High_Level => ' , high_Level);
               //   console.log('Number is going lower => ' , Live[count+1]);

               let Total = High_Level - Low_Level;
               //   console.log('High_Level => ', High_Level , 'High_Level_before_low_level => ', High_Level_before_low_level , 'Lower => ', Low_Level,'Total patteren Line lineght = ', High_Level+Low_Level, 'Support_Resistance_Count => ', Support_Resistance_Count++);
               // console.log('High_Level => ', High_Level ,'H Position ',499-High_Level_Position ,'Lower => ', Low_Level,'L Position ',499-Low_Level_Position,'Total = ',Total, ' ', Support_Resistance_Count++);

               if (0 < Total & 5 > Total) {
                  //console.log('High_Level => ', High_Level ,'H Position ',499-High_Level_Position ,'Lower => ', Low_Level,'L Position ',499-Low_Level_Position,'Total = ',Total, ' ', Support_Resistance_Count_5++);
                  //Support_Resistance_Count_5++;
               }
               if (5 < Total & 10 > Total) {
                  //console.log('High_Level => ', High_Level ,'H Position ',499-High_Level_Position ,'Lower => ', Low_Level,'L Position ',499-Low_Level_Position,'Total = ',Total, ' ', Support_Resistance_Count_10++);    
                  Support_Resistance_Count_10++;
               }
               if (10 < Total & 20 > Total) {
                  Support_Resistance_Count_20++;
               }
               if (20 < Total & 30 > Total) {
                  // console.log('High_Level => ', High_Level ,'H Position ',499-High_Level_Position ,'Lower => ', Low_Level,'L Position ',499-Low_Level_Position,'Total = ',Total, ' ', Support_Resistance_Count_30++);
                  Support_Resistance_Count_30++;
               }
               if (30 < Total & 40 > Total) {
                  Support_Resistance_Count_40++;
               }
               if (40 < Total & 50 > Total) {
                  // Trend_Total[Support_Resistance_Count_50] = Total;
                  //------>>           console.log('High_Level=>',High_Level ,' H Position',499-High_Level_Position ,' Lower=>', Low_Level,' L Position',499-Low_Level_Position,' Total=',Total, ' ', Support_Resistance_Count_50++);
                  Support_Resistance_Count_50++;
               }
               if (50 < Total & 60 > Total) {
                  Support_Resistance_Count_60++;
               }
               if (60 < Total & 70 > Total) {
                  Support_Resistance_Count_70++;
               }
               if (70 < Total & 80 > Total) {
                  Support_Resistance_Count_80++;
               }
               if (80 < Total & 90 > Total) {
                  Support_Resistance_Count_90++;
               }
               if (90 < Total &100 > Total) {
                  Support_Resistance_Count_100++;
               }
               if (100 < Total & 120 > Total) {
                  Support_Resistance_Count_120++;
               }
            }
         }
      }

      console.log('Support_Resistance_Trend_Count at below  5 = ',Support_Resistance_Count_5);
      console.log('Support_Resistance_Trend_Count at below 10 = ',Support_Resistance_Count_10);
      console.log('Support_Resistance_Trend_Count at below 20 = ',Support_Resistance_Count_20);
      console.log('Support_Resistance_Trend_Count at below 30 = ',Support_Resistance_Count_30);
      console.log('Support_Resistance_Trend_Count at below 40 = ',Support_Resistance_Count_40);
      console.log('Support_Resistance_Trend_Count at below 50 = ',Support_Resistance_Count_50);
      console.log('Support_Resistance_Trend_Count at below 60 = ',Support_Resistance_Count_60);
      console.log('Support_Resistance_Trend_Count at below 70 = ',Support_Resistance_Count_70);
      console.log('Support_Resistance_Trend_Count at below 80 = ',Support_Resistance_Count_80);
      console.log('Support_Resistance_Trend_Count at below 90 = ',Support_Resistance_Count_90);
      console.log('Support_Resistance_Trend_Count at below 100 = ',Support_Resistance_Count_100);
      console.log('Support_Resistance_Trend_Count at below 120 = ',Support_Resistance_Count_120);
      

      console.log(Live[499]);
      console.log(Live.length);

      console.log();
*/
      // for (count = 0; count < 20 ; count++)
      // {
      //    if (Live[count] < Live[count + 1] & Live[count] < Live[count + 2] )
      //    {
      //         Low_Level = Live[count];
      //         console.log('Number is going low to high => ' , Low_Level);

      //    }

      //    if (Live[count] < Live[count + 1] & Live[count] > Live[count + 2] )
      //    {
      //         high_Level = Live[count];
      //         console.log('Low_Level => ' , high_Level);

      //    }

      // }

   });

})()

function percentage(num, per) 
{
   return (num / 100) * per;
}
//---------------------------------------------------------------------------------------
function Tema_find(TEMA_Setting,Tema_input)
{

let TEMA_1 = EMA.calculate({ period: TEMA_Setting, values: Tema_input });
// console.log('period of ',String(EMA_Setting),' EMA_1  = >', EMA_1[500 - EMA_Setting]);
// console.log();

let TEMA_2 = EMA.calculate({ period: TEMA_Setting, values: TEMA_1 });
// console.log('period of ',String(EMA_Setting),' EMA_2   = >', EMA_2[500 - (EMA_Setting*2)]);
// console.log();

let TEMA_3 = EMA.calculate({ period: TEMA_Setting, values: TEMA_2 });
// console.log('period of ',String(EMA_Setting),' EMA_3   = >', EMA_3[500 - (EMA_Setting*3)]);
// console.log();

let y,TEMA;
// for(y=0;y<EMA_Setting;y++)
// {
  //TEMA = (3 * EMA_1[y]) - (3 * EMA_2[y]) + EMA_3[y];
TEMA = (3 * TEMA_1[500-TEMA_Setting]) - (3 * TEMA_2[500-(TEMA_Setting*2)]) + TEMA_3[500 - (TEMA_Setting*3)];      
//console.log('period of ',String(TEMA_Setting),' TEMA     = >', TEMA);//[500-EMA_Setting*3]);
// }

return TEMA;
// let DEMA = (2 * EMA_1[500-100]) - EMA_2[500-200];
// console.log('period of 100 DEMA = >', DEMA);
// console.log();

}

//-----------------------------------------------------------------------------------------------