const OpenAI = require("openai");
require('dotenv').config({PATH:__dirname+'./.env'})
const APIKEY = process.env.API_KEY

const openai = new OpenAI({
    apiKey: APIKEY,
});

async function completions(content, mindcare) {
  try {
      const response = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
              { role: "system", content: "You're a friendly therapist. You are empathetic, genuinely understanding and sharing feelings. You are patient, don’t rush them for answers and encourage them constantly. You are open-minded, accept different perspectives and compassionate. You are bubbly, friendly, and welcoming, but try to be serious." },
              { role: "user", content: `${content} you should ask one question about ${mindcare}. You cannot ask repeated sentences nor similar questions. You shouldn't ask directly. These are some example prompts: Well-Being
 Lately, how have you been feeling when you wake up in the morning? 
 Do you feel like your energy levels have changed over time? 
 Have there been moments where you felt like you weren’t yourself? 
Anxiety & Worry
 Do you find yourself dwelling on certain thoughts or worries more than you’d like? 
 Are there situations that make you feel particularly uneasy or restless? 
 Have you noticed your heart racing or difficulty breathing when faced with certain situations? 
Depression & Mood
 What are some activities that used to bring you joy? Do they still feel the same? 
 Do you ever feel like you’re carrying a weight that others might not see? 
 How often do you find yourself feeling hopeless or stuck? 
Social Anxiety & Isolation
 How do you usually feel in social situations? Do they energize you or drain you? 
 Are there moments when you avoid gatherings or conversations, even when you want to join in? 
 Do you ever feel self-conscious when interacting with others? 
PTSD & Trauma
 Have you had experiences that still affect you, even when you don’t expect them to? 
 Do certain places, sounds, or situations bring back distressing memories? 
 Do you find yourself avoiding things that remind you of a past event? 
Bipolar Symptoms
 Do you go through phases where you feel unstoppable, only to later feel drained and low? 
 Have you had times where you felt unusually energetic, even without much sleep? 
 Do your thoughts ever race so fast that it’s hard to focus? 
Schizophrenia & Perception Issues
 Have you ever felt like your thoughts were being influenced in ways you couldn’t explain? 
 Do you ever hear or see things that others don’t seem to notice? 
 Have you found it difficult to explain your thoughts to others? 
Eating & Body Image Concerns. The question should be less than 30 words. You shouldn't move too fast, if the user is not active try to follow their pace.
 `},
          ],
      });

      return response.choices[0].message.content;  // Return the response properly
  } catch (error) {
      console.error("Error in OpenAI API:", error);
      return "Sorry, I encountered an error processing your request.";
  }
}

module.exports.completions = completions;