const messageContainer = document.getElementById('message-container');
const sendContainer = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const socket = new WebSocket('ws://localhost:3000');

socket.addEventListener('open', () => {
    console.log('接続が開かれました');
});

socket.addEventListener('message', (event) => {
    const message = event.data;
    appendMessage(message);
});

sendContainer.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = messageInput.value;
    appendMessage(`あなた: ${message}`);
    socket.send(message);
    messageInput.value = '';
});

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}
