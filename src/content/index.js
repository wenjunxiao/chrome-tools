import { INJECT_URL, ACTION_SQL_DECODER } from '../constants';

const extensionId = chrome.runtime.id
var app = document.getElementById(extensionId);
if (app) {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL(INJECT_URL);
  const el = document.head || document.documentElement
  el.appendChild(script)
  script.onload = () => {
    console.log('inject loaded');
    script.dispatchEvent(new CustomEvent('injected', {
      detail: { el: '#' + extensionId }
    }));
    script.remove();
  }
}

function getSelectionText () {
  if (window.getSelection) {//DOM,FF,Webkit,Chrome,IE10
    return window.getSelection().toString();
  } else if (document.getSelection) {//IE10
    return document.getSelection().toString();
  } else if (document.selection) {//IE6+10-
    return document.selection.createRange().text;
  } else {
    return '';
  }
}

function decodeSql (text) {
  text = text || getSelectionText();
  console.log('decode sql =>', text);
  let res = text.replace(/U&'([^']+)'/g, ($0, $1) => {
    console.log('decode block =>', $1);
    return "'" + $1.replace(/\\([0-9A-F]{4})/ig, ($0, $1) => {
      return String.fromCharCode(parseInt($1, 16));
    }) + "'";
  });
  const id = extensionId + '_sql';
  let div = document.getElementById(id);
  if (!div) {
    div = document.createElement('div');
    div.id = id;
    div.style.background = '#ffffff';
    // div.style.minWidth = '30%';
    // div.style.minHeight = '30%';
    div.style.position = 'fixed';
    div.style.top = '1px';
    div.style.right = '1px';
    div.style.zIndex = 999;
    div.style.padding = '2px 12px 2px 2px';
    div.style.border = '1px solid red';
    let x = document.createElement('a');
    x.innerText = 'X';
    x.style.position = 'absolute';
    x.style.top = '1px';
    x.style.right = '1px';
    x.style.cursor = 'pointer';
    x.onclick = function () {
      div.style.display = 'none';
    };
    div.appendChild(x);
    let txt = document.createElement('textarea');
    txt.style.width = '100%';
    txt.style.height = '100%';
    txt.style.outline = 'none';
    txt.style.boxSizing = 'border-box';
    txt.rows = 10;
    txt.cols = 50;
    // txt.style.position = 'absolute';
    // txt.style.top = '1px';
    // txt.style.left = '1px';
    // txt.style.right = '10px';
    // txt.style.bottom = '1px';
    div.appendChild(txt);
    document.body.appendChild(div);
  }
  div.style.display = 'block';
  div.querySelector('textarea').value = res;
}

console.log('content loaded');
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  console.log('chrome.runtime.onMessage=====>', msg, sender);
  switch (msg.action) {
    case ACTION_SQL_DECODER:
      decodeSql(msg.data);
      break;
  }
  sendResponse({ success: true });
})