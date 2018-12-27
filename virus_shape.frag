precision mediump float;
uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

const vec3 cPos = vec3(0.0,  0.0,  3.0);
const vec3 cDir = vec3(0.0,  0.0, -1.0);
const vec3 cUp  = vec3(0.0,  1.0,  0.0);

const vec3 lightDir = vec3(-0.57, 0.57, 0.57);

// torus distance function
float distanceFuncTorus(vec3 p){
  vec2 t = vec2(0.75, 0.25);
  vec2 r = vec2(length(p.xy) - t.x, p.z);
  return length(r) - t.y;
}

// floor distance function
float distanceFuncFloor(vec3 p){
  return dot(p, vec3(0.0, 1.0, 0.0)) + 1.0;
}

// distance function
float distanceFunc(vec3 p){
  float d1 = distanceFuncTorus(p);
  float d2 = distanceFuncFloor(p);
  return min(d1, d2);
}

vec3 genNormal(vec3 p){
  float d = 0.0001;
  return normalize(vec3(
        distanceFunc(p + vec3(d, 0.0, 0.0)) - distanceFunc(p + vec3(-d, 0.0, 0.0)),
        distanceFunc(p + vec3(0.0, d, 0.0)) - distanceFunc(p + vec3(0.0, -d, 0.0)),
        distanceFunc(p + vec3(0.0, 0.0, d)) - distanceFunc(p + vec3(0.0, 0.0, -d))
    ));
}

void main(){
  // fragment position
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  // camera and ray
  vec3 cSide = cross(cDir, cUp);
  float targetDepth = 1.0;
  vec3 ray = normalize(cSide * p.x + cUp * p.y + cDir * targetDepth);

  // marching loop
  float tmp , dist;
  tmp = 0.0;
  vec3 dPos = cPos;
  for(int i = 0; i < 256; i++){
    dist = distanceFunc(dPos);
    tmp += dist;
    dPos = cPos + tmp * ray;
  }

  //  hit check
  vec3 color;
  if(abs(dist) < 0.001){
    vec3 normal = genNormal(dPos);
    float diff = clamp(dot(lightDir, normal), 0.1, 1.0);
    color = vec3(1.0, 1.0, 1.0) * diff;
  }else{
    color = vec3(0.0);
  }
  gl_FragColor = vec4(color, 1.0);
}
