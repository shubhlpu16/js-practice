// main.js

let chatData = [];
let selectedId;
const filterInput = document.getElementById("filter");
const chatBox = document.getElementById("chat-box");
const chats = document.getElementById("chats");
const leftPanel = document.getElementById("left-panel");

filterInput.addEventListener("input", handleFilterInput);

function handleFilterInput(event) {
  const filter = event.target.value.toLowerCase();
  const filteredChat = filterChat(chatData, filter);
  displayChat(filteredChat);
}

function displayChat(chat) {
  chatBox.innerHTML = "";
  chat.forEach(displayChatMessage);
}

function displayChatMessage(message) {
  const handleClick = "handleClick";
  const chatMessageElement = createChatMessageElement(message, handleClick);
  chatBox.appendChild(chatMessageElement);
}

function displayChats(id) {
  clearChats(chats);
  const chatLists = createChatLists(
    chatData.find((message) => message.id == id),
    createMessageContent,
    createInputMessageContainer
  );
  chats.appendChild(chatLists);
}

function createInputMessageContainer() {
  const inputMessageContainer = document.createElement("div");
  inputMessageContainer.classList.add("input-msg");
  const inputMessage = document.createElement("input");
  inputMessage.classList.add("msg");
  inputMessage.placeholder = "Type your message here...";
  const sendButton = document.createElement("button");
  sendButton.id = "send";
  sendButton.classList.add("send");
  sendButton.textContent = "Send";
  inputMessageContainer.appendChild(inputMessage);
  inputMessageContainer.appendChild(sendButton);
  sendButton.addEventListener("click", sendMessageHandler);
  return inputMessageContainer;
}

function createMessageContent(messageList) {
  const content = document.createElement("div");
  content.style.display = "flex";
  content.style.flexDirection = "column";
  content.style.overflowY = "auto";
  content.style.gap = "40px";

  if (messageList.length === 0) {
    const placeholder = createPlaceholder(
      "No messages yet. Start the conversation!"
    );
    content.appendChild(placeholder);
  } else {
    messageList.forEach((message) => {
      const messageCard = createMessageCard(message);
      content.appendChild(messageCard);
    });
  }

  return content;
}

function handleClick(id) {
  selectedId = id;
  chatBox.childNodes.forEach((element) => {
    element.classList.toggle("selected", element.id == selectedId);
  });

  chats.style.setProperty("display", "block");
  chats.style.setProperty("width", "60%");
  leftPanel.style.setProperty("width", "40%");

  displayChats(id);
}

function sendMessageHandler() {
  const inputMessage = document.querySelector(".input-msg input.msg");
  const messageText = inputMessage.value.trim();

  if (messageText !== "") {
    const selectedChat = chatData.find((chat) => chat.id == selectedId);
    sendMessage(selectedChat, messageText);

    displayChats(selectedId);

    inputMessage.value = "";
  }
}

function filterChat(chatData, filter) {
  return chatData.filter(
    (message) =>
      message.title.toLowerCase().includes(filter) ||
      message.orderId.toString().includes(filter)
  );
}

function clearChats(chats) {
  if (chats.children.length > 0) {
    chats.removeChild(chats.lastElementChild);
  }
}

function createPlaceholder(text) {
  const placeholder = document.createElement("div");
  placeholder.classList.add("placeholder");
  placeholder.textContent = text;
  return placeholder;
}

function createMessageCard(message) {
  const messageCard = document.createElement("div");
  messageCard.className = message.sender == "BOT" ? "bot-msg" : "user-msg";
  messageCard.textContent = message.message;
  return messageCard;
}

function createChatMessageElement(message, handleClick) {
  const chatMessageElement = document.createElement("div");
  chatMessageElement.classList.add("chat-message");
  chatMessageElement.setAttribute("key", message.id);
  chatMessageElement.setAttribute("id", message.id);
  chatMessageElement.innerHTML = `
    <div class="product-card" onclick="${handleClick}(${message.id})" id=${
    message.id
  }>
      <div class="product-image">
        <img src=${message.imageURL} alt="Product Image">
      </div>
      <div>
        <strong>${message.title}</strong>
        <span>${message.orderId}</span>
        <p>${
          message.messageList.length ? message.messageList[0].message : ""
        }</p>
      </div>
    </div>
  `;
  return chatMessageElement;
}

function createChatLists(
  selectedMessage,
  createMessageContent,
  createInputMessageContainer
) {
  const chatLists = document.createElement("div");
  const header = document.createElement("div");
  chatLists.classList.add("chat-list");
  header.classList.add("header");

  header.innerText = selectedMessage.title;
  chatLists.appendChild(header);

  const content = createMessageContent(selectedMessage.messageList);
  const msgLists = document.createElement("div");
  msgLists.classList.add("content");
  msgLists.appendChild(content);
  chatLists.appendChild(msgLists);

  const inputMessageContainer = createInputMessageContainer();
  chatLists.appendChild(inputMessageContainer);

  return chatLists;
}

function sendMessage() {
  const inputMessage = document.querySelector(".input-msg input.msg");
  const messageText = inputMessage.value.trim();

  if (messageText !== "") {
    const currentTime = Date.now();

    const newMessage = {
      messageId: `msg${currentTime}`,
      message: messageText,
      timestamp: currentTime,
      sender: "USER",
      messageType: "text",
    };

    const selectedChat = chatData.find((chat) => chat.id == selectedId);
    selectedChat.messageList.push(newMessage);

    displayChats(selectedId);

    inputMessage.value = "";
  }
}

fetch("https://my-json-server.typicode.com/codebuds-fk/chat/chats")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  })
  .then((data) => {
    chatData = data;
    displayChat(chatData);
  })
  .catch((error) => {
    console.error("Fetch error:", error.message);
  });
