precision mediump float;
uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;

const float sphereSize = 1.; // 球の半径

float distanceFunc(vec3 p) {
    return length(p) - sphereSize;
}

float sdOctahedron( vec3 p, float s) {
    p = abs(p);
    return (p.x+p.y+p.z-s)*0.57735027;
}

void main() {
    // fragment position
    vec2 p = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);

    // camera
    vec3 cPos = vec3(0., 0., 2.); // カメラの位置
    vec3 cDir = vec3(0., 0., -1.); // カメラの向き(視線)
    vec3 cUp = vec3(0., 1., 0.); // カメラの上部分
    vec3 cSide = cross(cDir, cUp); // 外戚を使って横方向を算出
    float targetDepth = 1.; // フォーカスをする深度

    // ray
    vec3 ray = normalize(cSide * p.x + cUp * p.y + cDir * targetDepth);

    // marching loop
    float distance = 0.; // レイとオブジェクト間の最短距離
    float rLen = 0.; // レイに継ぎ足す長さ
    vec3 rPos = cPos; // 例の先端位置
    for(int i = 0; i < 16; i++) {
        distance = distanceFunc(rPos);
        rLen += distance;
        rPos = cPos + ray * rLen;
    }

    // hit check
    if(abs(distance) < 0.001) {
        gl_FragColor = vec4(vec3(1., 0., 0.), 1.);
    } else {
        gl_FragColor = vec4(vec3(1.), 1.);
    }
}
