function createSidebar() {
    const sidebar = document.createElement('div');
    sidebar.id = 'chatgpt-outline-sidebar';
    sidebar.style.position = 'fixed';
    sidebar.style.top = '0';
    sidebar.style.right = '0';
    sidebar.style.width = '300px';
    sidebar.style.height = '100%';
    sidebar.style.backgroundColor = '#f9f9f9';
    sidebar.style.borderLeft = '1px solid #ccc';
    sidebar.style.overflowY = 'auto';
    sidebar.style.zIndex = '9999';
    sidebar.style.padding = '10px';
    sidebar.innerHTML = `<h3>ChatGPT Outline</h3><ul id="outline-list"></ul>`;
    document.body.appendChild(sidebar);
  }
  
  function generateOutline() {
    const messages = document.querySelectorAll('[data-message-author-role="user"]');
    const outlineList = document.getElementById('outline-list');
    if (!outlineList) return;
  
    outlineList.innerHTML = '';
  
    messages.forEach((msg, idx) => {
      const text = msg.textContent.slice(0, 80) + '...';
      const li = document.createElement('li');
      li.innerText = `Q${idx + 1}: ${text}`;
      li.style.cursor = 'pointer';
      li.onclick = () => {
        msg.scrollIntoView({ behavior: 'smooth' });
      };
      outlineList.appendChild(li);
    });
  }
  
  function waitForChat() {
    const check = setInterval(() => {
      const el = document.querySelector('[data-message-author-role="user"]');
      if (el) {
        clearInterval(check);
        createSidebar();
        generateOutline();
  
        // Tự động cập nhật outline khi có thay đổi
        const observer = new MutationObserver(() => generateOutline());
        observer.observe(document.body, { childList: true, subtree: true });
      }
    }, 3000);
  }
  
  waitForChat();
  