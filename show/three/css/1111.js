var container, stats;
var camera, scene, renderer, particles, lines, mouselines, controls;
var plane, frustum, cameraViewProjectionMatrix;

var visibleParticles = [];
var visibleLines = [];

var DISTANCE = 200;
var RADIUS = 30;
var AMOUNT = 500;
var ZDEPTH = 0.83;
var THICKNESS = 2;
var SPEED = 1.5;

var mouse = {
  x: 0,
  y: 0,
  particle: null,
  updateParticlePosition: function() {
    var x = this.x / window.innerWidth * 2 - 1,
        y = -this.y / window.innerHeight * 2 + 1;

    var vector = new THREE.Vector3(x, y, 0.5).unproject(camera);
    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    var intersects = raycaster.intersectObject(plane);

    if (! intersects.length) {
      this.particle.visible = false;
      return;
    }
    var position = intersects[0].point;
    this.particle.position.copy(position);
  }
};

init();
animate();

function init() {

  container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 100, 10000);
  camera.position.z = 1000;

  frustum = new THREE.Frustum();
  cameraViewProjectionMatrix = new THREE.Matrix4();

  controls = new THREE.TrackballControls(camera);
  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;
  controls.noZoom = false;
  controls.noPan = false;
  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0x033d5e, 0.0009 );


  plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(5000, 5000, 8, 8),
    new THREE.MeshBasicMaterial({
      color: 0xFF0000,
      opacity: 0.25,
      transparent: true
    })
  );
  plane.visible = false;
  scene.add(plane);

  lines = new THREE.Group();
  scene.add(lines);

  mouselines = new THREE.Group();
  scene.add(mouselines);


  particles = new THREE.Geometry();

  for (var i=0; i < AMOUNT; i++) {
    var x = Math.random() * 2000 - 1000;
    var y = Math.random() * 2000 - 1000;
    var z = Math.random() * 2000 - 1000;

    var particle = new THREE.Vector3(x, y, z);
    particle.velocity = new THREE.Vector3(-0.5 + Math.random(), -0.5 + Math.random(), -0.5 + Math.random()).multiplyScalar(SPEED);
    particle.nearParticles = [];
    particles.vertices.push(particle);
  }


	var image = document.createElement('img');
  image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAM1BMVEUAAAD///////////////////////////////////////////////////////////////+3leKCAAAAEHRSTlMA6gSS+UwQxYBYrZaUV8eBNZqYOQAAAJBJREFUKM+Fk1kOAyEMQ+Owzp77n7ZCbRHTDvH7fRIKiS0dTaEgRpSQVH7JFdZBzXe7wG5gGaRu9sem3a72wPr1wR7Z3/awCUezGTONNn+1KVVEMddQSeaQJHg6SPF0EXgaEj0diSaPk9HIx8hayFLJSchBvTh84rg7YSJRJEHmNWjkC4O8eonGCp6tgudYwRdS1iqsCVRl3AAAAABJRU5ErkJggg==';
  
  var sprite = new THREE.Texture( image );
  image.onload = function()  {
    sprite.needsUpdate = true;
	};
  
  
  var material = new THREE.PointCloudMaterial({
    size: RADIUS,
    map: sprite,
    color: 0xFFFFFF,
    depthTest: false,
    transparent: true
  });

  var particleSystem = new THREE.PointCloud(
    particles,
    material
  );

  particleSystem.sortParticles = true;
  scene.add(particleSystem);


  var mouseMaterial = new THREE.SpriteMaterial({
    map: sprite,
    fog: true,
    transparent: true,
    opacity: 0
  });

  mouse.particle = new THREE.Sprite(mouseMaterial);
  mouse.particle.scale.x = mouse.particle.scale.y = 20;
  mouse.particle.nearParticles = [];
  scene.add(mouse.particle);





  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    clearAlpha: 1
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.sortObjects = true;
  container.appendChild(renderer.domElement);

  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  container.appendChild(stats.domElement);
  
  updateFrustum();

  document.addEventListener('mousemove', onDocumentMouseMove, false);
  controls.addEventListener('change', updateFrustum);
  window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

}

//

function onDocumentMouseMove(event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  mouse.updateParticlePosition();
}

//

function animate() {

  requestAnimationFrame(animate);

  render();
  stats.update();

}

function render() {
  controls.update();
  particlesAnimate();
  particlesDistance();
  linesUpdate();
  mouseLinesUpdate();
  renderer.render(scene, camera);
}

