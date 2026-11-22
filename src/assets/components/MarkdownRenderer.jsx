import React from "react";

/**
 * Editorial Markdown Renderer
 * Designed for Java / Backend Engineering technical writeups.
 * Parses and renders Markdown with dark editorial styling, code blocks, tables,
 * lists, blockquotes, and inline formatting without external runtime dependencies.
 */

function parseInline(text) {
  if (!text) return null;

  // Split tokens by inline patterns: code `...`, bold **...**, italic *...*, links [...](...)
  const tokens = [];
  const regex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  let lastIdx = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      tokens.push(text.substring(lastIdx, match.index));
    }

    const matched = match[0];
    if (matched.startsWith("`") && matched.endsWith("`")) {
      tokens.push(
        <code
          key={match.index}
          className="rounded bg-[#1A1A1A] border border-[#262626] px-1.5 py-0.5 font-mono text-xs text-[#BEF264]"
        >
          {matched.slice(1, -1)}
        </code>
      );
    } else if (matched.startsWith("**") && matched.endsWith("**")) {
      tokens.push(
        <strong key={match.index} className="font-semibold text-[#F5F5F5]">
          {matched.slice(2, -2)}
        </strong>
      );
    } else if (matched.startsWith("*") && matched.endsWith("*")) {
      tokens.push(
        <em key={match.index} className="italic text-[#F5F5F5]">
          {matched.slice(1, -1)}
        </em>
      );
    } else if (matched.startsWith("[") && matched.includes("](")) {
      const closingBracket = matched.indexOf("]");
      const linkText = matched.substring(1, closingBracket);
      const linkUrl = matched.substring(closingBracket + 2, matched.length - 1);
      const isInternal = linkUrl.startsWith("/") || linkUrl.includes("gulrezsarankar.info");

      tokens.push(
        <a
          key={match.index}
          href={linkUrl}
          target={isInternal ? undefined : "_blank"}
          rel={isInternal ? undefined : "noopener noreferrer"}
          className="text-[#A3E635] underline underline-offset-4 hover:text-white transition-colors"
        >
          {linkText}
        </a>
      );
    }

    lastIdx = regex.lastIndex;
  }

  if (lastIdx < text.length) {
    tokens.push(text.substring(lastIdx));
  }

  return tokens.length === 1 ? tokens[0] : tokens;
}

