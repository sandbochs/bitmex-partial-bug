'use strict';

if (process.argv.length < 4) {
  console.error(`Not enough parameters.`);
  console.log(`Usage: node example.js [TESTNET_API_KEY] [TESTNET_API_SECRET]`);
}

const BitMEXClient = require('./index');
// See 'options' reference below
const client = new BitMEXClient({testnet: true, apiKeyID: process.argv[2], apiKeySecret: process.argv[3]});
// handle errors here. If no 'error' callback is attached. errors will crash the client.
client.on('error', console.error);
client.on('open', () => console.log('Connection opened.'));
client.on('close', () => console.log('Connection closed.'));
client.on('initialize', () => console.log('Client initialized, data is flowing.'));

client.addStream('*', 'execution', function(data, symbol, tableName) {
  //console.log(`Got update for ${tableName}:${symbol}. Current state:\n${JSON.stringify(data).slice(0, 100)}...`);
  // Do something with the table data...
  console.log('Got Something:', tableName, symbol)
});

// client.addStream('XBTUSD', 'orderBookL2', function(data, symbol, tableName) {
//   //console.log(`Got update for ${tableName}:${symbol}. Current state:\n${JSON.stringify(data).slice(0, 100)}...`);
//   // Do something with the table data...
//   console.log('Got Something:', tableName, symbol)
// });
