const sendMessageToBot = async (message) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch response');
        }

        const data = await response.json();
        return data.reply || 'No response from bot.';
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export { sendMessageToBot };
