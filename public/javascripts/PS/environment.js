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

      sys.preStep();

      forces.forEach(function(force){
        force.apply(sys);
      });

      sys.postStep();

    });
  };

  // Returns all 3D mesh objects in the environment
  klass.objects = function(){
    return this.systems.reduce(function(meshes, sys){
      return meshes.concat(sys.meshes());
    }, []);
  };

})(PS.Environment.prototype);