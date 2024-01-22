varying vec2 vUv;
uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;
#include "/node_modules/lygia/generative/cnoise.glsl"

vec3 distort(vec3 p){
    
    return p;
}
void main(){
    vec3 p=position;
    vec3 dp=distort(p);
    gl_PointSize=10.;
    gl_Position=projectionMatrix*modelViewMatrix*vec4(dp,1.);
    vUv=uv;
}