#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

float HexDist(vec2 p) {
    p = abs(p);

    float c = dot(p, normalize(vec2(1., 1.73)));
    c = max(c, p.x);

    return c;
}

vec4 HexCoords(vec2 uv) {
    vec2 r = vec2(1., 1.73);
    vec2 h = r * .5;

    vec2 a = mod(uv, r) - h;
    vec2 b = mod(uv - h, r) - h;

    vec2 gv;
    if(length(a) < length(b)) {
        gv = a;
    } else {
        gv = b;
    }

    float x = atan(gv.x, gv.y);
    float y = .5 - HexDist(gv);
    vec2 id = uv - gv;
    return vec4(x, y, id.x, id.y);
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / resolution.y;
    vec3 col = vec3(0.);

    // col += sin(HexDist(uv) * 50. + time * 10.);

    uv *= 10.;

    vec4 hc = HexCoords(uv);
    float c = smoothstep(.05, .1, hc.y * sin(hc.z * hc.w + time));
    
    col += c;

    gl_FragColor = vec4(col, 1.);
}
