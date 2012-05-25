PS.Star = function(mass, radius){
  var p = new PS.Particle(mass, radius);

  var light = new THREE.PointLight(0xFFCC2AA, 0.7, 200);
  p.meshes.push(light);

  var sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x66AAFF }),
      segments = 20,
      rings = 20,
      geometry = new THREE.SphereGeometry(radius, segments, rings);
  p.meshes.push(new THREE.Mesh(geometry, sphereMaterial));

  return p;
};