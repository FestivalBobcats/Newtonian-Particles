PS.Collision = function(p1, p2){
  var mass = p1.mass + p2.mass,
      radius = p1.radius + p2.radius,
      pair = new PS.Particle(mass, radius);

  var light = new THREE.PointLight(0xAACCFF, 2, 300);
  p.meshes.push(light);

  var sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x222222, wireframe: true }),
      segments = 20,
      rings = segments,
      geometry = new THREE.SphereGeometry(radius, segments, rings);
  p.meshes.push(new THREE.Mesh(geometry, sphereMaterial));


  return p;
};