function particlesAnimate() {

  for (var i = 0, il = particles.vertices.length; i < il ; i++) {
    var p = particles.vertices[i];

    p.add(p.velocity);

    if (p.x - RADIUS > 1000 || p.x + RADIUS < -1000) p.velocity.x = -p.velocity.x;
    if (p.y - RADIUS > 1000 || p.y + RADIUS < -1000) p.velocity.y = -p.velocity.y;
    if (p.z - RADIUS > 1000 || p.z + RADIUS < -1000) p.velocity.z = -p.velocity.z;
  }

  particles.verticesNeedUpdate = true;
}

function particlesDistance() {
  visibleParticles = _.filter(particles.vertices, function(p) {
    return frustum.containsPoint(p);
  });
  visibleLines = _.filter(lines.children, function(l) {
    return frustum.intersectsObject(l);
  });

  for (var i = 0; i < visibleParticles.length; i++) {
    var p = visibleParticles[i];

    distanceWithMouse(p);

    for (var j = i + 1; j < visibleParticles.length; j++) {
      var p2 = particles.vertices[j];
      distanceParticles(p, p2);
    }
  }
}

function linesUpdate() {
  for (var i = 0; i < visibleLines.length; i++) {
    var l = visibleLines[i];
    l.geometry.computeLineDistances();

    var dist = l.geometry.lineDistances[1];
    if (dist > DISTANCE) {
      lines.remove(l);
    } else {
      l.material.opacity = 1 - dist / DISTANCE;
      l.geometry.verticesNeedUpdate = true;
    }
  }
}

function mouseLinesUpdate() {
  for (var i = 0; i < mouselines.children.length; i++) {
    var l = mouselines.children[i],
        p0 = toScreenXY(l.geometry.vertices[0]),
        p1 = toScreenXY(l.geometry.vertices[1]);

    var dx = p0.x - p1.x,
        dy = p0.y - p1.y;

    var dist2D = Math.sqrt(dx*dx + dy*dy);

    if (dist2D > DISTANCE || p0.z > ZDEPTH) {
      mouselines.remove(l);
    } else {
      l.material.opacity = 1 - Math.abs(p0.z - 0.5) / 0.5 / 2 - dist2D / DISTANCE;
      l.geometry.verticesNeedUpdate = true;
    }
  }
}

function updateFrustum() {
  camera.updateMatrixWorld();
  camera.matrixWorldInverse.getInverse(camera.matrixWorld);
  cameraViewProjectionMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
  frustum.setFromMatrix(cameraViewProjectionMatrix);

  plane.lookAt(camera.position);
}

function distanceParticles(p1, p2) {
  var dist = p1.distanceTo(p2);

  var pos = p1.nearParticles.indexOf(p2);
  if (dist <= distance)="" {="" if="" (pos="" <="" 0)="" p1.nearparticles.push(p2);="" createline(p1,="" p2);="" }="" else="">= 0) {
      p1.nearParticles.splice(pos, 1);
    }
  }
}

function distanceWithMouse(p) {

  var p_xy = toScreenXY(p);
  var dx = mouse.x - p_xy.x,
      dy = mouse.y - p_xy.y;

  var dist2D = Math.sqrt(dx*dx + dy*dy);

  var pos = mouse.particle.nearParticles.indexOf(p);

  if (dist2D <= distance="" &&="" p_xy.z="" <="ZDEPTH)" {="" if="" (pos="" 0)="" mouse.particle.nearparticles.push(p);="" createmouseline(p);="" }="" else="">= 0) {
      mouse.particle.nearParticles.splice(pos, 1);
    }
  }
}

function createMouseLine(p) {
  var geometry = new THREE.Geometry();
  geometry.vertices.push(
    p,
    mouse.particle.position
  );

  var lineMaterial = new THREE.LineBasicMaterial({
    color: 0xFFFFFF,
    transparent: true,
    opacity: 0,
    depthTest: false,
    linewidth: THICKNESS,
    fog: false
  });

  var line = new THREE.Line(geometry, lineMaterial);
  mouselines.add(line);
}

function createLine(p1, p2) {
  var geometry = new THREE.Geometry();
  geometry.vertices.push(
    p1,
    p2
  );

  var lineMaterial = new THREE.LineBasicMaterial({
    color: 0xFFFFFF,
    transparent: true,
    opacity: 0,
    depthTest: false,
    linewidth: THICKNESS,
    fog: true
  });

  var line = new THREE.Line(geometry, lineMaterial);
  lines.add(line);
  return line;
}

function toScreenXY(position) {
  var pos = position.clone();
  pos.applyProjection(cameraViewProjectionMatrix);
  return { x: ( pos.x + 1 ) * window.innerWidth / 2,
       y: ( - pos.y + 1) * window.innerHeight / 2, z: pos.z };
}
</=></=>