export const bassPattern = `// Drum & Bass – Cm – 170 BPM
// Ctrl+Enter per risuonare dopo le modifiche
const kick = "c2 ~ [~ c2] ~ c2 ~ [c2 ~] [~ c2]";

stack(

  // === SUB BASS ===
  note("<[c1*2 c1 eb1] [c1 bb0*2 c1]>")
    .s("sawtooth")
    .lpf(perlin.range(180, 800).slow(3))
    .lpq(6)
    .decay(0.08)
    .sustain(0.32)
    .gain(0.88),

  // === KICK corpo (sine a C2 = 65 Hz) ===
  note(kick)
    .s("sine")
    .decay(0.18)
    .sustain(0)
    .gain(1.0),

  // === KICK click (burst di rumore bianco cortissimo) ===
  note(kick)
    .s("white")
    .hpf(2000)
    .decay(0.012)
    .sustain(0)
    .gain(0.7),

  // === SNARE (rumore bianco filtrato mid) ===
  note("~ c4 ~ c4")
    .s("white")
    .hpf(200)
    .lpf(8000)
    .decay(0.1)
    .sustain(0)
    .gain(0.85),

  // === GHOST SNARE ===
  note("~ ~ [~ c4] ~")
    .s("white")
    .hpf(500)
    .decay(0.06)
    .sustain(0)
    .gain(0.3),

  // === HI-HAT 16esimi rolling ===
  note("c5*16")
    .s("white")
    .hpf(8500)
    .decay(0.02)
    .sustain(0)
    .gain(perlin.range(0.08, 0.22))
    .pan(sine.range(0.35, 0.65).fast(4))

).cpm(170)`;
