"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type CompType =
  | "audio-osc"
  | "carrier-osc"
  | "balanced-mod"
  | "amp"
  | "cro"
  | "antenna"
  | "gnd"
  | "resistor"
  | "capacitor"
  | "probe";

type Pin = { id: string; label: string; dx: number; dy: number };

type CatalogItem = {
  type: CompType;
  name: string;
  short: string;
  w: number;
  h: number;
  color: string;
  pins: Pin[];
  defaults: Record<string, number | string>;
};

type Placed = {
  id: string;
  type: CompType;
  x: number;
  y: number;
  props: Record<string, number | string>;
};

type Wire = {
  id: string;
  from: { compId: string; pinId: string };
  to: { compId: string; pinId: string };
};

type Mode = "select" | "wire" | "delete";

const GRID = 20;
const CATALOG: CatalogItem[] = [
  {
    type: "audio-osc",
    name: "Audio Oscillator",
    short: "AF OSC",
    w: 120,
    h: 70,
    color: "#0ea5e9",
    pins: [
      { id: "out", label: "OUT", dx: 120, dy: 35 },
      { id: "gnd", label: "GND", dx: 60, dy: 70 },
    ],
    defaults: { Am: 0.6, fm: 1000 },
  },
  {
    type: "carrier-osc",
    name: "1 MHz Crystal Oscillator",
    short: "XTAL 1MHz",
    w: 130,
    h: 70,
    color: "#10b981",
    pins: [
      { id: "out", label: "OUT", dx: 130, dy: 35 },
      { id: "gnd", label: "GND", dx: 65, dy: 70 },
    ],
    defaults: { Ac: 1, fc: 1000000 },
  },
  {
    type: "balanced-mod",
    name: "Balanced Modulator",
    short: "BAL MOD",
    w: 140,
    h: 90,
    color: "#f59e0b",
    pins: [
      { id: "mod", label: "MOD", dx: 0, dy: 25 },
      { id: "car", label: "CAR", dx: 0, dy: 65 },
      { id: "out", label: "AM OUT", dx: 140, dy: 45 },
      { id: "gnd", label: "GND", dx: 70, dy: 90 },
    ],
    defaults: {},
  },
  {
    type: "amp",
    name: "Output Amplifier",
    short: "AMP",
    w: 110,
    h: 70,
    color: "#8b5cf6",
    pins: [
      { id: "in", label: "IN", dx: 0, dy: 35 },
      { id: "out", label: "OUT", dx: 110, dy: 35 },
      { id: "gnd", label: "GND", dx: 55, dy: 70 },
    ],
    defaults: { gain: 1.2 },
  },
  {
    type: "cro",
    name: "CRO / Oscilloscope",
    short: "CRO",
    w: 120,
    h: 80,
    color: "#ef4444",
    pins: [
      { id: "ch1", label: "CH1", dx: 0, dy: 30 },
      { id: "ch2", label: "CH2", dx: 0, dy: 55 },
      { id: "gnd", label: "GND", dx: 60, dy: 80 },
    ],
    defaults: {},
  },
  {
    type: "antenna",
    name: "Antenna",
    short: "ANT",
    w: 70,
    h: 90,
    color: "#64748b",
    pins: [{ id: "in", label: "IN", dx: 35, dy: 90 }],
    defaults: {},
  },
  {
    type: "gnd",
    name: "Ground",
    short: "GND",
    w: 50,
    h: 40,
    color: "#334155",
    pins: [{ id: "gnd", label: "", dx: 25, dy: 0 }],
    defaults: {},
  },
  {
    type: "resistor",
    name: "Resistor",
    short: "R",
    w: 90,
    h: 40,
    color: "#a16207",
    pins: [
      { id: "a", label: "A", dx: 0, dy: 20 },
      { id: "b", label: "B", dx: 90, dy: 20 },
    ],
    defaults: { ohms: 1000 },
  },
  {
    type: "capacitor",
    name: "Capacitor",
    short: "C",
    w: 70,
    h: 50,
    color: "#0369a1",
    pins: [
      { id: "a", label: "A", dx: 0, dy: 25 },
      { id: "b", label: "B", dx: 70, dy: 25 },
    ],
    defaults: { uF: 0.1 },
  },
  {
    type: "probe",
    name: "Test Probe",
    short: "TP",
    w: 60,
    h: 50,
    color: "#db2777",
    pins: [
      { id: "tip", label: "TIP", dx: 30, dy: 0 },
      { id: "out", label: "OUT", dx: 30, dy: 50 },
    ],
    defaults: { label: "t.p." },
  },
];

