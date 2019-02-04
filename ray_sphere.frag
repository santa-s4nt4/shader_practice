precision mediump float;
uniform float time;
uniform vec2  mouse;
uniform vec2  resolution;

const float sphereSize = 1.0; //球の半径

float distanceFunc(vec3 p){
  return length(p) - sphereSize;
}

void main(){
  // fragment position
  vec2 p = (gl_FragCoord.xy * 2.0 -resolution) / min(resolution.x, resolution.y);

  // camera
  vec3 cPos = vec3(0.0, 0.0, 2.0);
  vec3 cDir = vec3(0.0, 0.0, -1.0);
  vec3 cUp = vec3(0.0, 1.0, 0.0);
  vec3 cSide = cross(cDir, cUp);
  float targetDepth = 1.0;

  // ray
  vec3 ray = normalize(cSide * p.x + cUp * p.y + cDir * targetDepth);

  // marching loop
  float distance = 0.0; // レイとオブジェクト間の最短距離
  float rLen = 0.0; // レイと継ぎ足す長さ
  vec3 rPos = cPos; // レイの先端距離
  for(int i = 0; i < 16; i++){
    distance = distanceFunc(rPos);
    rLen += distance;
    rPos = cPos + ray * rLen;
  }

  // hit check
  if(abs(distance) < 0.001){
    gl_FragColor = vec4(vec3(1.0), 1.0);
  }else{
    gl_FragColor = vec4(vec3(0.0), 1.0);
  }
}
