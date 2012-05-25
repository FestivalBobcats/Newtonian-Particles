PS.DepthOfField = function(stage){

  this.stage = stage;

  this.bokehUniforms = {
    focus: 1.0,
    aperture: 0.025,
    maxblur: 1.0
  };

  this.material = new THREE.MeshDepthMaterial();

  this.initPostprocessing();

  return this;
};

PS.DepthOfField.prototype.initPostprocessing = function(){
  var stage = this.stage;
  var params = {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBFormat
  };
  this.rtTextureDepth = new THREE.WebGLRenderTarget(stage.width, stage.height, params);
  this.rtTextureColor = new THREE.WebGLRenderTarget(stage.width, stage.height, params);

  var shader = THREE.ShaderExtras[ "bokeh" ];

  this.bokehUniforms = THREE.UniformsUtils.clone( shader.uniforms );

  this.bokehUniforms[ "tColor" ].texture = this.rtTextureColor;
  this.bokehUniforms[ "tDepth" ].texture = this.rtTextureDepth;
  this.bokehUniforms[ "focus" ].value = 1.1;
  this.bokehUniforms[ "aspect" ].value = stage.width / stage.height;

  var material = new THREE.ShaderMaterial({
    uniforms: this.bokehUniforms,
    vertexShader: shader.vertexShader,
    fragmentShader: shader.fragmentShader
  });
  var geometry = new THREE.PlaneGeometry( stage.width, stage.height ),
      quad = new THREE.Mesh( geometry, material );
  
  quad.position.z = - 500;
  quad.rotation.x = Math.PI / 2;
  stage.scene.add( quad );
};