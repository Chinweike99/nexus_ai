import express from "express";

const app = express();

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "",
});

const response = openai.responses.create({
  model: "gpt-4o-mini",
  input: "write about me, My nam is chinweike",
  store: true,
});

response.then((result) => console.log(result.output_text));


// app.listen(4000, ()=> {
//     console.log(`Listening on port ${4000}`)
// })