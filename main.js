const socket = io();
const chatForm = document.getElementById('chat-form');
let username = getCookie('username');

if (!username) {
  username = prompt("Please enter your name");
  setCookie('username', username);
}

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const msg = event.target.elements.msg.value;
  const fullMsg = `${username}: ${msg}`
  socket.emit('chatMessage', fullMsg);
  event.target.elements.msg.value = '';
  event.target.elements.msg.focus();
});

socket.on('message', (message) => {
  const div = document.createElement('div');
  div.classList.add('message');
  div.textContent = message;
  document.querySelector('.chat-messages').appendChild(div);
});

// XSS対策のためのエスケープ処理
function escapeHtml(html) {
  return html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// サーバーとの接続が失われたとき
socket.on('disconnect', () => {
  alert('Disconnected from server.');
});

// サーバーとの接続に失敗したとき
socket.on('connect_error', () => {
  alert('Failed to connect to server.');
});
