PS.Environment = function(width, height, depth, timespan){
  this.width = width;
  this.height = height;
  this.depth = depth;
  this.timespan = timespan;
  this.systems = [];
  this.forces = [];
};

(function(klass){

  klass.attachForce = function(force){
    this.forces.push(force);
  };

  klass.step = function(){
    var forces = this.forces;
    this.systems.map(function(sys){


      forces.forEach(function(force){
        force.apply(sys);
      });

    });
  };

  // Returns all 3D mesh objects in the environment
  klass.objects = function(){
    var objects = [];
    this.systems.forEach(function(sys){
      sys.particles.forEach(function(p){
        objects = objects.concat(p.meshes);
      });
    });
    return objects;
  };

})(PS.Environment.prototype);