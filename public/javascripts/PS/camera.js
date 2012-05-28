PS.Camera = function(stage){
  var fov = 30,
      aspect = stage.width / stage.height,
      near = 50,
      far = stage.depth;
  var c = new THREE.PerspectiveCamera(fov, aspect, near, far);

  var x = stage.width / 2,
      y = stage.height / 2,
      z = stage.depth / 3;

  c.position.set(x, y, z);

  var focus,
      theta = 0.0,
      r = 200;

  c.preRenderHook = function(){

    focus = focus || stage.focus.center;

    theta += 0.01;

    c.position.x = focus.x + Math.cos(theta) * r;
    c.position.y = focus.y;
    c.position.z = focus.z + Math.sin(theta) * r;

    c.lookAt( stage.focus.core.position );
  };

  return c;
};