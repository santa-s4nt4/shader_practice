precision mediump float;
uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

void main()
{
  vec2 m = vec2(mouse.x * 2.0 - 1.0, -mouse.y * 2.0 + 1.0);
  vec2 p = vec2(gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  // length
  float t = 1.1 - length(m - p);
  t = pow(t, 25.0);  
  /* another solution
  float t = 0.1 / length(m - p);
  */

  gl_FragColor = vec4(vec3(t), 1.0);
}
