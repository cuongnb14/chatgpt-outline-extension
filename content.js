function createSidebarAndOutline() {
    if (document.getElementById('chatgpt-outline-sidebar')) return;
  
    const isDark = document.documentElement.classList.contains('dark');
  
    const sidebar = document.createElement('div');
    sidebar.id = 'chatgpt-outline-sidebar';
    sidebar.style.cssText = `
      position: fixed;
      top: 0;
      right: 0;
      width: 300px;
      height: 100%;
      background-color: ${isDark ? '#1e1e1e' : '#f9f9f9'};
      color: ${isDark ? '#ffffff' : '#000000'};
      border-left: 1px solid ${isDark ? '#333' : '#ccc'};
      overflow-y: auto;
      z-index: 9999;
      padding: 16px;
      font-family: sans-serif;
      box-shadow: -2px 0 5px rgba(0,0,0,0.2);
    `;
    sidebar.innerHTML = `
      <h3 style="margin-top: 0; font-size: 16px; font-weight: bold;">📋 ChatGPT Outline</h3>
      <hr>
      <ul id="outline-list" style="list-style: none; padding: 0; margin: 0;"></ul>
    `;
    document.body.appendChild(sidebar);
  
    generateOutline();
  
    // Auto update
    const chatContainer = document.querySelector('main');
    if (chatContainer) {
      let timeout;
      const observer = new MutationObserver(() => {
        clearTimeout(timeout);
        timeout = setTimeout(() => generateOutline(), 1000);
      });
      observer.observe(chatContainer, { childList: true, subtree: true });
    }
  }
  
  function generateOutline() {
    const messages = document.querySelectorAll('[data-message-author-role="user"]');
    const outlineList = document.getElementById('outline-list');
    if (!outlineList) return;
  
    outlineList.innerHTML = '';
    messages.forEach((msg, idx) => {
      const text = msg.textContent.trim().slice(0, 80) + '...';
      const li = document.createElement('li');
      li.innerText = `Q${idx + 1}: ${text}`;
      li.style.cssText = `
        cursor: pointer;
        padding: 6px 8px;
        border-radius: 6px;
        transition: background 0.2s;
      `;
      li.onmouseover = () => li.style.backgroundColor = 'rgba(100, 100, 255, 0.1)';
      li.onmouseout = () => li.style.backgroundColor = 'transparent';
      li.onclick = () => msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
      outlineList.appendChild(li);
    });
  }
  
  // Listen to message from background
  window.addEventListener("message", (event) => {
    if (event.source === window && event.data.type === 'SHOW_CHATGPT_OUTLINE') {
      createSidebarAndOutline();
    }
  });

  function toggleSidebar() {
    const existing = document.getElementById('chatgpt-outline-sidebar');
    if (existing) {
      existing.remove();
    } else {
      createSidebarAndOutline();
    }
  }
  
  window.addEventListener("message", (event) => {
    if (event.source === window && event.data.type === 'TOGGLE_CHATGPT_OUTLINE') {
      toggleSidebar();
    }
  });
  
  