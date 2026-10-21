uniform float outlineWidth;

void main() {
  vec3 newPosition = position + normalize(normal) * outlineWidth;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
