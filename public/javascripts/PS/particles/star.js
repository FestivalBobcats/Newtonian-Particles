PS.Star = function(mass, radius){
  var p = new PS.Particle(mass, radius);

  var light = new THREE.PointLight(0xFFFFFF);
  p.meshes.push(light);

  return p;
};