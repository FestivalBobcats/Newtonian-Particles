PS.ParticleSystem = function(env, center, dimensions, particleCount, starCount){
  this.center = center;
  this.width = dimensions.x;
  this.height = dimensions.y;
  this.depth = dimensions.z;
  this.particleCount = particleCount;
  this.starCount = starCount;
  this.particles = [];

  // var centerMesh = new THREE.
  // this.meshes = function(){
  //   var meshes = [centerMesh];
  //   sys.particles.forEach(function(p){
  //     meshes = meshes.concat(p.meshes);
  //   });
  //   return meshes;
  // };

  var planetMass = 100000,
      starMass = 10000000,
      blackholeMass = 100000000;
  var planetRadius = 6,
      starRadius = 20,
      blackholeRadius = 30;


  // point of gravitation of the system to control the radius
  this.core = new PS.Blackhole(blackholeMass, blackholeRadius);
  this.core.position = this.center;
  this.particles.push(this.core);

  this.meshes = function(){
    return this.particles.reduce(function(meshes, p){
      return meshes.concat(p.meshes);
    }, []);
  };

  // fired once every render loop BEFORE forces are applied
  this.preStep = function(){

  };

  // fired once every render loop AFTER forces are applied
  this.postStep = function(){
    this.updateCenter();
  };

  // adjust the position of the system center point in regards to the collective radius of its particles
  this.updateCenter = function(){
    var pos = this.particles.reduce(function(sum, p){
      return sum.addSelf(p.position.clone().multiplyScalar(p.mass));
    }, new THREE.Vector3);
    var M = this.particles.reduce(function(sum, p){
      return sum + p.mass;
    }, 0);

    var centerMass = pos.divideScalar(M);

    this.center = centerMass;
    // this.core.position = this.center;
  };



  this.populate = function(){
    var objCount = this.particleCount - this.starCount;
    while (this.particles.length < objCount) {
      var r = PS.rand(planetRadius),
          m = PS.rand(r * planetMass);
      var p = new PS.Planet(m, r);
      this.addParticle(p);
    }

    while (this.particles.length < this.particleCount) {
      var r = starRadius,
          m = PS.rand(r * starRadius);
      var p = new PS.Star(m, r);
      this.addParticle(p);
    }
  };


          //   for ( var i = 0; i < 2000; i ++ ) {

          //   var vertex = new THREE.Vector3();
          //   vertex.x = Math.random() * 4000 - 2000;
          //   vertex.y = Math.random() * 4000 - 2000;
          //   vertex.z = Math.random() * 4000 - 2000;
          //   geometry.vertices.push( vertex );

          //   geometry.colors.push(new THREE.Color(0x8000ff));

          // }

          // var geometry = new THREE.Geometry;
          // var material = new THREE.ParticleBasicMaterial({
          //   size: 1,
          //   vertexColors: THREE.VertexColors,
          //   depthTest: false,
          //   opacity: 0.5,
          //   sizeAttenuation: false
          // });
          // var mesh = new THREE.ParticleSystem(geometry, material);

        

  env.systems.push(this);

  this.populate();
};

PS.ParticleSystem.prototype.addParticle = function(p){
  p.position.x = PS.rand(this.center.x + this.width);
  p.position.y = 0;
  p.position.z = PS.rand(this.center.z + this.depth / 2);
  this.particles.push(p);
};

PS.ParticleSystem.prototype


