chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        window.postMessage({ type: 'SHOW_CHATGPT_OUTLINE' }, '*');
      }
    });
  });
  