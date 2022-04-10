import { ACTION_SQL_DECODER } from '../constants';

console.log('background loaded');
chrome.runtime.onInstalled.addListener((details) => {
  console.log('chrome.runtime.onInstalled', details);
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL ||
    details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
    chrome.tabs.create({
      url: 'pages/options.html'
    });
  }
  chrome.contextMenus.create({
    "id": ACTION_SQL_DECODER,
    "title": "SQL解码",
    "contexts": ["selection"]
  });
  try {
    chrome.contextMenus.onClicked.addListener(function (info, tab) {
      try {
        chrome.tabs.sendMessage(tab.id, {
          action: info.menuItemId,
          data: info.selectionText
        }, function (response) {
          console.log('contextMenus.response>', response);
        });
      } catch (err) {
        console.error(err);
      }
    });
  } catch (err) {
    console.error(err);
  }
});

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  console.log("message received =>", msg, sender, sendResponse);
});

chrome.action.onClicked.addListener((tab) => {
  console.log('tab =>', tab);
  chrome.tabs.create({
    url: 'pages/options.html'
  });
});
