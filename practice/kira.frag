#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

vec2 hash(vec2 p){
        mat2 m = mat2(13.85, 47.77, 99.41, 88.48);
        return fract(sin(m * p) * 46783.29);
}