import React from 'react';
import { Sparkles, MessageCircle, Quote, Feather, HeartHandshake, BookOpen, ChevronRight } from 'lucide-react';

const PHILOSOPHER_METADATA = {
  nietzsche: {
    badge: '극복과 아모르파티',
    quote: '"나를 죽이지 못하는 고통은 나를 더 강하게 만들 뿐이다."',
    icon: Sparkles,
    themeColor: 'var(--theme-nietzsche)',
    bgColor: 'rgba(245, 158, 11, 0.12)'
  },
  schopenhauer: {
    badge: '냉철과 고독의 지혜',
    quote: '"홀로 있을 때 비로소 자기 자신일 수 있다."',
    icon: Quote,
    themeColor: 'var(--theme-schopenhauer)',
    bgColor: 'rgba(59, 130, 246, 0.12)'
  },
  epictetus: {
    badge: '통제와 스토아 평정',
    quote: '"인간을 불안하게 만드는 것은 사건 자체가 아니라 내 마음의 판단이다."',
    icon: Feather,
    themeColor: 'var(--theme-epictetus)',
    bgColor: 'rgba(16, 185, 129, 0.12)'
  },
  socrates: {
    badge: '성찰과 무지의 자각',
    quote: '"반성하지 않는 삶은 살 가치가 없다."',
    icon: BookOpen,
    themeColor: 'var(--theme-socrates)',
    bgColor: 'rgba(168, 85, 247, 0.12)'
  },
  confucius: {
    badge: '인(仁)과 중용의 수양',
    quote: '"자기가 원하지 않는 바를 남에게 베풀지 말라."',
    icon: HeartHandshake,
    themeColor: 'var(--theme-confucius)',
    bgColor: 'rgba(234, 179, 8, 0.12)'
  }
};

export default function PhilosopherSelector({ philosophers, onSelectPhilosopher }) {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* 헤더 타이틀 */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="animate-fade-in">
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px', 
          padding: '6px 16px', 
          borderRadius: '30px', 
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          marginBottom: '1rem',
          fontSize: '0.875rem',
          color: '#e5e7eb'
        }}>
          <Sparkles size={16} color="#f59e0b" />
          <span>AI 지혜 & 위로 서비스</span>
        </div>
        <h1 style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: '2.5rem', 
          fontWeight: 700, 
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #ffffff 0%, #9ca3af 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.75rem'
        }}>
          철학자와의 대화
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '540px', margin: '0 auto' }}>
          당신의 마음에 새겨진 고민을 나눠보세요. 역사 속 위대한 철학자가 그들의 원문 사상을 바탕으로 진심 어린 지혜를 건넵니다.
        </p>
      </div>

      {/* 철학자 카드 그리드 */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {philosophers.map((phil) => {
          const meta = PHILOSOPHER_METADATA[phil.id] || PHILOSOPHER_METADATA.nietzsche;
          const IconComponent = meta.icon;

          return (
            <div 
              key={phil.id} 
              className="glass-card animate-fade-in"
              onClick={() => onSelectPhilosopher(phil)}
              style={{ 
                padding: '1.75rem', 
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* 카드 상단 배지 및 아이콘 */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: meta.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    border: `1px solid ${meta.themeColor}33`
                  }}>
                    <IconComponent size={24} color={meta.themeColor} />
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: '20px',
                    background: meta.bgColor,
                    color: meta.themeColor,
                    border: `1px solid ${meta.themeColor}40`
                  }}>
                    {meta.badge}
                  </span>
                </div>

                {/* 이름 및 설명 */}
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.5rem', color: '#ffffff' }}>
                  {phil.name}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  {phil.description}
                </p>

                {/* 대표 명언 */}
                <div style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: 'rgba(0,0,0,0.25)',
                  borderLeft: `3px solid ${meta.themeColor}`,
                  fontSize: '0.825rem',
                  fontStyle: 'italic',
                  color: '#d1d5db',
                  marginBottom: '1.5rem'
                }}>
                  {meta.quote}
                </div>
              </div>

              {/* 하단 상담 시작 버튼 */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justify: 'space-between',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: meta.themeColor
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MessageCircle size={16} /> 대화 시작하기
                </span>
                <ChevronRight size={18} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
