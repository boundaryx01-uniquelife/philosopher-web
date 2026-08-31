import React, { useRef, useEffect } from 'react';
import { BookOpen, User, Bot, Sparkles, Heart } from 'lucide-react';

export default function MessageList({ messages, isThinking, philosopher, onViewContext }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem'
    }}>
      {/* 웰컴 메시지 (대화가 비어 있을 때) */}
      {messages.length === 0 && (
        <div style={{
          textAlign: 'center',
          margin: 'auto 0',
          padding: '2rem 1rem',
          color: 'var(--text-secondary)'
        }} className="animate-fade-in">
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            background: 'var(--active-theme)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            fontSize: '1.75rem',
            color: '#111827',
            fontWeight: 700,
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
          }}>
            {philosopher.name[0]}
          </div>
          <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '0.5rem', fontWeight: 700 }}>
            {philosopher.name}와의 대화
          </h3>
          <p style={{ fontSize: '0.925rem', maxWidth: '440px', margin: '0 auto', lineHeight: 1.6 }}>
            마음속에 머무는 어떤 이야기든 편안하게 들려주세요. 당신의 감정과 고민을 온전히 마주하며 진심 어린 사색의 대화를 나누겠습니다.
          </p>
        </div>
      )}

      {/* 메시지 스트림 */}
      {messages.map((msg, index) => {
        const isUser = msg.role === 'user';
        return (
          <div 
            key={index} 
            className="animate-fade-in"
            style={{
              display: 'flex',
              justifyContent: isUser ? 'flex-end' : 'flex-start',
              gap: '0.75rem'
            }}
          >
            {/* 철학자 프로필 아이콘 */}
            {!isUser && (
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'var(--active-theme)',
                color: '#111827',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.9rem',
                flexShrink: 0,
                marginTop: '4px'
              }}>
                {philosopher.name[0]}
              </div>
            )}

            {/* 말풍선 버블 */}
            <div style={{
              maxWidth: '82%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: isUser ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                padding: '1rem 1.25rem',
                borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                background: isUser 
                  ? 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)' 
                  : 'rgba(28, 33, 53, 0.85)',
                border: isUser ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                fontSize: '0.95rem',
                lineHeight: 1.7,
                boxShadow: isUser 
                  ? '0 4px 14px rgba(59, 130, 246, 0.3)' 
                  : '0 4px 16px rgba(0, 0, 0, 0.3)',
                whiteSpace: 'pre-wrap'
              }}>
                {msg.content}
              </div>

              {/* RAG 원문 참고 구절 보기 단추 (AI 답변일 때) */}
              {!isUser && msg.retrieved_context && msg.retrieved_context.length > 0 && (
                <button
                  onClick={() => onViewContext(msg.retrieved_context)}
                  style={{
                    marginTop: '6px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '4px 10px',
                    fontSize: '0.775rem',
                    color: 'var(--active-theme)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                >
                  <BookOpen size={13} />
                  <span>철학자의 원문 참고 구절 보기 ({msg.retrieved_context.length})</span>
                </button>
              )}
            </div>

            {/* 사용자 프로필 아이콘 */}
            {isUser && (
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(255,255,255,0.1)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '4px'
              }}>
                <User size={18} />
              </div>
            )}
          </div>
        );
      })}

      {/* 생각하는 중 감성 타이핑 물결 애니메이션 */}
      {isThinking && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="animate-fade-in">
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'var(--active-theme)',
            color: '#111827',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '0.9rem'
          }}>
            {philosopher.name[0]}
          </div>
          <div style={{
            padding: '0.8rem 1.15rem',
            borderRadius: '18px 18px 18px 4px',
            background: 'rgba(28, 33, 53, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--text-secondary)',
            fontSize: '0.875rem'
          }}>
            <Sparkles size={14} color="var(--active-theme)" />
            <span>{philosopher.name}가 당신의 마음에 귀 기울이며 깊이 사색하는 중입니다</span>
            <span style={{ display: 'inline-flex', gap: '3px', marginLeft: '4px' }}>
              <span style={{ animation: 'waveDots 1.4s infinite 0s' }}>.</span>
              <span style={{ animation: 'waveDots 1.4s infinite 0.2s' }}>.</span>
              <span style={{ animation: 'waveDots 1.4s infinite 0.4s' }}>.</span>
            </span>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
