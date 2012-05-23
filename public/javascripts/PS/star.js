PS.Star = function(mass, radius){
  var p = new PS.Particle(mass, radius);

  var light = new THREE.PointLight(0xFFCC2AA, 0.7, 50);
  p.meshes.push(light);

  var sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF }),
      segments = Math.ceil(radius * 2),
      rings = Math.ceil(radius * 2),
      geometry = new THREE.SphereGeometry(radius, segments, rings);
  p.meshes.push(new THREE.Mesh(geometry, sphereMaterial));

  return p;
};