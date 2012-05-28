PS.Star = function(mass, radius){
  var p = new PS.Particle(mass, radius);

  var light = new THREE.PointLight(0xAACCFF, 3, 300);
  p.meshes.push(light);

  var sphereMaterial = new THREE.MeshPhongMaterial({ refractionRatio: 0.97, blending: THREE.AdditiveBlending, emissive: 0x66AAFF }),// 0xaaccff }),
      segments = 20,
      rings = segments,
      geometry = new THREE.SphereGeometry(radius, segments, rings);
  p.meshes.push(new THREE.Mesh(geometry, sphereMaterial));


  return p;
};