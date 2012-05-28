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
    emissive: 0x224488,
    map: PS.pickRandom(textures),
    refractionRatio: 0.97
  });



  var segments = radius * 4,
      rings = radius * 4,
      geometry = new THREE.SphereGeometry(radius, segments, rings);
  p.meshes.push(new THREE.Mesh(geometry, sphereMaterial));



  // lol
  var hotSpeed = 20,
      ambient = new THREE.Color( 0x000000 );


  p.preRenderHook = function(){

    var speed = p.velocity.length(),
        glowIntensity = THREE.Math.mapLinear( speed, 0, 20, 0, 1 );

    ambient.r = glowIntensity;
    ambient.g = glowIntensity;
    ambient.b = glowIntensity;

    sphereMaterial.color = ambient;
    sphereMaterial.emissive = ambient;
  };






  return p;
};