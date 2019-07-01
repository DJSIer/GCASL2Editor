const fs = require('fs');
const {BrowserWindow, dialog} = require('electron').remote;

let inputArea = null;
let inputTxt = null;
let footerArea = null;

let currentPath = '';
let editor = null;

window.addEventListener('DOMContentLoaded', onLoad);
/**
 * Webページ読み込み時の処理
 */
function onLoad() {
    // 入力関連領域
    inputArea = document.getElementById('input_area');
    // 入力領域
    inputTxt = document.getElementById('input_txt');
    // フッター領域
    footerArea = document.getElementById('footer_fixed');
  
    editor = ace.edit('input_txt');
    editor.session.setMode('ace/mode/javascript');
    editor.setTheme('ace/theme/twilight');

  
    // ドラッグ&ドロップ関連処理
    // イベントの伝搬を止めて、アプリケーションのHTMLとファイルが差し替わらないようにする
    document.addEventListener('dragover', (event) => {
      event.preventDefault();
    });
    document.addEventListener('drop', (event) => {
      event.preventDefault();
    });
  
    // 入力部分の処理
    inputArea.addEventListener('dragover', (event) => {
      event.preventDefault();
    });
    inputArea.addEventListener('dragleave', (event) => {
      event.preventDefault();
    });
    inputArea.addEventListener('dragend', (event) => {
      event.preventDefault();
    });
    inputArea.addEventListener('drop', (event) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      readFile(file.path);
    });
  
    // 「読み込む」ボタンの制御
    document.querySelector('#btnLoad').addEventListener('click', () => {
      openLoadFile();
    });
    // 「保存する」ボタンの制御
    document.querySelector('#btnSave').addEventListener('click', () => {
      openLoadFile();
    });
  };