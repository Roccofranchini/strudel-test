// Basso funky in Cm – 95 BPM
// Struttura: strofa + ritornello alternati via <...>
export const bassPattern = `
stack(
  // === Linea di basso principale ===
  // pattern a due misure: strofa (c2...) alternata con ritornello (eb2...)
  note("<c2 c2 [eb2 g2] c2> <bb1 [g1 bb1] c2 [eb2 g2]>")
    .sound("sawtooth")
    .lpf(sine.range(180, 900).slow(8))
    .lpq(4)
    .decay(0.18)
    .sustain(0.25)
    .gain(0.85)
    .pan(0.45),

  // === Nota pedale sub-basso ===
  note("c1").sound("sawtooth")
    .lpf(120)
    .gain(0.55)
    .slow(4),

  // === Riff di riempimento (beat 3+) ===
  note("~ ~ [g2 bb2] ~, ~ ~ ~ [eb3 g3]")
    .sound("triangle")
    .lpf(1200)
    .gain(0.3)
    .room(0.15)
    .slow(2),

  // === Batteria ===
  s("bd ~ [bd ~] ~")          // kick
    .gain(0.8),
  s("~ sn ~ sn")              // snare
    .gain(0.65),
  s("hh*8")                   // hi-hat
    .gain(0.35)
    .pan(sine.range(0.3, 0.7).fast(2))

).cpm(95)
`;
