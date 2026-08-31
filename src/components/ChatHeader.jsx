import React from 'react';
import { ArrowLeft, RefreshCw, Sparkles, Quote, Feather, BookOpen, HeartHandshake } from 'lucide-react';

const PHILOSOPHER_ICONS = {
  nietzsche: { icon: Sparkles, color: 'var(--theme-nietzsche)', bg: 'rgba(245, 158, 11, 0.15)' },
  schopenhauer: { icon: Quote, color: 'var(--theme-schopenhauer)', bg: 'rgba(59, 130, 246, 0.15)' },
  epictetus: { icon: Feather, color: 'var(--theme-epictetus)', bg: 'rgba(16, 185, 129, 0.15)' },
  socrates: { icon: BookOpen, color: 'var(--theme-socrates)', bg: 'rgba(168, 85, 247, 0.15)' },
  confucius: { icon: HeartHandshake, color: 'var(--theme-confucius)', bg: 'rgba(234, 179, 8, 0.15)' }
};

export default function ChatHeader({ philosopher, onBack, onResetChat }) {
  const iconData = PHILOSOPHER_ICONS[philosopher.id] || PHILOSOPHER_ICONS.nietzsche;
  const IconComponent = iconData.icon;

  return (
    <div className="glass-panel" style={{
      padding: '0.85rem 1.25rem',
      borderRadius: '0 0 20px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      borderTop: 'none'
    }}>
      {/* 좌측: 뒤로가기 & 철학자 프로필 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <button 
          onClick={onBack}
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: 'none',
            color: '#ffffff',
            width: '38px',
            height: '38px',
            borderRadius: '11px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 0.2s',
            flexShrink: 0
          }}
          title="철학자 목록으로 이동"
        >
          <ArrowLeft size={19} />
        </button>

        {/* 철학자 상징 아바타 (정밀 정중앙 정렬) */}
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '13px',
          background: iconData.bg,
          border: `1.5px solid ${iconData.color}40`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: `0 4px 14px ${iconData.color}20`
        }}>
          <IconComponent size={21} color={iconData.color} style={{ display: 'block' }} />
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', wordBreak: 'keep-all' }}>
              {philosopher.name}
            </h2>
            <span style={{
              fontSize: '0.68rem',
              padding: '2px 7px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.08)',
              color: iconData.color,
              fontWeight: 600
            }}>
              RAG 연결됨
            </span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', wordBreak: 'keep-all' }}>
            {philosopher.description.slice(0, 26)}...
          </p>
        </div>
      </div>

      {/* 우측: 대화 리셋 버튼 */}
      <button
        onClick={onResetChat}
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: 'var(--text-secondary)',
          padding: '6px 11px',
          borderRadius: '9px',
          fontSize: '0.78rem',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          cursor: 'pointer',
          transition: 'all 0.2s',
          whiteSpace: 'nowrap'
        }}
        title="새 대화 시작하기"
      >
        <RefreshCw size={13} /> 대화 초기화
      </button>
    </div>
  );
}
