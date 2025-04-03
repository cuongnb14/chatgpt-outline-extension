chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        window.postMessage({ type: 'TOGGLE_CHATGPT_OUTLINE' }, '*');
      }
    });
  });
  