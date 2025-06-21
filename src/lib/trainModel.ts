import * as tf from '@tensorflow/tfjs';
import { prepareTrainingData } from './prepareData';

export async function trainScoringModel() {
  // 1. Call prepareTrainingData to get the data.
  const trainingData = prepareTrainingData();

  // Separate features (X) and target (y)
  const features = trainingData.map(d => [d.likes, d.comments, d.recency, d.downvotes]);
  const labels = trainingData.map(d => d.score);

  // 2. Convert the data into TensorFlow.js tensors for features (X) and target (y).
  const xs = tf.tensor2d(features);
  const ys = tf.tensor2d(labels, [labels.length, 1]);

  // 3. Define a sequential model with a dense layer for linear regression.
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [4] })); // 4 input features: likes, comments, recency, downvotes

  // 4. Compile the model with an optimizer (e.g., 'adam') and a loss function (e.g., 'meanSquaredError').
  model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });

  // 5. Train the model using the tensors.
  await model.fit(xs, ys, { epochs: 100 }); // Train for 100 epochs

  // 6. Log a message indicating that training is complete.
  console.log('Scoring model training complete.');

  // You would typically return or save the trained model here
  // For now, we'll just log completion.
}