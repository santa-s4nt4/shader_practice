precision mediump float;
uniform float time;
uniform vec2  mouse;
uniform vec2  resolution;

void main()
{
  vec2 m = vec2(mouse.x * 2.0 - 1.0, -mouse.y * 2.0 + 1.0);
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  /*
  // ring
  //float t = 0.02 / abs(0.5 - length(p)); //絶対値
  float t = 0.01 / abs(sin(time) - length(p)); //time scare ring
  */

  /*
  // cone
  vec2 v = vec2(0.0, 1.0);
  float t = dot(p, v) / (length(p) * length(v));
  */

  /*
  // zoom line
  float t = atan(p.y, p.x) + time * 1.0;
  t = sin(t * 10.0);
  */

  /*
  // flower
  float u = sin((atan(p.y, p.x) + time * 0.5) * 6.0);
  float t = 0.01 / abs(u - length(p));
  */

  /*
  // wave ring
  float u = sin((atan(p.y, p.x) + time * 0.5) * 20.0) * 0.01;
  float t = 0.01 / abs(0.5 + u - length(p));
  */

  /*
  // naruto
  float u = abs(sin((atan(p.y, p.x) - length(p) * 10.0 + time - 2.0) * 1.0) * 0.5) + 0.3;
  float t = 0.01 / abs(u - length(p));
  */

  ///*
  // fan
  float u = abs(sin((atan(p.y, p.x) - length(p) * 1.0 + time) * 5.0) + 0.1);
  float t = 0.01 / abs(u - length(p));
  //*/

  gl_FragColor = vec4(vec3(t), 1.0);
}
