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
      particleCount = 120,
      starCount = 2,
      timespan = 60;



  var env = new PS.Environment(w, h, d, timespan),
      system = new PS.ParticleSystem(env, particleCount, starCount);

  env.attachForce(new PS.Attraction);
  env.attachForce(new PS.Rotation);

  var stage = new PS.Stage('body', env);
  stage.play();
}

PS.onload = function(){
  console.log("PS loaded.");
  new App;
};

// load loader
// display loader
// load all javascripts, css, images


