#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

float hexDist(vec2 p)
{
    p = abs(p);
    float d = dot(p, normalize(vec2(1.0, 1.73)));
	return max(p.x, d);
}

vec4 hexCoords(vec2 uv)
{
    vec2 r = vec2(1.0, 1.73);
    vec2 h = 0.5 * r;
    vec2 a = mod(uv, r) - h;
    vec2 b = mod(uv - h, r) - h;

    vec2 gv;
    if(length(a) < length(b)) {
        gv = a;
    } else {
        gv = b;
    }

    float x = atan(gv.x, gv.y);
    float y = 0.5 - hexDist(gv);
    vec2 id = uv - gv;

    return vec4(x, y, id);
}

void main()
{
    vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / resolution.y;

    uv *= 10.0;

    vec3 col = vec3(0);
    vec4 hc = hexCoords(uv);

    float times = time * 0.5;
    float wavy = pow(sin(length(hc.zw) - times), 4.0) + 0.1;

	float c = smoothstep(0., 15./resolution.y, hc.y);

    col = vec3(c * wavy);

    gl_FragColor = vec4(col,1.0);
}
