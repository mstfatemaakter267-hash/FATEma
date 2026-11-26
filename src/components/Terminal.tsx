import { useEffect, useState } from 'react';
import { Check, Copy, Terminal as TerminalIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { DEVELOPER_ACTIVITY } from '../data/experience';

export function Terminal() {
  const [activeCmdIndex, setActiveCmdIndex] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentCmd = DEVELOPER_ACTIVITY.terminalCommands[activeCmdIndex];

  useEffect(() => {
    setVisibleLines(0);
    const total = currentCmd.output.length;
    let count = 0;

    const timer = window.setInterval(() => {
      count += 1;
      setVisibleLines(count);
      if (count >= total) {
        window.clearInterval(timer);
      }
    }, 110);

    return () => window.clearInterval(timer);
  }, [activeCmdIndex, currentCmd.output.length]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `$ ${currentCmd.command}\n${currentCmd.output.join('\n')}`
      );
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unsupported
    }
  };

  return (
    <div className="glass-card overflow-hidden rounded-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.1] bg-black/20 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <TerminalIcon className="h-4 w-4 text-[#FB7185]" aria-hidden="true" />
          <span className="font-mono text-xs text-[#F8FAFC]">
            fatema-workspace — bash
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {DEVELOPER_ACTIVITY.terminalCommands.map((cmd, idx) => (
            <button
              key={cmd.command}
              type="button"
              onClick={() => setActiveCmdIndex(idx)}
              className={`rounded-lg px-2.5 py-1 font-mono text-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                idx === activeCmdIndex
                  ? 'bg-[#9F1239] text-[#F8FAFC] border border-[#BE123C]/60'
                  : 'text-[#D2B6BE] hover:bg-white/[0.05] hover:text-[#FB7185]'
              }`}
            >
              {cmd.label}
            </button>
          ))}

          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy terminal output"
            className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-lg glass-inset text-[#D2B6BE] transition-colors hover:text-[#FB7185] cursor-pointer"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-[#FB7185]" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      <div className="min-h-[190px] p-5 font-mono text-xs leading-relaxed sm:text-sm">
        <div className="flex items-center gap-2 text-[#FB7185]">
          <span className="text-[#FDA4AF]">fatema@dhaka</span>
          <span className="text-[#D2B6BE]">:~$</span>
          <span className="text-[#F8FAFC]">{currentCmd.command}</span>
        </div>

        <div className="mt-3 space-y-1.5">
          {currentCmd.output.slice(0, visibleLines).map((line, idx) => (
            <motion.p
              key={`${currentCmd.command}-${idx}`}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.18 }}
              className="text-[#D2B6BE]"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
}
