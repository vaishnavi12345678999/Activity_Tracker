chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "showWarning") {
      const warningDiv = document.createElement('div');
      warningDiv.innerHTML = `<div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); color: white; display: flex; align-items: center; justify-content: center; z-index: 10000;">
        <p>This site is restricted. Click anywhere to continue.</p>
      </div>`;
      document.body.appendChild(warningDiv);
      warningDiv.addEventListener('click', () => {
        warningDiv.remove();
      });
    }
  });
  