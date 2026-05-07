import { webaudioRepl } from '@strudel/web';
import { bassPattern } from './bass-pattern.js';

let strudelRepl = null;

const playBtn = document.getElementById('play-btn');
const stopBtn = document.getElementById('stop-btn');
const statusEl = document.getElementById('status');
const codeEl = document.getElementById('code-display');

codeEl.textContent = bassPattern.trim();

playBtn.addEventListener('click', async () => {
  // webaudioRepl() crea e inizializza il contesto audio globale di Strudel
  if (!strudelRepl) {
    strudelRepl = webaudioRepl();
  }
  statusEl.textContent = 'Caricamento suoni...';
  statusEl.className = 'status';
  // evaluate è async: aspetta che il pattern venga compilato prima di start()
  await strudelRepl.evaluate(bassPattern);
  strudelRepl.start();
  statusEl.textContent = 'In riproduzione...';
  statusEl.className = 'status playing';
});

stopBtn.addEventListener('click', () => {
  strudelRepl?.stop();
  statusEl.textContent = 'Fermato';
  statusEl.className = 'status stopped';
});
