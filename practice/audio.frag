#ifdef GL_ES
precision mediump float;
#endif

uniform float iTime;
uniform vec3 iResolution;
uniform float iTimeDelta;
uniform vec4 iMouse;
uniform samplerXX iChannel0;

const int iters = 150;

int fractal(vec2 p, vec2 point){
        vec2 so = (-1.0 + 2.0 * point) * 0.4;
        vec2 seed = vec2(0.098386255 + so.x, 0.6387662 + so.y);

        for(int i = 0; i < iters; i++){
                if(length(p) > 2.0){
                        return i;
                }
                vec2 r = p;
                p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y);
                p = vec2(p.x * r.x - p.y * r.y + seed.x, r.x * p.y + r.y + seed.y); 
        }
        return 0;
}