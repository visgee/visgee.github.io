$(document).ready(function(){
    console.log('ready')

    var scene, camera, renderer, controls, threejs;
    //var gui = null;

    var iw = 4.08;
    var ih = 3.38;
    var ddd = 10;
    var modify = 1;
    var thetaX = iw * modify / 56;
    var thetaY = ih * modify / 32;

    var zuinan = 20.07;
    var zuixi = 73.66;

    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
    var flight_path_curve = [];
    var flight_point_cloud_geom;
    var colorSet = [
        [1,1,1],
        [0,0.78,1],
        [1,0.83,0.004],
        [1,0,0.5],
        [0.624,1,0.012],
        [0.99,0,0]
    ];

    var flight_point_speed_scaling = 20.0;
    var flight_point_speed_min_scaling = 1.0;
    var flight_point_speed_max_scaling = 25.0;
    var flight_point_start_time = [];
    var flight_point_end_time = [];
    var flight_distance = [];


    var mesh, color;


    var de2ra = function(degree) { return degree*(Math.PI/180);};

    init();
    animate();

    function init() {


        threejs = document.getElementById('container');
        scene = new THREE.Scene();
        renderer = new THREE.WebGLRenderer({antialias:true});
        renderer.setSize(WIDTH, HEIGHT);
        renderer.setClearColor(0x000000, 1);
        //renderer.shadowMapEnabled = true;
        //renderer.shadowMapSoft = true;
        threejs.appendChild(renderer.domElement);

        camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.001 , 10000);
        camera.position.set(iw / 2, ih / 2, 3);
        //camera.applyEuler(a);
        //camera.up = new THREE.Vector3(0,0,1);
        scene.add(camera);
        var planeGeometry = new THREE.PlaneGeometry( iw, ih);
        var planeMaterial = new THREE.MeshBasicMaterial( {
            transparent:true,
            opacity:0.3,
            map : THREE.ImageUtils.loadTexture('./assets/china.png'),
            color: 0xffffff,
            side: THREE.DoubleSide} );
        var plane1 = new THREE.Mesh( planeGeometry, planeMaterial );
        plane1.position.set(iw / 2,ih / 2, 0);
        var plane2 = new THREE.Mesh( planeGeometry, planeMaterial );
        plane2.position.set(iw / 2,ih / 2, ddd/2)

        scene.add( plane1 );
        //scene.add( plane2 );



        //console.log(flights.length);
        var geo2xyz = function(){
            for(var i = 0; i < flights.length; i++){
                for(var j = 0;j < 4; j++){}
                if(j == 0 || j == 2){
                    flights[i][j] = parseFloat(flights[i][j]) * rate + ih/2;
                }else if(j == 1 || j == 3){
                    flights[i][j] = parseFloat(flights[i][j]) * rate + iw/2;
                }
            }
        }



        var pathsGeometry = new THREE.BufferGeometry();
        var numControlPoints = 50;
        var line_positions = new Float32Array(flights.length * 3 * 2 * numControlPoints);
        var colors = new Float32Array(flights.length * 3 * 2 * numControlPoints);
        var lineIndex = 0;

        var handan = new THREE.Vector3((114.52 - zuixi) * thetaX,(38.05 - zuinan) * thetaY,0)

        var getPaths = function(){
            for(var i = 0; i < flights.length; i++){
                var data = flights[i];
                console.log(data[2]);

                var v0 =  new THREE.Vector3( (parseFloat(data[0]) - zuixi) * thetaX, (parseFloat(data[1]) - zuinan) * thetaY, 0 );
                //var v1 = new THREE.Vector3( parseFloat(data[3]) * rate + iw/2, parseFloat(data[2]) * rate + ih/2, -ddd / 2 );
                var v1 = handan;
                var v2 = new THREE.Vector3(0,0,0);
                var v3 = new THREE.Vector3(0,0,0);
                var v4 = new THREE.Vector3(0,0,0);

                //var thetax = Math.abs(v0.x - v1.x);
                //var thetay = Math.abs(v0.y - v1.y);



                v2.lerpVectors(v0,v1,0.5);
                v2.z = 0.2 + Math.random() * 0.33;
                v2.x += Math.random() * iw / 20 - iw / 40

                var curve = new THREE.SplineCurve3( [
                    v0,v2,v1
                ] );
                var curve_length = curve.getLength();
                flight_distance.push(curve_length);
                flight_path_curve.push(curve);
                var controlPoints = curve.getPoints( numControlPoints );

                for(var j = 0; j < numControlPoints; j ++){
                  line_positions[j * 6 + 0 + lineIndex] = controlPoints[j].x;
                  line_positions[j * 6 + 1 + lineIndex] = controlPoints[j].y;
                    line_positions[j * 6 + 2 + lineIndex] = controlPoints[j].z;
                    line_positions[j * 6 + 3 + lineIndex] = controlPoints[j + 1].x;
                    line_positions[j * 6 + 4 + lineIndex] = controlPoints[j + 1].y;
                    line_positions[j * 6 + 5 + lineIndex] = controlPoints[j + 1].z;
                    colors[j * 6 + 0 + lineIndex] = colorSet[data[3] - 1][0];
                    colors[j * 6 + 1 + lineIndex] = colorSet[data[3] - 1][1];
                    colors[j * 6 + 2 + lineIndex] = colorSet[data[3] - 1][2];
                    colors[j * 6 + 3 + lineIndex] = colorSet[data[3] - 1][0];
                    colors[j * 6 + 4 + lineIndex] = colorSet[data[3] - 1][1];
                    colors[j * 6 + 5 + lineIndex] = colorSet[data[3] - 1][2];
                }
                lineIndex += numControlPoints * 2 * 3;
            }
        }

        var pathsMaterial = new THREE.LineBasicMaterial( {
            color: 0xffffff,
            vertexColors: THREE.VertexColors,
            transparent: true,
            opacity: 0.6,
            depthTest: true,
            depthWrite: false,
            linewidth: 0.1
        } );
        //console.log(flights.length)

//Create the final Object3d to add to the scene
        //var splineObject = new THREE.Line( geometry, material );
        //paths.push(new THREE.Line( geometry, material ));

        //geo2xyz();
        getPaths();
        pathsGeometry.addAttribute('position', new THREE.BufferAttribute(line_positions, 3));
        pathsGeometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
        pathsGeometry.computeBoundingSphere();
        var paths = new THREE.Line(pathsGeometry, pathsMaterial,THREE.LinePieces);
        scene.add(paths);
        //console.log(paths.length)
        function flightPointCloud() {
            flight_point_cloud_geom = new THREE.BufferGeometry();
            num_points = flights.length;
            positions = new Float32Array(num_points * 3);
            var point_colors = new Float32Array(num_points * 3);
            sizes = new Float32Array(num_points);

            for (var i = 0; i < num_points; i++) {
                positions[3 * i + 0] = 0;
                positions[3 * i + 1] = 0;
                positions[3 * i + 2] = 0;

                if(flights[i][2] == 0){
                    point_colors[3 * i + 0] = colorSet[5][0];
                    point_colors[3 * i + 1] = colorSet[5][1];
                    point_colors[3 * i + 2] = colorSet[5][2];
                    sizes[i] = 0.4;
                }else{
                    point_colors[3 * i + 0] = colorSet[flights[i][3] - 1][0];
                    point_colors[3 * i + 1] = colorSet[flights[i][3] - 1][1];
                    point_colors[3 * i + 2] = colorSet[flights[i][3] - 1][2];
                    sizes[i] = 0.1;
                }



            }

            flight_point_cloud_geom.addAttribute('position', new THREE.BufferAttribute(positions, 3));
            console.log(1);
            flight_point_cloud_geom.addAttribute('customColor', new THREE.BufferAttribute(point_colors, 3));
            flight_point_cloud_geom.addAttribute('size', new THREE.BufferAttribute(sizes, 1));
            flight_point_cloud_geom.computeBoundingBox();

            var attributes = {
                size: {
                    type: 'f',
                    value: null
                },
                customColor: {
                    type: 'c',
                    value: null
                }
            };

            var uniforms = {
                color: {
                    type: "c",
                    value: new THREE.Color(0xffffff)
                },
                texture: {
                    type: "t",
                    value: THREE.ImageUtils.loadTexture("./assets/particle.png")
                }
            };

            var shaderMaterial = new THREE.ShaderMaterial({
                uniforms: uniforms,
                attributes: attributes,
                vertexShader: document.getElementById('vertexshader').textContent,
                fragmentShader: document.getElementById('fragmentshader').textContent,
                blending: THREE.AdditiveBlending,
                depthTest: true,
                depthWrite: false,
                transparent: true
            });

            return new THREE.PointCloud(flight_point_cloud_geom, shaderMaterial);
        }
        scene.add(flightPointCloud());






//鼠标摄像机绑定
//
        controls = new THREE.TrackballControls(camera);
        controls.rotateSpeed = 3.0;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.8;
        controls.noZoom = false;
        controls.noPan = false;
        controls.staticMoving = true;
        controls.target = new THREE.Vector3(iw / 2, ih / 2, 0);
        camera.lookAt(controls.target);

        controls.dynamicDampingFactor = 0.3;
        controls.keys = [65,83,68];
        //controls.addEventListener('change',render);

//        controls = new THREE.TrackballControls(camera, renderer.domElement);
//        controls.rotateSpeed = 0.4;
//        controls.noZoom = false;
//        controls.noPan = true;
//        controls.staticMoving = false;
//        controls.minDistance = 0.75;
//        controls.maxDistance = 3.0;

        window.addEventListener( 'resize', onWindowResize, false )

    }





    function easeOutQuadratic(t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    }
    function setFlightTimes(index) {
        var scaling_factor = (flight_point_speed_scaling - flight_point_speed_min_scaling) /
            (flight_point_speed_max_scaling - flight_point_speed_min_scaling);
        var duration = (1-scaling_factor) * flight_distance[index] * 30000;

        var start_time = Date.now() + Math.random() * 1000
        flight_point_start_time[index] = start_time;
        flight_point_end_time[index] = start_time + duration;
    }
    for(var i = 0; i < flights.length; i ++){
        setFlightTimes(i);
    }

    function update_flights() {
        flight_point_cloud_geom.attributes.position.needsUpdate = true;

        for (var i = 0; i < flights.length; i ++) {

            if ( Date.now() > flight_point_start_time[i]) {

                var ease_val = easeOutQuadratic(Date.now() - flight_point_start_time[i], 0, 1, flight_point_end_time[i] - flight_point_start_time[i]);

                if (ease_val < 0 ) {
                    //console.log('reset time');
                    ease_val = 0;
                    setFlightTimes(i);
                }
                //console.log(ease_val);

                var pos = flight_path_curve[i].getPoint(ease_val);
                positions[3 * i + 0] = pos.x;
                positions[3 * i + 1] = pos.y;
                positions[3 * i + 2] = pos.z;
            }
        }
        //console.log(positions[2]);
    }



    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }

    function animate() {

        requestAnimationFrame(animate);
        //下面这个一定要放在requestAnimationFrame的下面哦
        controls.update();
        renderScene();
    }

    function renderScene(){
        update_flights();
        renderer.render(scene, camera);
    }
    function render() {

        renderer.render( scene, camera );

    }
});