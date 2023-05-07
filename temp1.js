const ccxt = require('ccxt')

//const indicators = require('cryptocurrency-trading-indicators') 

const SMA = require('@debut/indicators');//.SuperTrend;

//import { SMA } from '@debut/indicators';

const SuperTrend = require("supertrend-indicator");


const SMAl = require('technicalindicators').SMA; /// it ok working

var MACD = require('technicalindicators').MACD;

const EMA = require('technicalindicators').EMA;

const Binance = require('node-binance-api'); // API tested 

const tulind = require('tulind');

const new_macd = require('macd'); // ok tested console.log(new_macd(macdInput).MACD[499]);

//const { MACDInput } = require('technicalindicators/declarations/moving_averages/MACD');

//var SMA = require('trading-signals'); // I am not worked on it yet

const log = console.log;

let T, t;

var Live_candles_data_input;// = ["a", "b", "c", "d", "e"];

// do {
// console.log (ccxt.exchanges);
// }
// while (0 < ccxt.exchanges);

//  const ccxt = require ('ccxt');
//'trading-indicator'

const binance = new Binance().options({
   APIKEY: '2qkbaBE1f9YrssJewTk8WKaFpnyWl4RDxSXdW1834TlU6E6QQLOqSqh79xxVPKk0',
   APISECRET: 'P7xTTVKPKj76PJ3rZUcoolWoltVRi8zSU75HPQDZdHRYpp8wtR6X6KDfcTAYAW11'
});

//Santa API
// const exchange = new ccxt.binance ({
//     'apiKey': '2qkbaBE1f9YrssJewTk8WKaFpnyWl4RDxSXdW1834TlU6E6QQLOqSqh79xxVPKk0',
//     'secret': 'P7xTTVKPKj76PJ3rZUcoolWoltVRi8zSU75HPQDZdHRYpp8wtR6X6KDfcTAYAW11',
//     'enableRateLimit': true,
// });

// JavaScript
// (async () => 
// {
//let kraken = new ccxt.kraken ();

//     let markets = await kraken.load_markets ();
//     console.log (kraken.id, markets);
//    }) ()

//  // You can add numbers:
// sma.update(40);
// sma.update(30);
// sma.update(20);

// console.log(sma.getResult().valueOf()); // "20"
// console.log(sma.getResult().toFixed(2)); // "20.00"

