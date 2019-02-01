#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

vec4 circle(vec2 st, float x, float y, float radius, vec4 color) {
  vec2 pos = vec2(x + sin(time), y + cos(time));
  float dist = distance(st, pos);
  float index = floor(dist);
  dist = fract(1.0 * 0.2 - dist * 3.0) + 0.4;
  dist = 1.0 - smoothstep(radius - 0.01, radius + 0.01, dist);
  vec4 col = vec4(vec3(dist), 1.0) * color;
  return col;
}

void main() {
  
}
