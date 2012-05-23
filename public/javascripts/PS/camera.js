PS.Camera = function(stage){
  var fov = 45,
      aspect = stage.width / stage.height,
      near = 0.1,
      far = 10000;
  var self = this.prototype = new THREE.PerspectiveCamera(fov, aspect, near, far);

  self.position.set(stage.width / 2, stage.height / 2, stage.depth * 2);

  return self;
};