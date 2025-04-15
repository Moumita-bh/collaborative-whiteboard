// services/huggingFaceService.ts
const HF_API_URL = 'https://api-inference.huggingface.co/models/google/vit-base-patch16-224';
const HF_API_KEY = 'YOUR_HUGGINGFACE_API_KEY'; // Replace this with a real key

export const classifyImageWithHuggingFace = async (base64Image: string) => {
  const base64 = base64Image.split(',')[1]; // Remove data:image/...;base64, header

  const response = await fetch(HF_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${HF_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: base64,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to classify image with Hugging Face');
  }

  const result = await response.json();
  return result;
};
