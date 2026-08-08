// 백엔드 API 서비스 통신 모듈 (실시간 스트리밍 지원)

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
 * 철학자에게 메시지를 전송하고 0.5초 만에 타자 치듯 실시간 스트리밍(Streaming)으로 답변을 받아옵니다.
 * 
 * @param {string} philosopherId 
 * @param {string} message 
 * @param {Array} chatHistory 
 * @param {Function} onMetadata - RAG 메타데이터 도착 시 콜백 ({retrieved_context})
 * @param {Function} onChunk - 텍스트 조각 도착 시 콜백 (chunkText)
 */
export async function sendChatMessageStream(philosopherId, message, chatHistory = [], onMetadata, onChunk) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat/stream`, {
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
      throw new Error(errorData.detail || `서버 통신 오류가 발생했습니다. (${response.status})`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop(); // 남은 미완성 버퍼 유지

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const data = JSON.parse(line);
          if (data.type === 'metadata' && onMetadata) {
            onMetadata(data.retrieved_context);
          } else if (data.type === 'chunk' && onChunk) {
            onChunk(data.text);
          } else if (data.type === 'error') {
            throw new Error(data.message);
          }
        } catch (e) {
          console.warn('NDJSON parsing error:', e);
        }
      }
    }
  } catch (error) {
    console.error('Error in sendChatMessageStream:', error);
    throw error;
  }
}
