#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;

float iTime;
vec3 iResolution;

mat3 getRotZMat(float a){
  return mat3(cos(a), -sin(a), 0.0,
              sin(a), cos(a), 0.0,
              0.0, 0.0, 1.0);
}

float dstpdf = 0.0;

float map(vec3 p){
  p.x += sin(p.z * 1.8);
  
}