///--------------------------------------------------------------------------------------------------
(async () => {
   //let ticker = await indicators.ticker("binance", "BTCUSDT", "1m" ,true)
   // var indicator = await indicators.ticker("binance", "BTCUSDT", "1m", true);

   //var indicator = await indicators.ticker("binance", "BTCUSDT", "1m", true);
   //console.log(indicator);

   //    var indicator = await macd("binance", "BTCUSDT", "1m", true);
   //console.log(indicator);

   //console.log(await macd(12, 26, 9, "close", "binance", "BTCUSDT", "1m", true))
   //-----------------------------------------------------------------------------------------------
   //  console.clear();
   binance.websockets.miniTicker(markets => {
      //   console.clear();
      //   console.info(markets.BTCUSDT);
      t = markets.BTCUSDT;  //// <<<------------------------------
   });

   // webSocket
   binance.websockets.chart("BTCUSDT", "1m", (symbol, interval, chart) => {
      //---------------------------------------------------------------------------------
      //  binance.prices('BTCUSDT', (error, ticker) => {   // this is not websocket
      //      console.info("Price of BNB: ", ticker.BTCUSDT);
      //    });

      // console.log(t);

      // //let macdInput = markets.BTCUSDT.close; // it not working on new_macd
      //-------------------------------------------------------------------------
      // r = 0;

      //  let tick = binance.last(chart);
      //  const last = chart[tick].close;
      //  console.info(last);

      let ohlc = binance.ohlc(chart);
      let x = (symbol, ohlc);
      Live_candles_data_input = x.close;//[499];

      //console.log(r);
      //------------------------------------------------------------
      // MACD tested

      var macdInput = {
         values: Live_candles_data_input,
         fastPeriod: 26,
         slowPeriod: 12,
         signalPeriod: 9,
         SimpleMAOscillator: false,
         SimpleMASignal: false
      }

      let s = (MACD.calculate(macdInput));
      //console.log(s.length);
      console.clear();
      console.log(Live_candles_data_input.length);
      //console.log(candle_data_input.length);
      console.log(Live_candles_data_input.length);
      console.log(s[488]);

      // console.log(MACD.calculate(macdInput));

      //------------------------------------------------------------
      //let macdInput=r;  //// <<<---------------
      // SMA tested

      //  console.clear();

      // let z =  r.length-450;

      // let z =  Live_candles_data_input;

      //      console.log('length of r => ' , z);

      // let x0 = SMA.calculate({ period: 50, values: z }); /// ok hai
      // console.log('period of 50 SMA = >', x0); ///405;]) /// ok hai

console.log('Live_candles_data_input', Live_candles_data_input[499]);

      //let superTrendData = SuperTrend(Live_candles_data_input, 2, 500) // 2 is multiplier, 10 is atr period/length

      //let xc =[
      //{ high: 17646.65, low: 17383.3, close: 17625.7 }, 
      //{ high: 17827.6, low: 17593.55, close: 17805.25 },
      // { high: 17944.7, low: 17748.85, close: 17925.25 },
      // { high: 17797.95, low: 17655.55, close: 17745.9 },
      // { high: 17905, low: 17704.55, close: 17812.7 },
      // { high: 18017.45, low: 17879.15, close: 18003.3 },
      // { high: 18081.25, low: 17964.4, close: 18055.75 },
      // { high: 18227.95, low: 18128.8, close: 18212.35 },
      // { high: 18272.25, low: 18163.8, close: 18257.8 }
      //];
//----------------------------------------------------------------------------------------------
      // let x1 = SMA.calculate({ period: 500, values: Live_candles_data_input }); /// ok hai
      // console.log('period of 500 SMA = >', x1[0]);

      let x0 = EMA.calculate({ period: 200, values: Live_candles_data_input });
      let EMA_200 = x0[500 - 200];
      console.log('period of 200 EMA   = >', EMA_200);

      x0 = EMA.calculate({ period: 21, values: Live_candles_data_input });
      let EMA_21 = x0[500 - 21];
      console.log('period of 21 EMA   = >', EMA_21);

      x0 = EMA.calculate({ period: 9, values: Live_candles_data_input });
      let EMA_9 = x0[500 - 9];
      console.log('period of 9 EMA   = >', EMA_9);

         if(EMA_9 > EMA_21)
         {
            console.log('Now current codition EMI 9 is Higher (Buy) than EMI 21 ');
            
            // if(EMA_9 > EMA_200)
            // {
            //    console.log('Now current codition EMI 9 is also Higher than EMI 200 ');

            // }
         }

         if(EMA_9 < EMA_21)
         {
            console.log('Now current codition EMI 9 is Lesser ( Sell ) than EMI 21 ')            
         }

      // x0 = EMA.calculate({ period: 50, values: Live_candles_data_input });
      // console.log('period of  50 EMA   = >', x0[500 - 50]);

      // x0 = EMA.calculate({ period: 9, values: Live_candles_data_input });
      // console.log('period of  9 EMA    = >', x0[500 - 9]);

      //------------------------------------------------------------------------------------------
         let xc=[],count;

         for(count=0;count<Live_candles_data_input.length;count++)
         {
         xc[count]={ high: x.high[count], low: x.low[count] , close: x.close[count] };
         }
         
      let superTrendData = SuperTrend(xc, 3, 10); // 10,3
      //console.log(superTrendData[499]);

      console.log(superTrendData[Live_candles_data_input.length-1]);
     //---------------------------------------------------------------------------------------
      //FIRST MACD tested

      // console.clear();

      //   console.log(t); // <<<------------------------------------------

      // console.log(x.close[499]);
      // console.log('MACD      =>', new_macd(macdInput).MACD[499]);
      // console.log('signal    =>',new_macd(macdInput).signal[499]);
      // console.log('histogram =>',new_macd(macdInput).histogram[499]);
      // console.log('\n');
      //--------------------------------------------------
      //Still not worked
      // let p =r[499];  
      //console.info(p);

      //  tulind.indicators.macd.indicator([p],[12,26,9],(err,res) => 
      //  {
      //    if(err) return  console.info(err);
      //     //console.clear();
      //     console.log(res[0]);
      //  });

   });

})()

//(async () => {

async function myFunction() {

   // binance.websockets.miniTicker(markets => {
   //    //console.info(markets);
   //    T = markets;
   //    console.clear();
   //    console.info(T.BTCUSDT);

   //    t=(T.BTCUSDT.close);
   //    console.info(t);
   //  });



   //  tulind.indicators.ema.indicator([t],[21],(err,res) => 
   //  {
   //    if(err) return log(err);
   //    log(res[0]);
   //  });

   //var indicator = await macd("binance", "BTCUSDT", "1m", true);
   //console.log(indicator);

   // console.log(await macd(12, 26, 9, "close", "binance", "BTCUSDT", "1m", true))

} myFunction()

   //console.log(indicators);
//--------------------------------------------------------------------------------------------------
// (async () => {
//     await exchange.loadMarkets ()
//     exchange.verbose = true
//     let order = await exchange.createLimitSellOrder('BTCUSDT', 1.0, 0.060154, {'test': true})
//     console.log (order)
//    console.log(exchange);
// })
// ()
//-------------------------------------------------------------------------------------------------
// JavaScript
// (async () => {
//     let pairs = await kraken.publicGetSymbolsDetails ()
//     let marketIds = Object.keys (pairs['result'])
//     let marketId = marketIds[0]
//     let ticker = await kraken.publicGetTicker ({ pair: marketId })
//     console.log (kraken.id, marketId, ticker)
//     }) ()

//-----------------------------------------------------------------------------------

// const { wavesexchange } = require('ccxt');

// const we = new wavesexchange({
//     apiKey: 'NpKUhWH1nEovIrZCWMOaBZicCjPGFScwrTjb4sypKjjowu5BRHJED22m7MfCq4Aj',
//     secret: 'qIeAVymUdyu4dQQkPuzKKl74yrozVveCrza5vjanDsq8SQZLpg1LAZPQNzc666Is',
// });

// (async () => {
//     await we.loadMarkets();
// }) ()







