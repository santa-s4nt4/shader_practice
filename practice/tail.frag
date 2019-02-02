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

float dstepf = 0.0;

float map(vec3 p){
	p.x += sin(p.z * 1.8);
  p.y += cos(p.z * 0.2) * sin(p.x * 0.8);
	p *= getRotZMat(p.z * 0.8 + sin(p.x) + cos(p.y));
  p.xy = mod(p.xy, 0.3) - 0.15;
	dstepf += 0.003;
	return length(p.xy);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord){
  vec2 uv = (fragCoord - iResolution.xy * 0.5) / iResolution.y;
  vec3 rd = normalize(vec3(uv, (1.0 - dot(uv, uv) * 0.5) * 0.5));
  vec3 ro = vec3(0.0, 0.0, iTime * 1.26), col = vec3(0.0), sp;
  float cs = cos(iTime * 0.375), si = sin(iTime * 0.375);
  rd.xz = mat2(cs, si, -si, cs) * rd.xz;
  float t = 0.06, layers = 0.0, d = 0.0, aD;
  float thD = 0.02;
  for(float i = 0.0; i < 250.0; i++){
    if(layers > 15.0 || col.x > 1.0 || t > 5.6) break;
    sp = ro + rd * t;
    d = map(sp);
    aD = (thD - abs(d) * 15.0 / 16.0) / thD;
    if(aD > 0.0){
      col += aD * aD * (3.0 - 2.0 * aD) / (1.0 + t * t * 0.25) * 0.2;
      layers++;
    }
    t += max(d * 0.7, thD * 1.5) * dstepf;
  }
  col = max(col, 0.0);
  col = mix(col, vec3(min(col.x * 1.5, 1.0), pow(col.x, 2.5), pow(col.x, 12.0)),
            dot(sin(rd.yzx * 8.0 + sin(rd.zxy * 8.0)), vec3(0.1666)) + 0.4);
  col = mix(col, vec3(col.x * col.x  * 0.85, col.x, col.x * col.x * 0.3),
            dot(sin(rd.yzx * 4.0 + sin(rd.zxy * 4.0)), vec3(0.1666)) + 0.25);
  fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}

void main(void){
  iTime = time;
  iResolution = vec3(resolution, 0.0);

  mainImage(gl_FragColor, gl_FragCoord.xy);
}
