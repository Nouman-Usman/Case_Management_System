'use client';
import React, { useState } from 'react';

const ChatPage = () => {
  const [messages, setMessages] = useState<
    { sender: string; text: string; refrences?: string[] }[]
  >([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMessage = { sender: 'You', text: input };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setInput('');
    try {
      // Call the API route instead of using ragAgent directly
      const res = await fetch('/api/rag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input }),
      });
      const result = await res.json();
      setMessages(prev => [
        ...prev,
        {
          sender: 'Bot',
          text: typeof result.answer === 'string'
            ? result.answer
            : (result.answer?.content ?? 'No answer.'),
          refrences: result.refrences || [],
        }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { sender: 'Bot', text: 'Sorry, there was an error processing your request.' }
      ]);
    }
    setLoading(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', border: '1px solid #ccc', borderRadius: 8, padding: 16 }}>
      <h2>Chatbot</h2>
      <div style={{ minHeight: 200, maxHeight: 300, overflowY: 'auto', marginBottom: 12, background: '#fafafa', padding: 8, borderRadius: 4 }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ margin: '8px 0', textAlign: msg.sender === 'You' ? 'right' : 'left' }}>
            <strong>{msg.sender}:</strong> {msg.text}
            {/* Show references for Bot messages if available */}
            {msg.sender === 'Bot' && msg.refrences && msg.refrences.length > 0 && (
              <div style={{ fontSize: '0.85em', color: '#666', marginTop: 4 }}>
                <strong>References:</strong>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {msg.refrences.map((ref, i) =>
                    ref ? <li key={i}>{ref}</li> : null
                  )}
                </ul>
              </div>
            )}
          </div>
        ))}
        {messages.length === 0 && <div style={{ color: '#888' }}>Start the conversation!</div>}
        {loading && <div style={{ color: '#888' }}>Bot is typing...</div>}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Type your message..."
          style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          disabled={loading}
        />
        <button onClick={handleSend} style={{ padding: '8px 16px', borderRadius: 4 }} disabled={loading}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
