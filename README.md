# ⚔️ AI Battle Arena

A full-stack AI comparison platform that evaluates responses from multiple Large Language Models (LLMs) in real time. Instead of relying on a single model, AI Battle Arena generates solutions from multiple AI providers simultaneously and uses another AI model to evaluate their quality.

**Live Demo:** https://ai-battle-arena-bay.vercel.app/

---

## Features

### Multi-Model AI Comparison
- Simultaneously generates responses from **Mistral Medium** and **Cohere Command**
- Executes both models in parallel using LangGraph
- Displays responses side-by-side for easy comparison

### AI Judge
- Uses **Google Gemini** as an independent evaluator
- Scores each solution out of 10
- Evaluates correctness, readability, code quality, and best practices
- Returns structured reasoning using Zod schemas

### User Experience
- Markdown rendering with syntax-highlighted code blocks
- Animated loading stages during AI generation
- Responsive dark-themed interface
- Graceful fallback when the judge model is temporarily unavailable

---

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Markdown
- Highlight.js

### Backend
- Node.js
- Express
- TypeScript
- LangChain
- LangGraph
- Zod

### AI Models
- Google Gemini Flash (Judge)
- Mistral Medium
- Cohere Command

---

## Architecture Highlights

Some backend implementation details that make this project different from a typical AI chatbot:

- **Parallel inference pipeline:** Mistral and Cohere generate responses simultaneously using LangGraph instead of sequential execution, reducing overall response time.
- **AI-as-a-Judge workflow:** Gemini independently evaluates both responses and produces structured scores with reasoning.
- **Structured validation:** Zod schemas enforce consistent judge output, preventing malformed AI responses.
- **Graceful degradation:** If the Gemini API becomes unavailable or rate-limited, users still receive responses from both AI models instead of the application failing.

---

## Getting Started

### Prerequisites

- Node.js
- Google Gemini API Key
- Mistral API Key
- Cohere API Key

### Backend

```bash
cd Backend
npm install
npm run dev
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

## Environment Variables

### Backend (.env)

```env
GOOGLE_API_KEY=

MISTRAL_API_KEY=

COHERE_API_KEY=

PORT=3000

FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000
```

---

## Project Structure

```text
AI-Battle-Arena/
├── Backend/
│   ├── src/
│   │   ├── ai/
│   │   ├── config/
│   │   └── app.ts
│   └── server.ts
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── assets/
│   │   └── App.jsx
│
└── README.md
```

---

## Author

**Surya Pratap Singh**

- GitHub: https://github.com/Surya-Pratap-Singh108/
- LinkedIn: https://www.linkedin.com/in/surya-pratap-singh-7ab190316/