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
      particleCount = 100,
      starCount = 4,
      timespan = 60;



  var centerStage = new THREE.Vector3(w/2, h/2, d/2),
      env = new PS.Environment(w, h, d, timespan),
      dimensions = new THREE.Vector3(w/2, h/2, d/2),
      system = new PS.ParticleSystem(env, centerStage, dimensions, particleCount, starCount);

  env.attachForce(new PS.Attraction);
  env.attachForce(new PS.Rotation);

  var stage = new PS.Stage('body', env);

  stage.target(system);

  stage.play();
}

PS.onload = function(){
  console.log("PS loaded.");
  new App;
};

// load loader
// display loader
// load all javascripts, css, images


