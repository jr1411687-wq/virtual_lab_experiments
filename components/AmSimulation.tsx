"use client";

import React, { useEffect, useRef, useState } from "react";

function drawWave(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  samples: number[],
  color: string,
  label: string
) {
  const padX = 16;
  const padY = 18;
  const midY = height / 2;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(148, 163, 184, 0.25)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padX, midY);
  ctx.lineTo(width - padX, midY);
  ctx.stroke();

  ctx.fillStyle = "#94a3b8";
  ctx.font = "12px ui-sans-serif, system-ui, sans-serif";
  ctx.fillText(label, padX, 14);

  const usableW = width - padX * 2;
  const usableH = height - padY * 2;
  const maxAbs = Math.max(...samples.map((v) => Math.abs(v)), 1e-6);

  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  samples.forEach((v, i) => {
    const x = padX + (i / (samples.length - 1)) * usableW;
    const y = midY - (v / maxAbs) * (usableH / 2);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
}

export default function AmSimulation() {
  const [am, setAm] = useState(0.6);
  const [ac, setAc] = useState(1);
  const [fm, setFm] = useState(2);
  const [fc, setFc] = useState(20);
  const msgRef = useRef<HTMLCanvasElement>(null);
  const carRef = useRef<HTMLCanvasElement>(null);
  const amRef = useRef<HTMLCanvasElement>(null);

  const m = ac > 0 ? am / ac : 0;
  const vmax = ac + am;
  const vmin = Math.max(ac - am, 0);
  const mFromEnvelope = vmax + vmin > 0 ? (vmax - vmin) / (vmax + vmin) : 0;
  const overmodulated = m > 1;

  useEffect(() => {
    const n = 600;
    const duration = 1;
    const message: number[] = [];
    const carrier: number[] = [];
    const modulated: number[] = [];

    for (let i = 0; i < n; i++) {
      const t = (i / (n - 1)) * duration;
      const em = am * Math.cos(2 * Math.PI * fm * t);
      const ec = ac * Math.cos(2 * Math.PI * fc * t);
      message.push(em);
      carrier.push(ec);
      modulated.push((ac + em) * Math.cos(2 * Math.PI * fc * t));
    }

    const configs: Array<[React.RefObject<HTMLCanvasElement | null>, number[], string, string]> = [
      [msgRef, message, "#38bdf8", "Message signal em(t)"],
      [carRef, carrier, "#34d399", "Carrier signal ec(t)"],
      [amRef, modulated, "#fbbf24", "DSB AM waveform e(t)"],
    ];

    configs.forEach(([ref, samples, color, label]) => {
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
    });
  }, [am, ac, fm, fc]);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <label className="block text-sm text-gray-700">
          Message amplitude Am: <strong>{am.toFixed(2)}</strong>
          <input
            type="range"
            min={0}
            max={1.5}
            step={0.01}
            value={am}
            onChange={(e) => setAm(Number(e.target.value))}
            className="w-full mt-2"
          />
        </label>
        <label className="block text-sm text-gray-700">
          Carrier amplitude Ac: <strong>{ac.toFixed(2)}</strong>
          <input
            type="range"
            min={0.2}
            max={1.5}
            step={0.01}
            value={ac}
            onChange={(e) => setAc(Number(e.target.value))}
            className="w-full mt-2"
          />
        </label>
        <label className="block text-sm text-gray-700">
          Message frequency fm: <strong>{fm.toFixed(1)}</strong>
          <input
            type="range"
            min={1}
            max={5}
            step={0.1}
            value={fm}
            onChange={(e) => setFm(Number(e.target.value))}
            className="w-full mt-2"
          />
        </label>
        <label className="block text-sm text-gray-700">
          Carrier frequency fc: <strong>{fc.toFixed(0)}</strong>
          <input
            type="range"
            min={10}
            max={40}
            step={1}
            value={fc}
            onChange={(e) => setFc(Number(e.target.value))}
            className="w-full mt-2"
          />
        </label>
      </div>

      <div className="grid gap-3">
        <canvas ref={msgRef} className="w-full h-28 rounded border border-gray-200" />
        <canvas ref={carRef} className="w-full h-28 rounded border border-gray-200" />
        <canvas ref={amRef} className="w-full h-36 rounded border border-gray-200" />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-100 p-4 rounded">
          <div className="text-xs uppercase tracking-wide text-blue-700">Vmax</div>
          <div className="text-2xl font-semibold text-blue-900">{vmax.toFixed(2)}</div>
          <div className="text-xs text-blue-700 mt-1">Ac + Am</div>
        </div>
        <div className="bg-blue-50 border border-blue-100 p-4 rounded">
          <div className="text-xs uppercase tracking-wide text-blue-700">Vmin</div>
          <div className="text-2xl font-semibold text-blue-900">{vmin.toFixed(2)}</div>
          <div className="text-xs text-blue-700 mt-1">Ac − Am</div>
        </div>
        <div className={`border p-4 rounded ${overmodulated ? "bg-red-50 border-red-200" : "bg-emerald-50 border-emerald-100"}`}>
          <div className={`text-xs uppercase tracking-wide ${overmodulated ? "text-red-700" : "text-emerald-700"}`}>
            Modulation index m
          </div>
          <div className={`text-2xl font-semibold ${overmodulated ? "text-red-800" : "text-emerald-900"}`}>
            {mFromEnvelope.toFixed(3)}
          </div>
          <div className={`text-xs mt-1 ${overmodulated ? "text-red-700" : "text-emerald-700"}`}>
            {(mFromEnvelope * 100).toFixed(1)}% {overmodulated ? "(overmodulated)" : "modulated"}
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600">
        Formula used: <code className="bg-gray-100 px-2 py-1 rounded">m = (Vmax − Vmin) / (Vmax + Vmin)</code>
        {" "}≈ Am / Ac when m ≤ 1. Increase Am above Ac to see overmodulation distortion on the envelope.
      </p>
    </div>
  );
}
