precision mediump float;
uniform float time;
uniform vec2  mouse;
uniform vec2  resolution;

void main()
{
  vec2 m = vec2(mouse.x * 2.0 - 1.0, -mouse.y * 2.0 + 1.0);
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  //ring
  //float t = 0.02 / abs(0.5 - length(p)); //絶対値
  float t = 0.01 / abs(sin(time*100.0) - length(p)); //time scare ring
  gl_FragColor = vec4(vec3(t), 1.0);
}
