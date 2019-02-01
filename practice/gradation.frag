#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;

void main(){
  vec2 position = (gl_FragCoord.xy / resolution.xy);

  vec3 color = exp2(-vec3(1.0, 0.8, 0.1) / position.x);
  color = (mat3(0.0, 1.5, 0.0,
                0.0, 1.0, 0.5,
                1.0, 0.0, 0.2) * color);

               gl_FragColor = vec4(color, 1.0);
}
