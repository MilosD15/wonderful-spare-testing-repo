function initChatBot() {
  d = document;
  s = d.createElement("script");
  s.src = "https://sitegpt.ai/widget/363249979331969617.js";
  s.async = 1;

  // Add an event listener for the 'load' event
  s.addEventListener('load', function() {
    observeForElement('sitegpt-bot-ui');
  });

  // Add an event listener for the 'error' event
  s.addEventListener('error', function() {
    console.error('Error occurred while loading the script.');
  });

  d.getElementsByTagName("head")[0].appendChild(s);
}

initChatBot();

function observeForElement(elementId) {
  let chatBotLoaded = false;
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (chatBotLoaded) return;

      if (mutation.addedNodes.length) {
        let element = document.getElementById(elementId);

        if (element) {
          customizeChatbotToggleBtn();
          chatBotLoaded = true;

          // Disconnect the observer once the element is found
          observer.disconnect();
        }
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

function customizeChatbotToggleBtn() {
  const chatbotBtn = document.querySelector('#sitegpt-chat-icon');
  chatbotBtn.classList.add("chatbot-toggle-btn");
  const chatPanel = document.querySelector('#sitegpt-bot-ui');
  chatPanel.classList.add("chatbot-panel");

  refineChatbotIconStyling();
  closeChat();

  chatbotBtn.addEventListener("click", () => {
    refineChatbotIconStyling();
    if (chatPanel.style.display === 'none') {
      closeChat();
    } else {
      openChat();
    }
  });

  window.addEventListener('message', event => {
    refineChatbotIconStyling();
    if (event.data.isOpen) {
      openChat();
    } else {
      closeChat();
    }
  });
}

function refineChatbotIconStyling() {
  if (document.querySelector(".chatbot-toggle-btn__hover-image")) return;

  const chatbotBtn = document.querySelector('.chatbot-toggle-btn');
  chatbotBtn.dataset.chat = "closed";
  const chatbotBtnStandardImg = chatbotBtn.querySelector('img');
  chatbotBtnStandardImg.src = './images/chat-bot.webp';
  chatbotBtnStandardImg.alt = 'Standard chatbot icon';
  chatbotBtnStandardImg.classList.add("chatbot-toggle-btn__standard-image");

  const chatbotBtnHoverImg = document.createElement('img');
  chatbotBtnHoverImg.src = './images/chat-bot-hover.webp';
  chatbotBtnHoverImg.alt = 'Chatbot icon with one hand raised up';
  chatbotBtnHoverImg.classList.add("chatbot-toggle-btn__hover-image");
  chatbotBtn.appendChild(chatbotBtnHoverImg);
}

function closeChat() {
  const chatbotBtn = document.querySelector('.chatbot-toggle-btn');
  chatbotBtn.classList.remove("active");
}

function openChat() {
  const chatbotBtn = document.querySelector('.chatbot-toggle-btn');
  chatbotBtn.classList.add("active");
}