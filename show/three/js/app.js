/**
 * Created by sunqi on 15-8-4.
 */

//rowdata: dataArr;

//
var play = false;
var showPanel = false;

var lineOpacity = 0.35;
var lineWidth = 0.3;
var eventSet = {};
var eventColor = {
    '03':[90,255,176],  //明确合作
    '05':[100,198,218], //进行外交合作
    '06':[54,252,75],   //实际合作
    '07':[255,255,30],  //提供紧急援助
    '13':[211,115,0],   //威胁
    '14':[255,61,127],  //抗议
    '15':[240,150,42],  //军演
    '19':[255,30,30]    //战争
}


for(var i = 0; i < dataArr.length; i++){
    var row = dataArr[i].split('|');
    if(eventSet[row[0]] == undefined){

        eventSet[row[0]] = [];
        eventSet[row[0]].push(row);
    }else{
        eventSet[row[0]].push(row);
    }
}
var lastSelection = '03';

$(function(){
    for(var i = 1; i < $('input').length; i++){
        $('input')[i].checked=false;
    }
    $('.listBox ul').append(createList(lastSelection));
    var sound1 = document.getElementById('bi');
    var sound2 = document.getElementById('shua');

    $('.leftPanel .pure-g').hover(function(){
        sound1.play();
    },function(){
        sound1.stop();
    })
    $('.leftPanel .pure-g').bind('click',function(){
        event.preventDefault()
        var _value = $(this).find('input')[0].value;
        if(_value != lastSelection){

            $('.rightPanel').removeClass('animated slideInRight slideInRL')
            $(".activeCheckBox")[0].checked = false;
            $(".activeCheckBox").removeClass('activeCheckBox');
            $(this).find('input').addClass('activeCheckBox');
            $(this).find('input')[0].checked = true;

            lineGroup[lastSelection].visible = false;
            lineGroup[_value].visible = true;
            lastSelection = _value;

            $('.rightPanel').removeClass('animated slideInRight slideInRL').addClass('slideInRL animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).removeClass('animated slideInRight slideInRL');
            });
            sound2.play()
            $('.listBox ul').html('')
            $('.listBox ul').append(createList(lastSelection));

        }
    });


    function createList(code){
        var _html = ''
        var ea = eventSet[code];
        for(var i in ea){
            _html += '\<li>'+ea[i][2] + ' ———— ' + ea[i][5] + '\</li>';
        }
        return _html;
    }

})


var camera, scene, renderer, controls, stats;
var radius = 0.995;
var base_globe = 0;
var countries;


var intersected_object = 0;
var overlay_element = 0;
var hover_scale = 1.01;



//var flight_path_splines = [];
//var flight_distance = [];

var lineGroup = {};


function start_app() {

    init();
    animate();
}

//function soundInit(){
//    var sound1 = document.getElementById('bi');
//    var sound2 = document.getElementById('shua');
//    sound1.loop = 'false';
//    sound1.autoplay = 'false';
//    sound1.preload = true;
//}

