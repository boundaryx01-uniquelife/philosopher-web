import React, { useState, useEffect } from 'react';
import PhilosopherSelector from './components/PhilosopherSelector';
import ChatHeader from './components/ChatHeader';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import ContextModal from './components/ContextModal';
import { fetchPhilosophers, sendChatMessageStream } from './services/api';

const DEFAULT_PHILOSOPHERS = [
  { id: 'nietzsche', name: '프리드리히 니체', description: '운명을 사랑하고 고통을 극복하는 강인한 초인의 삶을 이야기합니다.' },
  { id: 'schopenhauer', name: '아르투어 쇼펜하우어', description: '삶의 고통을 직시하고, 고독의 가치와 냉철한 현실을 바라보게 합니다.' },
  { id: 'epictetus', name: '에픽테토스', description: '통제할 수 없는 것에 집착하지 않고, 내면의 평정을 지키는 스토아 철학을 나눕니다.' },
  { id: 'socrates', name: '소크라테스', description: '스스로 질문을 던져 무지를 깨닫고 참된 진리를 찾아가도록 이끕니다.' },
  { id: 'confucius', name: '공자', description: '인(仁)과 예(禮)를 바탕으로 마음을 다스리고 내면의 중용을 찾도록 돕습니다.' }
];

export default function App() {
  const [philosophers, setPhilosophers] = useState(DEFAULT_PHILOSOPHERS);
  const [selectedPhilosopher, setSelectedPhilosopher] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [activeContext, setActiveContext] = useState(null);

  useEffect(() => {
    fetchPhilosophers()
      .then(data => {
        if (data && data.length > 0) setPhilosophers(data);
      })
      .catch(err => {
        console.warn('Backend API connects via fallback list:', err);
      });
  }, []);

  useEffect(() => {
    if (selectedPhilosopher) {
      const themeVarMap = {
        nietzsche: 'var(--theme-nietzsche)',
        schopenhauer: 'var(--theme-schopenhauer)',
        epictetus: 'var(--theme-epictetus)',
        socrates: 'var(--theme-socrates)',
        confucius: 'var(--theme-confucius)'
      };
      const newTheme = themeVarMap[selectedPhilosopher.id] || 'var(--theme-nietzsche)';
      document.documentElement.style.setProperty('--active-theme', newTheme);
    }
  }, [selectedPhilosopher]);

  // 실시간 스트리밍 타자기 이펙트 메시지 전송 로직
  const handleSendMessage = async (text) => {
    if (!text.trim() || !selectedPhilosopher) return;

    const userMsg = { role: 'user', content: text };
    const historyForBackend = [...messages];
    const updatedMessages = [...messages, userMsg];
    
    setMessages(updatedMessages);
    setIsThinking(true);

    const aiMsgIndex = updatedMessages.length;
    let accumulatedContent = '';
    let currentRetrievedContext = [];

    try {
      await sendChatMessageStream(
        selectedPhilosopher.id,
        text,
        historyForBackend,
        (retrieved_context) => {
          currentRetrievedContext = retrieved_context;
        },
        (chunkText) => {
          setIsThinking(false);
          accumulatedContent += chunkText;
          setMessages(prev => {
            const next = [...prev];
            next[aiMsgIndex] = {
              role: 'model',
              content: accumulatedContent,
              retrieved_context: currentRetrievedContext
            };
            return next;
          });
        }
      );
    } catch (error) {
      console.error('Streaming chat error:', error);
      setIsThinking(false);
      const errorMsg = {
        role: 'model',
        content: `[오류] 대화를 나누는 중 에러가 발생했습니다: ${error.message}\n백엔드 API 서버가 실행 중인지 확인해 주세요.`
      };
      setMessages([...updatedMessages, errorMsg]);
    }
  };

  return (
    <div style={{ 
      height: '100dvh', 
      maxHeight: '100dvh', 
      display: 'flex', 
      flexDirection: 'column', 
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="ambient-bg" />

      {!selectedPhilosopher ? (
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <PhilosopherSelector
            philosophers={philosophers}
            onSelectPhilosopher={(phil) => {
              setSelectedPhilosopher(phil);
              setMessages([]);
            }}
          />
        </div>
      ) : (
        <div style={{
          maxWidth: '840px',
          width: '100%',
          height: '100dvh',
          maxHeight: '100dvh',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden'
        }}>
          <ChatHeader
            philosopher={selectedPhilosopher}
            onBack={() => setSelectedPhilosopher(null)}
            onResetChat={() => setMessages([])}
          />

          <MessageList
            messages={messages}
            isThinking={isThinking}
            philosopher={selectedPhilosopher}
            onViewContext={(ctx) => setActiveContext(ctx)}
          />

          <MessageInput
            philosopherId={selectedPhilosopher.id}
            onSendMessage={handleSendMessage}
            disabled={isThinking}
          />
        </div>
      )}

      {activeContext && (
        <ContextModal
          contexts={activeContext}
          philosopherName={selectedPhilosopher?.name || '철학자'}
          onClose={() => setActiveContext(null)}
        />
      )}
    </div>
  );
}
