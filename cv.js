const axios = require('axios');
const fs = require('fs');

const symbol = 'BTCUSDT';
const interval = '1d';
const limit = 500;

async function getCandlestickData() {
  const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;
  const response = await axios.get(url);
  const data = response.data;
  const candlestickData = [];
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const open = row[1];
    const high = row[2];
    const low = row[3];
    const close = row[4];
    const volume = row[5];
    candlestickData.push({open, high, low, close, volume});
  }
  return candlestickData;
}

async function writeDataToFile(data) {
  const header = 'Open,High,Low,Close,Volume\n';
  const rows = data.map(d => `${d.open},${d.high},${d.low},${d.close},${d.volume}\n`).join('');
  fs.writeFileSync('trade_data.csv', header + rows);
}

async function run() {
  const dataa = await getCandlestickData();
  console.log(dataa);
   await writeDataToFile(dataa);
}

run();
