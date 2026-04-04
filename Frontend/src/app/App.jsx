import { useState } from 'react';
import ChatInterface from '../components/ChatInterface';
import './App.css';

const INITIAL_DATA = [
  {
    problem: "Compare two different architectural approaches for a cloud-native e-commerce platform focusing on high availability and cost-efficiency. Please provide some code examples.",
    solution_1: "This model leverages fully managed services like AWS Lambda and DynamoDB to abstract infrastructure management entirely.\n\n### Key Benefits:\n- Pay-per-execution model ensures zero idle costs.\n- Automated multi-region redundancy.\n\n```javascript\n// AWS Lambda Example\nexports.handler = async (event) => {\n    return { statusCode: 200, body: 'Success!' };\n};\n```",
    solution_2: "Utilizing Kubernetes (EKS/GKE) for orchestration, providing a consistent environment for specialized workloads.\n\n### Key Benefits:\n- Full control over runtime environment and dependencies.\n- Lower latency for stateful applications.\n\n```yaml\n# Kubernetes Deployment Example\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: e-commerce-app\n```",
    judge: {
      solution_1_score: 9.4,
      solution_2_score: 8.2,
      solution_1_reasoning: "For an e-commerce platform starting at moderate scale, Approach A significantly reduces TCO by eliminating the need for a dedicated DevOps overhead.",
      solution_2_reasoning: "Approach B demands higher operational capabilities upfront. While powerful, cost-efficiency drops significantly at smaller scales."
    }
  }
];

function App() {
  const [messages, setMessages] = useState(INITIAL_DATA);

  const handleSendMessage = (inputValue) => {
    // Add dummy response for the sake of demonstration
    const newMsg = {
      problem: inputValue,
      solution_1: "Solution A for the query:\n\n```python\nprint('Hello world!')\n```\nIt focuses on standard Python standard library capabilities.",
      solution_2: "Solution B for the query:\n\n```python\nimport sys\nsys.stdout.write('Hello World')\n```\nIt focuses on low-level system modules.",
      judge: {
        solution_1_score: 8.5,
        solution_2_score: 7.0,
        solution_1_reasoning: "Approach A is much clear and easy for beginners.",
        solution_2_reasoning: "Approach B is unnecessarily complicated for standard tasks."
      }
    };

    setMessages([...messages, newMsg]);
  };

  return (
    <div className="bg-background text-on-surface h-screen flex overflow-hidden">
      {/* SideNavBar */}
      <aside className="bg-surface-container-low h-screen w-64 flex flex-col border-r-0 tracking-tight hidden md:flex shrink-0">
        <div className="flex flex-col h-full py-6 px-4">
          <div className="mb-10 px-2">
            <h1 className="text-lg font-bold text-on-surface uppercase tracking-widest font-headline">AI Battle Arena</h1>
            <p className="text-xs text-on-surface-variant font-medium mt-1 font-body">Dual AI Engine Comparison</p>
          </div>
          <nav className="flex-1 space-y-1 font-body">
            <a className="flex items-center gap-3 py-3 px-4 text-on-surface font-semibold border-r-2 border-outline-variant hover:bg-surface-container-high transition-colors" href="#">
              <span className="opacity-80">New Chat</span>
            </a>
            <a className="flex items-center gap-3 py-3 px-4 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" href="#">
              History
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content Stage */}
      <ChatInterface messages={messages} onSendMessage={handleSendMessage} />
    </div>
  );
}

export default App;
