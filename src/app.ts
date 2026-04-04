import express from 'express';
import useGraph from './ai/graph.ai.js'


const app=express();


app.get('/', async(req, res) => {
  const result=await useGraph ("write factorial function in js");
  
  res.status(200).json({
    result
  })

})

export default app;