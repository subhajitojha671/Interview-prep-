import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { LuCheck, LuCopy, LuCode } from "react-icons/lu";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const AIResponsePreview = ({ content }) => {
  if (!content) return null;

  return (
    <div className="max-w-4xl mx-auto font-body">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      <div className="text-[14px] prose prose-slate max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{

            code({ node, className, children, ...props }) {
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "";

  const isInline = !className?.startsWith("language-");

  return !isInline ? (
    <CodeBlock
      code={String(children).replace(/\n$/, "")}
      language={language}
    />
  ) : (
    <code
      className="px-1 py-0.5 bg-[#34D399]/10 text-[#0E1116] rounded text-sm"
      {...props}
    >
      {children}
    </code>
  );
},


            p({ children }) {
              return <p className="mb-4 leading-6 text-[#1E2430]">{children}</p>;
            },

            strong({ children }) {
              return <strong className="text-[#0E1116]">{children}</strong>;
            },

            em({ children }) {
              return <em>{children}</em>;
            },

            ul({ children }) {
              return (
                <ul className="list-disc pl-6 space-y-2 my-4">
                  {children}
                </ul>
              );
            },

            ol({ children }) {
              return (
                <ol className="list-decimal pl-6 space-y-2 my-4">
                  {children}
                </ol>
              );
            },

            li({ children }) {
              return <li className="mb-1 text-[#1E2430]">{children}</li>;
            },

            blockquote({ children }) {
              return (
                <blockquote className="border-l-4 border-[#34D399] bg-[#34D399]/[0.06] pl-4 py-1 italic my-4 text-[#5B6472]">
                  {children}
                </blockquote>
              );
            },

            h1({ children }) {
              return (
                <h1 className="font-display text-2xl font-bold mt-6 mb-4 text-[#0E1116]">
                  {children}
                </h1>
              );
            },

            h2({ children }) {
              return (
                <h2 className="font-display text-xl font-bold mt-6 mb-3 text-[#0E1116]">
                  {children}
                </h2>
              );
            },

            h3({ children }) {
              return (
                <h3 className="font-display text-lg font-bold mt-5 mb-2 text-[#0E1116]">
                  {children}
                </h3>
              );
            },

            h4({ children }) {
              return (
                <h4 className="font-display text-base font-bold mt-4 mb-2 text-[#0E1116]">
                  {children}
                </h4>
              );
            },

            a({ children, href }) {
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#34D399] hover:text-[#28b981] underline underline-offset-2"
                >
                  {children}
                </a>
              );
            },

            table({ children }) {
              return (
                <div className="overflow-x-auto my-4 rounded-lg border border-[#0E1116]/[0.08]">
                  <table className="min-w-full divide-y divide-[#0E1116]/[0.08]">
                    {children}
                  </table>
                </div>
              );
            },

            thead({ children }) {
              return <thead className="bg-[#34D399]/[0.08]">{children}</thead>;
            },

            tbody({ children }) {
              return (
                <tbody className="divide-y divide-[#0E1116]/[0.06]">
                  {children}
                </tbody>
              );
            },

            tr({ children }) {
              return <tr>{children}</tr>;
            },

            th({ children }) {
              return (
                <th className="px-3 py-2 text-left text-xs font-semibold text-[#0E1116] uppercase tracking-wider">
                  {children}
                </th>
              );
            },

            td({ children }) {
              return (
                <td className="px-3 py-2 text-sm text-[#1E2430]">
                  {children}
                </td>
              );
            },

            hr() {
              return <hr className="my-6 border-[#0E1116]/10" />;
            },

            img({ src, alt }) {
              return (
                <img
                  src={src}
                  alt={alt}
                  className="rounded-lg my-4 max-w-full h-auto border border-[#0E1116]/[0.06]"
                />
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="relative my-6 rounded-lg overflow-hidden bg-[#F7F5F0] border border-[#0E1116]/10">
      <div className="flex items-center justify-between px-4 py-2 bg-[#0E1116] border-b border-[#0E1116]/10">
        <div className="flex items-center space-x-2">
          <LuCode className="text-[#34D399]" />
          <span className="text-xs font-semibold text-white/70 uppercase tracking-wide">
            {language || "Code"}
          </span>
        </div>

        <button
          onClick={copyCode}
          className="text-white/60 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34D399] rounded"
        >
          {copied ? (
            <LuCheck size={16} className="text-[#34D399]" />
          ) : (
            <LuCopy size={16} />
          )}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneLight}
        customStyle={{
          fontSize: 12.5,
          margin: 0,
          padding: "1rem",
          background: "transparent",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default AIResponsePreview;