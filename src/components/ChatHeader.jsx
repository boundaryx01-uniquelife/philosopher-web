import React from 'react';
import { ArrowLeft, Sparkles, RefreshCw } from 'lucide-react';

export default function ChatHeader({ philosopher, onBack, onResetChat }) {
  return (
    <div className="glass-panel" style={{
      padding: '1rem 1.25rem',
      borderRadius: '0 0 20px 20px',
      display: 'flex',
      alignItems: 'center',
      justify: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      borderTop: 'none'
    }}>
      {/* 좌측: 뒤로가기 & 철학자 프로필 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button 
          onClick={onBack}
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: 'none',
            color: '#ffffff',
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          title="철학자 목록으로 이동"
        >
          <ArrowLeft size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'var(--active-theme)',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            fontWeight: 700,
            fontSize: '1.1rem',
            color: '#111827',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}>
            {philosopher.name[0]}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>
                {philosopher.name}
              </h2>
              <span style={{
                fontSize: '0.7rem',
                padding: '2px 8px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.1)',
                color: 'var(--active-theme)',
                fontWeight: 600
              }}>
                RAG 연결됨
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {philosopher.description.slice(0, 32)}...
            </p>
          </div>
        </div>
      </div>

      {/* 우측: 대화 리셋 버튼 */}
      <button
        onClick={onResetChat}
        style={{
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.15)',
          color: 'var(--text-secondary)',
          padding: '6px 12px',
          borderRadius: '8px',
          fontSize: '0.8rem',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        title="새 대화 시작하기"
      >
        <RefreshCw size={14} /> 대화 초기화
      </button>
    </div>
  );
}
