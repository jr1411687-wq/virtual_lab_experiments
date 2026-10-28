export const allBranches = [
  {
    slug: "electronics",
    title: "Electronics & Communication Engineering",
    labs: [
      { 
        slug: "analog-digital-electronics-i",
        title: "Analog and Digital Electronics I", 
        shortName: "ADE",
        desc: "Fundamental circuits, logic gates, and semiconductor devices.",
        overview: "The Analog and Digital Electronics (ADE) lab bridges the physical world of continuous analog signals and the computational world of discrete digital logic. Early electronic circuits were purely analog, processing continuous voltage and current variations. However, the invention of the transistor and subsequent digital logic allowed engineers to process information as 1s and 0s, enabling immense computational power. This lab provides hands-on experience with essential tools like breadboards, oscilloscopes, and integrated circuits (ICs). Students will explore both continuous signal amplification and digital logic gate operations, forming the bedrock of modern electronics.",
        objectives: [
          "Use basic electronic instruments (DC power supply, waveform generator, multimeter, and oscilloscopes) to analyze and debug circuits.",
          "Verify experimentally basic circuit laws (Ohm's, Kirchhoff's) and explain differences between theoretical and measured values.",
          "Measure amplitude, phase, and frequency of sinusoidal signals using RC and RLC circuits.",
          "Design and construct combinatorial circuits using discrete logic gates (AND, OR, NOT, NAND, XOR).",
          "Design and construct sequential circuits using flip-flops, shift registers, and counters."
        ],
        experiments: [
          "Introduction to Basic Instruments: The Oscilloscope and Signal Generators.",
          "Verification of Superposition Principle and Thevenin Equivalent Circuits.",
          "The Diode and Diode Circuits: Plotting VI characteristics of PN junction and Zener diodes.",
          "The Transistor – Comparison of MOS and Bipolar Junction Transistors (BJT).",
          "Combinatorial Circuits: Verification of De-Morgan's theorems and basic logic gates.",
          "Sequential Circuits: Design and testing of SR, JK, D, and T Flip-Flops.",
          "Shift Registers and Counters: Building asynchronous/synchronous counters."
        ],
        history: "The evolution from analog to digital is the story of the 20th century. It began with vacuum tubes in the 1900s, which made early radios and amplifiers possible. In 1947, the invention of the semiconductor transistor at Bell Laboratories revolutionized the field, replacing bulky, fragile tubes with solid-state devices. In 1959, Jack Kilby (Texas Instruments) and Robert Noyce (Fairchild Semiconductor) independently invented the Integrated Circuit (IC), allowing multiple transistors to be fabricated on a single silicon chip. By the early 1960s, Transistor-Transistor Logic (TTL) became the standard for digital logic, paving the way for the microprocessors and computers we use today.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop"
      },
      { 
        slug: "digital-signal-processing",
        title: "Digital Signal Processing (DSP)", 
        shortName: "DSP",
        desc: "Simulate discrete-time signals, systems, and digital filter design.",
        overview: "Digital Signal Processing (DSP) involves the mathematical manipulation of an information signal to modify or improve it. This lab provides an interactive environment to understand how continuous analog signals are converted to digital, processed using algorithms, and converted back.",
        objectives: [
          "Understand the concept of sampling and aliasing.",
          "Perform time-domain and frequency-domain analysis of discrete signals.",
          "Design and analyze FIR and IIR digital filters."
        ],
        experiments: [
          "Generation of standard discrete-time signals.",
          "Linear convolution and circular convolution.",
          "Design of Low-pass and High-pass FIR filters.",
          "Implementation of the Fast Fourier Transform (FFT) algorithm."
        ],
        history: "DSP became practical in the 1960s with the development of the Fast Fourier Transform (FFT) algorithm by Cooley and Tukey. Before this, the computational load was too heavy. Today, DSP is the backbone of everything from your smartphone's audio processing to advanced medical imaging.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop"
      },
      { title: "Analog and Digital Communication", slug: "analog-digital-communication", shortName: "ADC", desc: "Explore modulation techniques, transmitters, receivers, and communication systems." },
      { title: "Digital Electronics (DE)", slug: "digital-electronics", shortName: "DE", desc: "Study logic gates, flip-flops, counters, and sequential circuit design." },
      { title: "Basic Electronics (BE)", slug: "basic-electronics", shortName: "BE", desc: "Fundamental concepts of semiconductor diodes, transistors, and basic electronic circuits." },
      { title: "Analog and Digital Circuits", slug: "analog-digital-circuits", shortName: "ADC", desc: "Hands-on experiments with analog/digital ICs and complex circuit design." },
      { title: "Signals and Systems (S&S)", slug: "signals-systems", shortName: "S&S", desc: "Analyze continuous and discrete signals in time and frequency domains." },
      { title: "Electronic Devices and Circuits (EDC)", slug: "electronic-devices-circuits", shortName: "EDC", desc: "Study semiconductor physics, diodes, BJTs, and MOSFET characteristics." },
      { title: "Computer Networks (CN)", slug: "computer-networks", shortName: "CN", desc: "Simulate network topologies, routing algorithms, and data communication protocols." },
      { title: "Microprocessors and Microcontrollers (MPMC)", slug: "microprocessors-microcontrollers", shortName: "MPMC", desc: "Program 8085/8086 and 8051 architectures through virtual emulators." },
      { title: "VLSI Design", slug: "vlsi-design", shortName: "VLSI", desc: "Simulate CMOS logic design, layout techniques, and hardware description languages." },
      { title: "Analog Electronics (AE)", slug: "analog-electronics", shortName: "AE", desc: "Core analog circuits including operational amplifiers and feedback amplifiers." }
    ]
  },
  {
    slug: "computer-science",
    title: "Computer Science & Engineering",
    labs: [
      { title: "Data Structures Virtual Lab", slug: "data-structures", shortName: "DS", desc: "Interactive visualizations of arrays, linked lists, trees, and graphs." },
      { title: "Database Management System Lab", slug: "dbms", shortName: "DBMS", desc: "Learn SQL queries and database design practically." },
      { title: "Operating Systems Lab", slug: "os", shortName: "OS", desc: "Simulate process scheduling, memory management, and deadlocks." },
      { title: "Computer Networks Lab", slug: "cn-lab", shortName: "CN", desc: "Explore network topologies, routing algorithms, and protocols." }
    ]
  },
  {
    slug: "mechanical",
    title: "Mechanical Engineering",
    labs: [
      { title: "Thermodynamics Virtual Lab", slug: "thermodynamics", desc: "Simulate thermodynamic cycles and heat transfer processes." },
      { title: "Fluid Mechanics Lab", slug: "fluid-mechanics", desc: "Conduct virtual experiments on fluid flow and pressure." },
      { title: "Robotics and Automation Lab", slug: "robotics", desc: "Program virtual robotic arms and simulate kinematics." }
    ]
  },
  {
    slug: "electrical",
    title: "Electrical Engineering",
    labs: [
      { title: "Electrical Machines Lab", slug: "electrical-machines", desc: "Study DC/AC motors and transformers virtually." },
      { title: "Power Systems Simulation Lab", slug: "power-systems", desc: "Analyze load flow, fault detection, and power grids." },
      { title: "Control Systems Lab", slug: "control-systems", desc: "Design and test controllers using virtual plants." }
    ]
  },
  {
    slug: "civil",
    title: "Civil Engineering",
    labs: [
      { title: "Structural Analysis Lab", slug: "structural-analysis", desc: "Analyze beams, trusses, and frames under various loads." },
      { title: "Surveying Virtual Lab", slug: "surveying", desc: "Learn leveling, theodolite operations, and mapping." },
      { title: "Environmental Engineering Lab", slug: "environmental-engineering", desc: "Test water quality and simulate treatment processes." }
    ]
  },
  {
    slug: "chemical",
    title: "Chemical Engineering",
    labs: [
      { title: "Mass Transfer Operations Lab", slug: "mass-transfer", desc: "Simulate distillation, absorption, and extraction." },
      { title: "Process Control Dynamics Lab", slug: "process-control", desc: "Study PID controllers and dynamic system responses." },
      { title: "Chemical Reaction Engineering Lab", slug: "reaction-engineering", desc: "Analyze reactor design and reaction kinetics." }
    ]
  }
];
