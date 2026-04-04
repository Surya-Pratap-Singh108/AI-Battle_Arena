import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MarkdownComponents = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        style={atomDark}
        language={match[1]}
        PreTag="div"
        customStyle={{ borderRadius: '0.5rem', padding: '1rem', marginTop: '1rem', marginBottom: '1rem' }}
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-sm text-primary font-mono border border-outline-variant/30" {...props}>
        {children}
      </code>
    );
  },
  h1: ({node, ...props}) => <h1 className="text-2xl font-headline font-bold mt-4 mb-2" {...props} />,
  h2: ({node, ...props}) => <h2 className="text-xl font-headline font-bold mt-4 mb-2" {...props} />,
  h3: ({node, ...props}) => <h3 className="text-lg font-headline font-bold mt-4 mb-2" {...props} />,
  p: ({node, ...props}) => <p className="mb-4" {...props} />,
  ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4" {...props} />,
  ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4" {...props} />,
};

export default function ArenaResponse({ solution1, solution2, judge }) {
  return (
    <>
      {/* AI Response Stage (Solution Cards) */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
        {/* Solution 1 */}
        <div className="bg-surface-container-high p-8 rounded-xl flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-surface-container-lowest text-xs font-bold font-headline uppercase tracking-tighter text-primary">Solution 1</span>
          </div>
          <div className="font-body text-on-surface-variant leading-relaxed text-sm">
            <ReactMarkdown components={MarkdownComponents}>
              {solution1}
            </ReactMarkdown>
          </div>
        </div>

        {/* Solution 2 */}
        <div className="bg-surface-container-high p-8 rounded-xl flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-surface-container-lowest text-xs font-bold font-headline uppercase tracking-tighter text-primary">Solution 2</span>
          </div>
          <div className="font-body text-on-surface-variant leading-relaxed text-sm">
            <ReactMarkdown components={MarkdownComponents}>
              {solution2}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Judge Recommendation Section */}
      <div className="bg-surface-container-lowest border border-outline-variant/15 p-10 rounded-xl shadow-[0_20px_40px_-12px_rgba(42,52,57,0.06)]">
        <div className="flex md:flex-row flex-col md:items-center justify-between mb-8 gap-6 md:gap-0">
          <div>
            <h3 className="font-headline text-lg md:text-xl font-extrabold text-on-surface">Judge Recommendation</h3>
            <p className="text-on-surface-variant text-sm mt-1">Comparitive evaluation based on effectiveness and code quality.</p>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-xs font-bold text-on-surface-variant uppercase mb-1">Sol 1</div>
              <div className="text-3xl font-headline font-black text-primary">{judge.solution_1_score.toFixed(1)}</div>
            </div>
            <div className="w-[1px] h-10 bg-outline-variant/30 self-center"></div>
            <div className="text-center">
              <div className="text-xs font-bold text-on-surface-variant uppercase mb-1">Sol 2</div>
              <div className="text-3xl font-headline font-black text-outline">{judge.solution_2_score.toFixed(1)}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-surface-container-low p-6 rounded-xl">
             <h4 className="font-headline font-bold text-on-surface mb-3 flex items-center gap-2">
              Solution 1 Reasoning
             </h4>
             <p className="font-body text-sm text-on-surface-variant leading-relaxed">
               {judge.solution_1_reasoning}
             </p>
          </div>
          <div className="bg-surface-container-low p-6 rounded-xl">
             <h4 className="font-headline font-bold text-on-surface mb-3 flex items-center gap-2">
              Solution 2 Reasoning
             </h4>
             <p className="font-body text-sm text-on-surface-variant leading-relaxed">
               {judge.solution_2_reasoning}
             </p>
          </div>
        </div>
      </div>
    </>
  );
}
