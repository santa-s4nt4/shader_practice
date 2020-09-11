precision mediump float;

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

float sdPlane(vec3 p, vec4 n) {
    return dot(p, n.xyz) + n.w;
}

float map(vec3 p) {
    p = -abs(p);
    p.y += 1.;
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
    vec2 h = r * .5;
    vec2 a = mod(uv, r) - h;
    vec2 b = mod(uv - r * 0.5, r) - h;
    vec2 gv = length(a) < length(b) ? a : b;

    vec2 id = gv - uv;

    float x = atan(gv.x, gv.y);
    float y = .5 - hexDist(gv);

    return vec4(x, y, id);
}

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    vec3 col = vec3(0., 0., .0);
    float t = time * .5;
    float dist = 10.0;
    vec3 ro = vec3(cos(t) * dist, 0., sin(t) * dist);
    vec3 ta = vec3(0., 0., 0.);

    vec3 up = normalize(vec3(.5, 2., 0.));
    vec3 ray = camera(ro, ta, up) * normalize(vec3(uv, 1.5));

    const int max_march = 64;

    vec3 p = ro;

    float d = 0., tt = 0.;
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
        float f = exp(-tt * 0.08);
        vec3 c = vec3(smoothstep(0.01, 0.1, hc.y));
        float i = sin(hc.z * hc.w + time);
        col.rgb = vec3(c * i + .1);
    }
    vec3 destColor = vec3(.0, .1, 0.25);
    for(float i = 0.; i < 5. ; i++) {
        float j = i + 1.;
        vec2 q = uv + vec2(cos(time * j), sin(time * j)) * .04;
        destColor += 0.015 / length(q);
    }
    gl_FragColor = vec4(col + destColor, 1.);
}
