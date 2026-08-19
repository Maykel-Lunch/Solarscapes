(function () {
    const container = document.getElementById('scene-container');
    if (!container || !window.THREE) return;
    const loadingOverlay = document.getElementById('loading-overlay');
    const hintBanner = document.getElementById('hint-banner');
    const hoverTip = document.getElementById('hover-tip');
    const infoCard = document.getElementById('info-card');
    const chipsWrap = document.getElementById('planet-chips');
    const PLANETS = [
        { key: 'sun', name: 'The Sun', color: '#ffd966', radius: 26, distance: 0, speed: 0, rotationSpeed: .04, fact: "Our Sun holds 99.8% of the Solar System's mass. It's basically the boss of everyone here.", distanceLabel: '—', periodLabel: '—', dayLabel: '~27 days (rotation)' },
        { key: 'mercury', name: 'Mercury', color: '#b0b0b0', radius: 3, distance: 55, speed: 1.9, rotationSpeed: .01, fact: 'Mercury has no atmosphere to speak of, so it swings from scorching days to freezing nights.', distanceLabel: '.39 AU', periodLabel: '88 days', dayLabel: '59 days' },
        { key: 'venus', name: 'Venus', color: '#e0a96d', radius: 5, distance: 78, speed: 1.5, rotationSpeed: -.006, fact: 'Venus spins backwards and is hotter than Mercury thanks to a runaway greenhouse effect.', distanceLabel: '.72 AU', periodLabel: '225 days', dayLabel: '243 days' },
        { key: 'earth', name: 'Earth', color: '#4ab3ff', radius: 5.2, distance: 104, speed: 1, rotationSpeed: .03, tilt: .41, fact: 'Home sweet home — the only planet we know of that has liquid water and life.', distanceLabel: '1 AU', periodLabel: '365 days', dayLabel: '24 hours' },
        { key: 'mars', name: 'Mars', color: '#c1440e', radius: 4, distance: 130, speed: .8, rotationSpeed: .028, fact: 'The Red Planet gets its color from iron oxide — plain old rust — coating its surface.', distanceLabel: '1.52 AU', periodLabel: '687 days', dayLabel: '24.6 hours' },
        { key: 'jupiter', name: 'Jupiter', color: '#c8926a', radius: 15, distance: 190, speed: .43, rotationSpeed: .06, fact: 'Jupiter is so massive that every other planet combined could fit inside it, with room to spare.', distanceLabel: '5.2 AU', periodLabel: '12 years', dayLabel: '10 hours' },
        { key: 'saturn', name: 'Saturn', color: '#e0c16c', radius: 13, distance: 240, speed: .32, rotationSpeed: .055, tilt: .47, hasRing: true, fact: "Saturn's rings are made of ice and rock — pieces range from grains of sand to house-sized chunks.", distanceLabel: '9.5 AU', periodLabel: '29 years', dayLabel: '10.7 hours' },
        { key: 'uranus', name: 'Uranus', color: '#9fdde0', radius: 9, distance: 285, speed: .23, rotationSpeed: .035, tilt: 1.4, fact: 'Uranus rotates almost completely on its side, likely the result of an ancient collision.', distanceLabel: '19.8 AU', periodLabel: '84 years', dayLabel: '17 hours' },
        { key: 'neptune', name: 'Neptune', color: '#4066cc', radius: 8.6, distance: 325, speed: .18, rotationSpeed: .033, fact: 'Neptune has the fastest winds in the Solar System, gusting over 2,000 km/h.', distanceLabel: '30.1 AU', periodLabel: '165 years', dayLabel: '16 hours' },
        { key: 'pluto', name: 'Pluto', color: '#d8d0c8', radius: 2.2, distance: 360, speed: .14, rotationSpeed: .008, fact: 'Reclassified as a dwarf planet in 2006 — still much loved by fans of the underdog.', distanceLabel: '39.5 AU', periodLabel: '248 years', dayLabel: '6.4 days' }
    ];
    let scene, camera, renderer, controls, raycaster, mouse, sunMesh, sunLight, audioCtx, ambientNodes;
    const planetGroups = {}, clickableMeshes = [];
    let clock = new THREE.Clock(), timeScale = 1, isPlaying = true, focusedKey = null, desiredCamPos = null, soundOn = false;
    let cameraTarget = new THREE.Vector3();

    function glowSprite(color, size) {
        const canvas = document.createElement('canvas'); canvas.width = canvas.height = 256;
        const ctx = canvas.getContext('2d'), gradient = ctx.createRadialGradient(128,128,0,128,128,128);
        gradient.addColorStop(0, color + 'ff'); gradient.addColorStop(.4, color + '55'); gradient.addColorStop(1, color + '00');
        ctx.fillStyle = gradient; ctx.fillRect(0, 0, 256, 256);
        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(canvas), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
        sprite.scale.set(size, size, 1); return sprite;
    }
    function buildSun() {
        const data = PLANETS[0]; sunMesh = new THREE.Mesh(new THREE.SphereGeometry(data.radius,48,48), new THREE.MeshBasicMaterial({ color: data.color }));
        sunMesh.userData.key = 'sun'; scene.add(sunMesh); clickableMeshes.push(sunMesh); sunMesh.add(glowSprite('#ffdd88', data.radius * 6));
        sunLight = new THREE.PointLight(0xfff2cc, 1.6, 2200, 1.4); scene.add(sunLight); planetGroups.sun = { orbitAngle: 0, mesh: sunMesh, group: sunMesh, data: data };
    }
    function buildPlanet(data) {
        const group = new THREE.Group(); group.rotation.y = Math.random() * Math.PI * 2; scene.add(group);
        const points = []; for (let i=0; i<=128; i++) { const angle = i / 128 * Math.PI * 2; points.push(new THREE.Vector3(Math.cos(angle)*data.distance,0,Math.sin(angle)*data.distance)); }
        scene.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: .18 })));
        const pivot = new THREE.Object3D(); pivot.position.set(data.distance,0,0); group.add(pivot);
        const mesh = new THREE.Mesh(new THREE.SphereGeometry(data.radius,32,32), new THREE.MeshStandardMaterial({ color: data.color, roughness: .85, metalness: .05 }));
        mesh.userData.key = data.key; if (data.tilt) mesh.rotation.z = data.tilt; pivot.add(mesh); clickableMeshes.push(mesh);
        if (data.key === 'earth') mesh.add(glowSprite('#7ec8ff', data.radius * 2.6));
        if (data.hasRing) { const ring = new THREE.Mesh(new THREE.RingGeometry(data.radius*1.4,data.radius*2.4,64), new THREE.MeshBasicMaterial({ color:data.color, side:THREE.DoubleSide, transparent:true, opacity:.55 })); ring.rotation.x = Math.PI/2 + .35; mesh.add(ring); }
        planetGroups[data.key] = { orbitAngle: Math.random()*Math.PI*2, mesh: mesh, group: group, data: data };
    }
    function buildStarfield() {
        const positions = new Float32Array(6600), colors = new Float32Array(6600), palette = [[1,1,1],[.75,.85,1],[1,.92,.75]];
        for (let i=0; i<2200; i++) { const radius=900+Math.random()*900, theta=Math.random()*Math.PI*2, phi=Math.acos(Math.random()*2-1), color=palette[Math.floor(Math.random()*3)]; positions[i*3]=radius*Math.sin(phi)*Math.cos(theta); positions[i*3+1]=radius*Math.cos(phi); positions[i*3+2]=radius*Math.sin(phi)*Math.sin(theta); colors[i*3]=color[0]; colors[i*3+1]=color[1]; colors[i*3+2]=color[2]; }
        const geometry = new THREE.BufferGeometry(); geometry.setAttribute('position',new THREE.BufferAttribute(positions,3)); geometry.setAttribute('color',new THREE.BufferAttribute(colors,3)); scene.add(new THREE.Points(geometry,new THREE.PointsMaterial({ size:1.6, vertexColors:true, transparent:true, opacity:.85, depthWrite:false })));
    }
    function buildChips() { PLANETS.forEach(function (planet) { const chip=document.createElement('div'); chip.className='chip glass-panel'; chip.dataset.key=planet.key; const dot=document.createElement('span'); dot.className='dot'; dot.style.backgroundColor=planet.color; chip.append(dot, planet.name); chip.addEventListener('click',function(){selectPlanet(planet.key);}); chipsWrap.appendChild(chip); }); }
    function selectPlanet(key) { const data=planetGroups[key].data; focusedKey=key; ['Name','Fact','Distance','Period','Day'].forEach(function(label){ document.getElementById('info'+label).textContent=data[label.toLowerCase()+'Label'] || data[label.toLowerCase()] || data.name; }); infoCard.classList.add('show'); document.querySelectorAll('.chip').forEach(c=>c.classList.toggle('selected',c.dataset.key===key)); playChime(); }
    function deselectPlanet() { focusedKey=null; infoCard.classList.remove('show'); document.querySelectorAll('.chip').forEach(c=>c.classList.remove('selected')); }
    function onResize() { camera.aspect=container.clientWidth/container.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(container.clientWidth,container.clientHeight); }
    function pointerMove(event) { const rect=renderer.domElement.getBoundingClientRect(); mouse.x=(event.clientX-rect.left)/rect.width*2-1; mouse.y=-(event.clientY-rect.top)/rect.height*2+1; raycaster.setFromCamera(mouse,camera); const hits=raycaster.intersectObjects(clickableMeshes,false); if(hits.length){ hoverTip.textContent=planetGroups[hits[0].object.userData.key].data.name; hoverTip.style.display='block'; hoverTip.style.left=event.clientX-rect.left+'px'; hoverTip.style.top=event.clientY-rect.top+'px'; container.style.cursor='pointer'; } else { hoverTip.style.display='none'; container.style.cursor='grab'; } }
    function pointerDown(event) { const rect=renderer.domElement.getBoundingClientRect(); mouse.x=(event.clientX-rect.left)/rect.width*2-1; mouse.y=-(event.clientY-rect.top)/rect.height*2+1; raycaster.setFromCamera(mouse,camera); const hits=raycaster.intersectObjects(clickableMeshes,false); if(hits.length) selectPlanet(hits[0].object.userData.key); }
    function togglePlay() { isPlaying=!isPlaying; document.getElementById('playPauseBtn').innerHTML=isPlaying?'<i class="fa fa-pause"></i>':'<i class="fa fa-play"></i>'; }
    function resetView() { deselectPlanet(); desiredCamPos=new THREE.Vector3(0,160,420); cameraTarget=new THREE.Vector3(); }
    function ensureAudio() { if(!audioCtx) audioCtx=new (window.AudioContext||window.webkitAudioContext)(); }
    function toggleSound() { ensureAudio(); soundOn=!soundOn; document.getElementById('soundBtn').classList.toggle('active',soundOn); if(!soundOn){ if(ambientNodes) ambientNodes.masterGain.gain.linearRampToValueAtTime(0,audioCtx.currentTime+.8); return; } const gain=audioCtx.createGain(); gain.gain.value=.03; gain.connect(audioCtx.destination); const osc=audioCtx.createOscillator(); osc.frequency.value=82; osc.connect(gain); osc.start(); ambientNodes={ masterGain:gain, osc1:osc }; }
    function playChime() { if(!soundOn||!audioCtx) return; const osc=audioCtx.createOscillator(), gain=audioCtx.createGain(), now=audioCtx.currentTime; gain.gain.setValueAtTime(.08,now); gain.gain.exponentialRampToValueAtTime(.001,now+1.1); osc.frequency.setValueAtTime(660,now); osc.frequency.exponentialRampToValueAtTime(990,now+.3); osc.connect(gain); gain.connect(audioCtx.destination); osc.start(now); osc.stop(now+1.2); }
    function animate() { requestAnimationFrame(animate); const delta=Math.min(clock.getDelta(),.05); if(isPlaying) Object.values(planetGroups).forEach(function(planet){ planet.orbitAngle+=planet.data.speed*delta*.25*timeScale; if(planet.data.key!=='sun') planet.group.rotation.y=planet.orbitAngle; planet.mesh.rotation.y+=planet.data.rotationSpeed*delta*6; }); if(focusedKey){ const planet=planetGroups[focusedKey], target=planet.mesh.getWorldPosition(new THREE.Vector3()), offset=new THREE.Vector3(planet.data.radius*5+22,planet.data.radius*2.4+12,planet.data.radius*5+22); controls.target.lerp(target,.08); camera.position.lerp(target.clone().add(offset),.04); } else if(desiredCamPos){ controls.target.lerp(cameraTarget,.08); camera.position.lerp(desiredCamPos,.05); } controls.update(); renderer.render(scene,camera); }
    function init() { scene=new THREE.Scene(); camera=new THREE.PerspectiveCamera(50,container.clientWidth/container.clientHeight,.1,4000); camera.position.set(0,160,420); renderer=new THREE.WebGLRenderer({antialias:true,alpha:true}); renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)); renderer.setSize(container.clientWidth,container.clientHeight); container.insertBefore(renderer.domElement,container.firstChild); controls=new THREE.OrbitControls(camera,renderer.domElement); controls.enableDamping=true; controls.dampingFactor=.08; controls.minDistance=40; controls.maxDistance=900; raycaster=new THREE.Raycaster(); mouse=new THREE.Vector2(-10,-10); scene.add(new THREE.AmbientLight(0x445577,.35)); buildStarfield(); buildSun(); PLANETS.slice(1).forEach(buildPlanet); buildChips(); window.addEventListener('resize',onResize); renderer.domElement.addEventListener('pointermove',pointerMove); renderer.domElement.addEventListener('pointerdown',pointerDown); document.getElementById('playPauseBtn').addEventListener('click',togglePlay); document.getElementById('soundBtn').addEventListener('click',toggleSound); document.getElementById('resetViewBtn').addEventListener('click',resetView); document.getElementById('closeInfoBtn').addEventListener('click',deselectPlanet); document.getElementById('speedRange').addEventListener('input',function(event){timeScale=parseFloat(event.target.value);document.getElementById('speedLabel').textContent=timeScale.toFixed(1)+'x';}); loadingOverlay.classList.add('is-hidden'); setTimeout(function(){hintBanner.classList.add('hidden');},5000); animate(); }
    if (THREE.OrbitControls) init(); else window.addEventListener('load',init);
}());
