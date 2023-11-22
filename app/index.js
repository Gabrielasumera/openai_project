
import OpenAI from "openai";
import 'dotenv/config';
import express from 'express';
import bodyParser from "body-parser";

global.OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const app = express();
const openai = new OpenAI();

app.use(bodyParser.urlencoded({ extended: true })); 

app.use(bodyParser.json());


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/webhook', async (req, res) => {
  try {
    const userInput = req.body.data;

    
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", 
        messages: [{role: "user", content: userInput}],
        max_tokens: 50, 
    });

    
    console.log('ChatGPT Response:', response.choices[0].message);

    res.status(200).json({ success: true, response: response.choices[0].message });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Webhook receiver listening on port ${PORT}`);
});