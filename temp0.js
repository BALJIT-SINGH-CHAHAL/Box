//"use strict";

//const ccxt       = require ('../../ccxt.js')
const ccxt = require ('ccxt')
const asciichart = require ('asciichart')
const asTable    = require ('as-table')
const log        = require ('ololog').configure ({ locate: false })

require ('ansicolor').nice

//-----------------------------------------------------------------------------

;(async function main () {

    // experimental, not yet implemented for all exchanges
    // your contributions are welcome ;)

    const index = 4 // [ timestamp, open, high, low, close, volume ]
    //const ohlcv = await new ccxt.okcoin ().fetchOHLCV ('BTC/USD', '1m')
    const ohlcv = await new ccxt.binance ().fetchOHLCV ('BTCUSDT', '1m')
    const lastPrice = ohlcv[ohlcv.length - 1][index] // closing price
    const series = ohlcv.map (x => x[index])         // closing price
    const bitcoinRate = ('₿ = $' + lastPrice).green
    const chart = asciichart.plot (series, { height: 15, padding: '            ' })
    log.yellow ("\n" + chart, bitcoinRate, "\n")
    process.exit ()

}) ()




// It's working and display yellow line graph on terminal window