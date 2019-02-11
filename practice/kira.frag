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

float voronoi(vec2 p){
        vec2 g = fract(p);
        vec2 f = float(p);

        float distanceToClosestFeaturePoint = 1.0;

        for(int y = -1; y <= 1; y++){
                for(int x = -1; x <= 1; x++){
                        vec2 latticePoint = vec2(x, y);
                        float currentDistance = distance(latticePoint + hash(g + latticePoint), f);
                        distanceToClosestFeaturePoint = min(distanceToClosestFeaturePoint, currentDistance);
                }
        }
        return distanceToClosestFeaturePoint;
}

void main(void){
        vec2 uv = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;
        uv.x *= resolution.x / resolution.y;

        float offset = voronoi(10.0 + vec2(time));
}