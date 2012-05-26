PS.Stage = function(el, env){
  this.container = $(el);
  this.env = env;
  this.width = this.env.width;
  this.height = this.env.height;
  this.depth = this.env.depth;

  this.currentFrame = 0;
  this.frameRate = 24;
  this.totalFrames = env.timespan * this.frameRate;

  var renderer = this.renderer = new THREE.WebGLRenderer({
    clearColor: 0x000000,
    // clearAlpha: 1,
    // preserveDrawingBuffer: true,
    antialias: true
  });
  renderer.autoClearColor = false;

  var self = this;

  var scene = this.scene = new THREE.Scene();

  this.camera = PS.spawnCamera(this);

  this.renderer.setSize(env.width, env.height);

  renderer.sortObjects = true;
  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  renderer.physicallyBasedShading = true;

  this.container.append(this.renderer.domElement);




  var w = this.width, h = this.height, d = this.depth;




  // this.clock = new THREE.Clock();


  // var controls = this.controls = new THREE.FlyControls(this.camera);
  // controls.movementSpeed = 1;
  // controls.domElement = this.container;
  // controls.rollSpeed = 0;
  // // controls.autoForward = false;
  // controls.dragToLook = true;




  this.scene.add(this.camera);



  this.scene.add(new THREE.AmbientLight({ color: 0x666699 }));



  this.scene.fog = new THREE.FogExp2( 0x000000, 0.001 );





  // Add all particle meshes to scene
  env.objects().forEach(function(obj){
    scene.add(obj);
  });




  var stats = this.stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  stats.domElement.style.zIndex = 100;
  this.container.append(stats.domElement);



  // this.postprocessing = new PS.DepthOfField();

  this.target = function(system){
    self.focus = system;
  };



  this.render = function(){
    ++self.currentFrame;
    self.env.step();

    self.camera.lookAt(self.focus.center);

    // var delta = self.clock.getDelta();
    // self.controls.update(delta);

    // renderer.clear();

    // // Render scene into texture
    // scene.overrideMaterial = null;
    // renderer.render( scene, camera, postprocessing.rtTextureColor, true );

    // // Render depth into texture
    // scene.overrideMaterial = material_depth;
    // renderer.render( scene, camera, postprocessing.rtTextureDepth, true );

    self.renderer.render(self.scene, self.camera);
  };

  this.play = function(){
    requestAnimationFrame(self.play);
    self.render();
    self.stats.update();
  };

};


