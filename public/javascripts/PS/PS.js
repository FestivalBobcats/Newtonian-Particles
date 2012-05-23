var PS = PS || {};

PS.rand = function(n){
  return Math.random() * n;
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
    "vendor/stats",
    "PS/particle",
    "PS/particles/planet",
    "PS/particles/star",
    "PS/particle-system",
    "PS/force",
    "PS/forces/attraction",
    "PS/forces/rotation",
    "PS/environment",
    "PS/camera",
    "PS/stage"
  ];

  filenames.forEach(PS.require);

  $.ajaxSetup({async:true});

  PS.onload();

})();