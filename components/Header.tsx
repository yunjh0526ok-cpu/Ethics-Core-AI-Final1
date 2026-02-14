import React from 'react';
import { BotMode } from '../types';
import { MODES, APP_NAME } from '../constants';
import { ArrowLeft, Shield } from 'lucide-react';

interface HeaderProps {
  currentMode: BotMode | null;
  onBack: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentMode, onBack }) => {
  const modeInfo = currentMode ? MODES[currentMode] : null;

  return (
    <header className="glass-header sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {currentMode ? (
            <button 
              onClick={onBack}
              className="p-2 -ml-2 text-slate-400 hover:text-cyan-300 hover:bg-slate-800/50 rounded-full transition-colors"
              title="메인으로 돌아가기"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
             <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/20">
               <Shield className="w-5 h-5 text-cyan-400" />
             </div>
          )}
          
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-slate-100 tracking-tight leading-tight flex items-center gap-2">
              {currentMode ? modeInfo?.title : APP_NAME}
              {currentMode && <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-900/50 text-cyan-300 border border-cyan-500/20">AI 연결됨</span>}
            </h1>
            <span className="text-xs text-slate-500 font-medium tracking-wide">
              {currentMode ? modeInfo?.subtitle : '청렴공정AI센터'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;