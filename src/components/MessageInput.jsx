import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

const SUGGESTED_QUESTIONS = {
  nietzsche: ["사는 것이 너무 무의미하게 느껴집니다.", "고통과 시련을 이겨내려면 어떻게 해야 하나요?", "타인의 시선에서 벗어나 자유로워지고 싶습니다."],
  schopenhauer: ["외로움과 고독에 마음이 아픕니다.", "인생의 욕망을 내려놓는 법이 궁금합니다.", "행복에 대해 너무 큰 기대를 가지는 게 나쁜가요?"],
  epictetus: ["내가 통제할 수 없는 상황 때문에 불안합니다.", "타인의 행동에 상처받지 않으려면?", "마음의 평정을 지키는 연습법을 알려주세요."],
  socrates: ["제 진정한 정체성을 찾는 질문을 해주세요.", "왜 나는 끊임없이 남과 비교할까요?", "올바르고 가치 있는 삶이란 무엇인가요?"],
  confucius: ["사람과의 관계에서 인(仁)을 지키는 법은?", "배움과 사색의 조화가 왜 중요한가요?", "내면의 중용을 이루고 싶습니다."]
};

export default function MessageInput({ philosopherId, onSendMessage, disabled }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !disabled) {
      onSendMessage(text);
      setText('');
    }
  };

  const suggestions = SUGGESTED_QUESTIONS[philosopherId] || SUGGESTED_QUESTIONS.nietzsche;

  return (
    <div style={{
      padding: '1rem 1.25rem 1.25rem',
      background: 'rgba(15, 17, 26, 0.85)',
      backdropFilter: 'blur(16px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      {/* 추천 질문 칩 */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '0.75rem',
        marginBottom: '0.5rem',
        scrollbarWidth: 'none'
      }}>
        {suggestions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              if (!disabled) onSendMessage(q);
            }}
            disabled={disabled}
            style={{
              whiteSpace: 'nowrap',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '16px',
              padding: '6px 12px',
              fontSize: '0.775rem',
              color: 'var(--text-secondary)',
              cursor: disabled ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Sparkles size={12} color="var(--active-theme)" />
            <span>{q}</span>
          </button>
        ))}
      </div>

      {/* 입력 폼 */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="고민이나 질문을 마음 편히 작성하세요..."
          disabled={disabled}
          style={{
            flex: 1,
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '14px',
            padding: '0.85rem 1.15rem',
            color: '#ffffff',
            fontSize: '0.95rem',
            outline: 'none',
            transition: 'border-color 0.2s'
          }}
        />

        <button
          type="submit"
          disabled={!text.trim() || disabled}
          style={{
            background: text.trim() && !disabled ? 'var(--active-theme)' : 'rgba(255,255,255,0.1)',
            color: text.trim() && !disabled ? '#111827' : '#6b7280',
            border: 'none',
            borderRadius: '14px',
            width: '46px',
            height: '46px',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            cursor: text.trim() && !disabled ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
            boxShadow: text.trim() && !disabled ? '0 4px 14px rgba(0,0,0,0.3)' : 'none'
          }}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
