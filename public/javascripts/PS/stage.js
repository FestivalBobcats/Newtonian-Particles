PS.Stage = function(el, env){
  this.container = $(el);
  this.env = env;
  this.width = this.env.width;
  this.height = this.env.height;
  this.depth = this.env.depth;

  this.currentFrame = 0;
  this.frameRate = 24;
  this.totalFrames = env.timespan * this.frameRate;


  var self = this;

  var scene = this.scene = new THREE.Scene();

  this.camera = new PS.Camera(this);

  this.renderer = new PS.Renderer(this);




  var w = this.width, h = this.height, d = this.depth;










  this.scene.add(this.camera);



  this.scene.add(new THREE.AmbientLight({ color: 0x666699 }));



  this.scene.fog = new THREE.FogExp2( 0x002266, 0.002 );





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

    self.camera.preRenderHook();

    self.renderer.postRenderHook();
  };

  this.play = function(){
    requestAnimationFrame(self.play);
    self.render();
    self.stats.update();
  };

};












