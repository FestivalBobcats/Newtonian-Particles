var texturePaths = [
  'planets/gas.gif',
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
    color: 0x777777,
    reflectivity: 0.1,
    refractionRatio: 10,
    map: PS.pickRandom(textures)
    // lightMap: THREE.ImageUtils.loadTexture('textures/planets/desert_lightmap.gif')
  });
  var segments = radius * 4,
      rings = radius * 4,
      geometry = new THREE.SphereGeometry(radius, segments, rings);
  p.meshes.push(new THREE.Mesh(geometry, sphereMaterial));

  return p;
};