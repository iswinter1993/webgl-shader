uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;
uniform vec3 uThemeColor;
uniform vec3 uLightColor;
uniform vec3 uLight2Color;
uniform float uLightIntensity;
uniform float uLight2Intensity;
uniform float uFresnelIntensity;

varying float vNoise;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;
#include "/node_modules/lygia/color/palette.glsl"
#include "/node_modules/lygia/lighting/fresnel.glsl"
#include "/node_modules/lygia/color/space.glsl"
void main(){
    vec2 uv=vUv;
    float noise = vNoise;
    vec3 col=vec3(1.);
    

    vec3 viewDir=normalize(cameraPosition-vWorldPosition);
    vec3 fres=fresnel(uThemeColor,vNormal,viewDir);
    col=fres*uFresnelIntensity;

    // vec3 lightColor=vec3(1.,0.,0.);
    vec3 lightPos=vec3(10.,10.,10.);
    float diff=max(dot(vNormal,normalize(lightPos-vWorldPosition)),0.);
    // col+=lightColor*diff;
    col=mix(col,uLightColor,diff*fres*uLightIntensity);

     vec3 light2Pos=vec3(-10.,-5.,10.);
    float diff2=max(dot(vNormal,normalize(light2Pos-vWorldPosition)),0.);
    col=mix(col,uLight2Color,diff2*fres*uLight2Intensity);

    col=linear2gamma(col);
    gl_FragColor=vec4(col,1.);
}