function init() {
    if (!Detector.webgl) {
        Detector.addGetWebGLMessage();
    }

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 0.0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('earth').appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 4500);
    camera.position.z = 100;

    scene.add(new THREE.AmbientLight(0x777777));

    var light1 = new THREE.DirectionalLight(0xffffff, 0.2);
    light1.position.set(5, 3, 5);
    scene.add(light1);

    var light2 = new THREE.DirectionalLight(0xffffff, 0.2);
    light2.position.set(5, 3, -5);
    scene.add(light2);

    var segments = 64;


    countries = new THREE.Object3D();
    base_globe = new THREE.Object3D();

    base_globe.scale.set(20, 20, 20);
    scene.add(base_globe);
    earth_img = THREE.ImageUtils.loadTexture('assets/earth.png', THREE.UVMapping, function() {
        elevation_img = THREE.ImageUtils.loadTexture('assets/elevation2.png', THREE.UVMapping, function() {
            sea_texture = THREE.ImageUtils.loadTexture('./assets/sea.jpg', THREE.UVMapping, function () {
                sea_texture.wrapS = THREE.RepeatWrapping;
                sea_texture.wrapT = THREE.RepeatWrapping;
                sea_texture.repeat.set(16, 8);
                base_globe.add(new THREE.Mesh(
                    new THREE.SphereGeometry(radius, segments, segments),
                    new THREE.MeshLambertMaterial({
                        map: earth_img,
                        bumpMap: elevation_img,
                        bumpScale: 0.01,
                        specularMap: sea_texture,
                        specular: new THREE.Color('grey'),

                        transparent: false,
                        depthTest: true,
                        depthWrite: true,
                        opacity: 0.95
                    })));
                for (var name in country_data) {
                    geometry = new Tessalator3D(country_data[name], 0);

                    var continents = ["EU", "AN", "AS", "OC", "SA", "AF", "NA"];
                    var color = new THREE.Color(0x00ffff);
                    //color.setHSL(continents.indexOf(country_data[name].data.cont) * (1 / 7), Math.random() * 0.25 + 0.65, Math.random() / 2 + 0.25);
                    var mesh = country_data[name].mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
                        color: color,
                        transparent: true,
                        opacity: 0
                    }));
                    mesh.name = "land";
                    mesh.userData.country = name;


                    countries.add(mesh);
                }

                base_globe.add(countries);

                for(var code in eventSet){
                    lineGroup[code] = createLines(eventSet[code],radius,{
                        r: eventColor[code][0],
                        g: eventColor[code][1],
                        b: eventColor[code][2]
                    })
                    lineGroup[code].name = code;
                    if(code == '03'){
                        lineGroup[code].visible = true;
                    }else{
                        lineGroup[code].visible = false;

                    }
                    base_globe.add(lineGroup[code]);
                }
                play = true;
            });
        })
    })


    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 2.0;
    controls.zoomSpeed = 1.0;
    controls.noZoom = false;
    controls.noPan = true;
    controls.staticMoving = false;
    controls.minDistance = 23.0;
    controls.maxDistance = 70.0;
    controls.dynamicDampingFactor = 0.1;

//    stats = new Stats();
//    stats.domElement.style.position = 'absolute';
//    stats.domElement.style.top = '0px';
//    document.body.appendChild(stats.domElement);

    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
}



