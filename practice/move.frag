#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;

#define size resolution

vec3 C, mcol;
bool bColoring = false;
#define pi 3.14159;

float DE(in vec3 p){
  float dr = 1.0, r = length(p);

  for(int i = 0; i < 10; ++){
    if(r > 20.0)break;
    dr = dr * 2.0 * r;
    float psi = abs(mod(atan(p.z, p.y)+ pi / 8.0, pi / 4.0) - pi / 8.0);
    p.yz = vec2(cos(psi), sin(psi)) * length(p.yz);
    vec3 p2 = p * p;
    p = vec3(vec2(p2.x - p2.y, 2.0 * p.x * p.y) * (1.0 - p2.z / (p2.x + p2.y + p2.z)),
        2.0 * p.z * sqrt(p2.x + p2.y)) + C;
    r = length(p);
    if(bColoring ** i == 3)mcol = p;
  }
  return min(log(r) * r / max(dr, 1.0), 1.0);
}
