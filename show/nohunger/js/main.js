var playControl = [];
var renderDetect = [];
var firstVisit = [];
for(var i = 0; i < 10; i ++){
    firstVisit[i] = true;
}
var cx, cy;
var test;
var anima = [];
var typeAnima = [];
typeAnima[0] = function(i){
    var selector = '#text' + (i+1) + ' .li1';
    var _selector = '#text' + (i+1) + ' .li2';
    $(selector).textillate({
        in: {
            // set the effect name
            effect: 'fadeInRight',
            // set the delay factor applied to each consecutive character
            delayScale: 1.5,

            // set the delay between each character
            delay: 150,

            // set to true to animate all the characters at the same time
            sync: false,

            // randomize the character sequence
            // (note that shuffle doesn't make sense with sync = true)
            shuffle: true,

            // reverse the character sequence
            // (note that reverse doesn't make sense with sync = true)
            reverse: true

            // callback that executes once the animation has finished

        }
    });
    $(_selector).textillate({
        in: {
            // set the effect name
            effect: 'fadeInRight',
            // set the delay factor applied to each consecutive character
            delayScale: 1.5,

            // set the delay between each character
            delay: 150,

            // set to true to animate all the characters at the same time
            sync: false,

            // randomize the character sequence
            // (note that shuffle doesn't make sense with sync = true)
            shuffle: true,

            // reverse the character sequence
            // (note that reverse doesn't make sense with sync = true)
            reverse: true

            // callback that executes once the animation has finished

        },
        callback: function () {
        }
    });
}
typeAnima[1] = function(i){
    var selector = '#text' + (i+1) + ' .li1';
    var _selector = '#text' + (i+1) + ' .li2';
    $(selector).textillate({
        in: {
            effect: 'fadeInRight',
            delayScale: 1.5,
            delay: 150,
            sync: false,
            shuffle: true,
            reverse: true
        }
    });
    $(_selector).textillate({
        in: {
            effect: 'fadeInRight',
            delayScale: 1.5,
            delay: 150,
            sync: false,
            shuffle: true,
            reverse: true
        },
        callback: function () {


        }
    });
}

for(var i = 0;i < 10; i++){
    playControl[i] = false;
    renderDetect[i] = false;
}

