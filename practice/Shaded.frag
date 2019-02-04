#extension GL_OES_standard_derivatives : enable

#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

void main(void) {
  vec2 positon = gl_FragCoord.xy;
  float x = (positon.x + time * 20.0) - positon.y;
  float domain = fract(x * 0.01);

  float g = positon.y / resolution.y;
  vec4 c1 = vec4(pow(g, 4.0), 0, 0.15, 1.0);
  vec4 c2 = vec4(0.1 * (1.0 - g), 0.0, 0.0, 1.0);
  float smooth = 0.015;
  gl_FragColor = mix(c1, c2, smoothstep(0.5 - smooth, 0.5, domain) - smoothstep(1.0 - smooth, 1.0, domain));
}
