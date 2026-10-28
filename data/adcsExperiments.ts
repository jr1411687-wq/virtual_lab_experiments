export type AdcsExperiment = {
  slug: string;
  number: number;
  title: string;
  aim: string;
  apparatus: string[];
  theory: string[];
  procedure: string[];
  observations: string[];
  precautions: string[];
  result: string;
  formula: {
    label: string;
    latex: string;
  };
  images: {
    aimTheory: string;
    procedure: string;
    waveforms: string;
  };
};

export const adcsLabSlug = "analog-digital-communication";

export const adcsExperiments: AdcsExperiment[] = [
  {
    slug: "exp-1-dsb-am",
    number: 1,
    title: "Create the DSB AM wave on a CRO and determine its modulation index",
    aim: "Create the DSB AM wave on a CRO and determine its modulation index.",
    apparatus: [
      "Amplitude modulation kit (ST 2201)",
      "CRO",
      "Connecting leads",
    ],
    theory: [
      "In amplitude modulation (AM) the amplitude of the carrier is changed in accordance with the modulating signal.",
      "The modulating wave is a sine wave of frequency ωm given by em = Em cos ωm t, where Em is the peak amplitude of the modulating wave.",
      "Let the carrier waveform be ec = Ec cos ωc t, where ωc is the carrier frequency and ωc ≫ ωm.",
      "For amplitude modulation the amplitude A(t) of the carrier varies as A(t) = Ec (1 + m cos ωm t), where m is the modulation index.",
      "The complete AM voltage is e = Ec (1 + m cos ωm t) cos ωc t.",
      "Ec(max) = Ec(1 + m) and Ec(min) = Ec(1 − m), so m = (Ec(max) − Ec(min)) / (Ec(max) + Ec(min)).",
      "When m = 1 the carrier is 100% modulated. If m exceeds unity the carrier is overmodulated and the envelope is distorted.",
      "Percentage modulation = ((Vmax − Vmin) / (Vmax + Vmin)) × 100%.",
    ],
    procedure: [
      "Study the board layout. Note that the carrier frequency is fixed (internal).",
      "Observe the modulating signal from the Audio Oscillator at t.p. 14 on a CRO and calculate its frequency and amplitude.",
      "Observe the carrier signal from a 1 MHz Crystal Oscillator at t.p. 9 on the CRO and calculate its frequency and amplitude.",
      "Apply both signals to the Balanced modulator circuit.",
      "Observe the AM output at t.p. 3 on the CRO. Vary the amplitude of the modulating signal if the waveform is not appearing correctly.",
      "Observe the maximum (Vmax) and minimum (Vmin) voltage of the AM waveform on the CRO and calculate the modulation index m = (Vmax − Vmin) / (Vmax + Vmin).",
    ],
    observations: [
      "Observe changes in the modulated signal as the modulating signal amplitude varies.",
      "Measure the modulating signal amplitude for each change.",
      "Note that over-modulation causes output distortion.",
      "Calculate the modulation index based on Vmax and Vmin observed on the CRO.",
    ],
    precautions: [
      "Do not make interconnections on the board with power switched ON.",
      "Connections should be right and tight.",
      "No external connection for DC power supply is to be made to the circuit; it is internally connected.",
      "Observations and calculations should be correct.",
      "Switch OFF the supply after the experiment is over.",
    ],
    result: "Amplitude Modulated wave is observed and its modulation index is determined.",
    formula: {
      label: "Modulation index",
      latex: "m = (Vmax − Vmin) / (Vmax + Vmin)",
    },
    images: {
      aimTheory: "/adcs/exp1/aim-theory.jpeg",
      procedure: "/adcs/exp1/procedure.jpeg",
      waveforms: "/adcs/exp1/waveforms.jpeg",
    },
  },
];

export function getAdcsExperiment(expSlug: string) {
  return adcsExperiments.find((exp) => exp.slug === expSlug);
}
