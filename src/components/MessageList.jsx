import React, { useRef, useEffect } from 'react';
import { BookOpen, User, Sparkles, Quote, Feather, HeartHandshake } from 'lucide-react';

const PHILOSOPHER_ICONS = {
  nietzsche: { icon: Sparkles, color: 'var(--theme-nietzsche)', bg: 'rgba(245, 158, 11, 0.15)', symbolTitle: '극복과 아모르파티' },
  schopenhauer: { icon: Quote, color: 'var(--theme-schopenhauer)', bg: 'rgba(59, 130, 246, 0.15)', symbolTitle: '고독과 현실 직시' },
  epictetus: { icon: Feather, color: 'var(--theme-epictetus)', bg: 'rgba(16, 185, 129, 0.15)', symbolTitle: '스토아 평정심' },
  socrates: { icon: BookOpen, color: 'var(--theme-socrates)', bg: 'rgba(168, 85, 247, 0.15)', symbolTitle: '문답과 성찰' },
  confucius: { icon: HeartHandshake, color: 'var(--theme-confucius)', bg: 'rgba(234, 179, 8, 0.15)', symbolTitle: '인(仁)과 중용' }
};

export default function MessageList({ messages, isThinking, philosopher, onViewContext }) {
  const messagesEndRef = useRef(null);
  const iconData = PHILOSOPHER_ICONS[philosopher.id] || PHILOSOPHER_ICONS.nietzsche;
  const IconComponent = iconData.icon;

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
          {/* 중앙 상징 아이콘 아바타 */}
          <div style={{
            width: '68px',
            height: '68px',
            borderRadius: '20px',
            background: iconData.bg,
            border: `2px solid ${iconData.color}45`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            boxShadow: `0 8px 24px ${iconData.color}25`
          }}>
            <IconComponent size={32} color={iconData.color} style={{ display: 'block' }} />
          </div>

          <h3 style={{ fontSize: '1.35rem', color: '#ffffff', marginBottom: '0.5rem', fontWeight: 700, wordBreak: 'keep-all' }}>
            {philosopher.name}와의 대화
          </h3>
          <p style={{ fontSize: '0.925rem', maxWidth: '440px', margin: '0 auto', lineHeight: 1.6, wordBreak: 'keep-all' }}>
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
            {/* 철학자 말풍선 아바타 아이콘 */}
            {!isUser && (
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '11px',
                background: iconData.bg,
                border: `1px solid ${iconData.color}35`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '4px'
              }}>
                <IconComponent size={18} color={iconData.color} style={{ display: 'block' }} />
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
                whiteSpace: 'pre-wrap',
                wordBreak: 'keep-all'
              }}>
                {msg.content}
              </div>

              {/* RAG 원문 참고 구절 보기 단추 */}
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
                borderRadius: '11px',
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

      {/* 생각하는 중 사색 타이핑 애니메이션 */}
      {isThinking && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="animate-fade-in">
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '11px',
            background: iconData.bg,
            border: `1px solid ${iconData.color}35`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <IconComponent size={18} color={iconData.color} style={{ display: 'block' }} />
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
