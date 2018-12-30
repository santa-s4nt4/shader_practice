precision mediump float;
uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

const vec3 cPos = vec3(0.0, 0.0, 3.0);
const vec3 cDir = vec3(0.0, 0.0, -1.0);
const vec3 cUp = vec3(0.0, 1.0, 0.0);

const vec3 lightDir = vec3(0.577, 0.577, 0.577);

// rotate
vec3 rotate(vec3 p, float angle, vec3 axis){
  vec3 a = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float r = 1.0 - c;
  mat3 m = mat3(
    a.x * a.x * r + c,
    a.y * a.x * r + a.z * s,
    a.z * a.x * r - a.y * s,
    a.x * a.y * r - a.z * s,
    a.y * a.y * r + c,
    a.z * a.y * r + a.x * s,
    a.x * a.z * r + a.y * s,
    a.y * a.z * r - a.x * s,
    a.z * a.z * r + c
    );
    return m * p;
}

// smoothing min
float smoothMin(float d1, float d2, float k){
  float h = exp(-k * d1) + exp(-k * d2);
  return -log(h) / k;
}

// torus
float distFuncTorus(vec3 p, vec2 r){
  vec2 d = vec2(length(p.xy) - r.x, p.z);
  return length(d) - r.y;
}

// box
float distFuncBox(vec3 p){
  return length(max(abs(p) - vec3(2.0, 0.1, 0.5), 0.0)) - 0.1;
}

// cylinder
float distFuncCylinder(vec3 p, vec2 r){
  vec2 d = abs(vec2(length(p.xy), p.z)) - r;
  return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - 0.1;
}