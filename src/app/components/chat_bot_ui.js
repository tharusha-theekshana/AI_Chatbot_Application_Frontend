"use client";

import {useState} from 'react';
import {sendMessageToBot} from "@/app/service/chat_service";
import styles from '../styles/chatbot.module.css';

export default function ChatBot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = {text: input, sender: 'user'};
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const botReply = await sendMessageToBot(input);
            const botMessage = {text: botReply, sender: 'bot'};

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {text: 'Failed to fetch response.', sender: 'bot'},
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <h2 className="text-start mb-6 text-secondary mb-3">ChatBot</h2>
            <div className={`border rounded-3 p-3 mb-3 bg-light ${styles.chatContainer}`}>
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`${styles.messageBox} ${msg.sender === 'user' ? 'justify-content-end' : styles.messageBoxBot}`}
                    >
                        <div
                            className={`${styles.messageBubble} ${msg.sender === 'user' ? styles.messageUser : styles.messageBot}`}
                            style={{maxWidth: '75%'}}
                        >
                            {msg.sender === 'bot' ? (
                                <div dangerouslySetInnerHTML={{__html: msg.text}}/>
                            ) : (
                                msg.text
                            )}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="d-flex justify-content-start mb-2">
                        <div className="p-2 rounded text-secondary">
                            <span className={`spinner-border spinner-border-sm me-2 text-secondary ${styles.spinner}`} role="status" aria-hidden="true"></span>
                            Generating  ....
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.inputGroup}>
                <input
                    type="text"
                    className={`form-control border-secondary shadow-none ${styles.inputField}`}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask from chat bot ... "
                    disabled={loading}
                />
                <button className="btn bg-dark text-white" onClick={handleSend} disabled={loading}>
                    <span> Send </span>
                </button>
            </div>
        </div>
    );
}
