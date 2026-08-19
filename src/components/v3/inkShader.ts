/**
 * V3 "Shader Ink-Flow" hero engine — raw WebGL1, zero dependencies.
 *
 * Two-pass pipeline, both fullscreen-quad fragment shaders:
 *   1. TRAIL pass — low-res ping-pong FBO. Decays each frame, stamps a soft
 *      brush along the mouse's last-move segment (so fast swipes paint a
 *      continuous stroke, not dots). This is the "ink advected by cursor
 *      velocity" mechanic.
 *   2. DISPLAY pass — samples the trail texture + an fbm domain-warp noise
 *      field, blended against a geometric "settled" flow-line field via
 *      `uOrder` (0 = chaotic ink-in-water, 1 = calm ordered lines). Colors
 *      interpolate cream -> rust -> ink using smoothstep bands.
 *
 * `uOrder` is driven externally by ScrollTrigger scrub (setOrder) — that
 * chaos->order sweep across the hero->section-2 boundary IS the pitch
 * mechanic per the design spec.
 *
 * No react/DOM here — this file is a plain engine so it's easy to reuse for
 * the CTA "echo" instance at reduced cost.
 */

const VERT_SRC = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const TRAIL_FRAG_SRC = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uPrevTrail;
uniform vec2 uMouse;     // current mouse, uv space (0..1, y-up)
uniform vec2 uPrevMouse; // previous-frame mouse
uniform float uDecay;
uniform float uRadius;
uniform float uIntensity;
uniform float uAspect; // width/height, corrects circular brush on non-square canvas

float distToSegment(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0);
  return length(pa - ba * h);
}

