
const Binance = require('node-binance-api'); // API tested 

// const detector = ('currency-pattern-detector');

const cs = require('candlestick');

const binance = new Binance().options({
   APIKEY: '2qkbaBE1f9YrssJewTk8WKaFpnyWl4RDxSXdW1834TlU6E6QQLOqSqh79xxVPKk0',
   APISECRET: 'P7xTTVKPKj76PJ3rZUcoolWoltVRi8zSU75HPQDZdHRYpp8wtR6X6KDfcTAYAW11'
});

///--------------------------------------------------------------------------------------------------
(async () => {

   binance.websockets.miniTicker(markets => {
      //   console.clear();
      //   console.info(markets.BTCUSDT);
      t = markets.BTCUSDT;  //// <<<------------------------------
   });

   // webSocket
   binance.websockets.chart("BTCUSDT", "1m", (symbol, interval, chart) => {
      //-----------------------------------------------------------------------------------

      let ohlc = binance.ohlc(chart);
      let x = (symbol, ohlc);
      Live_candles_data_input = x.close;


      let labels = [];
      let count, higer = 0, lower = 0;
      let L0 = 0, High_Level,High_Level_Position = 0,Low_Level = 0,Low_Level_Position = 0;

      console.clear();
      // console.log(Live_candles_data_input);

      //Live = [10, 18, 20, 24, 26,28,29,30,20,6,5,10,20,25,30, 1000, 800, 600, 500, 400, 390, 380, 370, 360, 350, 340, 590, 610, 612, 650, 700, 800, 900, 1000, 200, 300, 310, 311, 312, 330, 340, 345, 350.6, 9, 10, 11, 12,13,14,15,25,16,17,55,17];

      Live = Live_candles_data_input;

      var Support_Resistance_Count = 1;

      for (count = 0; count < Live.length; count++) 
      {
         if (Live[count] < Live[count + 1]) {
            High_Level = Live[count + 1];
            High_Level_Position = count + 1;//<<<<<<---------------------
         }

         if (Live[count] > Live[count + 1]) {
            if (Live[count + 1] > Live[count + 2]) { }

            else {
               let High_Level_before_low_level = Live[count];
               Low_Level = Live[count+1];
               Low_Level_Position = count + 1;//<<<<<<---------------------
               //   console.log('High_Level => ' , high_Level);
               //   console.log('Number is going lower => ' , Live[count+1]);

               let Total = High_Level-Low_Level;
               console.log('High_Level => ', High_Level , 'High_Level_before_low_level => ', High_Level_before_low_level , 'Lower => ', Low_Level,'Total patteren Line lineght = ', High_Level+Low_Level, 'Support_Resistance_Count => ', Support_Resistance_Count++);
               
               //if((percentage(Total,36)) < Total)
              
              
               if(10 > Total)
               {
                    
               }
               else
               {
//                  console.log('High_Level => ', High_Level ,'H Position ',500-High_Level_Position ,'Lower => ', Low_Level,'L Position ',500-Low_Level_Position,'Total = ',Total, ' ', Support_Resistance_Count++);
               }
            }
         }

      }

      console.log(Live[499]);
      console.log(Live.length);

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
 return (num/100)*per;
}






