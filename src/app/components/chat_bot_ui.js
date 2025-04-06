"use client";

import { useState } from 'react';
import {sendMessageToBot} from "@/app/service/chat_service";

export default function ChatBot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: 'user' };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const botReply = await sendMessageToBot(input);
            const botMessage = { text: botReply, sender: 'bot' };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { text: 'Failed to fetch response.', sender: 'bot' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <h2 className="text-start mb-4">ChatBot</h2>
            <div className="border rounded p-3 mb-3 bg-light" style={{ height: '400px', overflowY: 'auto' }}>
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`mb-2 d-flex ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
                    >
                        <div
                            className={`p-2 rounded ${msg.sender === 'user' ? 'bg-dark text-white' : 'bg-secondary text-white'}`}
                            style={{ maxWidth: '75%' }}
                        >
                            {msg.sender === 'bot' ? (
                                <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                            ) : (
                                msg.text
                            )}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="d-flex justify-content-start mb-2">
                        <div className="p-2 rounded bg-secondary text-white">
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Typing...
                        </div>
                    </div>
                )}
            </div>

            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your message..."
                    disabled={loading}
                />
                <button className="btn btn-dark send-button" onClick={handleSend} disabled={loading}>
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                            Sending...
                        </>
                    ) : 'Send'}
                </button>
            </div>
        </div>
    );
}