const catalogByType = Object.fromEntries(CATALOG.map((c) => [c.type, c])) as Record<
  CompType,
  CatalogItem
>;

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function snap(n: number) {
  return Math.round(n / GRID) * GRID;
}

function pinAbs(comp: Placed, pinId: string) {
  const meta = catalogByType[comp.type];
  const pin = meta.pins.find((p) => p.id === pinId);
  if (!pin) return { x: comp.x, y: comp.y };
  return { x: comp.x + pin.dx, y: comp.y + pin.dy };
}

function drawWave(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  samples: number[],
  color: string,
  label: string
) {
  const padX = 12;
  const padY = 16;
  const midY = height / 2;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#020617";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "rgba(148,163,184,0.25)";
  ctx.beginPath();
  ctx.moveTo(padX, midY);
  ctx.lineTo(width - padX, midY);
  ctx.stroke();
  ctx.fillStyle = "#94a3b8";
  ctx.font = "11px ui-sans-serif, system-ui";
  ctx.fillText(label, padX, 12);
  const maxAbs = Math.max(...samples.map((v) => Math.abs(v)), 1e-6);
  const usableW = width - padX * 2;
  const usableH = height - padY * 2;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  samples.forEach((v, i) => {
    const x = padX + (i / (samples.length - 1)) * usableW;
    const y = midY - (v / maxAbs) * (usableH / 2);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
}

function neighbors(wires: Wire[], nodeKey: string) {
  const out: string[] = [];
  for (const w of wires) {
    const a = `${w.from.compId}:${w.from.pinId}`;
    const b = `${w.to.compId}:${w.to.pinId}`;
    if (a === nodeKey) out.push(b);
    if (b === nodeKey) out.push(a);
  }
  return out;
}

function connectedTo(
  comps: Placed[],
  wires: Wire[],
  start: { compId: string; pinId: string },
  targetType: CompType,
  targetPin?: string
) {
  const startKey = `${start.compId}:${start.pinId}`;
  const seen = new Set<string>([startKey]);
  const q = [startKey];
  while (q.length) {
    const cur = q.shift()!;
    const [compId, pinId] = cur.split(":");
    const comp = comps.find((c) => c.id === compId);
    if (comp?.type === targetType && (!targetPin || pinId === targetPin)) {
      return comp;
    }
    for (const n of neighbors(wires, cur)) {
      if (!seen.has(n)) {
        seen.add(n);
        q.push(n);
      }
    }
  }
  return null;
}

function defaultLayout(): { comps: Placed[]; wires: Wire[] } {
  const audio: Placed = {
    id: "c-audio",
    type: "audio-osc",
    x: 60,
    y: 80,
    props: { ...catalogByType["audio-osc"].defaults },
  };
  const carrier: Placed = {
    id: "c-carrier",
    type: "carrier-osc",
    x: 60,
    y: 220,
    props: { ...catalogByType["carrier-osc"].defaults },
  };
  const mod: Placed = {
    id: "c-mod",
    type: "balanced-mod",
    x: 280,
    y: 140,
    props: {},
  };
  const amp: Placed = {
    id: "c-amp",
    type: "amp",
    x: 500,
    y: 150,
    props: { ...catalogByType.amp.defaults },
  };
  const cro: Placed = {
    id: "c-cro",
    type: "cro",
    x: 700,
    y: 140,
    props: {},
  };
  const gnd: Placed = {
    id: "c-gnd",
    type: "gnd",
    x: 340,
    y: 320,
    props: {},
  };

  return {
    comps: [audio, carrier, mod, amp, cro, gnd],
    wires: [
      { id: "w1", from: { compId: audio.id, pinId: "out" }, to: { compId: mod.id, pinId: "mod" } },
      { id: "w2", from: { compId: carrier.id, pinId: "out" }, to: { compId: mod.id, pinId: "car" } },
      { id: "w3", from: { compId: mod.id, pinId: "out" }, to: { compId: amp.id, pinId: "in" } },
      { id: "w4", from: { compId: amp.id, pinId: "out" }, to: { compId: cro.id, pinId: "ch1" } },
      { id: "w5", from: { compId: audio.id, pinId: "gnd" }, to: { compId: gnd.id, pinId: "gnd" } },
      { id: "w6", from: { compId: carrier.id, pinId: "gnd" }, to: { compId: gnd.id, pinId: "gnd" } },
      { id: "w7", from: { compId: mod.id, pinId: "gnd" }, to: { compId: gnd.id, pinId: "gnd" } },
      { id: "w8", from: { compId: cro.id, pinId: "gnd" }, to: { compId: gnd.id, pinId: "gnd" } },
    ],
  };
}

export default function CircuitWorkbench() {
  const initial = useMemo(() => defaultLayout(), []);
  const [comps, setComps] = useState<Placed[]>(initial.comps);
  const [wires, setWires] = useState<Wire[]>(initial.wires);
  const [mode, setMode] = useState<Mode>("select");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [placing, setPlacing] = useState<CompType | null>(null);
  const [wireStart, setWireStart] = useState<{ compId: string; pinId: string } | null>(null);
  const [status, setStatus] = useState("Place / wire components like Proteus, then click Run.");
  const [running, setRunning] = useState(false);
  const [metrics, setMetrics] = useState<{ vmax: number; vmin: number; m: number; Am: number; Ac: number } | null>(
    null
  );

  const boardRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ id: string; ox: number; oy: number } | null>(null);
  const msgRef = useRef<HTMLCanvasElement>(null);
  const carRef = useRef<HTMLCanvasElement>(null);
  const amRef = useRef<HTMLCanvasElement>(null);

  const selected = comps.find((c) => c.id === selectedId) || null;

  const addComponent = (type: CompType, x = 200, y = 120) => {
    const meta = catalogByType[type];
    const next: Placed = {
      id: uid("c"),
      type,
      x: snap(x),
      y: snap(y),
      props: { ...meta.defaults },
    };
    setComps((prev) => [...prev, next]);
    setSelectedId(next.id);
    setPlacing(null);
    setMode("select");
    setStatus(`Placed ${meta.name}. Drag to move, use Wire mode to connect pins.`);
  };

  const onBoardClick = (e: React.MouseEvent) => {
    if (!placing || !boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left + boardRef.current.scrollLeft;
    const y = e.clientY - rect.top + boardRef.current.scrollTop;
    addComponent(placing, x - 40, y - 20);
  };

  const onPinClick = (compId: string, pinId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (mode === "delete") {
      setWires((prev) =>
        prev.filter(
          (w) =>
            !(
              (w.from.compId === compId && w.from.pinId === pinId) ||
              (w.to.compId === compId && w.to.pinId === pinId)
            )
        )
      );
      setStatus("Removed wires on that pin.");
      return;
    }
    if (mode !== "wire") {
      setSelectedId(compId);
      return;
    }
    if (!wireStart) {
      setWireStart({ compId, pinId });
      setStatus("Select the second pin to complete the wire.");
      return;
    }
    if (wireStart.compId === compId && wireStart.pinId === pinId) {
      setWireStart(null);
      return;
    }
    setWires((prev) => [
      ...prev,
      { id: uid("w"), from: wireStart, to: { compId, pinId } },
    ]);
    setWireStart(null);
    setStatus("Wire connected.");
  };

  const deleteSelected = () => {
    if (!selectedId) return;
    setComps((prev) => prev.filter((c) => c.id !== selectedId));
    setWires((prev) =>
      prev.filter((w) => w.from.compId !== selectedId && w.to.compId !== selectedId)
    );
    setSelectedId(null);
    setStatus("Component deleted.");
  };

  const runSimulation = useCallback(() => {
    const audio = comps.find((c) => c.type === "audio-osc");
    const carrier = comps.find((c) => c.type === "carrier-osc");
    const mod = comps.find((c) => c.type === "balanced-mod");
    const cro = comps.find((c) => c.type === "cro");

    if (!audio || !carrier || !mod || !cro) {
      setRunning(false);
      setMetrics(null);
      setStatus("Need Audio Oscillator, Crystal Oscillator, Balanced Modulator, and CRO on the board.");
      return;
    }

    const audioToMod = connectedTo(
      comps,
      wires,
      { compId: audio.id, pinId: "out" },
      "balanced-mod",
      "mod"
    );
    const carToMod = connectedTo(
      comps,
      wires,
      { compId: carrier.id, pinId: "out" },
      "balanced-mod",
      "car"
    );
    const modToCro =
      connectedTo(comps, wires, { compId: mod.id, pinId: "out" }, "cro", "ch1") ||
      connectedTo(comps, wires, { compId: mod.id, pinId: "out" }, "cro", "ch2") ||
      (() => {
        const amp = connectedTo(comps, wires, { compId: mod.id, pinId: "out" }, "amp", "in");
        if (!amp) return null;
        return (
          connectedTo(comps, wires, { compId: amp.id, pinId: "out" }, "cro", "ch1") ||
          connectedTo(comps, wires, { compId: amp.id, pinId: "out" }, "cro", "ch2")
        );
      })();

    if (!audioToMod || !carToMod) {
      setRunning(false);
      setMetrics(null);
      setStatus("Wire Audio OUT → MOD and Carrier OUT → CAR on the Balanced Modulator.");
      return;
    }
    if (!modToCro) {
      setRunning(false);
      setMetrics(null);
      setStatus("Wire AM OUT (via amp optional) to CRO CH1/CH2.");
      return;
    }

    const Am = Number(audio.props.Am ?? 0.6);
    const Ac = Number(carrier.props.Ac ?? 1);
    const fm = Number(audio.props.fm ?? 1000);
    const fc = Math.min(Number(carrier.props.fc ?? 1e6), 40); // display-scaled carrier
    const ampComp = comps.find((c) => c.type === "amp");
    const gain = ampComp ? Number(ampComp.props.gain ?? 1) : 1;

    const n = 700;
    const message: number[] = [];
    const car: number[] = [];
    const am: number[] = [];
    const fmDisp = Math.max(1, fm / 500);
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1);
      const em = Am * Math.cos(2 * Math.PI * fmDisp * t);
      const ec = Ac * Math.cos(2 * Math.PI * fc * t);
      message.push(em);
      car.push(ec);
      am.push(gain * (Ac + em) * Math.cos(2 * Math.PI * fc * t));
    }

    const paint = (
      ref: React.RefObject<HTMLCanvasElement | null>,
      samples: number[],
      color: string,
      label: string
    ) => {
      const canvas = ref.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawWave(ctx, width, height, samples, color, label);
    };

    paint(msgRef, message, "#38bdf8", "Message (Audio Osc) — t.p.14");
    paint(carRef, car, "#34d399", "Carrier (XTAL) — t.p.9");
    paint(amRef, am, "#fbbf24", "AM output on CRO — t.p.3");

    const vmax = gain * (Ac + Am);
    const vmin = Math.max(gain * (Ac - Am), 0);
    const m = vmax + vmin > 0 ? (vmax - vmin) / (vmax + vmin) : 0;
    setMetrics({ vmax, vmin, m, Am, Ac });
    setRunning(true);
    setStatus(
      m > 1
        ? "Simulation running — overmodulation detected (m > 1)."
        : `Simulation running — modulation index m = ${m.toFixed(3)} (${(m * 100).toFixed(1)}%).`
    );
  }, [comps, wires]);

  useEffect(() => {
    if (running) runSimulation();
  }, [running, comps, wires, runSimulation]);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragRef.current || !boardRef.current || mode !== "select") return;
    const rect = boardRef.current.getBoundingClientRect();
    const x = snap(e.clientX - rect.left + boardRef.current.scrollLeft - dragRef.current.ox);
    const y = snap(e.clientY - rect.top + boardRef.current.scrollTop - dragRef.current.oy);
    const id = dragRef.current.id;
    setComps((prev) => prev.map((c) => (c.id === id ? { ...c, x, y } : c)));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 border border-gray-200 bg-slate-50 p-2 rounded">
        <button
          type="button"
          onClick={() => {
            setMode("select");
            setPlacing(null);
            setWireStart(null);
          }}
          className={`px-3 py-1.5 text-sm rounded border ${mode === "select" && !placing ? "bg-[#0b5c9e] text-white border-[#0b5c9e]" : "bg-white"}`}
        >
          Select
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("wire");
            setPlacing(null);
          }}
          className={`px-3 py-1.5 text-sm rounded border ${mode === "wire" ? "bg-[#0b5c9e] text-white border-[#0b5c9e]" : "bg-white"}`}
        >
          Wire
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("delete");
            setPlacing(null);
            setWireStart(null);
          }}
          className={`px-3 py-1.5 text-sm rounded border ${mode === "delete" ? "bg-red-600 text-white border-red-600" : "bg-white"}`}
        >
          Delete wire/pin
        </button>
        <button
          type="button"
          onClick={deleteSelected}
          disabled={!selectedId}
          className="px-3 py-1.5 text-sm rounded border bg-white disabled:opacity-40"
        >
          Delete component
        </button>
        <button
          type="button"
          onClick={() => {
            const layout = defaultLayout();
            setComps(layout.comps);
            setWires(layout.wires);
            setSelectedId(null);
            setRunning(false);
            setMetrics(null);
            setStatus("Loaded ADCS Exp-1 starter circuit.");
          }}
          className="px-3 py-1.5 text-sm rounded border bg-white"
        >
          Load Exp-1 circuit
        </button>
        <button
          type="button"
          onClick={runSimulation}
          className="ml-auto px-4 py-1.5 text-sm rounded bg-emerald-600 text-white border border-emerald-700 font-medium"
        >
          ▶ Run Simulation
        </button>
      </div>

      <div className="text-sm text-slate-600 bg-white border border-gray-200 rounded px-3 py-2">{status}</div>

      <div className="grid lg:grid-cols-[220px_1fr_240px] gap-3 min-h-[520px]">
        {/* Component library — Proteus-style palette */}
        <aside className="border border-gray-200 rounded bg-white overflow-hidden flex flex-col">
          <div className="px-3 py-2 bg-slate-800 text-white text-sm font-semibold">
            Devices (Library)
          </div>
          <div className="p-2 space-y-1 overflow-y-auto max-h-[560px]">
            {CATALOG.map((item) => (
              <button
                key={item.type}
                type="button"
                onClick={() => {
                  setPlacing(item.type);
                  setMode("select");
                  setWireStart(null);
                  setStatus(`Click on the board to place ${item.name}.`);
                }}
                className={`w-full text-left px-2 py-2 rounded border text-sm flex items-center gap-2 ${
                  placing === item.type ? "border-[#0b5c9e] bg-blue-50" : "border-gray-100 hover:bg-gray-50"
                }`}
              >
                <span
                  className="w-3 h-3 rounded-sm shrink-0"
                  style={{ background: item.color }}
                />
                <span>
                  <span className="block font-medium text-gray-800">{item.short}</span>
                  <span className="block text-[11px] text-gray-500">{item.name}</span>
                </span>
              </button>
            ))}
          </div>
        </aside>

        {/* Schematic canvas */}
        <div
          ref={boardRef}
          onClick={onBoardClick}
          onMouseMove={onMouseMove}
          onMouseUp={() => {
            dragRef.current = null;
          }}
          onMouseLeave={() => {
            dragRef.current = null;
          }}
          className={`relative border border-gray-300 rounded overflow-auto bg-[#e8eef5] ${
            placing ? "cursor-crosshair" : mode === "wire" ? "cursor-cell" : "cursor-default"
          }`}
          style={{
            height: 560,
            backgroundImage:
              "linear-gradient(rgba(100,116,139,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(100,116,139,0.15) 1px, transparent 1px)",
            backgroundSize: `${GRID}px ${GRID}px`,
          }}
        >
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minWidth: 980, minHeight: 520 }}>
            {wires.map((w) => {
              const a = comps.find((c) => c.id === w.from.compId);
              const b = comps.find((c) => c.id === w.to.compId);
              if (!a || !b) return null;
              const p1 = pinAbs(a, w.from.pinId);
              const p2 = pinAbs(b, w.to.pinId);
              const midX = (p1.x + p2.x) / 2;
              return (
                <path
                  key={w.id}
                  d={`M ${p1.x} ${p1.y} C ${midX} ${p1.y}, ${midX} ${p2.y}, ${p2.x} ${p2.y}`}
                  stroke={running ? "#16a34a" : "#0f172a"}
                  strokeWidth={2.2}
                  fill="none"
                />
              );
            })}
            {wireStart &&
              (() => {
                const c = comps.find((x) => x.id === wireStart.compId);
                if (!c) return null;
                const p = pinAbs(c, wireStart.pinId);
                return <circle cx={p.x} cy={p.y} r={6} fill="#f59e0b" opacity={0.8} />;
              })()}
          </svg>

          <div className="absolute inset-0" style={{ minWidth: 980, minHeight: 520 }}>
            {comps.map((comp) => {
              const meta = catalogByType[comp.type];
              const active = selectedId === comp.id;
              return (
                <div
                  key={comp.id}
                  className={`absolute select-none ${active ? "z-20" : "z-10"}`}
                  style={{ left: comp.x, top: comp.y, width: meta.w, height: meta.h }}
                  onMouseDown={(e) => {
                    if (mode !== "select" || placing) return;
                    e.stopPropagation();
                    setSelectedId(comp.id);
                    dragRef.current = {
                      id: comp.id,
                      ox: e.clientX - (boardRef.current!.getBoundingClientRect().left - boardRef.current!.scrollLeft) - comp.x,
                      oy: e.clientY - (boardRef.current!.getBoundingClientRect().top - boardRef.current!.scrollTop) - comp.y,
                    };
                    // fix drag offset relative to board
                    const rect = boardRef.current!.getBoundingClientRect();
                    dragRef.current = {
                      id: comp.id,
                      ox: e.clientX - rect.left + boardRef.current!.scrollLeft - comp.x,
                      oy: e.clientY - rect.top + boardRef.current!.scrollTop - comp.y,
                    };
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!placing) setSelectedId(comp.id);
                  }}
                >
                  <div
                    className={`w-full h-full rounded-md border-2 shadow-sm flex flex-col items-center justify-center text-center px-1 ${
                      active ? "ring-2 ring-[#0b5c9e]" : ""
                    }`}
                    style={{
                      background: "#fff",
                      borderColor: meta.color,
                    }}
                  >
                    <div className="text-[10px] uppercase tracking-wide text-gray-500">{meta.short}</div>
                    <div className="text-xs font-semibold text-gray-800 leading-tight">{meta.name}</div>
                    {comp.type === "audio-osc" && (
                      <div className="text-[10px] text-sky-700 mt-0.5">Am={String(comp.props.Am)}</div>
                    )}
                    {comp.type === "carrier-osc" && (
                      <div className="text-[10px] text-emerald-700 mt-0.5">Ac={String(comp.props.Ac)}</div>
                    )}
                  </div>
                  {meta.pins.map((pin) => (
                    <button
                      key={pin.id}
                      type="button"
                      title={pin.label || pin.id}
                      onClick={(e) => onPinClick(comp.id, pin.id, e)}
                      className={`absolute w-3.5 h-3.5 rounded-full border-2 border-white shadow ${
                        wireStart?.compId === comp.id && wireStart.pinId === pin.id
                          ? "bg-amber-400"
                          : "bg-slate-800"
                      }`}
                      style={{
                        left: pin.dx - 7,
                        top: pin.dy - 7,
                      }}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Properties / CRO readout */}
        <aside className="border border-gray-200 rounded bg-white overflow-hidden flex flex-col">
          <div className="px-3 py-2 bg-slate-800 text-white text-sm font-semibold">
            Properties / Edit
          </div>
          <div className="p-3 space-y-3 text-sm flex-1 overflow-y-auto">
            {!selected ? (
              <p className="text-gray-500 text-xs">Select a component to edit values.</p>
            ) : (
              <>
                <div className="font-semibold text-gray-800">{catalogByType[selected.type].name}</div>
                {Object.keys(selected.props).length === 0 && (
                  <p className="text-xs text-gray-500">No editable parameters.</p>
                )}
                {Object.entries(selected.props).map(([key, val]) => (
                  <label key={key} className="block text-xs text-gray-600">
                    {key}
                    <input
                      type={typeof val === "number" ? "number" : "text"}
                      step="0.01"
                      value={String(val)}
                      onChange={(e) => {
                        const raw = e.target.value;
                        const nextVal = typeof val === "number" ? Number(raw) : raw;
                        setComps((prev) =>
                          prev.map((c) =>
                            c.id === selected.id
                              ? { ...c, props: { ...c.props, [key]: nextVal } }
                              : c
                          )
                        );
                      }}
                      className="mt-1 w-full border border-gray-200 rounded px-2 py-1 text-sm"
                    />
                  </label>
                ))}
              </>
            )}

            <div className="border-t border-gray-100 pt-3">
              <div className="text-xs font-semibold text-gray-700 mb-2">CRO Screen</div>
              <canvas ref={msgRef} className="w-full h-16 rounded mb-2 border border-slate-200" />
              <canvas ref={carRef} className="w-full h-16 rounded mb-2 border border-slate-200" />
              <canvas ref={amRef} className="w-full h-20 rounded border border-slate-200" />
              {metrics && (
                <div className="mt-3 space-y-1 text-xs text-gray-700">
                  <div>Vmax = <strong>{metrics.vmax.toFixed(2)}</strong></div>
                  <div>Vmin = <strong>{metrics.vmin.toFixed(2)}</strong></div>
                  <div>
                    m = (Vmax−Vmin)/(Vmax+Vmin) = <strong>{metrics.m.toFixed(3)}</strong>
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>

      <p className="text-xs text-gray-500">
        Proteus-style flow for this lab: pick devices from the library → place on the grid → Wire mode to connect pins →
        edit Am/Ac → Run Simulation to see CRO traces and modulation index. This is an educational schematic
        simulator for ADCS Exp-1 (not a full SPICE engine).
      </p>
    </div>
  );
}
