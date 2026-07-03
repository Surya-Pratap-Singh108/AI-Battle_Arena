import { StateGraph, StateSchema, type GraphNode,START,END, } from '@langchain/langgraph'
import z from 'zod';
import { cohoreModel, mistralModel,geminiModel } from "./models.ai.js";
import { createAgent,HumanMessage,providerStrategy } from 'langchain';
const state = new StateSchema({
    problem: z.string().default(''),
    solution_1: z.string().default(''),
    solution_2: z.string().default(''),
    judge: z.object({
        solution_1_score:z.number().default(0),
        solution_2_score:z.number().default(0),
        solution_1_reasoning:z.string().default(''),
        solution_2_reasoning:z.string().default(''),
    })
});

const solutionNode:GraphNode<typeof state>=async(state)=>{
    const results = await Promise.allSettled([
    mistralModel.invoke(state.problem),
    cohoreModel.invoke(state.problem),
    ]);

    const mistral_solution =
    results[0].status === "fulfilled"
        ? results[0].value.text
        : "Mistral API unavailable";

    const cohere_solution =
    results[1].status === "fulfilled"
        ? results[1].value.text
        : "Cohere API unavailable";

    return {
    solution_1: mistral_solution,
    solution_2: cohere_solution,
    };
}

const judgeNode: GraphNode<typeof state> = async (state) => {
  const { problem, solution_1, solution_2 } = state;

  const judge = createAgent({
    model: geminiModel,
    responseFormat: providerStrategy(
      z.object({
        solution_1_score: z.number().min(0).max(10),
        solution_2_score: z.number().min(0).max(10),
        solution_1_reasoning: z.string(),
        solution_2_reasoning: z.string(),
      })
    ),

    systemPrompt: `
You are an expert software engineering evaluator.

Compare both solutions based on:

1. Correctness
2. Time Complexity
3. Space Complexity
4. Code Readability
5. Best Practices

Give score out of 10 and explain strengths and weaknesses.
`,
  });

  try {
    const judgeResponse = await judge.invoke({
      messages: [
        new HumanMessage(`
Problem: ${problem}

Solution_1: ${solution_1.slice(0, 1200)}

Solution_2: ${solution_2.slice(0, 1200)}

Evaluate both solutions.
`),
      ],
    });

    return {
      judge: judgeResponse.structuredResponse,
    };

  } catch (error) {
    
    console.log("Gemini Judge Failed:", error);

    // fallback response

    return {
      judge: {
        solution_1_score: 0,
        solution_2_score: 0,

        solution_1_reasoning:
          "Gemini Judge API is temporarily unavailable. Solution comparison could not be completed.",

        solution_2_reasoning:
          "Gemini Judge API is temporarily unavailable. Solution comparison could not be completed.",
      },
    };
  }
};

const graph=new StateGraph(state)
    .addNode('solution',solutionNode)
    .addNode('judge_node',judgeNode)
    .addEdge(START,'solution')
    .addEdge('solution','judge_node')
    .addEdge('judge_node',END)
    .compile();

export default async function (problem:string) {
     const result=await graph.invoke({
        problem
     })
    return result;
}