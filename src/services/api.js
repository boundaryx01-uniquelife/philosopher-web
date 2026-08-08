// 백엔드 API 서비스 통신 모듈

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

/**
 * 지원하는 철학자 목록을 가져옵니다.
 */
export async function fetchPhilosophers() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/philosophers`);
    if (!response.ok) {
      throw new Error(`서버 응답 오류 (${response.status})`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch philosophers:', error);
    throw error;
  }
}

/**
 * 철학자에게 메시지를 보내고 RAG 기반 답변을 받아옵니다.
 * 
 * @param {string} philosopherId - 선택된 철학자 ID (nietzsche, schopenhauer 등)
 * @param {string} message - 사용자의 질문/고민
 * @param {Array} chatHistory - 이전 대화 내역 [{role: 'user'|'model', content: '...'}]
 */
export async function sendChatMessage(philosopherId, message, chatHistory = []) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        philosopher_id: philosopherId,
        message: message,
        chat_history: chatHistory.map(item => ({
          role: item.role === 'user' ? 'user' : 'model',
          content: item.content
        }))
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMsg = errorData.detail || `서버 통신 오류가 발생했습니다. (${response.status})`;
      throw new Error(errorMsg);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in sendChatMessage:', error);
    throw error;
  }
}
