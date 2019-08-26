attribute vec4 a_Position;
varying vec4 v_Color;
uniform vec4 u_Color;
attribute vec4 a_Normal;
uniform vec3 u_LightColor;
uniform vec3 u_LightDirection;
uniform mat4 u_ProjMatrix;
uniform mat4 u_ViewMatrix;
uniform mat4 u_ModelMatrix;
uniform mat4 u_NormalMatrix;


void main() {
    gl_Position = u_ProjMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;
    vec3 normal = normalize(vec3(a_Normal));
    float nDotL = max(dot(u_LightDirection, normal), 0.0);
    vec3 diffuse = u_LightColor * vec3(u_Color) * nDotL;
    v_Color = vec4(diffuse, u_Color.rgba);
}
