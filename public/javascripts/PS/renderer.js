PS.Renderer = function(stage){
  var renderer = new THREE.WebGLRenderer({
    precision: 'highp',
    clearAlpha: 0,
    antialias: true,
    gammaInput: true,
    gammaOutput: true,
    physicallyBasedShading: true
  });

  var targetParams = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat },
      renderTarget = new THREE.WebGLRenderTarget( stage.width, stage.height, targetParams );

  renderer.autoClear = false;
  renderer.sortObjects = false;


  var dof = {},
      scene = stage.scene,
      camera = stage.camera;

  dof.scene = new THREE.Scene();

  dof.camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2,  window.innerHeight / 2, window.innerHeight / - 2, -10000, 10000 );
  dof.camera.position.z = 100;
  
  dof.scene.add( dof.camera );

  dof.rtTextureDepth = renderTarget.clone();
  dof.rtTextureColor = renderTarget.clone();

  var bokeh_shader = THREE.ShaderExtras[ "bokeh" ];

  dof.bokeh_uniforms = THREE.UniformsUtils.clone( bokeh_shader.uniforms );

  dof.bokeh_uniforms[ "tColor" ].texture = dof.rtTextureColor;
  dof.bokeh_uniforms[ "tDepth" ].texture = dof.rtTextureDepth;
  dof.bokeh_uniforms[ "focus" ].value = 0.9;
  dof.bokeh_uniforms[ "aspect" ].value = window.innerWidth / stage.height;

  dof.materialBokeh = new THREE.ShaderMaterial({

    uniforms: dof.bokeh_uniforms,
    vertexShader: bokeh_shader.vertexShader,
    fragmentShader: bokeh_shader.fragmentShader

  });

  dof.quad = new THREE.Mesh( new THREE.PlaneGeometry( window.innerWidth, window.innerHeight ), dof.materialBokeh );
  dof.quad.position.z = - 500;
  dof.quad.rotation.x = Math.PI / 2;
  dof.scene.add( dof.quad );









  var flareScene = new THREE.Scene;


  var textureFlare0 = THREE.ImageUtils.loadTexture( "textures/lensflare/lensflare0.png" );
  var textureFlare2 = THREE.ImageUtils.loadTexture( "textures/lensflare/lensflare2.png" );
  var textureFlare3 = THREE.ImageUtils.loadTexture( "textures/lensflare/lensflare3.png" );

  function addLight( h, s, v, x, y, z ) {

    var flareColor = new THREE.Color( 0xffffff );
    THREE.ColorUtils.adjustHSV( flareColor, 0, -0.5, 0.5 );

    var lensFlare = new THREE.LensFlare( textureFlare0, 1024, 0.0, THREE.AdditiveBlending, flareColor );

    lensFlare.add( textureFlare0, 1024, 0.0, THREE.AdditiveBlending );

    lensFlare.add( textureFlare2, 1024, 0.0, THREE.AdditiveBlending );

    lensFlare.add( textureFlare3, 200, 0.6, THREE.AdditiveBlending );
    lensFlare.add( textureFlare3, 150, 0.7, THREE.AdditiveBlending );
    lensFlare.add( textureFlare3, 350, 0.9, THREE.AdditiveBlending );
    lensFlare.add( textureFlare3, 300, 1.0, THREE.AdditiveBlending );

    lensFlare.customUpdateCallback = renderer.lensFlareUpdateCallback;
    
    dof.scene.add( lensFlare );

  }


  renderer.lensFlareUpdateCallback = function( object ) {

    object.position.copy(stage.center);

    var f, fl = object.lensFlares.length;
    var flare;
    var vecX = -object.positionScreen.x * 2;
    var vecY = -object.positionScreen.y * 2;


    for( f = 0; f < fl; f++ ) {

      flare = object.lensFlares[ f ];

      flare.x = object.positionScreen.x + vecX * flare.distance;
      flare.y = object.positionScreen.y + vecY * flare.distance;

      flare.rotation = 0;

    }

  }



  var depthMaterial = new THREE.MeshDepthMaterial;


  var composer = new THREE.EffectComposer( renderer, dof.rtTextureColor );

  var renderModel = new THREE.RenderPass( scene, camera, null );
  // renderModel.clearAlpha = 0;


  var effectBlend = new THREE.ShaderPass( THREE.ShaderExtras[ "blend" ], "tDiffuse1" );
  // effectBlend.clear = true;

  var effectSave = new THREE.SavePass( renderTarget.clone() );
  // effectSave.clear = true;

  effectBlend.uniforms[ 'tDiffuse2' ].texture = effectSave.renderTarget;
  effectBlend.uniforms[ 'mixRatio' ].value = 0.5;
  effectBlend.uniforms[ 'opacity' ].value = 1.0;





  var effectController  = {

    focus:    0.9,
    aperture: 0.05,
    maxblur:  1.0

  };

  var matChanger = function( ) {

    dof.bokeh_uniforms[ "focus" ].value = effectController.focus;
    dof.bokeh_uniforms[ "aperture" ].value = effectController.aperture;
    dof.bokeh_uniforms[ "maxblur" ].value = effectController.maxblur;

  };

  var gui = new DAT.GUI();
  gui.add( effectController, "focus", 0.0, 3.0, 0.025 ).onChange( matChanger );
  gui.add( effectController, "aperture", 0.001, 0.2, 0.001 ).onChange( matChanger );
  gui.add( effectController, "maxblur", 0.0, 3.0, 0.025 ).onChange( matChanger );
  gui.close();


  matChanger();



  var bloom = new THREE.BloomPass( 0.5 );




  composer.addPass( renderModel );
  composer.addPass( effectBlend );
  composer.addPass( effectSave );
  composer.addPass( bloom );





  // addLight( 0.55, 0.825, 0.99, 5000, 0, -1000 );
  // addLight( 0.08, 0.825, 0.99,    0, 0, -1000 );
  // addLight( 0.995, 0.025, 0.99, 5000, 5000, -1000 );







  renderer.postRenderHook = function(){

    renderer.clear();




    scene.overrideMaterial = depthMaterial;
    renderer.render( scene, camera, dof.rtTextureDepth, true);

    composer.render( 0.1 );

    renderer.render( dof.scene, dof.camera );

  };





  renderer.setSize(stage.width, stage.height);
  stage.container.append(renderer.domElement);

  return renderer;
};


