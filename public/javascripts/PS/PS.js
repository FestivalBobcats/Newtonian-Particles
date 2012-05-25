var PS = PS || {};

// TODO: rename to randomRange and reverse param order
PS.rand = function(max, min){
  min = min || max / 4;
  return min + Math.random() * max;
};

PS.pickRandom = function(array){
  return array[ Math.floor( PS.rand(array.length) ) ];
};

PS.require = function(filename){
  var filepath = "/javascripts/" + filename + ".js";
  $.getScript(filepath, function(){
    console.log("Loaded " + filename + ".");
  });
};



(function(){
  // syncronously fetch scripts to prevent load errors
  $.ajaxSetup({async:false});

  // load order matters
  var filenames = [
    "vendor/THREE",
    "vendor/shader_extras",
    "vendor/stats",
    "PS/particle",
    "PS/particles/planet",
    "PS/particles/star",
    "PS/particles/blackhole",
    "PS/particle_system",
    "PS/force",
    "PS/forces/attraction",
    "PS/forces/rotation",
    "PS/environment",
    "PS/camera",
    "PS/stage",
    "PS/post_processing/depth_of_field"
  ];

  filenames.forEach(PS.require);

  $.ajaxSetup({async:true});

  PS.onload();

})();