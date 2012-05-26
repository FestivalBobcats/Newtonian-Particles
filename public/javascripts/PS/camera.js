PS.spawnCamera = function(stage){
  var fov = 45,
      aspect = stage.width / stage.height,
      near = 1,
      far = 10000;
  var c = new THREE.PerspectiveCamera(fov, aspect, near, far);

  c.position.set(stage.width / 2, stage.height / 2.5, stage.depth / 1.2);

  return c;
};