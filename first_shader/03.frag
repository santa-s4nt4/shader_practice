precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
    float r = abs(sin(time * .1));
    float g = abs(cos(time * 2.));
    float b = (r + g) / 2.0;
    gl_FragColor = vec4(r, g, b, 1.0);
}
