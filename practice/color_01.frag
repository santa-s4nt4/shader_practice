#ifdef
precision mediump float;
#endif

uniform vec2 resolution;
uniform float time;
const float Pi = 3.14159;
uniform vec2 mouse;

const int complexity = 47;
const float mouse_factor = 25.0;
const float mouse_offsett = 0.0;
const float fluid_speed = 250.0;
const float color_intensity = 1.0;