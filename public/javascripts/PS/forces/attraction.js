PS.Attraction = function(){
};

PS.Attraction.prototype = {

  constructor: PS.Force,

  // type: 'n-ary',

  G: 6.67e-2,

  // This should only affect the netForce applied to p1
  collide: function(p1, p2){
    // var r = (new THREE.Vector3).sub(p1.position, p2.position),
    //     dist = r.length();

    //   r.normalize();

    //   // the tangent perpendicular vector to the collision
    //   var dt = (new THREE.Vector3).cross(p1.velocity, p2.velocity);

    //   // minimum translation distance to push balls apart after intersecting
    //   // to avoid overlap between meshes
    //   var mt = r.clone().multiplyScalar(p1.radius + p2.radius - dist);
    //   p1.position.addSelf(mt);

    //   // split the velocity vector of the first ball into a normal and a
    //   // tangential component in respect of the collision plane
    //   var v1n = (new THREE.Vector3).multiply(r, (new THREE.Vector3).cross(p1.velocity, r)),
    //       v1t = (new THREE.Vector3).multiply(dt, (new THREE.Vector3).cross(p1.velocity, dt)),
    //       v2n = (new THREE.Vector3).multiply(r, (new THREE.Vector3).cross(p2.velocity, r)),
    //       v2t = (new THREE.Vector3).multiply(dt, (new THREE.Vector3).cross(p2.velocity, dt));
      
    //   var M = p1.mass + p2.mass;
    //   var force = (p1.mass - p2.mass) / M * v1n.length() + (2 * p2.mass / M * v2n.length());

    //   p1.velocity = v1t.addSelf(r.multiplyScalar(force));
  },

  apply: function(target, affector){
    var r = (new THREE.Vector3).sub(target.position, affector.position),
        d = r.length(),
        f = -this.G * (target.mass * affector.mass / Math.pow(d, 2)),
        forceVect = r.normalize().multiplyScalar(f);

    if (!target.collidingWith(affector)) {
      target.netForce.addSelf(forceVect);
    }
  }

};



