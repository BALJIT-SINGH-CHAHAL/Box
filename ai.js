// Import the necessary libraries
const tf = require('@tensorflow/tfjs');
const fs = require('fs');
const {DecisionTreeRegressor} = require('@tensorflow/tfjs-node').DecisionTreeRegressor;

//const DecisionTreeRegressor = require('ml-cart').DecisionTreeRegressor;

// Load the data from a CSV file
async function loadData() {
  const file = fs.readFileSync('./trade_data.csv', 'utf-8');
  const data = file.split('\n').map(row => row.split(',').map(Number));
  return data;
}

// Preprocess the data for training
async function preprocessData(data) {
  const X = data.map(row => row.slice(0, -1));
  const Y = data.map(row => row.slice(-1));
  return [X, Y];
}

// Train the model using the preprocessed data
async function trainModel(X, Y) {
  const model = new DecisionTreeRegressor();
  model.train(tf.tensor2d(X), tf.tensor1d(Y));
  return model;
}

// Use the trained model to make predictions
async function makePredictions(model, X) {
  const predictions = model.predict(tf.tensor2d(X)).arraySync();
  return predictions;
}

// Main function that runs the program
async function run() {
  const data = await loadData();
  const [X, Y] = await preprocessData(data);
  const model = await trainModel(X, Y);
  const predictions = await makePredictions(model, X);
  console.log(predictions);
}

// Run the program
run();





