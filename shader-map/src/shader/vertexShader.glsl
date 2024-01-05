uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;
varying vec2 vUv;
uniform float uPixelRatio;
varying vec3 vNormal;
varying vec3 vWorldPosition;
uniform float uDistort;
#include "/node_modules/lygia/generative/cnoise.glsl"

vec3 distort(vec3 p){
    float noise=cnoise(p+iTime*.5);
    p+=noise*normal*.2*uDistort;
    return p;
}
void main(){
    
    vec3 p=position;
    p = distort(p);
    // gl_PointSize=uPixelRatio*50.;
    vec4 mvPosition=modelViewMatrix*vec4(p,1.);
    // gl_PointSize*=(1./-mvPosition.z);
    gl_Position=projectionMatrix*mvPosition;
    vUv=uv;
    vNormal=normal;
    vWorldPosition=vec3(modelMatrix*vec4(p,1.));
}
