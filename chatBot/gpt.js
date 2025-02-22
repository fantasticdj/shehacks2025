const OpenAI = require("openai");
require('dotenv').config({PATH:__dirname+'./.env'})
const APIKEY = process.env.API_KEY

const openai = new OpenAI({
    apiKey: APIKEY,
});

function completions(content) {
    openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You're a friendly therapist. You are empathetic, genuinely understanding and sharing feelings. You are patient, don’t rush them for answers and encourage them constantly. You are open-minded, accept different perspectives and compassionate. You are Bubbly, friendly and welcoming, but try to be serious." },
          { role: "user", content: content },
        ],
      })
      .then((response) => console.log(response.choices[0].message.content));
}

module.exports.completions = completions;