precision mediump float;
uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

const vec3 cPos = vec3(-3.0, 3.0, 3.0);
const vec3 cDir = vec3(0.577, -0.577, -0.577);
const vec3 cUp = vec3(0.577, 0.577, -0.577);

const vec3 lightDir = vec3(-0.577, 0.577, 0.577);

// smoothing min
float smoothMin(float d1, float d2, float k){
  float h = exp(-k * d1) + exp(-k * d2);
  return -log(h) / k;
}

// box distance function
float distFuncBox(vec3 p){
  return length(max(abs(p) - vec3(2.0, 0.1, 0.5), 0.0)) - 0.1;
}

// torus distance function
float distFuncTrus(vec3 p){
  vec2 t = vec2(1.5, 0.25);
  vec2 r = vec2(length(p.xy) - t.x, p.z);
  return length(r) - t.y;
}

// distance function
float distFunc(vec3 p){
  float d1 = distFuncTrus(p);
  float d2 = distFuncBox(p);
  return smoothMin(d1, d2, 8.0);
}

vec2 getNormal(vec3 p){
  float d = 0.0001;
  return normalize(vec3(
    distFunc(p + vec3(  d, 0.0, 0.0)) - distFunc(p + vec3( -d, 0.0, 0.0)),
    distFunc(p + vec3(0.0,   d, 0.0)) - distFunc(p + vec3(0.0,  -d, 0.0)),
    distFunc(p + vec3(0.0, 0.0,   d)) - distFunc(p + vec3(0.0, 0.0,  -d))
    ));
}

void main(){
  // fragment position
  
}
