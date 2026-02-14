import React from 'react';
import { Message, Role, ActionButton } from '../types';
import { User, Bot, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  onActionClick?: (value: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onActionClick }) => {
  const isUser = message.role === Role.USER;
  const isError = message.isError;

  // Custom renderer to handle highlighting and headers without external markdown library
  const renderStyledText = (text: string) => {
    // Split by lines first to handle block elements like headers
    const lines = text.split('\n');
    
    return lines.map((line, lineIndex) => {
      // Handle Headers (## Title)
      if (line.trim().startsWith('##')) {
        const content = line.replace(/^##\s*/, '');
        return (
          <div key={lineIndex} className="mt-5 mb-2 first:mt-0">
             <h3 className="text-[15px] md:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-100 pl-3 border-l-4 border-cyan-500 inline-block py-0.5">
              {content}
             </h3>
          </div>
        );
      }

      // Handle Bold (**Text**) as Highlighter
      // Split line by bold syntax
      const parts = line.split(/(\*\*.*?\*\*)/g);
      
      return (
        <div key={lineIndex} className="min-h-[1.5em] leading-7">
          {parts.map((part, partIndex) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              const content = part.slice(2, -2);
              return (
                <span key={partIndex} className="mx-1 px-1.5 py-0.5 rounded text-cyan-300 font-bold bg-cyan-950/80 border border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.1)] text-[0.95em]">
                  {content}
                </span>
              );
            }
            return <span key={partIndex}>{part}</span>;
          })}
        </div>
      );
    });
  };

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      <div className={`flex flex-col max-w-[85%] md:max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
          
          {/* Avatar */}
          <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center shadow-lg border backdrop-blur-sm ${
            isUser 
              ? 'bg-cyan-600/20 border-cyan-500/30 text-cyan-300' 
              : isError 
                ? 'bg-red-900/20 border-red-500/30 text-red-400' 
                : 'bg-slate-800/50 border-slate-700/50 text-indigo-300'
          }`}>
            {isUser ? (
              <User className="w-5 h-5" />
            ) : isError ? (
              <AlertTriangle className="w-5 h-5" />
            ) : (
              <Bot className="w-5 h-5" />
            )}
          </div>

          {/* Message Content */}
          <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
            <div className={`
              py-3.5 px-5 rounded-2xl text-sm md:text-[15px] shadow-md border backdrop-blur-sm
              ${isUser 
                ? 'bg-gradient-to-br from-cyan-600 to-blue-600 text-white border-cyan-400/20 rounded-tr-none' 
                : isError
                  ? 'bg-red-950/40 text-red-200 border-red-500/30 rounded-tl-none'
                  : 'bg-slate-900/60 text-slate-200 border-slate-700/50 rounded-tl-none'}
            `}>
              {isUser ? (
                <div className="whitespace-pre-wrap leading-7">{message.text}</div>
              ) : (
                <div className="text-slate-200">
                  {renderStyledText(message.text)}
                </div>
              )}
            </div>
            
            {/* Timestamp */}
            <span className="text-[11px] text-slate-500 mt-1.5 px-1 font-mono">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        {message.actions && message.actions.length > 0 && (
           <div className="mt-3 ml-12 flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-2 duration-500">
             {message.actions.map((action, idx) => (
               <button
                 key={idx}
                 onClick={() => onActionClick?.(action.value)}
                 className={`
                   flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg
                   ${action.type === 'primary' 
                     ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-900 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]' 
                     : 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:bg-slate-700/50 hover:text-slate-300'}
                 `}
               >
                 {action.value === 'YES_DIAGNOSIS' ? <CheckCircle className="w-4 h-4" /> : null}
                 {action.value === 'NO_DIAGNOSIS' ? <XCircle className="w-4 h-4" /> : null}
                 {action.label}
               </button>
             ))}
           </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;