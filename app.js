const STORAGE_KEY = 'user_messages';

const messagesContainer = document.getElementById('messages');
const input = document.getElementById('input');
const saveButton = document.getElementById('saveButton');

window.onload = function() {
  const savedMessages = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  savedMessages.forEach(renderMessage);
};

saveButton.onclick = function() {
  const text = input.value.trim();
  if (!text) return;

  renderMessage(text);
  saveToStorage(text);
  input.value = '';
};

function renderMessage(text) {
  const messageEl = document.createElement('div');
  messageEl.className = 'message';

  messageEl.innerHTML = `
    <span>${text}</span>
    <button class="delete-btn">Удалить</button>
  `;

  messageEl.querySelector('.delete-btn').onclick = function() {
    deleteMessage(messageEl, text);
  };

  messagesContainer.appendChild(messageEl);
}

function saveToStorage(text) {
  const messages = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  messages.push(text);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

function deleteMessage(messageEl, text) {
  messageEl.remove();

  let messages = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  messages = messages.filter(msg => msg !== text);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}