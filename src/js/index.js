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
let SEPARATION = 1, AMOUNTX = 1, AMOUNTY = 1;
let particles, particle, count = 0;

const API = {
	lightProbeIntensity: 1.0,
	directionalLightIntensity: 0.2,
	envMapIntensity: 1
};

var clock;
var mixer;

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


	/*******/
	// const createMatrix = (rows = 10, cols = 10) => new Array(cols).fill(0).map((o, i) => new Array(rows).fill(0));
	// let opacityMesh = createMatrix();

	// (function createGroupMaterial(){
	// 	for (let i = 0; i < 10; i++){
	// 		const number = Math.random();

	// 		for (let j = 0; j < 10; j++){
	// 			opacityMesh[i][j] = new THREE.Mesh(geometry, createMaterial(number));
	// 		};
	// 	}
	// })();

	// const flipMatrix = matrix => matrix[0].map((_, index) => matrix.map(row => row[index]));

	// const rotateMatrixClockwise = matrix => flipMatrix([...matrix].reverse());

	// opacityMesh = rotateMatrixClockwise(opacityMesh);

	// const createGroup = () => {
	// 	let cloudGroup = new Array();

	// 	for (let j = 0; j < opacityMesh.length; j++){
	// 		const  group = new THREE.Group();

	// 		for ( let i = 0; i < opacityMesh[j].length; i++ ) {
	// 			let mesh = opacityMesh[i][j];

	// 			mesh.position.x =  1 * i/10;
	// 			mesh.position.y = 1;
	// 			mesh.position.z =  0.1 * i;
	// 			mesh.material.opacity = i / 10;
	// 			mesh.material.transparent = true;
	// 			group.add( mesh );
	// 		};
	// 		cloudGroup[j] = group;
	// 	};

	// 	return cloudGroup;
	// };

	// const group = createGroup();

	// for (let i = 0; i < opacityMesh.length; i++){
	// 	for (let j = 0; j < opacityMesh[i].length; j++){
	// 		group[j].position.x = j * 0.5;
	// 	}

	// 	scene.add(group[i]);
	// };

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
	
	/*****/

	document.addEventListener( "keydown", onKeyDown, false );

	GUI(camera, spheres, mainLight );
	renderer.setAnimationLoop( () => {
		update();
		render();
	} );
	gridHelper(scene);
	//SpotLightHelper(scene);
	axiseHelper(scene);
};

function onKeyDown( event ) {
	switch ( event.keyCode ) {
		case 79: /*O*/
			activeCamera = cameraOrtho;
			activeHelper = cameraOrthoHelper;
			break;
		case 80: /*P*/
			activeCamera = cameraPerspective;
			activeHelper = cameraPerspectiveHelper;
			break;
	}
}

let frame = 0, maxFrame = 50;
// if ( isUserInteracting === false ) { lon += 0.1; }
// lat = Math.max( - 85, Math.min( 85, lat ) );
// phi = THREE.Math.degToRad( 90 - lat );
// theta = THREE.Math.degToRad( lon );
// target.x = 500 * Math.sin( phi ) * Math.cos( theta );
// target.y = 500 * Math.cos( phi );
// target.z = 500 * Math.sin( phi ) * Math.sin( theta );
// camera.lookAt( target );
var counter = 0;
// 100 iterations
var increase = Math.PI * 2 / 100;
const speedMesh = 0.04;

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


	/*syrcle*/
	// var delta = clock.getDelta();
	
	// if ( mixer ) {
	// 	mixer.update( delta );
	// }
	/* */

	// /* sphere*/
	count += 0.05;
	
	
	for ( let ix = particles.length; ix--;) {
		particle = particles[ i++ ];
		//particle.position.y = Math.sin( ( ix + count ) * 0.5 )  + ( Math.sin( ( count ) * 0.5 ) );
		for (let i = 0; i < particle.children.length; i++){
	
			particle.children[i].position.y = Math.sin(( ix + count ) +  Math.sin( ( i / 4 ) * 0.13 ) * Math.PI);
			particle.children[i].position.x -= speedMesh;
		};
	};

	// /*camera*/

	if (frame < maxFrame){
		var speed = 1573278458000 * 0.00025;

		camera.position.x = Math.cos(speed) * 50;
		camera.position.y = frame;
		camera.lookAt(scene.position); //0,0,0
	  
		frame = frame + count + 0.5;
	};


	/* */

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
	//update the camera"s frustum
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
};

window.addEventListener( "resize", onWindowResize );

init();
