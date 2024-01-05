uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;
uniform samplerCube iChannel0;
float fresnel(float bias,float scale,float power,vec3 I,vec3 N)
{
    return bias+scale*pow(1.-dot(I,N),power);
}
void main(){
    vec2 uv=vUv;
    vec3 normal=vNormal;
    float ambIntensity=.2;
    vec3 col=vec3(0.);
    vec3 objectColor=vec3(1.);
    vec3 lightColor=vec3(.875,.286,.333);
    vec3 ambient=lightColor*ambIntensity;
    col+=ambient*objectColor;
    vec3 lightPos=vec3(2.,4.,1.);
    vec3 lightDir=normalize(lightPos-vWorldPosition);
    float diff=dot(normal,lightDir);
    diff=max(diff,0.);
    vec3 diffuse=lightColor*diff;
    col+=diffuse*objectColor;
    vec3 reflectDir=reflect(-lightDir,normal);
    vec3 viewDir=normalize(cameraPosition-vWorldPosition);
    
    vec3 halfVec=normalize(lightDir+viewDir);
    float spec=dot(normal,halfVec);
    // float spec=dot(viewDir,reflectDir);
    spec=max(spec,0.);
    float shininess=32.;
    spec=pow(spec,shininess);
    vec3 specular=lightColor*spec;
    col+=specular*objectColor;
    // IBL
    float iblIntensity=.2;
    vec3 iblCoord=normalize(reflect(-viewDir,vNormal));
    vec3 ibl=texture(iChannel0,iblCoord).xyz;
    vec3 iblLight=ibl*iblIntensity;
    col+=iblLight*objectColor;
    // fresnel
    vec3 fresColor=vec3(1.);
    float fresIntensity=.6;
    float fres=fresnel(0.,1.,5.,viewDir,vNormal);
    vec3 fresLight=fres*fresColor*fresIntensity;
    col+=fresLight*objectColor;
    gl_FragColor=vec4(col,1.);
    
    // vec2 uv=gl_PointCoord;
    // uv=(uv-.5)*2.;
    // float d=length(uv);
    // float c=.05/d;
    // c=pow(c,2.);
    // gl_FragColor=vec4(vec3(1.),c);
}