void main() {
  float prev = texture2D(uPrevTrail, vUv).r * uDecay;
  vec2 uvC = vec2((vUv.x - 0.5) * uAspect, vUv.y - 0.5);
  vec2 mC = vec2((uMouse.x - 0.5) * uAspect, uMouse.y - 0.5);
  vec2 pmC = vec2((uPrevMouse.x - 0.5) * uAspect, uPrevMouse.y - 0.5);
  float d = distToSegment(uvC, pmC, mC);
  float brush = smoothstep(uRadius, 0.0, d) * uIntensity;
  float val = clamp(prev + brush, 0.0, 1.0);
  gl_FragColor = vec4(val, 0.0, 0.0, 1.0);
}
`;

const DISPLAY_FRAG_SRC = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uTrail;
uniform float uTime;
uniform float uOrder; // 0 = chaos, 1 = settled geometric flow
uniform float uAspect;
uniform vec3 uCream;
uniform vec3 uRust;
uniform vec3 uInk;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    v += amp * noise(p);
    p *= 2.02;
    amp *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vec2(vUv.x * uAspect, vUv.y);
  float t = uTime * 0.045;

  // --- Chaos field: domain-warped fbm (slow ink-in-water drift) ---
  vec2 warp = vec2(fbm(uv * 2.2 + t + 3.1), fbm(uv * 2.2 - t + 7.4));
  float chaos = fbm(uv * 1.6 + warp * 0.85 + t * 0.6);

  // --- Order field: settled diagonal flow lines ---
  float angle = 0.62;
  vec2 dir = vec2(cos(angle), sin(angle));
  float lineCoord = dot(uv, dir) * 26.0 + t * 4.0;
  float lines = sin(lineCoord);
  float order = smoothstep(-0.15, 0.15, lines) * 0.65
    + 0.18 * fbm(uv * 1.1 + t * 0.15);

  float field = mix(chaos, order, uOrder);

  float trail = texture2D(uTrail, vUv).r;

  float inkAmt = clamp(field * 0.55 + 0.28 + trail * 0.9, 0.0, 1.0);

  vec3 color = mix(uCream, uRust, smoothstep(0.36, 0.62, inkAmt));
  color = mix(color, uInk, smoothstep(0.78, 0.97, inkAmt));

  gl_FragColor = vec4(color, 1.0);
}
`;

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  src: string,
): WebGLShader {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile error: ${info}`);
  }
  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vertSrc: string,
  fragSrc: string,
): WebGLProgram {
  const program = gl.createProgram()!;
  const vs = createShader(gl, gl.VERTEX_SHADER, vertSrc);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fragSrc);
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(`Program link error: ${info}`);
  }
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  return program;
}

interface FBO {
  fb: WebGLFramebuffer;
  tex: WebGLTexture;
  w: number;
  h: number;
}

function createFBO(gl: WebGLRenderingContext, w: number, h: number): FBO {
  const tex = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    w,
    h,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    null,
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  const fb = gl.createFramebuffer()!;
  gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    tex,
    0,
  );
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  return { fb, tex, w, h };
}

export interface InkFlowOptions {
  /** Cap devicePixelRatio to bound fill-rate cost. */
  dprCap?: number;
  /** Trail buffer resolution divisor relative to display canvas (bigger = cheaper). */
  trailDivisor?: number;
  /** Static decorative "echo" mode: no pointer tracking, gentle auto-drift only. */
  echo?: boolean;
  colors?: {
    cream: [number, number, number];
    rust: [number, number, number];
    ink: [number, number, number];
  };
}

export interface InkFlowHandle {
  start: () => void;
  stop: () => void;
  setOrder: (v: number) => void;
  resize: () => void;
  destroy: () => void;
}

const DEFAULT_COLORS = {
  cream: [0xf2 / 255, 0xef / 255, 0xe6 / 255] as [number, number, number],
  rust: [0xc6 / 255, 0x6b / 255, 0x3f / 255] as [number, number, number],
  ink: [0x1a / 255, 0x1a / 255, 0x1a / 255] as [number, number, number],
};

/**
 * Boots the ink-flow WebGL engine on `canvas`. Returns a handle with an
 * explicit start/stop (pause the RAF loop, e.g. on IntersectionObserver
 * scroll-out) and destroy (full GL teardown on unmount). Returns null if
 * WebGL is unavailable OR if shader compile/link fails (e.g. a hostile
 * `getShaderParameter`/driver quirk) — this function never throws; every
 * failure path is a null return so the caller can fall back to the CSS
 * static hero without an uncaught exception reaching the page.
 */
export function createInkFlow(
  canvas: HTMLCanvasElement,
  opts: InkFlowOptions = {},
): InkFlowHandle | null {
  try {
    return createInkFlowUnsafe(canvas, opts);
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[inkShader] compile/link failed, falling back:", err);
    }
    return null;
  }
}

function createInkFlowUnsafe(
  canvas: HTMLCanvasElement,
  opts: InkFlowOptions = {},
): InkFlowHandle | null {
  const glCtx = (canvas.getContext("webgl", {
    antialias: false,
    alpha: false,
    powerPreference: "low-power",
  }) ||
    canvas.getContext("experimental-webgl", {
      antialias: false,
      alpha: false,
    })) as WebGLRenderingContext | null;
  if (!glCtx) return null;
  // Rebind to a definitely-non-null const — TS narrowing on the original
  // union-typed binding doesn't survive into the nested closures below
  // (allocFBOs/resize/render*), so every reference there needs this alias.
  const gl: WebGLRenderingContext = glCtx;

  const dprCap = opts.dprCap ?? 1.5;
  const trailDivisor = opts.trailDivisor ?? 3;
  const echo = opts.echo ?? false;
  const colors = opts.colors ?? DEFAULT_COLORS;

  // Fullscreen quad — shared by both passes.
  const quadBuf = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW,
  );

  const trailProgram = createProgram(gl, VERT_SRC, TRAIL_FRAG_SRC);
  const displayProgram = createProgram(gl, VERT_SRC, DISPLAY_FRAG_SRC);

  const trailLoc = {
    aPos: gl.getAttribLocation(trailProgram, "aPos"),
    uPrevTrail: gl.getUniformLocation(trailProgram, "uPrevTrail"),
    uMouse: gl.getUniformLocation(trailProgram, "uMouse"),
    uPrevMouse: gl.getUniformLocation(trailProgram, "uPrevMouse"),
    uDecay: gl.getUniformLocation(trailProgram, "uDecay"),
    uRadius: gl.getUniformLocation(trailProgram, "uRadius"),
    uIntensity: gl.getUniformLocation(trailProgram, "uIntensity"),
    uAspect: gl.getUniformLocation(trailProgram, "uAspect"),
  };
  const displayLoc = {
    aPos: gl.getAttribLocation(displayProgram, "aPos"),
    uTrail: gl.getUniformLocation(displayProgram, "uTrail"),
    uTime: gl.getUniformLocation(displayProgram, "uTime"),
    uOrder: gl.getUniformLocation(displayProgram, "uOrder"),
    uAspect: gl.getUniformLocation(displayProgram, "uAspect"),
    uCream: gl.getUniformLocation(displayProgram, "uCream"),
    uRust: gl.getUniformLocation(displayProgram, "uRust"),
    uInk: gl.getUniformLocation(displayProgram, "uInk"),
  };

  let trailA: FBO | null = null;
  let trailB: FBO | null = null;
  let cw = 0;
  let ch = 0;
  let tw = 0;
  let th = 0;

  const mouse = { x: 0.5, y: 0.5 };
  const prevMouse = { x: 0.5, y: 0.5 };
  let hasPointer = false;

  function onPointerMove(e: PointerEvent) {
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    prevMouse.x = mouse.x;
    prevMouse.y = mouse.y;
    mouse.x = (e.clientX - rect.left) / rect.width;
    mouse.y = 1 - (e.clientY - rect.top) / rect.height;
    hasPointer = true;
  }

  if (!echo) {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
  }

  function allocFBOs() {
    if (trailA) (gl.deleteFramebuffer(trailA.fb), gl.deleteTexture(trailA.tex));
    if (trailB) (gl.deleteFramebuffer(trailB.fb), gl.deleteTexture(trailB.tex));
    tw = Math.max(32, Math.floor(cw / trailDivisor));
    th = Math.max(32, Math.floor(ch / trailDivisor));
    trailA = createFBO(gl, tw, th);
    trailB = createFBO(gl, tw, th);
    // Clear both to black (no trail) so first frame isn't garbage memory.
    for (const fbo of [trailA, trailB]) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.fb);
      gl.viewport(0, 0, fbo.w, fbo.h);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    const w = Math.max(1, Math.round(rect.width * dpr));
    const h = Math.max(1, Math.round(rect.height * dpr));
    if (w === cw && h === ch) return;
    cw = canvas.width = w;
    ch = canvas.height = h;
    allocFBOs();
  }

  resize();

  let raf = 0;
  let running = false;
  let orderVal = 0;
  let autoT = 0;
  const start0 = performance.now();

  function renderTrailPass() {
    if (!trailA || !trailB) return;
    gl.useProgram(trailProgram);
    gl.bindFramebuffer(gl.FRAMEBUFFER, trailB.fb);
    gl.viewport(0, 0, trailB.w, trailB.h);
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
    gl.enableVertexAttribArray(trailLoc.aPos);
    gl.vertexAttribPointer(trailLoc.aPos, 2, gl.FLOAT, false, 0, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, trailA.tex);
    gl.uniform1i(trailLoc.uPrevTrail, 0);
    gl.uniform1f(trailLoc.uAspect, cw / ch);

    if (echo) {
      // Gentle synthetic drift for the CTA "echo" instance — no real cursor.
      autoT += 0.012;
      const ex = 0.5 + Math.sin(autoT) * 0.28;
      const ey = 0.5 + Math.cos(autoT * 0.8) * 0.22;
      gl.uniform2f(trailLoc.uMouse, ex, ey);
      gl.uniform2f(trailLoc.uPrevMouse, ex, ey);
      gl.uniform1f(trailLoc.uDecay, 0.985);
      gl.uniform1f(trailLoc.uRadius, 0.22);
      gl.uniform1f(trailLoc.uIntensity, 0.05);
    } else {
      gl.uniform2f(trailLoc.uMouse, mouse.x, mouse.y);
      gl.uniform2f(trailLoc.uPrevMouse, prevMouse.x, prevMouse.y);
      gl.uniform1f(trailLoc.uDecay, 0.965);
      gl.uniform1f(trailLoc.uRadius, 0.09);
      gl.uniform1f(trailLoc.uIntensity, hasPointer ? 0.22 : 0.0);
    }
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    // Swap ping-pong.
    const tmp = trailA;
    trailA = trailB;
    trailB = tmp;
    // Advance a frame's worth of prevMouse->mouse consumption; keep last
    // position stable until next real pointer event (no phantom motion).
    prevMouse.x = mouse.x;
    prevMouse.y = mouse.y;
  }

  function renderDisplayPass() {
    if (!trailA) return;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, cw, ch);
    gl.useProgram(displayProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
    gl.enableVertexAttribArray(displayLoc.aPos);
    gl.vertexAttribPointer(displayLoc.aPos, 2, gl.FLOAT, false, 0, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, trailA.tex);
    gl.uniform1i(displayLoc.uTrail, 0);
    gl.uniform1f(displayLoc.uTime, (performance.now() - start0) / 1000);
    gl.uniform1f(displayLoc.uOrder, orderVal);
    gl.uniform1f(displayLoc.uAspect, cw / ch);
    gl.uniform3f(displayLoc.uCream, ...colors.cream);
    gl.uniform3f(displayLoc.uRust, ...colors.rust);
    gl.uniform3f(displayLoc.uInk, ...colors.ink);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  function frame() {
    if (!running) return;
    renderTrailPass();
    renderDisplayPass();
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (running) return;
    running = true;
    raf = requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  function setOrder(v: number) {
    orderVal = Math.min(1, Math.max(0, v));
  }

  function destroy() {
    stop();
    if (!echo) window.removeEventListener("pointermove", onPointerMove);
    gl.deleteBuffer(quadBuf);
    gl.deleteProgram(trailProgram);
    gl.deleteProgram(displayProgram);
    if (trailA) (gl.deleteFramebuffer(trailA.fb), gl.deleteTexture(trailA.tex));
    if (trailB) (gl.deleteFramebuffer(trailB.fb), gl.deleteTexture(trailB.tex));
    const loseCtx = gl.getExtension("WEBGL_lose_context");
    loseCtx?.loseContext();
  }

  return { start, stop, setOrder, resize, destroy };
}
