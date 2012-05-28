var texturePaths = [
  'planets/starblue.gif',
  'planets/stargreen.gif',
  'planets/staryellow.gif'
];
var textures = texturePaths.map(function(path){
  var texture = THREE.ImageUtils.loadTexture('/textures/' + path);
  return texture;
});

PS.Planet = function(mass, radius){
  var p = new PS.Particle(mass, radius);

  var sphereMaterial = new THREE.MeshLambertMaterial({
    specular: 0xaaccff,
    reflectivity: 0.001,
    perPixel: true,
    map: PS.pickRandom(textures)
  });



  var segments = radius * 4,
      rings = radius * 4,
      geometry = new THREE.SphereGeometry(radius, segments, rings);
  p.meshes.push(new THREE.Mesh(geometry, sphereMaterial));

  return p;
};