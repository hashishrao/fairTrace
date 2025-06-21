import * as tf from '@tensorflow/tfjs';
import { prepareTrainingData } from './prepareData';

// TODO: Implement model loading instead of training on the fly
// TODO: Implement more sophisticated suggestion logic based on model prediction

export async function getScoringSuggestions(description: string): Promise<string> {
  // For now, train the model on the fly
  const data = prepareTrainingData();

  if (data.length === 0) {
    return 'No data available to train the model.';
  }

  const featureData = data.map(d => [d.likes, d.comments, d.recency, d.downvotes]);
  const scoreData = data.map(d => d.score);

  const features = tf.tensor2d(featureData);
  const labels = tf.tensor2d(scoreData, [scoreData.length, 1]);

  const model = tf.sequential();
  model.add(tf.layers.dense({ inputShape: [4], units: 1, activation: 'linear' }));

  model.compile({ optimizer: tf.train.adam(), loss: 'meanSquaredError' });

  // Train the model
  await model.fit(features, labels, { epochs: 50 });

  // TODO: Use the trained model to make a prediction and generate suggestions
  // Basic keyword analysis of the description
  const lowerDescription = description.toLowerCase();
  let suggestion = "Based on the data, ";

  if (lowerDescription.includes('likes')) {
    suggestion += "increasing the weight of likes generally increases the score. ";
  }
  if (lowerDescription.includes('comments')) {
    suggestion += "increasing the weight of comments generally increases the score. ";
  }
  if (lowerDescription.includes('recency') || lowerDescription.includes('new posts')) {
    suggestion += "giving more weight to recency tends to boost newer content scores. ";
  }
  if (lowerDescription.includes('downvotes')) {
    suggestion += "increasing the negative weight of downvotes will lower scores for unpopular content. ";
  }

  if (suggestion === "Based on the data, ") {
    suggestion += "consider which factors you want to prioritize for scoring.";
  }
  return suggestion.trim();
}