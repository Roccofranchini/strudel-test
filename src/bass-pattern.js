export const bassPattern = `// Drum & Bass – Cm – 170 BPM
// Ctrl+Enter per risuonare dopo le modifiche
stack(

  // === SUB BASS ===
  note("<[c1*2 c1 eb1] [c1 bb0*2 c1]>")
    .s("sawtooth")
    .lpf(perlin.range(180, 800).slow(3))
    .lpq(6)
    .decay(0.08)
    .sustain(0.32)
    .gain(0.88),

  // === KICK (sine sintetizzato, senza campioni) ===
  note("c1 ~ [~ c1] ~ c1 ~ [c1 ~] [~ c1]")
    .s("sine")
    .lpf(130)
    .decay(0.14)
    .sustain(0)
    .gain(1.05),

  // === SNARE (rumore filtrato) ===
  note("~ c4 ~ c4")
    .s("noise")
    .hpf(450)
    .lpf(5000)
    .decay(0.09)
    .sustain(0)
    .gain(0.82),

  // === GHOST SNARE ===
  note("~ ~ [~ c4] ~")
    .s("noise")
    .hpf(900)
    .decay(0.055)
    .sustain(0)
    .gain(0.3),

  // === HI-HAT 16esimi rolling ===
  note("c5*16")
    .s("noise")
    .hpf(8800)
    .decay(0.02)
    .sustain(0)
    .gain(perlin.range(0.1, 0.26))
    .pan(sine.range(0.35, 0.65).fast(4))

).cpm(170)`;
