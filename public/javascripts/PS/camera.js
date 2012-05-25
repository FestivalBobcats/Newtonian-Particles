PS.Camera = function(stage){
  var fov = 45,
      aspect = stage.width / stage.height,
      near = 1,
      far = 10000;
  var self = this.prototype = new THREE.PerspectiveCamera(fov, aspect, near, far);

  self.position.set(stage.width / 2, stage.height / 2.5, stage.depth / 1.2);




  // var self = new THREE.OrthographicCamera(stage.width / - 2, stage.width / 2, stage.height / 2, stage.height / - 2, 150, 1000 );

  // self.rotation.y = 90;
  // self.position.set(stage.width / 2, 0, stage.depth / 2);

  // cameraOrthoHelper = new THREE.CameraHelper(self);


  return self;
};