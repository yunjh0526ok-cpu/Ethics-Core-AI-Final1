import React from 'react';
import { BotMode } from '../types';
import { MODES, MODE_ORDER, APP_NAME, SUB_TITLE } from '../constants';
import { Scale, Building, Book, ArrowRight, ShieldCheck } from 'lucide-react';

interface ModeSelectorProps {
  onSelectMode: (mode: BotMode) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ onSelectMode }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'scale': return <Scale className="w-8 h-8 text-cyan-300" />;
      case 'building': return <Building className="w-8 h-8 text-cyan-300" />;
      case 'book': return <Book className="w-8 h-8 text-cyan-300" />;
      default: return <ShieldCheck className="w-8 h-8 text-cyan-300" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6 overflow-y-auto">
      {/* Header Section */}
      <div className="text-center mb-10 animate-fade-in-down">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-cyan-400 text-sm tracking-widest font-semibold uppercase">{SUB_TITLE}</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight leading-tight text-glow">
          INTEGRITY INTELLIGENCE
        </h1>
        <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto font-light">
          조직의 미래를 바꾸는 <span className="text-cyan-300 font-semibold">Ethics-Core AI</span> 혁신 파트너
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl w-full">
        {MODE_ORDER.map((mode) => (
          <div 
            key={mode}
            onClick={() => onSelectMode(mode)}
            className="group relative cursor-pointer glass-card rounded-2xl p-8 transition-all duration-300 hover:bg-slate-800/80 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] flex flex-col justify-between min-h-[340px]"
          >
            <div>
              <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-6 group-hover:border-cyan-500/50 transition-colors">
                {getIcon(MODES[mode].icon)}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {MODES[mode].title}
              </h3>
              <p className="text-xs font-bold text-cyan-600 mb-4 tracking-wider uppercase">
                {MODES[mode].subtitle}
              </p>
              
              <p className="text-slate-400 text-sm leading-relaxed mb-6 break-keep">
                {MODES[mode].description}
              </p>
            </div>

            <div className="flex items-center justify-between text-slate-300 text-sm font-medium group-hover:text-cyan-300 transition-colors border-t border-slate-800 pt-6">
              <span>상담 시작</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>

            {/* Hover Gradient Border Effect */}
            <div className="absolute inset-0 rounded-2xl border border-cyan-500/0 group-hover:border-cyan-500/30 transition-all pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModeSelector;