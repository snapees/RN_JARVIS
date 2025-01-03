import axios from 'axios';
import {BASE_URL, GEMINI_API_KEY} from './API';
import {GoogleGenerativeAI} from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const askAI = async (prompt: string) => {
  try {
    const model = genAI.getGenerativeModel({model: 'gemini-1.5-flash'});
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    return response;
  } catch (error) {
    throw error;
  }
};

export const registerToken = async (device_token: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/notifications/register-token`, {
      device_token,
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
