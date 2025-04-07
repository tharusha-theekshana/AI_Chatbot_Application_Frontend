const sendMessageToBot = async (message) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch response 😢. Please Try again.');
        }

        const data = await response.json();
        return data.reply || 'Sorry. I can\'t give a response 😢';
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export { sendMessageToBot };
