precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
    vec2 p = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);

    float s = sin(time);
    float c = cos(time);
    mat2 m = mat2(c, s, -s, c);
    p *= m;

    vec2 q = vec2(p.x - 1., p.y);
    float f = .1 / length(q);
    gl_FragColor = vec4(vec3(f), 1.);
}
