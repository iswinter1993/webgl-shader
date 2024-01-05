#iChannel0 "https://s2.loli.net/2023/09/10/QozT59R6KsYmb3q.jpg"
highp float random(vec2 co)
{
    highp float a=12.9898;
    highp float b=78.233;
    highp float c=43758.5453;
    highp float dt=dot(co.xy,vec2(a,b));
    highp float sn=mod(dt,3.14);
    return fract(sin(sn)*c);
}
vec2 bulge(vec2 p){
    vec2 center=iMouse.xy/iResolution.xy;
    float radius=.9;
    float strength=1.1;

    p-=center;

    float d=length(p);
    d/=radius;
    float dPow=pow(d,2.);
    float dRev=strength/(dPow+1.);

    // p*=d;
    // p*=dPow;
    p*=dRev;

    p+=center;

    return p;
}
float sdCircle(vec2 p,float r)
{
    return length(p)-r;
}
void mainImage(out vec4 fragColor,in vec2 fragCoord){
    vec2 uv=fragCoord/iResolution.xy;
    // uv = bulge(uv);
    // float noise=random(uv)*.5+.5;
    // vec2 offset=.025*vec2(cos(noise),sin(noise));
    // vec2 rUv=uv;
    // vec2 gUv=uv;
    // vec2 bUv=uv;
    // rUv+=offset;
    // bUv-=offset;
    // vec4 rTex=texture(iChannel0,rUv);
    // vec4 gTex=texture(iChannel0,gUv);
    // vec4 bTex=texture(iChannel0,bUv);
    // vec4 col = vec4(rTex.r,gTex.g,bTex.b,gTex.a);
    // fragColor=col;

    // vec2 size=vec2(100.,100.);
    // uv.x=floor(uv.x*size.x)/size.x;
    // uv.y=floor(uv.y*size.y)/size.y;
    // vec3 tex=texture(iChannel0,uv).xyz;
    // fragColor=vec4(tex,1.);

    vec3 tex = texture(iChannel0,uv).xyz;
    uv=(uv-.5);
    float d = sdCircle(uv,.0);
    float c = smoothstep(.4,.8,d);
    vec3 col=tex;
    col*=vec3(1.-c);
    fragColor=vec4(col,1.);
}