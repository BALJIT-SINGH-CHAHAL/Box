const ccxt = require ('ccxt')
//const indicators = require('cryptocurrency-trading-indicators')
const indicators = require('trading-indicator')

const macd = require('trading-indicator').macd
var show = console.log();

// do {
// console.log (ccxt.exchanges);
// }
// while (0 < ccxt.exchanges);

//  const ccxt = require ('ccxt');
 //'trading-indicator'

//Santa API
const exchange = new ccxt.binance ({
    'apiKey': '2qkbaBE1f9YrssJewTk8WKaFpnyWl4RDxSXdW1834TlU6E6QQLOqSqh79xxVPKk0',
    'secret': 'P7xTTVKPKj76PJ3rZUcoolWoltVRi8zSU75HPQDZdHRYpp8wtR6X6KDfcTAYAW11',
    'enableRateLimit': true,
});

// JavaScript
// (async () => {
//     let kraken = new ccxt.kraken ();

//     let markets = await kraken.load_markets ();
//     console.log (kraken.id, markets);
//     }) ()
///--------------------------------------------------------------------------------------------------
   //
   (async () => {
   //let ticker = await indicators.ticker("binance", "BTCUSDT", "1m" ,true)
   // var indicator = await indicators.ticker("binance", "BTCUSDT", "1m", true);
   
   //var indicator = await indicators.ticker("binance", "BTCUSDT", "1m", true);
   //console.log(indicator);

   var indicator = await macd("binance", "BTCUSDT", "1m", true);
   console.log(indicator);
   }) ()
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








