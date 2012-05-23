PS.Stage = function(el, env){
  this.container = $(el);
  this.env = env;
  this.width = this.env.width;
  this.height = this.env.height;
  this.depth = this.env.depth;

  this.center = new THREE.Vector3(this.width / 2, this.height / 2, 0);

  this.currentFrame = 0;
  this.frameRate = 24;
  this.totalFrames = env.timespan * this.frameRate;

  var renderer = this.renderer = new THREE.WebGLRenderer({
    clearColor: 0x000000,
    clearAlpha: 1,
    // preserveDrawingBuffer: true,
    antialias: true
  });
  renderer.autoClearColor = false;

  var self = this;

  var scene = this.scene = new THREE.Scene();

  this.camera = new PS.Camera(this);

  this.renderer.setSize(env.width, env.height);

  // renderer.sortObjects = true;
  // renderer.gammaInput = true;
  // renderer.gammaOutput = true;
  // renderer.physicallyBasedShading = true;

  this.container.append(this.renderer.domElement);

  this.scene.add(this.camera);



  this.scene.add(new THREE.AmbientLight({ color: 0x111111 }));



  this.scene.fog = new THREE.FogExp2( 0xffffff, 0.0003 );
  this.scene.fog.color.setHSV( 0.1, 0.10, 1 );





  // Add all particle meshes to scene
  env.objects().forEach(function(obj){
    scene.add(obj);
  });




  var stats = this.stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  stats.domElement.style.zIndex = 100;
  this.container.append(stats.domElement);




  this.render = function(){
    ++self.currentFrame;
    self.env.step();

    self.camera.position.x = self.center.x + Math.sin(self.currentFrame / 500) * self.depth / 2;
    self.camera.position.z = self.center.z + Math.cos(self.currentFrame / 500) * self.depth / 2;

    self.camera.lookAt(self.center);

    self.renderer.render(self.scene, self.camera);
  };

  this.play = function(){
    requestAnimationFrame(self.play);
    self.render();
    self.stats.update();
  };

};