export default function MarkdownRenderer({ content }) {
  if (!content || typeof content !== "string") return null;

  const lines = content.split(/\r?\n/);
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // Fenced Code Block: ```lang ... ```
    if (trimmed.startsWith("```")) {
      const lang = trimmed.slice(3).trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      blocks.push({
        type: "code",
        lang: lang || "text",
        code: codeLines.join("\n"),
      });
      continue;
    }

    // Markdown Table: lines starting and ending with |
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith("|") && lines[i].trim().endsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        const parseRow = (row) =>
          row
            .slice(1, -1)
            .split("|")
            .map((c) => c.trim());

        const headers = parseRow(tableLines[0]);
        // line 1 is separator |---|---|
        const rows = tableLines.slice(2).map(parseRow);

        blocks.push({
          type: "table",
          headers,
          rows,
        });
        continue;
      }
    }

    // Headings
    if (trimmed.startsWith("#### ")) {
      blocks.push({ type: "h4", text: trimmed.slice(5) });
      i++;
      continue;
    }
    if (trimmed.startsWith("### ")) {
      blocks.push({ type: "h3", text: trimmed.slice(4) });
      i++;
      continue;
    }
    if (trimmed.startsWith("## ")) {
      blocks.push({ type: "h2", text: trimmed.slice(3) });
      i++;
      continue;
    }
    if (trimmed.startsWith("# ")) {
      blocks.push({ type: "h1", text: trimmed.slice(2) });
      i++;
      continue;
    }

    // Blockquote: lines starting with >
    if (trimmed.startsWith(">")) {
      const quoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      blocks.push({ type: "blockquote", text: quoteLines.join(" ") });
      continue;
    }

    // Unordered List: lines starting with - or *
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const items = [];
      while (i < lines.length && (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    // Ordered List: lines starting with 1. 2. etc.
    if (/^\d+\.\s/.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i++;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    // Social Hashtags Line: #Java #SpringBoot #Backend
    if (trimmed.startsWith("#") && !trimmed.startsWith("# ") && trimmed.includes("#")) {
      const tags = trimmed.split(/\s+/).filter((t) => t.startsWith("#"));
      blocks.push({ type: "tags", tags });
      i++;
      continue;
    }

    // Regular Paragraph
    const pLines = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith("#") &&
      !lines[i].trim().startsWith("- ") &&
      !lines[i].trim().startsWith("* ") &&
      !lines[i].trim().startsWith("|") &&
      !lines[i].trim().startsWith("```") &&
      !lines[i].trim().startsWith(">") &&
      !/^\d+\.\s/.test(lines[i].trim())
    ) {
      pLines.push(lines[i].trim());
      i++;
    }
    blocks.push({ type: "p", text: pLines.join(" ") });
  }

  // Filter out leading H1 if it matches the first block (since hero already has H1)
  const renderBlocks = blocks.filter((b, idx) => !(idx === 0 && b.type === "h1"));

  return (
    <div className="mt-8 space-y-6 text-[#A1A1A1]">
      {renderBlocks.map((block, idx) => {
        switch (block.type) {
          case "h1":
            return (
              <h2
                key={idx}
                className="mt-10 mb-4 font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#F5F5F5] pt-6 border-t border-[#262626]"
              >
                {parseInline(block.text)}
              </h2>
            );
          case "h2":
            return (
              <div
                key={idx}
                className="mt-10 pt-6 border-t border-[#262626] first:border-t-0 first:pt-0"
              >
                <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-[#F5F5F5] flex items-center gap-2.5">
                  <span className="text-[#A3E635] font-mono text-sm">§</span>
                  <span>{parseInline(block.text)}</span>
                </h2>
              </div>
            );
          case "h3":
            return (
              <h3
                key={idx}
                className="mt-6 mb-2 font-heading text-lg sm:text-xl font-bold text-[#F5F5F5]"
              >
                {parseInline(block.text)}
              </h3>
            );
          case "h4":
            return (
              <h4
                key={idx}
                className="mt-4 mb-2 font-heading text-base font-semibold text-[#A3E635]"
              >
                {parseInline(block.text)}
              </h4>
            );
          case "p":
            return (
              <p
                key={idx}
                className="text-sm sm:text-base leading-relaxed text-[#A1A1A1]"
              >
                {parseInline(block.text)}
              </p>
            );
          case "ul":
            return (
              <ul key={idx} className="my-4 space-y-2 text-sm sm:text-base text-[#A1A1A1]">
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A3E635]" />
                    <span className="leading-relaxed">{parseInline(item)}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={idx} className="my-4 space-y-2 text-sm sm:text-base text-[#A1A1A1]">
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2.5">
                    <span className="font-mono text-xs font-semibold text-[#A3E635] shrink-0 mt-0.5">
                      {itemIdx + 1}.
                    </span>
                    <span className="leading-relaxed">{parseInline(item)}</span>
                  </li>
                ))}
              </ol>
            );
          case "blockquote":
            return (
              <blockquote
                key={idx}
                className="my-4 border-l-2 border-[#A3E635] bg-[#141414] py-3 px-4 rounded-r-lg text-sm sm:text-base italic text-[#F5F5F5]"
              >
                {parseInline(block.text)}
              </blockquote>
            );
          case "code":
            return (
              <div
                key={idx}
                className="my-6 rounded-xl border border-[#262626] bg-[#0D0D0D] overflow-hidden"
              >
                {block.lang && (
                  <div className="flex items-center justify-between px-4 py-2 border-b border-[#262626] bg-[#141414] text-[11px] font-mono text-[#A1A1A1]">
                    <span className="uppercase tracking-wider">{block.lang}</span>
                    <span className="text-[10px] text-[#666666]">Read-only snippet</span>
                  </div>
                )}
                <pre className="p-4 overflow-x-auto font-mono text-xs text-[#BEF264] leading-relaxed">
                  <code>{block.code}</code>
                </pre>
              </div>
            );
          case "table":
            return (
              <div
                key={idx}
                className="my-6 overflow-x-auto rounded-xl border border-[#262626] bg-[#141414]"
              >
                <table className="w-full text-left text-sm text-[#F5F5F5]">
                  <thead className="bg-[#1A1A1A] border-b border-[#262626] text-xs font-mono text-[#A3E635]">
                    <tr>
                      {block.headers.map((h, hIdx) => (
                        <th key={hIdx} className="px-4 py-3 font-semibold">
                          {parseInline(h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#262626]">
                    {block.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className="hover:bg-[#1A1A1A]/40 transition-colors"
                      >
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="px-4 py-3 text-xs sm:text-sm">
                            {parseInline(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "tags":
            return (
              <div
                key={idx}
                className="my-8 flex flex-wrap gap-2 pt-6 border-t border-[#262626]"
              >
                {block.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="rounded-md bg-[#1A1A1A] border border-[#262626] px-2.5 py-1 text-xs font-mono text-[#A3E635]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
