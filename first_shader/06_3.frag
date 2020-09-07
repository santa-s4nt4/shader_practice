precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
    vec2 p = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);
    vec3 destColor = vec3(1., 1., 1.);
    float f = 0.;
    for(float i = 0.; i < 10.0; i++) {
        float s = sin(time + i * 0.628318) * 0.5;
        float c = cos(time + i * 0.628318) * 0.5;
        f += 0.0025 / abs(length(p + vec2(c, s)) - 0.5);
    }
    gl_FragColor = vec4(vec3(destColor * f), 1.);
}
