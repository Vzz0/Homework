const WS_URLS = ['wss://echo.websocket.org', 'wss://socketsbay.com/wss/v2/1/demo/'];

const chatFormElement = document.getElementById('chat-form');
const chatInputElement = document.getElementById('chat-input');
const chatDialogElement = document.getElementById('chat-dialog');
const geoButtonElement = document.getElementById('geo-button');
const sendButtonElement = document.getElementById('send-button');

let socket = null;
let ignoreEchoMessage = null;
let wsUrlIndex = 0;

function setControlsDisabled(isDisabled) {
  chatInputElement.disabled = isDisabled;
  geoButtonElement.disabled = isDisabled;
  sendButtonElement.disabled = isDisabled;
}

function scrollToBottom() {
  chatDialogElement.scrollTop = chatDialogElement.scrollHeight;
}

function addMessage(text, type) {
  const messageElement = document.createElement('div');
  messageElement.className = 'chat__message ' + (type === 'out' ? 'chat__message_type_out' : 'chat__message_type_in');
  messageElement.textContent = text;
  chatDialogElement.appendChild(messageElement);
  scrollToBottom();
}

function addGeoLink(lat, lon) {
  const messageElement = document.createElement('div');
  messageElement.className = 'chat__message chat__message_type_out';

  const linkElement = document.createElement('a');
  linkElement.className = 'chat__link';
  linkElement.target = '_blank';
  linkElement.rel = 'noopener noreferrer';
  linkElement.href = 'https://www.openstreetmap.org/#map=18/' + lat + '/' + lon;
  linkElement.textContent = 'Гео-локация';

  messageElement.appendChild(linkElement);
  chatDialogElement.appendChild(messageElement);
  scrollToBottom();
}

function connect() {
  setControlsDisabled(true);
  addMessage('Подключение к серверу…', 'in');

  socket = new WebSocket(WS_URLS[wsUrlIndex]);

  socket.addEventListener('open', function () {
    setControlsDisabled(false);
    addMessage('Соединение установлено.', 'in');
  });

  socket.addEventListener('message', function (event) {
    const messageText = String(event.data);

    if (ignoreEchoMessage !== null && messageText === ignoreEchoMessage) {
      ignoreEchoMessage = null;
      return;
    }

    addMessage(messageText, 'in');
  });

  socket.addEventListener('error', function () {
    addMessage('Ошибка соединения.', 'in');
  });

  socket.addEventListener('close', function () {
    if (socket.readyState === WebSocket.CLOSED && wsUrlIndex < WS_URLS.length - 1) {
      wsUrlIndex += 1;
      connect();
      return;
    }

    setControlsDisabled(true);
    addMessage('Соединение закрыто. Обновите страницу.', 'in');
  });
}

chatFormElement.addEventListener('submit', function (event) {
  event.preventDefault();

  if (!socket || socket.readyState !== WebSocket.OPEN) {
    addMessage('Нет соединения с сервером.', 'in');
    return;
  }

  const message = chatInputElement.value.trim();
  if (!message) return;

  addMessage(message, 'out');
  socket.send(message);
  chatInputElement.value = '';
});

geoButtonElement.addEventListener('click', function (event) {
  event.preventDefault();

  if (!socket || socket.readyState !== WebSocket.OPEN) {
    addMessage('Нет соединения с сервером.', 'in');
    return;
  }

  if (!navigator.geolocation) {
    addMessage('Геолокация не поддерживается вашим браузером.', 'in');
    return;
  }

  geoButtonElement.disabled = true;

  navigator.geolocation.getCurrentPosition(
    function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const geoMessage = 'GEO:' + lat + ',' + lon;
      ignoreEchoMessage = geoMessage;
      socket.send(geoMessage);

      addGeoLink(lat, lon);
      geoButtonElement.disabled = false;
    },
    function () {
      addMessage('Не удалось получить геолокацию.', 'in');
      geoButtonElement.disabled = false;
    }
  );
});

connect();

