import { initStrudel } from '@strudel/web';
import { bassPattern } from './bass-pattern.js';

let replPromise = null;
let started = false;

const playBtn  = document.getElementById('play-btn');
const stopBtn  = document.getElementById('stop-btn');
const statusEl = document.getElementById('status');
const editor   = document.getElementById('code-editor');

editor.value = bassPattern;

async function play() {
  setStatus('Inizializzazione audio...', '');
  if (!replPromise) {
    replPromise = initStrudel();
  }
  const repl = await replPromise;

  try {
    setStatus('Compilazione pattern...', '');
    await repl.evaluate(editor.value);
    if (!started) {
      repl.start();
      started = true;
    }
    setStatus('In riproduzione...', 'playing');
  } catch (err) {
    setStatus(`Errore: ${err.message}`, 'error');
    console.error(err);
  }
}

playBtn.addEventListener('click', play);

stopBtn.addEventListener('click', async () => {
  if (replPromise) {
    const repl = await replPromise;
    repl.stop();
    started = false;
  }
  setStatus('Fermato', 'stopped');
});

// Ctrl+Enter aggiorna il pattern senza ricaricare
editor.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'Enter') {
    e.preventDefault();
    play();
  }
  // Tab → 2 spazi
  if (e.key === 'Tab') {
    e.preventDefault();
    const s = editor.selectionStart;
    editor.value = editor.value.slice(0, s) + '  ' + editor.value.slice(editor.selectionEnd);
    editor.selectionStart = editor.selectionEnd = s + 2;
  }
});

function setStatus(text, cls) {
  statusEl.textContent = text;
  statusEl.className = `status ${cls}`.trim();
}
