#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

const int complex = 15;
const float mouse_factor = 56.0;
const float mouse_offset = 2.0;
const float fluid_speed = 18.0;
const float color_intensity = 0.9;

void main(){
  vec2 p = (2.0 * gl_FragCoord.xy - resolution) / max(resolution.x, resolution.y);
  for(int i = 1; i < complex; i++){
    vec2 newp = p + time * 0.001;
    newp.x += 0.6 / float(i) * sin(float(i) * p.y + time / fluid_speed + 0.3 * float(i)) + 0.5 /*+ mouse.y / mouse_factor + mouse_offset*/;
    newp.x += 0.6 / float(i) * sin(float(i) * p.y + time / fluid_speed + 0.3 * float(i + 10)) - 0.5 /*- mouse.x / mouse_factor - mouse_offset*/;
    p = newp;
  }
  vec3 col = vec3(color_intensity * sin(3.0 * p.x) + color_intensity, color_intensity * sin(3.0 * p.y) + color_intensity,color_intensity * sin(p.x + p.y) + color_intensity);
  gl_FragColor = vec4(col, 1.0);
}