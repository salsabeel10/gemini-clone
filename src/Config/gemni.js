/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = 'AIzaSyD62BSf4GfG79t3Pu9TNg1vnoEKHXEqZdo'
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    })

    const result = await chatSession.sendMessage(prompt)
    const response = result.response
    console.log(response.text())
    return response.text()
  } catch (error) {
    // Check for the rate limit exceeded error
    if ( error.status === 429) {
      alert('Request limit reached. Please try again later.')
      return
    } else {
      console.error('An error occurred:', error)
      alert(
        'An error occurred while processing your request. Please try again.'
      )
    }
  }
}

export default run;
