"use client";
import { useEffect, useRef } from "react";

/*
  ShaderWaves — liquid, swirling colour bands rendered with WebGL.
  Original implementation (domain-warped sine bands), no dependencies.

  Props
    color1      bright band colour            (hex)
    color2      background / dark colour      (hex)
    speed       animation speed               (0 = static)
    scale       zoom: higher = more, thinner bands
    warp        how strongly the bands swirl
    softness    edge softness of the bands    (0.05 – 0.6)
    frequency   how many stripes per band
    mouse       bands lean toward the cursor
*/

const VERT = `
attribute vec2 p;
void main(){ gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2  uRes;
uniform float uTime;
uniform vec3  uC1;
uniform vec3  uC2;
uniform float uScale;
uniform float uWarp;
uniform float uSoft;
uniform float uFreq;
uniform vec2  uMouse;

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (uv - 0.5) * vec2(uRes.x / uRes.y, 1.0) * uScale;
  p += (uMouse - 0.5) * 0.35;
  float t = uTime;

  // Domain warping: each pass bends space a little more
  for (int i = 1; i < 5; i++) {
    float fi = float(i);
    p.x += uWarp / fi * sin(fi * 0.7 * p.y + t * 0.6 + 0.3 * fi);
    p.y += uWarp / fi * cos(fi * 0.6 * p.x + t * 0.45 + 0.5 * fi);
  }

  // Contour stripes of the warped field: nested, liquid bands
  float field = p.x * 0.9 + p.y * 0.55;
  float s = sin(field * uFreq + t * 0.5);
  float band = smoothstep(-uSoft, uSoft, s);

  // Thin dark seams between the bands, like folded satin
  float seam = smoothstep(0.0, 0.18, abs(s));

  // Broad light / shadow across the surface
  float shade = 0.55 + 0.45 * smoothstep(-1.0, 1.0, sin(field * 0.9 - t * 0.25));
  float gloss = pow(max(1.0 - abs(s - 0.55), 0.0), 8.0) * 0.35;

  vec3 col = mix(uC2, uC1 * shade + gloss, band) * mix(0.35, 1.0, seam);
  gl_FragColor = vec4(col, 1.0);
}
`;

const hexToRgb = (hex) => {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

const ShaderWaves = ({
  color1 = "#0dff88",
  color2 = "#0a0a0a",
  speed = 0.35,
  scale = 1.4,
  warp = 1.2,
  softness = 0.4,
  frequency = 5.5,
  mouse = true,
  className = "",
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl) return undefined; // falls back to the parent's background

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return undefined;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (n) => gl.getUniformLocation(prog, n);
    const uRes = u("uRes"), uTime = u("uTime"), uMouse = u("uMouse");
    gl.uniform3fv(u("uC1"), hexToRgb(color1));
    gl.uniform3fv(u("uC2"), hexToRgb(color2));
    gl.uniform1f(u("uScale"), scale);
    gl.uniform1f(u("uWarp"), warp);
    gl.uniform1f(u("uSoft"), softness);
    gl.uniform1f(u("uFreq"), frequency);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, w, h);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // Mouse, eased
    const target = [0.5, 0.5];
    const cur = [0.5, 0.5];
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      target[0] = (e.clientX - r.left) / r.width;
      target[1] = 1 - (e.clientY - r.top) / r.height;
    };
    if (mouse) window.addEventListener("pointermove", onMove, { passive: true });

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    let raf = 0;
    let t = 4.0;
    let last = performance.now();
    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible) return;
      if (!reduce) t += dt * speed;
      cur[0] += (target[0] - cur[0]) * 0.04;
      cur[1] += (target[1] - cur[1]) * 0.04;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, cur[0], cur[1]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      // Free GPU resources but keep the context alive: React (StrictMode / fast
      // refresh) may mount this canvas again, and a lost context never recovers.
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, [color1, color2, speed, scale, warp, softness, frequency, mouse]);

  return <canvas ref={canvasRef} className={`block h-full w-full ${className}`} aria-hidden="true" />;
};

export default ShaderWaves;
