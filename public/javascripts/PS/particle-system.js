PS.ParticleSystem = function(env, particleCount, starCount){
  this.width = env.width;
  this.height = env.height;
  this.depth = env.depth;
  this.particleCount = particleCount;
  this.starCount = starCount;
  this.particles = [];



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

PS.ParticleSystem.prototype.populate = function(){
  var objCount = this.particleCount - this.starCount;
  while (this.particles.length < objCount) {
    var r = PS.rand(10),
        m = PS.rand(r * 500000);
    var p = new PS.Planet(m, r);
    p.position.x = PS.rand(this.width);
    p.position.y = PS.rand(this.height);
    p.position.z = PS.rand(this.height / 2);
    this.particles.push(p);
  }

  while (this.particles.length < this.particleCount) {
    var r = PS.rand(10),
        m = PS.rand(r * 600000);
    var p = new PS.Star(m, r);
    p.position.x = PS.rand(this.width);
    p.position.y = PS.rand(this.height);
    p.position.z = PS.rand(this.height / 2);
    this.particles.push(p);
  }
};