anima[0] = function(){
    $(function(){
        var fps = 60;
        var rotateIndex = 0;
        cx = ~~($('#canvas1').width() / 2.1);
        cy = ~~($('#canvas1').height() / 2.1);
        var circles = [];
        var minRadius = 10;
        var maxRadius = 100;
        var dotRadius = 0;
        var maxValue = 50;
        var rayIndex = 0;
        var hoverIndex = -999;
        var animaIndex = 0;
        var fontSize = 0;
        var hueControl = 125;
        var data =[["阿富汗",26.8],["津巴布韦",33.4],["阿尔巴尼亚",3],["阿尔及利亚",3],["安道​​尔",3],["安哥拉",14.2],["阿根廷",3],["亚美尼亚",5.8],["澳大利亚",3],["奥地利",3],["阿塞拜疆",3],["孟加拉国",16.4],["巴巴多斯",3],["白俄罗斯",3],["比利时",3],["伯利兹",6.2],["贝宁",7.5],["百慕大",3],["玻利维亚（多民族国）",15.9],["波斯尼亚和黑塞哥维那",3],["博茨瓦纳",24.1],["巴西",3],["文莱达鲁萨兰国",3],["保加利亚",3],["布基纳法索",20.7],["佛得角",9.4],["柬埔寨",14.2],["喀麦隆",9.9],["加拿大",3],["中非共和国",47.7],["乍得",34.4],["智利",3],["中国",9.3],["哥伦比亚",8.8],["刚果",30.5],["哥斯达黎加",3],["科特迪瓦",13.3],["克罗地亚",3],["古巴",3],["塞浦路斯",3],["捷克共和国",3],["朝鲜",41.6],["丹麦",3],["吉布提",15.9],["多明尼加共和国",12.3],["厄瓜多尔",10.9],["埃及",3],["萨尔瓦多",12.4],["爱沙尼亚",3],["埃塞俄比亚",32],["法罗群岛",3],["斐济",3],["芬兰",3],["法国",3],["加蓬",3],["冈比亚",5.3],["格鲁吉亚",7.4],["德国",3],["加纳",3],["直布罗陀",3],["希腊",3],["格陵兰",3],["危地马拉",15.6],["几内亚",16.4],["几内亚比绍",20.7],["圭亚那",10.6],["海地",53.4],["教廷",3],["洪都拉斯",12.2],["匈牙利",3],["冰岛",3],["印度",15.2],["印尼",7.6],["伊朗（伊斯兰共和国）",3],["伊拉克",22.8],["爱尔兰",3],["以色列",3],["意大利",3],["牙买加",8.1],["日本",3],["约旦",3],["哈萨克斯坦",3],["肯尼亚",21.2],["基里巴斯",3],["科威特",3],["吉尔吉斯斯坦",6],["老挝人民民主共和国",18.5],["拉脱维亚",3],["黎巴嫩",3],["莱索托",11.2],["利比里亚",31.9],["列支敦士登",3],["立陶宛",3],["卢森堡",3],["马达加斯加",33],["马拉维",20.7],["马来西亚",3],["马尔代夫",5.2],["马里",3],["马耳他",3],["毛里塔尼亚",5.6],["毛里求斯",3],["墨西哥",3],["摩纳哥",3],["蒙古",20.5],["黑山",3],["摩洛哥",3],["莫桑比克",25.3],["缅甸",14.2],["纳米比亚",42.3],["尼泊尔",7.8],["荷兰",3],["新西兰",3],["尼加拉瓜",16.6],["尼日尔",9.5],["尼日利亚",7],["挪威",3],["阿曼",3],["巴基斯坦",22],["巴拿马",9.5],["巴拉圭",10.4],["秘鲁",7.5],["菲律宾",13.5],["波兰",3],["葡萄牙",3],["韩国",3],["摩尔多瓦共和国",3],["罗马尼亚",3],["俄罗斯联邦",3],["卢旺达",31.6],["圣皮埃尔和密克隆",3],["圣文森特和格林纳丁斯",6.2],["萨摩亚",3],["圣马力诺",3],["圣多美和普林西比",6.6],["沙特阿拉伯",3],["塞内加尔",24.6],["塞尔维亚",3],["塞尔维亚和黑山",3],["塞拉利昂",22.3],["斯洛伐克",3],["斯洛文尼亚",3],["所罗门群岛",11.3],["南非",3],["西班牙",3],["斯里兰卡",22],["苏丹（前）",24.3],["苏里南",8],["斯威士兰",26.8],["瑞典",3],["瑞士",3],["塔吉克斯坦",33.2],["泰国",7.4],["马其顿前南斯拉夫马其顿共和国",3],["东帝汶",26.9],["多哥",11.4],["特里尼达和多巴哥",7.4],["突尼斯",3],["土耳其",3],["土库曼斯坦",3],["乌干达",25.5],["乌克兰",3],["阿拉伯联合酋长国",3],["英国",3],["坦桑尼亚",32.1],["美国",3],["乌拉圭",3],["乌兹别克斯坦",3],["瓦努阿图",6.4],["委内瑞拉（玻利瓦尔共和国）",3],["越南",11],["也门",26.1],["赞比亚",47.8]];
        var RayDot = function(settings){
            this.p = settings.p;
            this.index = settings.index;
            this.value = Math.round(settings.value);
            this.angle = settings.angle;
            this.countryName = settings.countryName;
            this.center = settings.center;
            this.setup();
        }
        RayDot.prototype.setup = function(){
            this.dots = [];
            for(var i = 0; i < this.value; i++){
                this.dots.push({
                    pos: this.p.createVector(Math.cos(this.angle) * (minRadius + dotRadius * i * 2)+ this.center.x, Math.sin(this.angle) * (minRadius + dotRadius * i * 2)+ this.center.y),
                    hueValue: i
                })

            }
        }
        RayDot.prototype.update = function(){

            this.draw()
        }
        RayDot.prototype.draw = function(p){
            this.p.fill(this.value * 3 + hueControl , 255, 255, 255);
            for(var i = 0; i < this.value; i++){
                this.p.ellipse(this.dots[i].pos.x, this.dots[i].pos.y, dotRadius, dotRadius);
            }
        }
        RayDot.prototype.drawSelect = function(p){
            var selectRadius = dotRadius * 2;
            this.p.fill(this.value * 3 + hueControl , 255, 255, 255);
            for(var i = 0; i < this.value; i++){
                this.p.ellipse(this.dots[i].pos.x, this.dots[i].pos.y, selectRadius, selectRadius);
            }
        }
        RayDot.prototype.drawAnimation = function(p){
            this.p.fill(this.value * 3 + hueControl , 255, 255, 255);
            this.p.ellipse(this.dots[i].pos.x , this.dots[i].pos.y, dotRadius, dotRadius);

        }
        RayDot.prototype.pop = function(p){
            this.p.fill(this.value * 3 + hueControl , 255, 255, 255);
            for(var i = 0; i < this.value + 5; i++){
                var _pos = this.p.createVector(Math.cos(this.angle) * (minRadius + dotRadius * (i-5) * 2)+ this.center.x, Math.sin(this.angle) * (minRadius + dotRadius * (i-5) * 2)+ this.center.y);
                this.p.ellipse(_pos.x, _pos.y, dotRadius , dotRadius );
            }
            p.textSize(fontSize);
            p.fill(circles[hoverIndex].value * 3 + hueControl , 255, 255, 255);
            p.textAlign(p.CENTER);
            p.text(circles[hoverIndex].countryName,cx,cy);
            if(circles[hoverIndex].value == 3){
                p.text('\<'+ ' 5' + '%',cx,cy + fontSize * 1.3);
            }else{
                p.text(circles[hoverIndex].value + '%',cx,cy + fontSize * 1.3);
            }
        }
        var matchMouse = function(p){
            for(var i = 0; i < circles.length; i++){
                for(var j = 0; j < circles[i].value; j++){
                    var d = p.dist(circles[i].dots[j].pos.x,circles[i].dots[j].pos.y, p.mouseX, p.mouseY)
                    if(d <= dotRadius){
                        hoverIndex = circles[i].index;
                        return true;
                    }
                }
            }
        }
        var  canvas1 = function(p){
            p.setup = function(){
                p.frameRate(fps);
                p.colorMode(p.HSB);
                p.noStroke()
                //cx = document.getElementById('slide1').innerWidth / 2;
                //cy = document.getElementById('slide1').innerHeight / 2;

                console.log(cx);
                minRadius = Math.round(p.min(cx,cy) / 4);
                fontSize = Math.round(minRadius / 6);
                maxRadius = Math.round(p.min(cx,cy));
                dotRadius = ~~((maxRadius - minRadius) / maxValue / 2);
                p.createCanvas(2 * cx, 2 * cy);
                p.background(0);
                var theta = Math.PI * 2 / data.length;
                for(var i = 0; i < data.length; i++){
                    circles.push(new RayDot({
                        p: p,
                        index: i,
                        value: parseInt(data[i][1]),
                        countryName: data[i][0],
                        center: p.createVector(cx,cy),
                        angle: theta * i
                    }));
                }
            }
            p.draw = function(){
                if(playControl[0]){
                    p.background(255);

                    if(rayIndex < circles.length){
                        for(var i = 0; i < rayIndex; i ++){
                            circles[i].update();
                        }
                        p.textSize(fontSize);
                        p.fill(circles[rayIndex].value * 3 + hueControl , 255, 255, 255);
                        p.textAlign(p.CENTER);
                        p.text(circles[rayIndex].countryName,cx,cy);
                        if(circles[rayIndex].value == 3){
                            p.text('\<'+ ' 5' + '%',cx,cy + fontSize * 1.3);
                        }else{
                            p.text(circles[rayIndex].value + '%',cx,cy + fontSize * 1.3);
                        }
                        rayIndex += 2;
                    }else{
                        p.textSize(fontSize);
                        p.fill(0);
                        p.textAlign(p.CENTER);
                        p.text('全球营养不良患病率（2014-2016）',cx,2 * cy - fontSize);
                        if(!matchMouse(p)){
                            animaIndex ++;
                            hoverIndex = ~~(animaIndex / 10);
                            if(hoverIndex == circles.length){
                                hoverIndex = 0;
                                animaIndex = 0;
                            }
                        }else{
                            animaIndex = hoverIndex * 10;
                        }
                        for(var i = 0; i < circles.length; i ++){
                            if(hoverIndex == i){
                                circles[i].pop(p);
                            }else{
                                circles[i].draw(p);
                            }
                        }
                    }
                }
            }
        }

        var c1 = new p5(canvas1,'canvas1');
    })
};

