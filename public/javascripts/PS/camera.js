PS.Camera = function(stage){
  var fov = 50,
      aspect = stage.width / stage.height,
      near = 50,
      far = stage.depth;
  var c = new THREE.PerspectiveCamera(fov, aspect, near, far);

  var x = stage.width / 2,
      y = stage.height / 2,
      z = stage.depth / 3;

  c.position.set(x, y, z);

  c.preRenderHook = function(){
    c.lookAt(stage.focus.core.position);
    c.position.setZ(stage.focus.core.position.z + z);
  };

  return c;
};