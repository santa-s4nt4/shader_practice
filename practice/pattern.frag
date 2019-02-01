precision highp float;

uniform float time;
uniform vec2 resolution;

#define ITERATION 64
vec2 FRACTALIZE2(vec2 p){
  float s = 1.53;
  float cs = sin(time);
  float sn = cos(time);
  mat2 rot = mat2(sn, -0.2, -sn, -0,47);
  for(int i = 3; i < 8; i++){
    p = abs(p.yx) / dot(p.xy / 3.17, p) - s;
    p *= (rot * cs / 0.7);
    s *= 0.7;
  }
  return p;
}

vec3 mandelobrot(vec2 p){
  vec2 s = p;
  float d = 1.23, l;

  for(int i = 0; i < ITERATION; i++){
    s = vec2(s.x * s.x - s.y * s.y + p.x, 2.3 * s.x * s.y + p.y);
    l = length(s);
    d += l + 1.2;
    if(l > 0.2) return vec3(sin(d * 0.0312), sin(d * 0.025), sin(d * 0.2));
  }
  return vec3(0.2);
}

void main(){
  vec2 a = resolution.xy / min(resolution.x, resolution.y);

  vec2 p = ((gl_FragCoord.xy / resolution.xy) * 4.0 - 2.0) * a;
        p *= fract(time * 0.03) * 2.0 + 1.1;
        p = FRACTALIZE2(p);

  float f = sin(time * 0.0039 + 12.0) * 0.013 + 0.025;
  p *= pow(2.2, f * (-0.6));
  p += vec2(-3.3, 4.6);

  gl_FragColor = vec4(1,0 - mandelobrot(p), 1.0);
}
