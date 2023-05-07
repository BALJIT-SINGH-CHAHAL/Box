const ccxt = require ('ccxt')
const indicators = require('cryptocurrency-trading-indicators')

const macd = require('trading-indicator').macd

const Binance = require('node-binance-api')

let T;

let Bi=1;

// do {
// console.log (ccxt.exchanges);
// }
// while (0 < ccxt.exchanges);

//  const ccxt = require ('ccxt');
 //'trading-indicator'

 const binance = new Binance().options({
    APIKEY: 'qkbaBE1f9YrssJewTk8WKaFpnyWl4RDxSXdW1834TlU6E6QQLOqSqh79xxVPKk0',
    APISECRET: 'P7xTTVKPKj76PJ3rZUcoolWoltVRi8zSU75HPQDZdHRYpp8wtR6X6KDfcTAYAW11'
  });

//Santa API
// const exchange = new ccxt.binance ({
//     'apiKey': '2qkbaBE1f9YrssJewTk8WKaFpnyWl4RDxSXdW1834TlU6E6QQLOqSqh79xxVPKk0',
//     'secret': 'P7xTTVKPKj76PJ3rZUcoolWoltVRi8zSU75HPQDZdHRYpp8wtR6X6KDfcTAYAW11',
//     'enableRateLimit': true,
// });

// JavaScript
// (async () => {
//     let kraken = new ccxt.kraken ();

//     let markets = await kraken.load_markets ();
//     console.log (kraken.id, markets);
//     }) ()
///--------------------------------------------------------------------------------------------------
   //
// ok hai
   // binance.websockets.trades(['BTCUSDT'], (trades) => {
   //    let {e:eventType, E:eventTime, s:symbol, p:price, q:quantity, m:maker, a:tradeId} = trades;
   //    console.info(symbol+" trade update. price: "+price+", quantity: "+quantity+", maker: "+maker);
   // });

//   (async () => {

   //let ticker = await indicators.ticker("binance", "BTCUSDT", "1m" ,true)
   // var indicator = await indicators.ticker("binance", "BTCUSDT", "1m", true);

   //var indicator = await indicators.ticker("binance", "BTCUSDT", "1m", true);
   //console.log(indicator);

   //var indicator = await macd("binance", "BTCUSDT", "1m", true);
   //console.log(indicator);

//   console.log(await macd(12, 26, 9, "close", "binance", "BTCUSDT", "1m", true))

//---------------------------------------------------------------------------------------
// webSocket

// binance.websockets.trades(['BTCUSDT'], (trades) => {
//    let {e:eventType, E:eventTime, s:symbol, p:price, q:quantity, m:maker, a:tradeId} = trades;
//    console.info(symbol+" trade update. price: "+price+", quantity: "+quantity+", maker: "+maker);
//  });

// binance.websockets.trades(['BTCUSDT'], (trades) => {
//    let {e:eventType, E:eventTime, s:symbol, p:price, q:quantity, m:maker, a:tradeId} = trades;
//    //console.clear();
//    console.info(symbol+" trade update. price: "+price+", quantity: "+quantity+", maker: "+maker+"  ... " +T.BTCUSDT);
//  });

// binance.websockets.trades(['BNBBTC', 'ETHBTC'], (trades) => {
//    let {e:eventType, E:eventTime, s:symbol, p:price, q:quantity, m:maker, a:tradeId} = trades;
//    console.info(symbol+" trade update. price: "+price+", quantity: "+quantity+", maker: "+maker);
//  });

// console.info( await binance.futuresPositionRisk() );
//-----------------------------------------------------------------------
// console.info( await binance.futuresPrices() );

// console.clear();
// binance.futuresMiniTickerStream( 'BTCUSDT', console.log )



// binance.futuresMiniTickerStream( miniTicker => {
//     console.info( miniTicker );
// } );

    // binance.prices('BTCUSDT', (error, ticker) => {
    //     console.info("Price of BNB: ", ticker.BTCUSDT);
    //   });

    //console.info( await binance.futuresPrices() );

//   }) () //<<<<<-----------------------------------------------

   //(async () => {

         // async function myFunction0() 
         // {

         // binance.websockets.miniTicker(markets => 
         //    {
         //    //console.info(markets);
         //    T = markets;
         //    console.info(T.BTCUSDT);
            
         //    })
        
         // } myFunction0() 
 
         // async function myFunction1() {
         // console.log(await macd(12, 26, 9, "close", "binance", "BTC/USDT", "1m", true))
         
         // } myFunction1() 
      

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

const main = async () => {
   try {
     
      console.log(await macd(12, 26, 9, "close", "binance", "BTC/USDT", "1m", true))
         
      // console.log('MACD 12 26 9 on Binance BTC/USDT 15m')
      // let macdData = await module.exports.macd(12, 26, 9, 'close', 'binance', 'BTC/USDT', '1m', true)
      // console.log(macdData[macdData.length - 2])

   } catch (err) {
      console.log(err)
    }
  }
   main(); 

 binance.websockets.trades(['BNBBTC'], (trades) => {
   let {e:eventType, E:eventTime, s:symbol, p:price, q:quantity, m:maker, a:tradeId} = trades;
   console.info(symbol+" trade update. price: "+price+", quantity: "+quantity+", maker: "+maker);
 });

 
