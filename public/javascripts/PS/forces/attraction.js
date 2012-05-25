PS.Attraction = function(){
};

PS.Attraction.prototype = {

  constructor: PS.Force,

  // type: 'n-ary',

  G: 6.67e-6,

  // This should only affect the netForce applied to p1
  collide: function(p1, p2){
    var r = (new THREE.Vector3).sub(p1.position, p2.position),
        dist = r.length();

      r.normalize();

      // the tangent perpendicular vector to the collision
      var dt = (new THREE.Vector3).cross(p1.velocity, p2.velocity);

      // minimum translation distance to push balls apart after intersecting
      // to avoid overlap between meshes
      var mt = r.clone().multiplyScalar(p1.radius + p2.radius - dist);
      p1.position.addSelf(mt);

      // split the velocity vector of the first ball into a normal and a
      // tangential component in respect of the collision plane
      var v1n = (new THREE.Vector3).multiply(r, (new THREE.Vector3).cross(p1.velocity, r)),
          v1t = (new THREE.Vector3).multiply(dt, (new THREE.Vector3).cross(p1.velocity, dt)),
          v2n = (new THREE.Vector3).multiply(r, (new THREE.Vector3).cross(p2.velocity, r)),
          v2t = (new THREE.Vector3).multiply(dt, (new THREE.Vector3).cross(p2.velocity, dt));
      
      var M = p1.mass + p2.mass;
      var force = (p1.mass - p2.mass) / M * v1n.length() + (2 * p2.mass / M * v2n.length());

      p1.velocity = v1t.addSelf(r.multiplyScalar(force));
  },

  calculate: function(p1, p2){
    var r = (new THREE.Vector3).sub(p1.position, p2.position),
        d = r.length(),
        f = -this.G * (p1.mass * p2.mass / Math.pow(d, 2));

    if (!p1.collidingWith(p2)) {
      return r.normalize().multiplyScalar(f);
    } else {

      // this.collide(p1, p2);

    }
  },

  apply: function(system){
    var attraction = this;
    system.particles.forEach(function(p1, idx){

      system.particles.forEach(function(p2){
        if (p1 == p2) return;
        var force = attraction.calculate(p1, p2);
        if (force) p1.netForce.addSelf(force);



      });



      // var distFromSystemCenter = p1.position.clone().distanceTo(system.center);


      p1.acceleration = p1.netForce.clone().divideScalar(p1.mass);

      // if (!idx) console.log(p1.position.x);

      p1.displace();

      // clear netForce
      p1.netForce.set(0,0,0);

    });
  }

};