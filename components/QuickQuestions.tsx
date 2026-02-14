import React from 'react';
import { BotMode } from '../types';
import { SUGGESTED_QUESTIONS } from '../constants';
import { MessageCircleQuestion, Sparkles } from 'lucide-react';

interface QuickQuestionsProps {
  mode: BotMode;
  onSelect: (text: string) => void;
}

const QuickQuestions: React.FC<QuickQuestionsProps> = ({ mode, onSelect }) => {
  const questions = SUGGESTED_QUESTIONS[mode];
  
  // Split questions into two rows for visual interest
  const mid = Math.ceil(questions.length / 2);
  const row1 = questions.slice(0, mid);
  const row2 = questions.slice(mid);
  
  // Duplicate for seamless loop
  const marqueeRow1 = [...row1, ...row1, ...row1, ...row1];
  const marqueeRow2 = [...row2, ...row2, ...row2, ...row2];

  return (
    <div className="w-full flex flex-col items-center justify-center py-10 animate-in fade-in duration-700">
      <div className="text-center mb-8 relative z-10">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-950/50 mb-3 border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.15)] animate-bounce" style={{ animationDuration: '3s' }}>
            <Sparkles className="w-6 h-6 text-cyan-400" />
        </div>
        <h3 className="text-lg font-bold text-white mb-1 tracking-tight">
          무엇을 도와드릴까요?
        </h3>
        <p className="text-slate-400 text-xs">
          법령 위반이 걱정되시나요? 아래 질문을 클릭해보세요.
        </p>
      </div>

      <div className="marquee-container w-full max-w-4xl relative">
        {/* Row 1 - Moving Left */}
        <div className="marquee-track animate-marquee hover:[animation-play-state:paused]">
          {marqueeRow1.map((q, idx) => (
            <button
              key={`r1-${idx}`}
              onClick={() => onSelect(q)}
              className="flex-shrink-0 bg-slate-800/60 hover:bg-cyan-900/40 border border-slate-700 hover:border-cyan-500/50 rounded-full px-5 py-2.5 transition-all duration-300 text-slate-300 hover:text-cyan-300 text-sm whitespace-nowrap shadow-sm backdrop-blur-sm"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Row 2 - Moving Right (Reverse) */}
        <div className="marquee-track animate-marquee-reverse hover:[animation-play-state:paused]">
          {marqueeRow2.map((q, idx) => (
            <button
              key={`r2-${idx}`}
              onClick={() => onSelect(q)}
              className="flex-shrink-0 bg-slate-800/60 hover:bg-cyan-900/40 border border-slate-700 hover:border-cyan-500/50 rounded-full px-5 py-2.5 transition-all duration-300 text-slate-300 hover:text-cyan-300 text-sm whitespace-nowrap shadow-sm backdrop-blur-sm"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickQuestions;