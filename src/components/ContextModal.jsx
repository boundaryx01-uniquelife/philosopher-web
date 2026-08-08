import React from 'react';
import { BookOpen, X, Quote } from 'lucide-react';

export default function ContextModal({ contexts, onClose, philosopherName }) {
  if (!contexts || contexts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justify: 'center',
      zIndex: 100,
      padding: '1.5rem'
    }} className="animate-fade-in">
      <div className="glass-panel" style={{
        maxWidth: '560px',
        width: '100%',
        maxHeight: '80vh',
        overflowY: 'auto',
        padding: '1.75rem',
        background: '#161929',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        position: 'relative'
      }}>
        {/* 상단 닫기 단추 및 타이틀 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--active-theme)' }}>
            <BookOpen size={20} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>
              {philosopherName}의 RAG 원문 참고 구절
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              color: '#ffffff',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          AI 철학자가 당신의 고민에 대답하기 위해 벡터 데이터베이스에서 직접 검색하여 참고한 실제 고전 구절입니다.
        </p>

        {/* 구절 카드 목록 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {contexts.map((ctxText, idx) => (
            <div key={idx} style={{
              padding: '1rem 1.15rem',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.04)',
              borderLeft: '4px solid var(--active-theme)',
              fontSize: '0.9rem',
              lineHeight: 1.6,
              color: '#e5e7eb'
            }}>
              <Quote size={16} color="var(--active-theme)" style={{ marginBottom: '6px' }} />
              <div>{ctxText}</div>
            </div>
          ))}
        </div>

        {/* 하단 닫기 버튼 */}
        <button
          onClick={onClose}
          style={{
            marginTop: '1.5rem',
            width: '100%',
            padding: '10px',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'pointer'
          }}
        >
          확인 완료
        </button>
      </div>
    </div>
  );
}
