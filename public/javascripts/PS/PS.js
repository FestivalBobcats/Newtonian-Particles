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
  $.getScript(filepath)
  .done(function(){
    console.log("Loaded " + filename + ".");
  })
  .fail(function(jqxhr, settings, exception){
    console.error("Failed to load " + filename + ".");
    console.error(exception.message);
  })
};



(function(){
  // syncronously fetch scripts to prevent load errors
  $.ajaxSetup({async:false});


  // load order matters
  var filenames = [
    // "vendor/THREE",
    "vendor/shader_extras",
    "vendor/postprocessing/RenderPass",
    "vendor/postprocessing/BloomPass",
    "vendor/postprocessing/ShaderPass",
    "vendor/postprocessing/MaskPass",
    "vendor/postprocessing/SavePass",
    "vendor/postprocessing/EffectComposer",
    "vendor/stats",
    "vendor/DAT.GUI.min",
    "PS/particle",
    "PS/particles/planet",
    "PS/particles/star",
    "PS/particle_system",
    "PS/force",
    "PS/forces/attraction",
    "PS/environment",
    "PS/camera",
    "PS/renderer",
    "PS/stage",
    "PS/post_processing/depth_of_field"
  ];

  filenames.forEach(PS.require);

  $.ajaxSetup({async:true});

  PS.onload();

})();