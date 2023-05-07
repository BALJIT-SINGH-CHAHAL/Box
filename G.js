
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
   binance.websockets.chart("BTCUSDT", "1m", (symbol, interval, chart) => 
   {
      //-----------------------------------------------------------------------------------

      let ohlc = binance.ohlc(chart);
      let x = (symbol, ohlc);
      Live_candles_data_input = x.close;


    
      let xc=[],count;

       console.log(Live_candles_data_input.length);

 
// Market data: previous and current ticks
const prevLONG = [{
   security: 'ORCL',
   date: '2016-09-15',
   open: 40.18,
   high: 41.03,
   low: 40.09,
   close: 40.86
 },
 {
   security: 'ORCL2',
   date: '2016-09-152',
   open: 43.182,
   high: 42.032,
   low: 10.092,
   close: 40.85
 }
];


const prev = {
   security: 'ORCL',
   date: '2016-09-15',
   open: 40.18,
   high: 41.03,
   low: 40.09,
   close: 40.86
 };
 
 const curr = {
   security: 'ORCL',
   date: '2016-09-16',
   open: 39.61,
   high: 39.35,
   low: 38.71,
   close: 38.92
 };
 
  console.log(cs.isBullishKicker(prev, curr)); // false
//  console.log(cs.isBearishKicker(prev, curr)); // true


//console.log(cs.shootingStar(prev,curr));
//console.log(cs.shootingStar(prevLONG));
console.log(cs.shootingStar(x));


// for(count=0;count<Live_candles_data_input.length;count++)
// {
//    xc[count]={ security: 'GE',date: '2016-02-01',open: x.open[count],high: x.high[count], close: x.close[count], low: x.low[count]};
//    // console.log(xc[count]);
// }



     // detector(xc);

      //console.log(x.close);

/*
      let labels = [];
      let count, higer = 0, lower = 0;
      let L0=0,Low_Level,high_Level=0;

      console.clear();
     // console.log(Live_candles_data_input);

      //Live = [1,2,3,4,5,6,7,8,9,0];

      Live = [11,12,13,14,5,16,7,18,9,20,23,18,17,16,15,25,90,91,92,93,94];

      console.log(Live);

      for (count = 0; count < 20 ; count++)  
      {
         if (Live[count] < Live[count + 1] & Live[count] < Live[count + 2] ) 
         {
              Low_Level = Live[count];
              console.log('Number is going low to high => ' , Low_Level);
             
         }

         if (Live[count] < Live[count + 1] & Live[count] > Live[count + 2] ) 
         {
              high_Level = Live[count];
              console.log('Low_Level => ' , high_Level);
             
         }

      }
*/

   });

}) ()







