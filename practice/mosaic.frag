#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;
#define r resolution
#define t time

void main(void){
  vec2 p = gl_FragCoord.xy / r;

  p = floor(p * 30.0) / 15.0;
  vec3 a = vec3(0.5, 0.5, 0.5) * 1.2;
  vec3 b = vec3(0.5, 0.5, 0.5);
  vec3 c = vec3(t / 1.0, t * 0.1, t / 2.0);
  vec3 d = vec3(0.0, 0.33, 0.07);
  vec3 col = b + a * sin(8.0 * (c + p.y + sin(p.x + p.x + t)));

  gl_FragColor = vec4(col, 1.0);
}
