//  TODO: enable this in production
// $.ajaxSetup({
//   cache: true
// });

var PS = {};
$.getScript("/javascripts/PS/PS.js");

var App = function(){
  var w = window.innerWidth,
      h = window.innerHeight,
      d = h,
      particleCount = 200;

  


  var centerStage = new THREE.Vector3(w/2, h/2, d/2),
      env = new PS.Environment(w, h, d),
      dimensions = new THREE.Vector3(w/3, h/3, d/3),
      system = new PS.ParticleSystem(env, centerStage, dimensions, particleCount);

  var stage = new PS.Stage('body', env);

  stage.target(system);

  stage.play();

  

}

PS.onload = function(){
  console.log("PS loaded.");
  new App;
};


