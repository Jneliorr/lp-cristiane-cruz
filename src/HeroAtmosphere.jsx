import { useEffect, useRef } from 'react'

const vertexSource = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

const fragmentSource = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 u_size;
uniform float u_time;

float grain(vec2 point) {
  vec3 seed = fract(vec3(point.xyx) * 0.1031);
  seed += dot(seed, seed.yzx + 33.33);
  return fract((seed.x + seed.y) * seed.z);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_size;
  vec2 p = (uv - vec2(0.55, 0.47)) * vec2(u_size.x / u_size.y, 1.0);
  float t = u_time * 0.15;
  float wave = sin(p.y * 4.1 + p.x * 2.8 + t) * 0.14;
  float veil = exp(-2.4 * length(vec2(p.x + wave, p.y * 0.85)));
  vec2 warm = p - vec2(0.34 + 0.10 * sin(t), 0.26 + 0.07 * cos(t));
  float glow = exp(-3.1 * dot(warm, warm));
  vec3 color = mix(vec3(0.103, 0.118, 0.077), vec3(0.225, 0.246, 0.158), veil);
  color += vec3(0.145, 0.104, 0.047) * glow * smoothstep(0.2, 0.95, uv.x);
  color += vec3((grain(gl_FragCoord.xy) - 0.5) * 0.033);
  gl_FragColor = vec4(color, 1.0);
}
`

function compile(gl, type, source) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader
  gl.deleteShader(shader)
  return null
}

export default function HeroAtmosphere() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false })
    if (!gl) return

    const vertex = compile(gl, gl.VERTEX_SHADER, vertexSource)
    const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentSource)
    const program = gl.createProgram()
    if (program && vertex && fragment) {
      gl.attachShader(program, vertex)
      gl.attachShader(program, fragment)
      gl.linkProgram(program)
    }
    if (vertex) gl.deleteShader(vertex)
    if (fragment) gl.deleteShader(fragment)
    if (!program || !gl.getProgramParameter(program, gl.LINK_STATUS)) {
      if (program) gl.deleteProgram(program)
      return
    }

    const buffer = gl.createBuffer()
    if (!buffer) {
      gl.deleteProgram(program)
      return
    }
    const position = gl.getAttribLocation(program, 'a_position')
    const size = gl.getUniformLocation(program, 'u_size')
    const time = gl.getUniformLocation(program, 'u_time')
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const start = performance.now()
    let frame = 0
    let visible = false

    function draw(now) {
      gl.uniform1f(time, motion.matches ? 0 : (now - start) / 1000)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      canvas.dataset.ready = 'true'
    }

    function animate(now) {
      draw(now)
      frame = requestAnimationFrame(animate)
    }

    function updateAnimation() {
      cancelAnimationFrame(frame)
      if (gl.isContextLost()) return
      if (visible && !motion.matches && !document.hidden) frame = requestAnimationFrame(animate)
      else draw(performance.now())
    }

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.35, 1400 / canvas.clientWidth)
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * ratio))
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * ratio))
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(size, canvas.width, canvas.height)
      if (!gl.isContextLost()) draw(performance.now())
    }

    function handleContextLoss() {
      cancelAnimationFrame(frame)
      delete canvas.dataset.ready
    }

    const resizeObserver = new ResizeObserver(resize)
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      updateAnimation()
    })
    resize()
    resizeObserver.observe(canvas)
    observer.observe(canvas)
    motion.addEventListener('change', updateAnimation)
    document.addEventListener('visibilitychange', updateAnimation)
    canvas.addEventListener('webglcontextlost', handleContextLoss)

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      observer.disconnect()
      motion.removeEventListener('change', updateAnimation)
      document.removeEventListener('visibilitychange', updateAnimation)
      canvas.removeEventListener('webglcontextlost', handleContextLoss)
      delete canvas.dataset.ready
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
}
