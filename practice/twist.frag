#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

void main(){
  float t;
  t = time * 1.0;

  vec2 r = resolution,
  o = gl_FragCoord.xy - r / 2.0;
  o = vec2(length(o) / r.y - 0.3, atan(o.y, o.x));
  vec4 s = 0.07 * cos(1.5 * vec4(0.0, 1.0, 2.0, 3.0) + t + o.y + sin(o.y) * cos(t)),
  e = s.yzwx,
  f = max(o.x - s, e - o.x);

  gl_FragColor = dot(clamp(f * r.y, 0.1, 1.0), 80.0 * (s - e / 1.5)) * (s - 0.1) + f / 10.0;
}
