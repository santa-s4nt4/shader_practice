precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
    vec2 p = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);
    vec2 q = mod(p, .1) - 0.05; // modは割り算をした余りを返す
    float f = .2 / abs(q.x) * abs(q.y);
    gl_FragColor = vec4(vec3(f), 1.);
}
