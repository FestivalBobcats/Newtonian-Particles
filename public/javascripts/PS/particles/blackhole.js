PS.Blackhole = function(mass, radius){
  var p = new PS.Particle(mass, radius);

  var light = new THREE.PointLight(0xFFCC2AA, 1, 50);
  p.meshes.push(light);

  var sphereMaterial = new THREE.MeshBasicMaterial({ wireframe: true }),
      segments = 20,
      rings = segments,
      geometry = new THREE.SphereGeometry(radius, segments, rings);
  p.meshes.push(new THREE.Mesh(geometry, sphereMaterial));


  // var tMap = THREE.ImageUtils.loadTexture('/textures/starcorona.png');
  // var sprite = new THREE.Sprite({
  //   map: tMap
  // });

  // window.s = sprite;

  // p.meshes.push(sprite);


  return p;
};