import { repl, webaudioOutput } from '@strudel/web';
import { bassPattern } from './bass-pattern.js';

const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;
let strudelRepl = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (!strudelRepl) {
    strudelRepl = repl({
      defaultOutput: webaudioOutput,
      getTime: () => audioCtx.currentTime,
    });
  }
}

const playBtn = document.getElementById('play-btn');
const stopBtn = document.getElementById('stop-btn');
const statusEl = document.getElementById('status');
const codeEl = document.getElementById('code-display');

// Mostra il codice del pattern nell'UI
codeEl.textContent = bassPattern.trim();

playBtn.addEventListener('click', async () => {
  initAudio();
  await audioCtx.resume();
  strudelRepl.evaluate(bassPattern);
  strudelRepl.start();
  statusEl.textContent = 'In riproduzione...';
  statusEl.className = 'status playing';
});

stopBtn.addEventListener('click', () => {
  strudelRepl?.stop();
  statusEl.textContent = 'Fermato';
  statusEl.className = 'status stopped';
});
