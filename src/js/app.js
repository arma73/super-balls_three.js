import * as THREE from "three";
import GUI from "./Helpers/GUI";
import { GroupOne } from "./Helpers/colors";
import { gridHelper, randomInteger, axiseHelper } from "./Helpers/helpers";
import { createCamera, createControls, camera } from "./Camera_Controls";
import {createLights, mainLight} from "./Lights";
import { spheres } from "./Meshes";
import {createRenderer, renderer} from "./Renderer";

const OrbitControls = require("three-orbit-controls")(THREE);

//Styles
import "GlobalStyles";

let scene;
let SEPARATION = 1, AMOUNTX = 100, AMOUNTY = 100;
let particles, particle, count = 0;

function init() {
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x000000 );
	createCamera();
	createControls(OrbitControls);
	createLights(scene);
	//createMeshes(scene);
	createRenderer();
	

	//Create the sphere's material
	const earthContainerWidth = 1;
	
	//Set up the sphere lets
	let radius = earthContainerWidth/10, segments = 5, rings = 64;
	const geometry = new THREE.SphereBufferGeometry(radius, segments, rings);

	particles = new Array();
	let i = 0;

	function createMaterial() {
		const material = new THREE.MeshPhongMaterial({
			side: THREE.DoubleSide
		});

		const hue = Math.random();
		const saturation = 1;
		const luminance = .5;

		material.color.setHSL(hue, saturation, luminance);

		return material;
	};


	for ( let ix = 0; ix < AMOUNTX; ix ++ ) {
		for ( let iy = 0; iy < AMOUNTY; iy ++ ) {
			particle = particles[i++] = new THREE.Mesh( geometry, createMaterial() );
			particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
			particle.position.z = iy * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 50 );
			particle.material.color.set(GroupOne[randomInteger()]);

			scene.add(particle);
		};
	};

	GUI(camera, spheres, mainLight );
	renderer.setAnimationLoop( () => {
		update();
		render();
	} );
	gridHelper(scene);
	//SpotLightHelper(scene);
	axiseHelper(scene);
};

//let frame = 0,
//maxFrame = 200;

function update() {
	let i = 0;
	//let ix = particles.length;

	//function func() {
	//if (ix){
	//if (particles[i]) {
	//particle = particles[ i++ ];
	//particle.position.y = Math.sin( ( ix + count ) * 0.5 )  + ( Math.sin( ( count ) * 0.5 ) );
	//ix--;
	//func();
	//};
	//};
	//};
	//func();
	
	count += 0.05;
	
	
	for ( let ix = particles.length; ix--;) {
		particle = particles[ i++ ];
		particle.position.y = Math.sin( ( ix + count ) * 0.5 )  + ( Math.sin( ( count ) * 0.5 ) );
	};
	count += 0.05;

	//let per = frame / maxFrame,
	//bias = Math.abs(0.5 - per) / 0.5;
	//particle.position.set(0,  -1 + 2 * bias, 0);
	//frame += 1;
	//frame = frame % maxFrame;
};

function render() {
	renderer.render( scene, camera );
};

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	//update the camera's frustum
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
};

window.addEventListener( "resize", onWindowResize );

init();
