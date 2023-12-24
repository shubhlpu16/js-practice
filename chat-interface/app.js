function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();

    if (messageText !== '') {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.innerText = messageText;
        messagesContainer.appendChild(messageDiv);

        messageInput.value = '';
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}