anima[1] = function(){
    $(function(){
        var camera, scene, renderer, controls, stats;
        var flight_path_splines = [];
        var flight_point_cloud_geom;
        var positions, sizes;
        var flight_path_lines;
        var flight_point_start_time = [];
        var flight_point_end_time = [];
        var flight_distance = [];
        var start_flight_idx = 0;
        var end_flight_idx = flights.length;
        var flight_point_speed_changed = false;
        var flight_point_speed_scaling = 5.0;
        var flight_point_speed_min_scaling = 1.0;
        var flight_point_speed_max_scaling = 25.0;
        var flight_track_opacity = 0.09;
        var flight_point_size = 0.015;
        var earth_img = 0;
        var elevation_img = 0;
        var water_img = 0;
        function start_app(){
            init();
            animate();
        }

        function init(){
            if (!Detector.webgl) {
                Detector.addGetWebGLMessage();
            }

            renderer = new THREE.WebGLRenderer();
            renderer.setClearColor(0xffffff, 1.0);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(cx * 2, cy * 2);
            console.log(cx);
            document.getElementById('canvas2').appendChild(renderer.domElement);

            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera(45, cx / cy, 0.01, 100);
            camera.position.z = 1.5;

            scene.add(new THREE.AmbientLight(0x65c2f1));

            var radius = 0.5;
            var segments = 64;
            $('#showEarth').click(function(){
                if(earth.visible){
                    earth.visible = false;
                    $(this).html('显示地球');
                    console.log('显示')
                }else{
                    earth.visible = true;
                    $(this).html('隐藏地球');

                }

            })
            var earth;


            earth_img = THREE.ImageUtils.loadTexture('./assets/worldmap6.jpg', THREE.UVMapping, function() {
                generateControlPoints(radius);
                flight_path_lines = flightPathLines();
                scene.add(flight_path_lines);
                scene.add(flightPointCloud());
                earth = new THREE.Mesh(
                    new THREE.SphereGeometry(radius, segments, segments),
                    new THREE.MeshPhongMaterial({
                        map: earth_img
                    })
                )
                earth.visible = false;
                scene.add(earth);

            })


            controls = new THREE.TrackballControls(camera, renderer.domElement);
            controls.rotateSpeed = 1.5;
            controls.noZoom = false;
            controls.noPan = true;
            controls.staticMoving = false;
            controls.minDistance = 0.75;
            controls.maxDistance = 3.0;
            window.addEventListener('resize', onWindowResize, false);
        }

        function generateControlPoints(radius) {
            for (var f = start_flight_idx; f < end_flight_idx; ++f) {

                var start_lat = flights[f][0];
                var start_lng = flights[f][1];
                var end_lat = flights[f][2];
                var end_lng = flights[f][3];

                var max_height = Math.random() * 0.04;

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

                flight_path_splines.push(spline);

                var arc_length = spline.getLength();
                flight_distance.push(arc_length);

                setFlightTimes(f);
            }
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

        function flightPointCloud() {
            flight_point_cloud_geom = new THREE.BufferGeometry();

            num_points = flights.length;

            positions = new Float32Array(num_points * 3);
            var colors = new Float32Array(num_points * 3);
            sizes = new Float32Array(num_points);

            for (var i = 0; i < num_points; i++) {
                positions[3 * i + 0] = 0;
                positions[3 * i + 1] = 0;
                positions[3 * i + 2] = 0;

                colors[3 * i + 0] = Math.random();
                colors[3 * i + 1] = Math.random();
                colors[3 * i + 2] = Math.random();

                sizes[i] = 0.03;
            }

            flight_point_cloud_geom.addAttribute('position', new THREE.BufferAttribute(positions, 3));
            flight_point_cloud_geom.addAttribute('customColor', new THREE.BufferAttribute(colors, 3));
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

        function flightPathLines() {

            var num_control_points = 32;

            var geometry = new THREE.BufferGeometry();
            var material = new THREE.LineBasicMaterial({
                color: 0xffffff,
                vertexColors: THREE.VertexColors,
                transparent: true,
                opacity: flight_track_opacity,
                depthTest: true,
                depthWrite: false,
                linewidth: 0.001
            });
            var line_positions = new Float32Array(flights.length * 3 * 2 * num_control_points);
            var colors = new Float32Array(flights.length * 3 * 2 * num_control_points);

            for (var i = start_flight_idx; i < end_flight_idx; ++i) {

                for (var j = 0; j < num_control_points - 1; ++j) {

                    var start_pos = flight_path_splines[i].getPoint(j / (num_control_points - 1));
                    var end_pos = flight_path_splines[i].getPoint((j + 1) / (num_control_points - 1));

                    line_positions[(i * num_control_points + j) * 6 + 0] = start_pos.x;
                    line_positions[(i * num_control_points + j) * 6 + 1] = start_pos.y;
                    line_positions[(i * num_control_points + j) * 6 + 2] = start_pos.z;
                    line_positions[(i * num_control_points + j) * 6 + 3] = end_pos.x;
                    line_positions[(i * num_control_points + j) * 6 + 4] = end_pos.y;
                    line_positions[(i * num_control_points + j) * 6 + 5] = end_pos.z;

                    colors[(i * num_control_points + j) * 6 + 0] = 0.8;
                    colors[(i * num_control_points + j) * 6 + 1] = 0.4;
                    colors[(i * num_control_points + j) * 6 + 2] = 0.7;
                    colors[(i * num_control_points + j) * 6 + 3] = 0.8;
                    colors[(i * num_control_points + j) * 6 + 4] = 0.4;
                    colors[(i * num_control_points + j) * 6 + 5] = 0.7;
                }
            }

            geometry.addAttribute('position', new THREE.BufferAttribute(line_positions, 3));
            geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));

            geometry.computeBoundingSphere();

            return new THREE.Line(geometry, material, THREE.LinePieces);
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function easeOutQuadratic(t, b, c, d) {
            if ((t /= d / 2) < 1)
                return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        }

        function setFlightTimes(index) {
            var scaling_factor = (flight_point_speed_scaling - flight_point_speed_min_scaling) /
                (flight_point_speed_max_scaling - flight_point_speed_min_scaling);
            var duration = (1-scaling_factor) * flight_distance[index] * 80000;

            var start_time = Date.now() + Math.random() * 3000
            flight_point_start_time[index] = start_time;
            flight_point_end_time[index] = start_time + duration;
        }

        function update_flights() {
            flight_point_cloud_geom.attributes.position.needsUpdate = true;

            for (var i = start_flight_idx; i < end_flight_idx; ++i) {

                if ( Date.now() > flight_point_start_time[i] ) {
                    var ease_val = easeOutQuadratic(Date.now() - flight_point_start_time[i], 0, 1, flight_point_end_time[i] - flight_point_start_time[i]);

                    if (ease_val < 0 || flight_point_speed_changed) {
                        ease_val = 0;
                        setFlightTimes(i);
                    }

                    var pos = flight_path_splines[i].getPoint(ease_val);
                    positions[3 * i + 0] = pos.x;
                    positions[3 * i + 1] = pos.y;
                    positions[3 * i + 2] = pos.z;
                }
            }
        }


        function animate(time) {
            requestAnimationFrame(animate);

            if(playControl[1] || !renderDetect[1]){
                controls.update();
                update_flights();
                renderer.render(scene, camera);
                renderDetect[1] = true;
            }

        }
        start_app();
    })
}

anima[2] = function(){
    console.log('animation 3 begins!!!');
    $(function(){
        console.log(cx);
        console.log(123);
        var scene, camera, renderer, controls, threejs;
        var iw = 10.24;
        var ih = 5.12;
        var ddd = 10;
        var modify = 1.00001;
        var rate = iw * modify / 360;
        var WIDTH = 2 * cx,
            HEIGHT = 2 * cy;
        var flight_path_curve = [];
        var flight_point_cloud_geom;
        var flight_point_speed_scaling = 20.0;
        var flight_point_speed_min_scaling = 1.0;
        var flight_point_speed_max_scaling = 25.0;
        var flight_point_start_time = [];
        var flight_point_end_time = [];
        var flight_distance = [];
        var mesh, color;
        var colorControls = [];
        var lineColor = [0,255,255];
        var lineColor1 = ((lineColor[0] / 255) + '').substr(0.6);
        var lineColor2 = ((lineColor[1] / 255) + '').substr(0.6);
        var lineColor3 = ((lineColor[2] / 255) + '').substr(0.6);
        var _lineColor = [255,20,100];
        var _lineColor1 = ((_lineColor[0] / 255) + '').substr(0.6);
        var _lineColor2 = ((_lineColor[1] / 255) + '').substr(0.6);
        var _lineColor3 = ((_lineColor[2] / 255) + '').substr(0.6);
        init();
        animate();
        function init() {
            threejs = document.getElementById('canvas3');
            scene = new THREE.Scene();
            renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
            renderer.setSize(WIDTH,HEIGHT);
            renderer.setClearColor(0xffffff, 0);
            //renderer.shadowMapEnabled = true;
            //renderer.shadowMapSoft = true;
            threejs.appendChild(renderer.domElement);

            camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.001 , 10000);
            camera.position.set(iw / 2, ih / 0.3, 0);
            //camera.applyEuler(a);
            camera.up = new THREE.Vector3(0,0,1);
            scene.add(camera);
            var planeGeometry = new THREE.PlaneGeometry( iw, ih);
            var planeMaterial = new THREE.MeshBasicMaterial( {
                transparent:true,
                opacity:0.8,
                map : THREE.ImageUtils.loadTexture('./assets/world_map.png'),
                color: 0xffffff,
                side: THREE.DoubleSide} );
            var plane1 = new THREE.Mesh( planeGeometry, planeMaterial );
            plane1.position.set(iw / 2,ih / 2, -ddd/2);
            var plane2 = new THREE.Mesh( planeGeometry, planeMaterial );
            plane2.position.set(iw / 2,ih / 2, ddd/2)

            scene.add( plane1 );
            scene.add( plane2 );

            var geo2xyz = function(){
                for(var i = 0; i < chinaTrade.length; i++){
                    for(var j = 0;j < 4; j++){}
                    if(j == 0 || j == 2){
                        chinaTrade[i][j] = parseFloat(chinaTrade[i][j]) * rate + ih/2;
                    }else if(j == 1 || j == 3){
                        chinaTrade[i][j] = parseFloat(chinaTrade[i][j]) * rate + iw/2;
                    }
                }
            }



            var pathsGeometry = new THREE.BufferGeometry();
            var numControlPoints = 50;
            var line_positions = new Float32Array(chinaTrade.length * 3 * 2 * numControlPoints);
            var colors = new Float32Array(chinaTrade.length * 3 * 2 * numControlPoints);
            var lineIndex = 0;



            var getPaths = function(){
                for(var i = 0; i < chinaTrade.length; i++){
                    var chinaRole = true;
                    var data = chinaTrade[i];

                    var v0 =  new THREE.Vector3( parseFloat(data[1]) * rate + iw/2, parseFloat(data[0]) * rate + ih/2, -ddd / 2 );
                    var v1 = new THREE.Vector3( parseFloat(data[3]) * rate + iw/2, parseFloat(data[2]) * rate + ih/2, ddd / 2 );
                    var v2 = new THREE.Vector3(0,0,0);
                    var v3 = new THREE.Vector3(0,0,0);
                    var v4 = new THREE.Vector3(0,0,0);
                    v2.lerpVectors(v0,v1,0.3);
                    v3.lerpVectors(v0,v1,0.2);
                    v4.lerpVectors(v0,v1,0.8);
                    var curve;

                    if(v3.z > 0){
                        v3.z = ddd * 0.05;
                        v4.z = -v3.z;
                        //console.log('omg')
                        curve = new THREE.SplineCurve3( [
                            v0,v2,v4,v1
                        ] );
                    }else{
                        v3.z = -ddd * 0.45;
                        v4.z = -v3.z;
                        curve = new THREE.SplineCurve3( [
                            v0,v3,v2,v1
                        ] );
                    }



                    var curve_length = curve.getLength();
                    flight_distance.push(curve_length);
                    flight_path_curve.push(curve);
                    var controlPoints = curve.getPoints( numControlPoints );
                    if(data[0] == 35 && data[1] == 105 ){
                        colorControls[i] = 1;
                        for(var j = 0; j < numControlPoints; j ++){
                            line_positions[j * 6 + 0 + lineIndex] = controlPoints[j].x;
                            line_positions[j * 6 + 1 + lineIndex] = controlPoints[j].y;
                            line_positions[j * 6 + 2 + lineIndex] = controlPoints[j].z;
                            line_positions[j * 6 + 3 + lineIndex] = controlPoints[j + 1].x;
                            line_positions[j * 6 + 4 + lineIndex] = controlPoints[j + 1].y;
                            line_positions[j * 6 + 5 + lineIndex] = controlPoints[j + 1].z;
                            colors[j * 6 + 0 + lineIndex] = _lineColor1;
                            colors[j * 6 + 1 + lineIndex] = _lineColor2;
                            colors[j * 6 + 2 + lineIndex] = _lineColor3;
                            colors[j * 6 + 3 + lineIndex] = _lineColor1;
                            colors[j * 6 + 4 + lineIndex] = _lineColor2;
                            colors[j * 6 + 5 + lineIndex] = _lineColor3;
                        }
                    }else{
                        colorControls[i] = 0;
                        for(var j = 0; j < numControlPoints; j ++){
                            line_positions[j * 6 + 0 + lineIndex] = controlPoints[j].x;
                            line_positions[j * 6 + 1 + lineIndex] = controlPoints[j].y;
                            line_positions[j * 6 + 2 + lineIndex] = controlPoints[j].z;
                            line_positions[j * 6 + 3 + lineIndex] = controlPoints[j + 1].x;
                            line_positions[j * 6 + 4 + lineIndex] = controlPoints[j + 1].y;
                            line_positions[j * 6 + 5 + lineIndex] = controlPoints[j + 1].z;
                            colors[j * 6 + 0 + lineIndex] = lineColor1;
                            colors[j * 6 + 1 + lineIndex] = lineColor2;
                            colors[j * 6 + 2 + lineIndex] = lineColor3;
                            colors[j * 6 + 3 + lineIndex] = lineColor1;
                            colors[j * 6 + 4 + lineIndex] = lineColor2;
                            colors[j * 6 + 5 + lineIndex] = lineColor3;
                        }
                    }

                    lineIndex += numControlPoints * 2 * 3;
                }
            }

            var pathsMaterial = new THREE.LineBasicMaterial( {
                color: 0xffffff,
                vertexColors: THREE.VertexColors,
                transparent: true,
                opacity: 0.1,
                depthTest: true,
                depthWrite: false,
                linewidth: 0.1
            } );

            getPaths();
            pathsGeometry.addAttribute('position', new THREE.BufferAttribute(line_positions, 3));
            pathsGeometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
            pathsGeometry.computeBoundingSphere();
            var paths = new THREE.Line(pathsGeometry, pathsMaterial,THREE.LinePieces);
            scene.add(paths);
            //console.log(paths.length)
            function flightPointCloud() {
                flight_point_cloud_geom = new THREE.BufferGeometry();
                num_points = chinaTrade.length;
                positions = new Float32Array(num_points * 3);
                var point_colors = new Float32Array(num_points * 3);
                sizes = new Float32Array(num_points);

                for (var i = 0; i < num_points; i++) {
                    positions[3 * i + 0] = 0;
                    positions[3 * i + 1] = 0;
                    positions[3 * i + 2] = 0;
                    if(colorControls[i] == 1){
                        point_colors[3 * i + 0] = _lineColor1;
                        point_colors[3 * i + 1] = _lineColor2;
                        point_colors[3 * i + 2] = _lineColor3;
                    }else{
                        point_colors[3 * i + 0] = lineColor1;
                        point_colors[3 * i + 1] = lineColor2;
                        point_colors[3 * i + 2] = lineColor3;
                    }



                    sizes[i] = 0.3;
                }

                flight_point_cloud_geom.addAttribute('position', new THREE.BufferAttribute(positions, 3));
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
            var duration = (1-scaling_factor) * flight_distance[index] * 5000;

            var start_time = Date.now() + Math.random() * 5000
            flight_point_start_time[index] = start_time;
            flight_point_end_time[index] = start_time + duration;
        }
        for(var i = 0; i < chinaTrade.length; i ++){
            setFlightTimes(i);
        }

        function update_flights() {
            flight_point_cloud_geom.attributes.position.needsUpdate = true;

            for (var i = 0; i < chinaTrade.length; i ++) {

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
            if(playControl[2] || !renderDetect[2] ){
                console.log('once');
                controls.update();
                update_flights();
                renderer.render(scene, camera);
                renderDetect[2] = true;
            }

        }
    })
}

anima[3] = function(){

    $(function(){
        var chu = 20000;
        var yzi = 30;
        var line = [];
        var w = cx * 2;
        var h = cy * 2;

        var hovered = false;
        var currentFood = {
            "name": "",
            "left": -100,
            "top": -100,
            "pct": 0
        };
        var colors = [
            [108, 122, 137],
            [108, 122, 137],
            [108, 122, 137],
            [108, 122, 137],
            [108, 122, 137],
            [108, 122, 137],
            [210, 77, 87],
            [210, 77, 87],
            [210, 77, 87],
            [210, 77, 87],
            [247, 202, 24]
        ];
        var opac = 150;
        var term = "";
        var years = ["2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005", "2004", "2003", "2002", "2001", "2000", "1999", "1998", "1997", "1996", "1995", "1994", "1993", "1992"];
        years.reverse();
        var yearsLength = years.length;
        Object.size = function(obj) {
            var size = 0,
                key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        };
        var dataLength = Object.size(imData);
        var clickX = -100;
        var clickY = -100;
        var hoverCity = {
            name: "",
            left: 0,
            top: 0,
            run: function() {
                if (hovered) {
                    line[0].hover(this.name, this.left, this.top);
                }
            }
        }

//    w = $(".chartContainer").width();
//    h = $(".chartContainer").height();
//    setInterval(function() {
//        w = jQuery(".chartContainer").width();
//        h = jQuery(".chartContainer").height();
//    }, 20);

        var canvas4 = function(p){
            p.preload = function(){
                w = 2 * cx;
                h = 2 * cy;
            }
            p.setup = function(){
                p.createCanvas(w, h);
                for (var i = 0; i < dataLength; i++) {
                    line[i] = new Line(imData[i], i, imData[i].name,p);
                }
                p.frameRate(20);
            }
            p.draw = function(){
                //background([40, 40, 40]);
                if(playControl[3]){
                    p.background(255);
                    p.noStroke();
                    hovered = false;
                    for (var i = 0; i < imData.length; i++) {
                        line[i].run(0);
                    }
                    labels(p);
                    yearLabel(p);
                    p.textSize(14);
                    p.textStyle(p.BOLD);
                    if (hovered) {
                        p.text(currentFood.name + " (" + Math.round(currentFood.pct*100)/100  + "吨)", currentFood.left - 10, currentFood.top - 10);
                    }
                }
            }
        }


        function labels(p) {
            var jumper = 1;
            if (w < 650) {
                jumper = 3;
            }
            p.textFont("Lato");
            p.textSize(13);
            p.fill(0);
            for (var i = 0; i < yearsLength; i += jumper) {
                var left = (i + 1) / (yearsLength + 1) * (w - 100) + 50;
                p.text(years[i].split("/")[0].slice(-2), left - 8, h - 25);
            }
            //p.text("Fiscal Year",w/2,h-9);
            for (var i = 0; i < 40; i += 5) {
                var top = (h - 40) - (i / 40 * h);
                p.stroke(0, 40);
                p.strokeWeight(1);
                p.line(0, top, w, top);
                p.text((i * yzi) + 'W' , 10, top);
            }

        }

        function yearLabel(p) {
            p.fill(0);
            p.textSize(20);
            p.textStyle(p.NORMAL)
            p.textAlign(p.CENTER);
            p.text("农牧产品进口量级（1992-2012）", w / 2, 40);
        }



        function Line(d, num, t,_p) {

            this.p = _p;
            //d是单个数据对象
            this.d = d;
            //数据索引
            this.n = num;
            //名称
            this.name = t;
            this.lefter = 0;
            this.topper = 0;
            this.sizer = 0;
            this.backout = -Math.random() * 1000 - 100;
            this.opac = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.speed = Math.random() * 0.4 + 0.2;
            this.lefter = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.topper = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }


        Line.prototype.run = function(op) {
            for (var i = 0; i < yearsLength; i++) {
                this.makeCircle(years[i], i);
            }
        }
        $('#slide4 .bottomBtn').click(function(){
            if(chu == 20000){
                $(this).html('只看局部');
                chu = 120000;
                yzi = 180;
            }else{
                $(this).html('显示全部');
                chu = 20000;
                yzi = 30;
            }
        })

        Line.prototype.makeCircle = function(y, num) {
            var opac = this.opac;
            //获取单节点单年份数据
            var d = this.d[y];
            //num是年份索引
            var left = (num + 1) / (yearsLength + 1) * (w - 100) + 50;
            var top = (h - 40) - (d / chu );

            var size = w / 80;

            var opac = 100;

            this.opac[num]  = this.p.lerp(this.opac[num] * 1.3, opac, this.speed);
            var fillcol = [
                [210, 215, 211, this.opac[num] * 1.3],
                [210, 215, 211, this.opac[num] * 1.3],
                [210, 215, 211, this.opac[num] * 1.3],
                [189, 195, 199, this.opac[num] * 1.3],
                [189, 195, 199, this.opac[num] * 1.3],
                [189, 195, 199, this.opac[num] * 1.3],
                [245, 215, 110, this.opac[num] * 1.3],
                [245, 215, 110, this.opac[num] * 1.3],
                [245, 215, 110, this.opac[num] * 1.3],
                [247, 202, 24, this.opac[num] * 1.3],
                [247, 202, 24, this.opac[num] * 1.3],
                [247, 202, 24, this.opac[num] * 1.3],
                [244, 179, 80, this.opac[num] * 1.3],
                [244, 179, 80, this.opac[num] * 1.3],
                [244, 179, 80, this.opac[num] * 1.3],
                [232, 126, 4, this.opac[num] * 1.3],
                [232, 126, 4, this.opac[num] * 1.3],
                [232, 126, 4, this.opac[num] * 1.3],
                [239, 72, 54, this.opac[num] * 1.3],
                [239, 72, 54, this.opac[num] * 1.3],
                [239, 72, 54, this.opac[num] * 1.3],
                [242, 38, 19, this.opac[num] * 1.3],
                [242, 38, 19, this.opac[num] * 1.3],
                [242, 38, 19, this.opac[num] * 1.3],
                [242, 38, 19, this.opac[num] * 1.3],
                [242, 38, 19, this.opac[num] * 1.3],
                [242, 38, 19, this.opac[num] * 1.3],
                [242, 38, 19, this.opac[num] * 1.3],
                [242, 38, 19, this.opac[num] * 1.3],
                [242, 38, 19, this.opac[num] * 1.3],
                [242, 38, 19, this.opac[num] * 1.3],
                [242, 38, 19, this.opac[num] * 1.3],
                [242, 38, 19, this.opac[num] * 1.3],
                [242, 38, 19, this.opac[num] * 1.3],
                [242, 38, 19, this.opac[num] * 1.3],
                [242, 38, 19, this.opac[num] * 1.3],
                [242, 38, 19, this.opac[num] * 1.3],
                [255, 38, 19, this.opac[num] * 1.3],
                [255, 38, 19, this.opac[num] * 1.3],
                [255, 38, 19, this.opac[num] * 1.3],
                [255, 38, 19, this.opac[num] * 1.3],
                [255, 38, 19, this.opac[num] * 1.3],
                [255, 38, 19, this.opac[num] * 1.3],
                [255, 38, 19, this.opac[num] * 1.3]
            ];

            this.lefter[num] = this.p.lerp(this.lefter[num], left, this.speed);
            this.topper[num] = this.p.lerp(this.topper[num], top, this.speed);
            var colorIndex = Math.floor(d / 200000);
            if(colorIndex > fillcol.length - 1){
                colorIndex = fillcol.length - 1;
            }
            if (this.p.dist(this.lefter[num], this.topper[num], this.p.mouseX, this.p.mouseY) < size && !hovered ) {
                currentFood.name = this.name;
                currentFood.left = left;
                currentFood.top = top;
                currentFood.pct = d;
                hovered = true;
                console.log(d);

                fillcol[colorIndex][3] = 220;
            }
            c4.fill(fillcol[colorIndex]);

            c4.ellipse(this.lefter[num], this.topper[num], size, size);
        }

        function getRadius(d) {

            return Math.sqrt(d) / Math.PI * w / 100;

        }
        var c4 = new p5(canvas4,'canvas4');
    })

}
anima[4] = function(){
    $(function(){
        console.log('animation begining');
//        $('line.five-year-mean svg path').css({'-moz-animation-name':'drawstroke','-webkit-animation-name':'drawstroke','animation-name':'drawstroke'});
//        $('line.annual-mean svg path').css({'-moz-animation-name':'drawstroke','-webkit-animation-name':'drawstroke','animation-name':'drawstroke'});
    })
}
anima[5] = function(){
    $(function(){
        var ttt = '耕地面积'
        var chu = 1200;
        var yzi = 30;
        var line = [];
        var w = cx * 2;
        var h =  cy * 2;
        var dataIndex = 0;
        var colorControl = 9000;

        var hovered = false;
        var currentFood = {
            "name": "",
            "left": -100,
            "top": -100,
            "pct": 0
        };
        var colors = [
            [108, 122, 137],
            [108, 122, 137],
            [108, 122, 137],
            [108, 122, 137],
            [108, 122, 137],
            [108, 122, 137],
            [210, 77, 87],
            [210, 77, 87],
            [210, 77, 87],
            [210, 77, 87],
            [247, 202, 24]
        ];
        var opac = 150;
        var term = "";
        var danwei = 'Fm';
        var years = ["2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005", "2004", "2003", "2002", "2001", "2000", "1999", "1998", "1997", "1996", "1995", "1994", "1993", "1992"];
        years.reverse();
        var yearsLength = years.length;
        Object.size = function(obj) {
            var size = 0,
                key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        };
        var dataLength = Object.size(landData);
        var clickX = -100;
        var clickY = -100;
        var hoverCity = {
            name: "",
            left: 0,
            top: 0,
            run: function() {
                if (hovered) {
                    line[0].hover(this.name, this.left, this.top);
                }
            }
        }


        var canvas6 = function(p){

            p.setup = function(){
                p.createCanvas(w, h);
                for (var i = 0; i < dataLength; i++) {
                    line[i] = new Line(landData[i], i,p);
                }
                p.frameRate(20);
            }
            p.draw = function(){
                //background([40, 40, 40]);
                if(playControl[5]){
                    p.background(255);
                    p.noStroke();
                    hovered = false;
                    for (var i = 0; i < landData.length; i++) {
                        line[i].run(0);
                    }
                    labels(p);
                    yearLabel(p);
                    p.textSize(14);
                    p.textStyle(p.BOLD);
                    if (hovered) {
                        p.text(currentFood.name + " (" + Math.round(currentFood.pct*100)/100 + danwei + ")", currentFood.left - 10, currentFood.top - 10);
                    }
                }
            }
        }


        function labels(p) {
            var jumper = 1;
            if (w < 650) {
                jumper = 3;
            }
            p.textFont("Lato");
            p.textSize(13);
            p.fill(0);
            for (var i = 0; i < yearsLength; i += jumper) {
                var left = (i + 1) / (yearsLength + 1) * (w - 100) + 50;
                p.text(years[i].split("/")[0].slice(-2), left - 8, h - 25);
            }
            //p.text("Fiscal Year",w/2,h-9);
            for (var i = 0; i < 40; i += 5) {
                var top = (h - 40) - (i / 40 * h);
                p.stroke(0, 40);
                p.strokeWeight(1);
                p.line(0, top, w, top);
                var tc = i / 40 * h * chu;
                tc += '';
                var tca = tc.split('.');
                if(tca[1]){
                    p.text(tca[0] + '.' + tca[1].substr(0,2)  , 10, top);
                }else{
                    p.text(tca[0]  , 10, top);
                }
            }

        }

        function yearLabel(p) {
            p.fill(0);
            p.textSize(20);
            p.textStyle(p.NORMAL)
            p.textAlign(p.CENTER);
            p.text(ttt + "（1992-2012）", w / 2, 40);
        }



        function Line(d,num,_p) {

            this.p = _p;
            //d是单个数据对象
            this.d = d;
            //数据索引
            this.n = num;
            this.da = d.data;
            //名称
            this.name = d.name;
            this.lefter = 0;
            this.topper = 0;
            this.sizer = 0;
            this.backout = -Math.random() * 1000 - 100;
            this.opac = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.speed = Math.random() * 0.4 + 0.2;
            this.lefter = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.topper = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }


        Line.prototype.run = function(op) {
            for (var i = 0; i < yearsLength; i++) {
                this.makeCircle(years[i], i);
            }
        }


        Line.prototype.makeCircle = function(y, num) {
            var opac = this.opac;
            //获取单节点单年份数据
            if(this.da[num]){
                var d = this.da[num][dataIndex];
                //num是年份索引
                var left = (num + 1) / (yearsLength + 1) * (w - 100) + 50;
                var top = (h - 40) - (d / chu );

                var size = w / 80;

                var opac = 100;

                this.opac[num]  = this.p.lerp(this.opac[num] * 1.3, opac, this.speed);

                var fillcol = [
                    [210, 215, 211, this.opac[num] * 1.3],
                    [210, 215, 211, this.opac[num] * 1.3],
                    [210, 215, 211, this.opac[num] * 1.3],
                    [189, 195, 199, this.opac[num] * 1.3],
                    [189, 195, 199, this.opac[num] * 1.3],
                    [189, 195, 199, this.opac[num] * 1.3],
                    [245, 215, 110, this.opac[num] * 1.3],
                    [245, 215, 110, this.opac[num] * 1.3],
                    [245, 215, 110, this.opac[num] * 1.3],
                    [247, 202, 24, this.opac[num] * 1.3],
                    [247, 202, 24, this.opac[num] * 1.3],
                    [247, 202, 24, this.opac[num] * 1.3],
                    [244, 179, 80, this.opac[num] * 1.3],
                    [244, 179, 80, this.opac[num] * 1.3],
                    [244, 179, 80, this.opac[num] * 1.3],
                    [232, 126, 4, this.opac[num] * 1.3],
                    [232, 126, 4, this.opac[num] * 1.3],
                    [232, 126, 4, this.opac[num] * 1.3],
                    [239, 72, 54, this.opac[num] * 1.3],
                    [239, 72, 54, this.opac[num] * 1.3],
                    [239, 72, 54, this.opac[num] * 1.3],
                    [242, 38, 19, this.opac[num] * 1.3],
                    [242, 38, 19, this.opac[num] * 1.3],
                    [242, 38, 19, this.opac[num] * 1.3],
                    [242, 38, 19, this.opac[num] * 1.3],
                    [242, 38, 19, this.opac[num] * 1.3],
                    [242, 38, 19, this.opac[num] * 1.3],
                    [242, 38, 19, this.opac[num] * 1.3],
                    [242, 38, 19, this.opac[num] * 1.3],
                    [242, 38, 19, this.opac[num] * 1.3],
                    [242, 38, 19, this.opac[num] * 1.3],
                    [242, 38, 19, this.opac[num] * 1.3],
                    [242, 38, 19, this.opac[num] * 1.3],
                    [242, 38, 19, this.opac[num] * 1.3],
                    [242, 38, 19, this.opac[num] * 1.3],
                    [242, 38, 19, this.opac[num] * 1.3],
                    [242, 38, 19, this.opac[num] * 1.3],
                    [255, 38, 19, this.opac[num] * 1.3],
                    [255, 38, 19, this.opac[num] * 1.3],
                    [255, 38, 19, this.opac[num] * 1.3],
                    [255, 38, 19, this.opac[num] * 1.3],
                    [255, 38, 19, this.opac[num] * 1.3],
                    [255, 38, 19, this.opac[num] * 1.3],
                    [255, 38, 19, this.opac[num] * 1.3]
                ];

                this.lefter[num] = this.p.lerp(this.lefter[num], left, this.speed);
                this.topper[num] = this.p.lerp(this.topper[num], top, this.speed);
                var colorIndex = Math.floor(d / colorControl);
                if(colorIndex > fillcol.length - 1){
                    colorIndex = fillcol.length - 1;
                }
                if (this.p.dist(this.lefter[num], this.topper[num], this.p.mouseX, this.p.mouseY) < size && !hovered ) {
                    currentFood.name = this.name;
                    currentFood.left = left;
                    currentFood.top = top;
                    currentFood.pct = d;
                    hovered = true;
                    console.log(d);

                    fillcol[colorIndex][3] = 220;
                }
                c6.fill(fillcol[colorIndex]);

                c6.ellipse(this.lefter[num], this.topper[num], size, size);
            }

        }

        function getRadius(d) {

            return Math.sqrt(d) / Math.PI * w / 100;

        }
        var c6 = new p5(canvas6,'canvas6');
        $('#land').click(function(){
            chu  = 1200;
            colorControl = 9000;
            dataIndex = 0;
            ttt = '耕地面积';
        })
        $('#pop').click(function(){
            chu  = 3000;
            colorControl = 9000;
            dataIndex = 1;
            danwei = '000人';
            ttt = '人口数'
        })
        $('#ave').click(function(){
            chu  = 0.011;
            colorControl = 0.15;
            dataIndex =2;
            danwei = 'Fm/人';
            ttt = '人均耕地'
        })
        $('#zoomIn').click(function(){
            chu = chu + (chu / 10);
        })
        $('#zoomOut').click(function(){
            chu = chu - (chu / 10);
        })
        function zoomc(i){
            if(i == 0){
                $('#zoomIn').click(function(){
                  chu = chu + (chu / 10);
                })
                $('#zoomOut').click(function(){
                    chu = chu - (chu / 10);
                })
            }
        }
    })

}

