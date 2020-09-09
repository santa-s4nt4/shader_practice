#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

float sdPlane(vec3 p, vec4 n) {
    return dot(p, n.xyz) + n.w;
}

float map(vec3 p) {
    p = -abs(p);
    p.y += 2.5;
    return sdPlane(p, vec4(0., 1., 0., 1.));
}

mat3 camera(vec3 ro, vec3 ta, vec3 up) {
    vec3 cw = normalize(ta - ro);
    vec3 cu = normalize(cross(cw, up));
    vec3 cv = normalize(cross(cu, cw));
    return mat3(cu, cv, cw);
}

float hexDist(vec2 p) {
    p = abs(p);

    float c = dot(p, normalize(vec2(1., 1.73)));

    return max(c, p.x);
}

vec4 hexCoords(vec2 uv) {
    vec2 r = vec2(1., 1.73);
    vec2 h = r * 0.5;
    vec2 a = mod(uv, r) - h;
    vec2 b = mod(uv - r * 0.5, r) - h;
    vec2 gv = length(a) < length(b) ? a : b;

    vec2 id = gv - uv;

    float x = atan(gv.x, gv.y);
    float y = 0.5 - hexDist(gv);

    return vec4(x, y, id);
}

void main() {
    vec2 uv = (gl_FragCoord.xy - .5 * resolution.xy) / resolution.y;
    vec3 col = vec3(0.);
    float t = time * .3;
    float dist = 20.0;
    vec3 ro = vec3(cos(t) * dist, 0., sin(t) * dist);
    vec3 ta = vec3(0., 0., 0.);

    vec3 up = normalize(vec3(0., 1., 0.));
    vec3 ray = camera(ro, ta, up) * normalize(vec3(uv, 1.5));

    const int max_march = 128;

    vec3 p = ro;

    float d = 0., time2 = 0.;
    for(int i = 0; i < max_march; i++) {
        d = map(p);
        if(d < .01) break;
        p += ray * d;
        t += d;
    }
    if(d < .01) {
        vec2 st = p.xz;
        vec4 hc = hexCoords(st);
        float t = time * 15.;
        float l = pow(sin((length(hc.zw) - t) * .3), 4.);
        vec3 c = vec3(smoothstep(0.01, 0.1, hc.y));
        float f = exp(-time2 * 0.08);
        col.rgb = c * l * f;
    }
    vec3 fog = vec3(.0, .1, .5) * time2 * 0.15;
    gl_FragColor = vec4(col + fog /2., 1.);
}
