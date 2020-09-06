precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
    float a = gl_FragCoord.y / 512.;
    gl_FragColor = vec4(vec3(a), 1.0);
}
