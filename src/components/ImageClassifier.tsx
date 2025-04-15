import React, { useState, useRef } from 'react';
import { classifyImageWithHuggingFace} from '../services/huggingFaceService';
import { classifyImageWithTensorflow } from '../services/tfservice';
import { image } from '@tensorflow/tfjs';

const ImageClassifier: React.FC = () => {
  const[imageData, setImageData] = useState<string  | null>(null);
  const[hfPrediction, setHfPrediction] = useState<any>(null);
  const[tfPrediction, setTfPrediction] = useState<any>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageData(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleClassify = async () => {
    if(!imageData || !imgRef.current) return;

    const hfResult = await classifyImageWithHuggingFace(imageData);
    setHfPrediction(hfResult);

    const tfResult = await classifyImageWithTensorflow(imgRef.current);
    setTfPrediction(tfResult);

  };

  return(
    <div className="mt-4">
     <h2>🖼️ Image Classification</h2>
     <input type="file" accept="image/*" onChange={handleImageUpload} className="form-control mb-2" />
     { imageData && (
        <>
        <img src={imageData} alt="uploaded" ref={imgRef} style={{maxWidth: '100%', maxHeight: '300px' }}/>
        <button className="btn btn-primary mt-2" onClick={handleClassify}>
          Classify Image
        </button>
        </>
     )}

     {hfPrediction && (
        <div className="alert alert-info mt-3 ">
          <strong>Hugging Face Prediction:</strong>
          <pre>{JSON.stringify(hfPrediction, null, 2)}</pre>
        </div>
     )}

     {tfPrediction && (
        <div className="alert alert-warning mt-3">
          <strong>Tensorflow.js Prediction:</strong>
          <pre>{JSON.stringify(tfPrediction, null, 2)}</pre>
        </div>
     )}

    </div>
  );


}

export default ImageClassifier; 