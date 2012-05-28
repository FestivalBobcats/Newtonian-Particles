PS.Environment = function(width, height, depth){
  this.width = width;
  this.height = height;
  this.depth = depth;
  this.systems = [];
};

(function(klass){

  klass.step = function(){
    var forces = this.forces;
    this.systems.map(function(sys){

      sys.preStep();
      sys.step();
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