import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 4000
app.use(cors());
app.use(express.json())

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});



app.post('/completion', async(req, res) => {

  const {message} = req.body;

  const options ={
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPEN_AI_KEY}`,
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{role: 'user', content: message }],
      max_tokens: 100,
      store: true
    })

  }


  try {
    const fetchData = await fetch('https://api.openai.com/v1/chat/completions', options);
    console.log("fetchData", fetchData)
    const data = await fetchData.json();
    console.log("Fetched Data ..", data)
    const message = data.choices[0].message.content;
    console.log("Data", message);

    res.json({data: message})

  } catch (error) {
    console.log(error)
  }
})



app.listen(port, ()=> {
    console.log(`Listening on port ${port}`)
})