uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;
varying vec2 vUv;
uniform float uVelocity;
uniform float uDistortX;
uniform float uDistortZ;
uniform float uProgress;
uniform vec2 uMeshSize;
uniform vec2 uMeshPosition;
#include "/node_modules/lygia/math/const.glsl"

vec3 transition(vec3 p){
    float pr=uProgress;
    vec2 targetScale=iResolution.xy/uMeshSize.xy;
    vec2 scale=mix(vec2(1.),targetScale,pr);
    p.xy*=scale;
    p.xy+=-uMeshPosition*pr;
    p.z+=pr;
    return p;
}
vec3 distort(vec3 p){
    // p.x+=sin(uv.y*PI)*uVelocity*uDistortX;
    p.z+=cos((p.x/iResolution.y)*PI)*abs(uVelocity)*uDistortZ;
    
    return p;
}
void main(){
    vec3 p=position;
    p=transition(p);
    vec4 mvPosition=modelViewMatrix*vec4(p,1.);
    mvPosition.xyz=distort(mvPosition.xyz);
    gl_Position=projectionMatrix*mvPosition;

    vUv=uv;
}