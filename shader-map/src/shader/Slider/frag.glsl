uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;
uniform float uOpacity;
uniform sampler2D uTexture;
uniform vec2 uMediaSize;
varying vec2 vUv;
uniform float uVelocity;
vec2 cover(vec2 s,vec2 i,vec2 uv){
    float rs=s.x/s.y;
    float ri=i.x/i.y;
    vec2 new=rs<ri?vec2(i.x*s.y/i.y,s.y):vec2(s.x,i.y*s.x/i.x);
    vec2 offset=(rs<ri?vec2((new.x-s.x)/2.,0.):vec2(0.,(new.y-s.y)/2.))/new;
    uv=uv*s/new+offset;
    return uv;
}
void main(){
    float offset=.005*sin(uVelocity);
    vec2 uv=vUv;
    vec2 rUv=uv;
    vec2 gUv=uv;
    vec2 bUv=uv;
     uv=cover(iResolution.xy,uMediaSize.xy,uv);
    gUv+=offset;
    bUv+=offset;
    vec4 rtex=texture(uTexture,rUv);
    vec4 gtex=texture(uTexture,gUv);
    vec4 btex=texture(uTexture,bUv);
    vec3 color=vec3(rtex.r,gtex.g,btex.b);
    gl_FragColor=vec4(color,uOpacity);
}