function createLines(arr,lineRadius,color){
    color.r = (color.r / 255).toFixed(3);
    color.g = (color.g / 255).toFixed(3);
    color.b = (color.b / 255).toFixed(3);

    var startIndex = 0;
    var endIndex = arr.length;
    var splines = [];
    var lineDistance = [];
    var lineNums = arr.length;

    generateControlPoints( lineRadius );

    return getLines();

    function generateControlPoints(radius) {
        for (var f = startIndex; f < endIndex; ++f) {
            var subArr = arr[f];

            var start_lat = subArr[3];
            var start_lng = tempFuncle(subArr[4]);
            var end_lat = subArr[6];
            var end_lng = tempFuncle(subArr[7]);

            var max_height = Math.random() * 0.1;

            var points = [];
            var spline_control_points = 8;
            for (var i = 0; i < spline_control_points + 1; i++) {
                var arc_angle = i * 180.0 / spline_control_points;
                var arc_radius = radius + (Math.sin(arc_angle * Math.PI / 180.0)) * max_height;

                var latlng = latlngInterPoint(start_lat, start_lng, end_lat, end_lng, i / spline_control_points);

                var pos = xyzFromLatLng(latlng.lat, latlng.lng, arc_radius);

                points.push(new THREE.Vector3(pos.x, pos.y, pos.z));
            }

            var spline = new THREE.SplineCurve3(points);

            splines.push(spline);

            var arc_length = spline.getLength();
            lineDistance.push(arc_length);

            //setFlightTimes(f);
        }

    }
    function getOpacity(nums){
        var opac = 0.2
        if(nums > 9000){
            opac = 0.2;
        }else if(nums < 2000){
            opac =  0.35
        }else{
            opac = 0.3
        }
        return opac;
    }

    function getLines() {

        var num_control_points = 32;

        var geometry = new THREE.BufferGeometry();
        var material = new THREE.LineBasicMaterial({
            color: 0xffffff,
            vertexColors: THREE.VertexColors,
            transparent: true,
            opacity: getOpacity(endIndex),
            depthTest: true,
            depthWrite: false,
            linewidth: lineWidth
        });
        var line_positions = new Float32Array(lineNums * 3 * 2 * num_control_points);
        var colors = new Float32Array(lineNums * 3 * 2 * num_control_points);

        for (var i = startIndex; i < endIndex; ++i) {

            for (var j = 0; j < num_control_points - 1; ++j) {

                var start_pos = splines[i].getPoint(j / (num_control_points - 1));
                var end_pos = splines[i].getPoint((j + 1) / (num_control_points - 1));

                line_positions[(i * num_control_points + j) * 6 + 0] = start_pos.x;
                line_positions[(i * num_control_points + j) * 6 + 1] = start_pos.y;
                line_positions[(i * num_control_points + j) * 6 + 2] = start_pos.z;
                line_positions[(i * num_control_points + j) * 6 + 3] = end_pos.x;
                line_positions[(i * num_control_points + j) * 6 + 4] = end_pos.y;
                line_positions[(i * num_control_points + j) * 6 + 5] = end_pos.z;

                colors[(i * num_control_points + j) * 6 + 0] = color.r;
                colors[(i * num_control_points + j) * 6 + 1] = color.g;
                colors[(i * num_control_points + j) * 6 + 2] = color.b;
                colors[(i * num_control_points + j) * 6 + 3] = color.r;
                colors[(i * num_control_points + j) * 6 + 4] = color.g;
                colors[(i * num_control_points + j) * 6 + 5] = color.b;
            }
        }

        geometry.addAttribute('position', new THREE.BufferAttribute(line_positions, 3));
        geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));

        geometry.computeBoundingSphere();

        return new THREE.Line(geometry, material, THREE.LinePieces);
    }

    function xyzFromLatLng(lat, lng, radius) {
        var phi = (90 - lat) * Math.PI / 180;
        var theta = (360 - lng) * Math.PI / 180;

        return {
            x: radius * Math.sin(phi) * Math.cos(theta),
            y: radius * Math.cos(phi),
            z: radius * Math.sin(phi) * Math.sin(theta)
        };
    }

    function latlngInterPoint(lat1, lng1, lat2, lng2, offset) {
        lat1 = lat1 * Math.PI / 180.0;
        lng1 = lng1 * Math.PI / 180.0;
        lat2 = lat2 * Math.PI / 180.0;
        lng2 = lng2 * Math.PI / 180.0;

        d = 2 * Math.asin(Math.sqrt(Math.pow((Math.sin((lat1 - lat2) / 2)), 2) +
            Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin((lng1 - lng2) / 2), 2)));
        A = Math.sin((1 - offset) * d) / Math.sin(d);
        B = Math.sin(offset * d) / Math.sin(d);
        x = A * Math.cos(lat1) * Math.cos(lng1) + B * Math.cos(lat2) * Math.cos(lng2);
        y = A * Math.cos(lat1) * Math.sin(lng1) + B * Math.cos(lat2) * Math.sin(lng2);
        z = A * Math.sin(lat1) + B * Math.sin(lat2);
        lat = Math.atan2(z, Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))) * 180 / Math.PI;
        lng = Math.atan2(y, x) * 180 / Math.PI;

        return {
            lat: lat,
            lng: lng
        };
    }

    function tempFuncle(lng){
        var _lng;
        if(lng > 90){
            _lng = parseFloat(lng) - 270;
        }else{
            _lng = parseFloat(lng) + 90;
        }
        _lng = _lng.toFixed(3);
        return _lng;
    }
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    if (intersected_object !== 0) {
        intersected_object.material.opacity = 0;
    }

    event.preventDefault();
    var mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    var mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    var vector = new THREE.Vector3(mouseX, mouseY, -1);
    vector.unproject(camera);
    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    var intersects = raycaster.intersectObject(countries, true);
    //console.log(intersects);
    if (intersects.length > 0) {
        //console.log(intersects[0])


        if (intersects[0].point !== null) {
            if (intersects[0].object.name === "land") {
                var cn = intersects[0].object.userData.country;
                console.log(cn)
                document.querySelector('.countryName').innerHTML = intersects[0].object.userData.country

//                        if (overlay_element === 0) {
//                            overlay_element = document.getElementById("overlay");
//                        }
//                        overlay_element.innerHTML = intersects[0].object.userData.country;

//                        intersects[0].object.scale.set(hover_scale, hover_scale, hover_scale);
                intersects[0].object.material.opacity = 0.3;
                intersected_object = intersects[0].object;

            } else {
                overlay_element.innerHTML = "";
            }
        } else {
            overlay_element.innerHTML = "";
        }
    } else {
        overlay_element.innerHTML = "";
    }
}

function animate(time) {
    requestAnimationFrame(animate);
    if(play){
        base_globe.rotation.y += 0.001;
        controls.update();
        renderer.render(scene, camera);
        function panelAnimation(){
            $('.hide').removeClass('hide');
            $('.leftPanel').addClass('slideInLeft');
            $('.rightPanel').addClass('slideInRight');
        }
        if(!showPanel){
            showPanel = true;
            $('.loader').fadeOut();
            setTimeout(panelAnimation,300)
        }
    }
}


