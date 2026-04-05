import express from 'express';
import useGraph from './ai/graph.ai.js';
import cors from "cors";



const app=express();
app.use(express.json());

app.use(cors({
  credentials:true,
  origin:'http://localhost:5173',
  methods: ["GET", "POST"],
}))

app.get('/', async(req, res) => {
  const result=await useGraph ("write factorial function in js");
  
  res.status(200).json({
    result
  })

})

app.post('/invoke',async(req,res)=>{
  const { input } = req.body;
  const result=await useGraph (input);
  res.status(200).json({
        message: "Graph executed successfully",
        success: true,
        result
    })

})

export default app;