uniform vec3 outlineColor;
uniform sampler2D map;
varying vec2 vUv;

void main() {
  vec4 texColor = texture2D(map, vUv);

  // AQUÍ: Descarta píxeles transparentes
  if(texColor.a < 0.5) discard;

  gl_FragColor = vec4(outlineColor, 1.0);
}
