import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import MessageBubble from './components/MessageBubble';
import InputArea from './components/InputArea';
import ModeSelector from './components/ModeSelector';
import QuickQuestions from './components/QuickQuestions';
import Layout from './components/Layout';
import { Message, Role, BotMode } from './types';
import { GET_INITIAL_GREETING, GET_SYSTEM_INSTRUCTION } from './constants';
import { generateEcaResponse } from './services/geminiService';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedMode, setSelectedMode] = useState<BotMode | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reset chat when mode changes
  const handleSelectMode = (mode: BotMode) => {
    setSelectedMode(mode);
    setMessages([{
      id: 'init-1',
      role: Role.MODEL,
      text: GET_INITIAL_GREETING(mode),
      timestamp: new Date()
    }]);
  };

  const handleBackToMain = () => {
    setSelectedMode(null);
    setMessages([]);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!selectedMode) return;

    // Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      text: text,
      timestamp: new Date()
    };
    
    // Remove actions from previous messages to prevent re-clicking
    const previousMessages = messages.map(m => ({ ...m, actions: undefined }));
    const updatedMessages = [...previousMessages, userMsg];
    
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const systemInstruction = GET_SYSTEM_INSTRUCTION(selectedMode);
      const responseText = await generateEcaResponse(updatedMessages, text, systemInstruction);

      // Check if the response includes the specific prompt for deep consultation
      const isDeepConsultationPrompt = responseText.includes("[AI심층상담Start]");

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: Role.MODEL,
        text: responseText,
        timestamp: new Date(),
        actions: isDeepConsultationPrompt ? [
          { label: "AI심층상담Start", value: "START_DEEP_CONSULTATION", type: 'primary' }
        ] : undefined
      };
      setMessages(prev => [...prev, aiMsg]);

    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: Role.MODEL,
        text: "시스템 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (value: string) => {
    if (value === 'START_DEEP_CONSULTATION') {
      // Trigger deep consultation with professional phrasing
      handleSendMessage("앞선 답변에 대해 현행 법령과 최신 판례, 구체적인 징계 기준을 토대로 정밀 분석해 주세요. (전문 심층 진단 요청)");
    }
  };

  // Determine if we are in the "initial state" (only one message which is the greeting)
  const isInitialState = selectedMode && messages.length === 1;

  return (
    <Layout>
      <Header currentMode={selectedMode} onBack={handleBackToMain} />

      {!selectedMode ? (
        <main className="flex-1 overflow-hidden relative">
          <ModeSelector onSelectMode={handleSelectMode} />
        </main>
      ) : (
        <>
          <main className="flex-1 overflow-y-auto relative scroll-smooth">
            {/* min-h-full to ensure proper scrolling */}
            <div className={`max-w-4xl mx-auto min-h-full flex flex-col ${isInitialState ? 'justify-center' : 'justify-end p-4 md:p-6'}`}>
               
               {/* If initial state, show Quick Questions prominently in the center */}
               {isInitialState ? (
                 <div className="flex flex-col items-center w-full h-full justify-center">
                    {/* Greeting Bubble */}
                    <div className="mb-8 max-w-2xl w-full animate-fade-in-down">
                        <MessageBubble message={messages[0]} />
                    </div>
                    
                    {/* Floating Q&A Menu */}
                    <QuickQuestions 
                      mode={selectedMode} 
                      onSelect={handleSendMessage} 
                    />
                 </div>
               ) : (
                 /* Standard Chat Flow */
                 <>
                   {/* Messages */}
                   <div className="flex-1">
                      {messages.map((msg) => (
                        <MessageBubble 
                          key={msg.id} 
                          message={msg} 
                          onActionClick={handleActionClick}
                        />
                      ))}
                   </div>
                   
                   {/* Loading Indicator */}
                   {isLoading && (
                    <div className="flex justify-start w-full mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center shadow-lg backdrop-blur-sm">
                          <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
                        </div>
                        <div className="bg-slate-900/60 border border-slate-700/50 py-3 px-5 rounded-2xl rounded-tl-none shadow-md text-sm text-cyan-400/80 animate-pulse backdrop-blur-sm">
                          Ethics-CoreAI가 최신 법령과 판례 및 처벌사례를 분석중입니다...
                        </div>
                      </div>
                    </div>
                  )}
                 </>
               )}

               <div ref={messagesEndRef} />
            </div>
          </main>
          <InputArea onSendMessage={handleSendMessage} isLoading={isLoading} />
        </>
      )}
    </Layout>
  );
};

export default App;