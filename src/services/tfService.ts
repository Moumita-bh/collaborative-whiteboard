// services/tfService.ts
import * as tf from '@tensorflow/tfjs';

let model: tf.GraphModel | null = null;

export const loadModel = async () => {
  if (!model) {
    model = await tf.loadGraphModel('https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v2_100_224/classification/3/default/1', { fromTFHub: true });
  }
};

export const classifyImageWithTensorflow = async (imgElement: HTMLImageElement) => {
  await loadModel();

  if (!model) throw new Error('Model not loaded');

  const tensor = tf.browser
    .fromPixels(imgElement)
    .resizeNearestNeighbor([224, 224])
    .toFloat()
    .expandDims();

  const predictions = model.predict(tensor) as tf.Tensor;
  const data = await predictions.data();

  // Get top 5 predictions
  const topK = Array.from(data)
    .map((prob, index) => ({ index, prob }))
    .sort((a, b) => b.prob - a.prob)
    .slice(0, 5);

  return topK;
};
