import * as THREE from "three";
import GUI from "./Helpers/GUI";
import { GroupOne } from "./Helpers/colors";
import { gridHelper, randomInteger, axiseHelper } from "./Helpers/helpers";
import { LightProbeGenerator } from "./Helpers/LightProbeGenerator.js";
import { createCamera, createControls, camera } from "./Camera_Controls";
import {createLights, mainLight} from "./Lights";
import { spheres } from "./Meshes";
import {createRenderer, renderer} from "./Renderer";

const OrbitControls = require("three-orbit-controls")(THREE);

//Styles
import "GlobalStyles";

let scene;
let SEPARATION = 1, AMOUNTX = 20, AMOUNTY = 20;
let particles, particle, count = 0;

function init() {
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x000000 );
	createCamera();
	createControls(OrbitControls);
	createLights(scene);
	//createMeshes(scene);
	createRenderer();

	//gamma
	renderer.gammaOutput = true;
	renderer.gammaFactor = 2.2; // approximate sRGB

	//envmap
	var genCubeUrls = function ( prefix, postfix ) {
		return [
			prefix + "px" + postfix, prefix + "nx" + postfix,
			prefix + "py" + postfix, prefix + "ny" + postfix,
			prefix + "pz" + postfix, prefix + "nz" + postfix
		];
	};

	function createMaterial(random = Math.random()) {
		const material = new THREE.MeshPhongMaterial({
			side: THREE.DoubleSide
		});

		const hue = random;
		const saturation = 1;
		const luminance = .5;

		material.color.setHSL(hue, saturation, luminance);

		return material;
	};

	
	//Create the sphere"s material
	const earthContainerWidth = 1;
	//Set up the sphere lets
	let radius = earthContainerWidth/10, segments = 5, rings = 64;

	var geometry = new THREE.SphereBufferGeometry(radius, segments, rings, 0, Math.PI * 2, 0, Math.PI * 2);

	let frame = 0, maxFrame = 200;

	const createTrackerGroup = () => {
		let opacityMesh = [0];

		(function createGroupMaterial(){
			const number = Math.random();

			for (let j = 0; j < 11; j++){
				opacityMesh[j] = new THREE.Mesh(geometry, createMaterial(number));
			};
		})();

		const createGroup = () => {
			const group = new THREE.Group();
			let per = frame / maxFrame;
	
			for ( let i = 0; i < opacityMesh.length; i++ ) {
				let mesh = opacityMesh[i];


				var bias = Math.abs(0.5 - per) / 0.5;

				mesh.position.x =  -1 + 2 * bias - i / 8 / 2;
				mesh.position.y =  1;
				mesh.position.z =  0;
				if (i === opacityMesh.length - 1){
					mesh.material.opacity = 1;
				} else {
					mesh.material.opacity = i / 25;
				}
				mesh.material.transparent = true;
				group.add( mesh );

				frame += 1;
				frame = frame % maxFrame;
			};
	
			return group;
		};
	
		return createGroup();
	};

	
	/*******/
	particles = new Array();
	let i = 0;

	for ( let ix = 0; ix < AMOUNTX; ix ++ ) {
		for ( let iy = 0; iy < AMOUNTY; iy ++ ) {
			particle = particles[i++] = createTrackerGroup();
			particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
			particle.position.z = iy * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 4 );
			scene.add(particle);
		};
	};

	GUI(camera, spheres, mainLight );
	renderer.setAnimationLoop( () => {
		update();
		render();
	} );
	// gridHelper(scene);
	//SpotLightHelper(scene);
	// axiseHelper(scene);
};

const speedMesh = 0.04;

function update() {
	let i = 0;

	/*sphere*/
	for ( let ix = particles.length; ix--;) {
		particle = particles[ i++ ];
		//particle.position.y = Math.sin( ( ix + count ) * 0.5 )  + ( Math.sin( ( count ) * 0.5 ) );
		for (let i = 0; i < particle.children.length; i++){
			particle.children[i].position.y = Math.sin(( ix + count ) +  Math.sin( ( i / 4 ) * 0.13 ) * Math.PI);
		};
	};
	camera.position.x -= Math.sin(2 * Math.PI) ** 2;
	
	count += 0.05;
};

function render() {
	renderer.render( scene, camera );
};

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	//update the camera"s frustum
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
};

window.addEventListener( "resize", onWindowResize );

init();
