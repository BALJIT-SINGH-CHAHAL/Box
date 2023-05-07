const tf = require('@tensorflow/tfjs');
const csv = require('csv-parser');
const fs = require('fs');

// Load data from CSV file
const data = [];
fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row) => {
    data.push(row);
  })
  .on('end', () => {
    // Preprocess the data
    const inputs = [];
    const labels = [];
    for (let i = 0; i < data.length - 2; i++) {
      const curr = parseFloat(data[i].price);
      const prev1 = parseFloat(data[i + 1].price);
      const prev2 = parseFloat(data[i + 2].price);
      inputs.push([curr, prev1, prev2]);
      if (curr > prev1 && prev1 < prev2) {
        labels.push(1);
      } else {
        labels.push(0);
      }
    }
    const xs = tf.tensor2d(inputs);
    const ys = tf.tensor1d(labels);

    // Build and train the model
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 16, activation: 'relu', inputShape: [3] }));
    model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
    model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });
    model.fit(xs, ys, { epochs: 100 }).then(() => {
      console.log('Model trained');
      
      // Use the model to predict Head and Shoulders patterns
      const testInput = tf.tensor2d([[100, 90, 80], [110, 120, 130], [120, 130, 140]]);
      const predictions = model.predict(testInput);
      predictions.print();
    });
  });
