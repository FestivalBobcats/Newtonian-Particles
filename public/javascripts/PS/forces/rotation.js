PS.Rotation = function(){
};

PS.Rotation.prototype = {

  constructor: PS.Force,



  apply: function(system){
    system.particles.forEach(function(particle){
      
      var angularAccel = particle.acceleration.clone().divideScalar(particle.radius);

      particle.rotate(angularAccel);
    });
  }

};