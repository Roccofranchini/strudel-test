import { initStrudel } from '@strudel/web';
import { bassPattern } from './bass-pattern.js';

// initStrudel() registra tutti i globali (note, s, stack, sine…) e il transpiler.
// Restituisce una Promise<repl> — va chiamata una sola volta.
let replPromise = null;

const playBtn = document.getElementById('play-btn');
const stopBtn = document.getElementById('stop-btn');
const statusEl = document.getElementById('status');
const codeEl = document.getElementById('code-display');

codeEl.textContent = bassPattern.trim();

playBtn.addEventListener('click', async () => {
  setStatus('Inizializzazione audio...', '');
  if (!replPromise) {
    replPromise = initStrudel();
  }
  const repl = await replPromise;
  setStatus('Compilazione pattern...', '');
  await repl.evaluate(bassPattern);
  repl.start();
  setStatus('In riproduzione...', 'playing');
});

stopBtn.addEventListener('click', async () => {
  if (replPromise) {
    const repl = await replPromise;
    repl.stop();
  }
  setStatus('Fermato', 'stopped');
});

function setStatus(text, cls) {
  statusEl.textContent = text;
  statusEl.className = `status ${cls}`.trim();
}
