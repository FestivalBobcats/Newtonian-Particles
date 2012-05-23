PS.Particle = function(mass, radius){
  this.mass = mass;
  this.radius = radius;
  this.position = new THREE.Vector3;
  this.rotation = new THREE.Vector3(PS.rand(180), PS.rand(180), PS.rand(180));
  this.velocity = new THREE.Vector3;
  this.angularVelocity = new THREE.Vector3;
  this.acceleration;// = new THREE.Vector3;
  this.netForce = new THREE.Vector3;

  this.meshes = [];
};

PS.Particle.prototype.rotate = function(angularAccel){
  this.angularVelocity.addSelf(angularAccel);
  var rot = this.rotation.addSelf(this.angularVelocity);
  this.meshes.forEach(function(mesh){
    mesh.rotation = rot;
  });
};

PS.Particle.prototype.displace = function(){
  this.velocity.addSelf(this.acceleration);
  var pos = this.position.addSelf(this.velocity);
  this.meshes.forEach(function(mesh){
    mesh.position = pos;
  });
};

PS.Particle.prototype.collidingWith = function(particle){
  var d = this.position.distanceTo(particle.position),
      r2 = this.radius + particle.radius;
  return (d <= r2);
};