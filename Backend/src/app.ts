import express from 'express';
import useGraph from './ai/graph.ai.js';
import cors from "cors";



const app=express();
app.use(express.json());

app.use(cors({
  credentials: true,
  origin: true,
  methods: ["GET", "POST"],
}))

app.get('/', async(req, res) => {
  const result=await useGraph ("write factorial function in js");
  
  res.status(200).json({
    result
  })

})

app.post('/invoke', async (req, res) => {
  try {
    const { input } = req.body;
    const result = await useGraph(input);

    res.status(200).json({
      success: true,
      result
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

export default app;