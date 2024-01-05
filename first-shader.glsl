float sdCircle(vec2 p,float r)
{
    return length(p)-r;
}
float sdBox(in vec2 p,in vec2 b)
{
    vec2 d=abs(p)-b;
    return length(max(d,0.))+min(max(d.x,d.y),0.);
}
float sdEquilateralTriangle(in vec2 p,in float r)
{
    const float k=sqrt(3.);
    p.x=abs(p.x)-r;
    p.y=p.y+r/k;
    if(p.x+k*p.y>0.)p=vec2(p.x-k*p.y,-k*p.x-p.y)/2.;
    p.x-=clamp(p.x,-2.*r,0.);
    return-length(p)*sign(p.y);
}
mat2 rotation2d(float angle){
    float s=sin(angle);
    float c=cos(angle);

    return mat2(
        c,-s,
        s,c
    );
}

vec2 rotate(vec2 v,float angle){
    return rotation2d(angle)*v;
}

float opRound(in float d,in float r)
{
    return d-r;
}

float opOnion(in float d,in float r)
{
    return abs(d)-r;
}

float opUnion(float d1,float d2)
{
    return min(d1,d2);
}

float opIntersection(float d1,float d2)
{
    return max(d1,d2);
}

float opSubtraction(float d1,float d2)
{
    return max(-d1,d2);
}
float opSmoothUnion(float d1,float d2,float k){
    float h=clamp(.5+.5*(d2-d1)/k,0.,1.);
    return mix(d2,d1,h)-k*h*(1.-h);
}

float opSmoothSubtraction(float d1,float d2,float k){
    float h=clamp(.5-.5*(d2+d1)/k,0.,1.);
    return mix(d2,-d1,h)+k*h*(1.-h);
}

float opSmoothIntersection(float d1,float d2,float k){
    float h=clamp(.5-.5*(d2-d1)/k,0.,1.);
    return mix(d2,d1,h)+k*h*(1.-h);
}
vec2 cart2polar(vec2 uv){
    float phi=atan(uv.y,uv.x);
    float r=length(uv);
    return vec2(phi,r);
}
void mainImage(out vec4 fragColor,in vec2 fragCoord){
    vec2 uv = fragCoord/iResolution.xy;
    uv = (uv-.5)*2.;
    uv.x*=iResolution.x/iResolution.y;
    uv = cart2polar(uv);
    float d = sdCircle(uv,.5);
    float c = sin(uv.x+ uv.y);
    fragColor = vec4(vec3(c),1.);
}