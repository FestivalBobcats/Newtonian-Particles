PS.ParticleSystem = function(env, center, dimensions, particleCount){
  this.center = center;
  this.width = dimensions.x;
  this.height = dimensions.y;
  this.depth = dimensions.z;
  this.particleCount = particleCount;
  this.particles = [];

  var attraction = new PS.Attraction;


  var planetMass = 20000,
      starMass =   10000000;
  var planetRadius = 4,
      starRadius = 15;


  // point of gravitation of the system to control the radius
  this.core = new PS.Star(starMass, starRadius);
  this.core.position = this.center;
  this.particles.push(this.core);

  this.meshes = function(){
    return this.particles.reduce(function(meshes, p){
      return meshes.concat(p.meshes);
    }, []);
  };

  // fired once every render loop BEFORE forces are applied
  this.preStep = function(){
    // this.detectCollisions();
  };

  this.step = function(){
    var particles = this.particles;
    particles.forEach(function(p1){



      particles.forEach(function(p2){
        if (p1 != p2) {

          attraction.apply(p1, p2);

        }
      });

      p1.acceleration = p1.netForce.clone().divideScalar(p1.mass);

      p1.displace();

      // clear netForce
      p1.netForce.set(0,0,0);

      p1.rotate();

    });
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
  };




  this.attachForce = function(force){
    forces.push(force);
  };



  this.populate = function(){
    var objCount = this.particleCount;
    while (this.particles.length < objCount) {
      var r = PS.rand(planetRadius, 1),
          m = PS.rand(r * planetMass);
      var p = new PS.Planet(m, r);
      this.addParticle(p);
    }
  };

  env.systems.push(this);

  this.populate();
};

PS.ParticleSystem.prototype.addParticle = function(p){
  p.position.x = this.core.position.x + (PS.rand(this.width * 2) - this.width);
  p.position.y = this.core.position.y + (PS.rand(this.height) - this.height / 2);
  p.position.z = this.depth;
  this.particles.push(p);
};


