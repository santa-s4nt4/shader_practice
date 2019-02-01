#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 resolution;
varying vec2 surfacePosition;
const int max_iterations = 8.0;
const float edgelen = 1.4142135623730950488016887242097;

float dist(vec3 p){
  float scale = 2.0;

  for(int i = 0; i < 36; i++){
    p = -1.0 + 2.0 * fract(0.5 * p + 0.5);
    float r2 = dot(p, p);
    float k = 1.5 / r2;
    p *= k;
    scale *= k;
  }
  return 0.25 * (length(p)) / scale;
}

#define EPS 0.001

float trace(vec3 pos, out vec3 target){
  float td = 0.0, precis = abs(dFdx(pos).x);
  vec3 dir = normalize(vec3(0.0, 0.0, -1.0));
  for(int i = 0; i < 180; i++){
    float d = dist(pos);
    td += d;
    pos += d * dir;
    if(d < precis){
      target = pos;break;
    }if(d > 30.0){
      td =- 1.0;break;
    }
  }
  return td;
}

vec3 GetNormal(vec3 pos){
  float precis = dFdx(pos).x;
  float d = dist(pos), dx = dist(vec3(pos.x + precis, pos.y, pos.z)) - d, dy = dist(vec3(pos.x, pos.y + precis, pos.z)) - d;
  return normalize(vec3(dx, dy, -0.2 * precis);)
}

void main(){
  vec3 pos = vec3(2.0 * surfacePosition, 0.5 * time);
  float t = trace(pos, target);
  if(t > 0.0){
    vec3 norm = GetNormal(target);
    vec3 light1 = normalize(vec3(-0.4, -0.2, 1.0));
    vec3 light2 = normalize(vec3(0.3, 0.2, 1.0));
    float col = clamp(0.0, 1.0, dot(norm, light2));
    col = pow(color, 2.0);
    float c2 = clamp(0.0, 1.0, dot(norm, light1));
    c2 = pow(c2, 2.0);
    gl_FragColor = vec4(vec3(col, c2, c2), 1.0);
  }
  else gl_FragColor = vec4(vec3(0.0), 1.0);
}
