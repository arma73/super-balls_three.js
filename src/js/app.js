import * as THREE from "three";
import GUI from "./Helpers/GUI";
import { THREERobot } from "./Meshes/CreateRobot";
import {Controls} from "./Helpers/TransformControls";
import { createCamera, createControls, camera, camera2, createCamera2, createControls2 } from "./Camera_Controls";
import {createLights, mainLight} from "./Lights";
import { spheres } from "./Meshes";
import {createRenderer, renderer} from "./Renderer";
const Three = Controls(THREE);

const OrbitControls = require("three-orbit-controls")(Three);

//Styles
import "GlobalStyles";
window.addEventListener("load", (() => {})());

let scene, sceneTwo, canvas, view1Elem, view2Elem, cameraHelper, particlesStar, axesHelper, transformControls;
let SEPARATION = 1, AMOUNTX = 20, AMOUNTY = 20;
let particles, particle, count = 0, eye;
let dragBoolean = false, modeControls = "translate";
let clearFlag = false;
//
let cameraEye, parent;

function init() {
	scene = new Three.Scene();
	sceneTwo = new Three.Scene();
	scene.background = new Three.Color( 0x000000 );
	createCamera();
	createLights(scene);
	//createMeshes(scene);
	createRenderer();
	createLights(sceneTwo);

	canvas = document.querySelector("#canvas");
	view1Elem = document.querySelector(".view1");
	view2Elem = document.querySelector(".view2");
	cameraHelper = new Three.CameraHelper(camera);

	createCamera2(sceneTwo);

	//

	parent = new Three.Object3D();
	sceneTwo.add(parent);
	
	cameraEye = new Three.Mesh(
		new Three.SphereBufferGeometry(.5, 32, 32),
		new Three.MeshBasicMaterial({color: 0xdddddd})
	);
	cameraEye.position.x = camera.position.x;
	cameraEye.position.y = camera.position.y;
	cameraEye.position.z = camera.position.z;


	camera.rotation.x = 0;
	camera.rotation.y = 21.3;
	camera.rotation.z = 0;
	cameraEye.rotation.x = camera.rotation.x;
	cameraEye.rotation.y = camera.rotation.y;
	cameraEye.rotation.z = camera.rotation.z;

	parent.add(camera2);
	const Controls2 = createControls2(OrbitControls, camera2, view2Elem);

	Controls2.addEventListener("change", render);
	scene.add(cameraHelper);
	sceneTwo.add(cameraHelper);
	parent.add(cameraEye);

	axesHelper = new Three.AxesHelper(5);

	const domElement = document.querySelector(".view2");
	transformControls = new Three.TransformControls(camera2, domElement);

	transformControls.addEventListener("change", render );
	
	transformControls.addEventListener( "dragging-changed", ( event ) => {
		dragBoolean = event.value;
		Controls2.enabled = !event.value;
	} );

	try {
		transformControls.attach(cameraEye);
		} catch (err) {
		console.log(err);
	}

	sceneTwo.add(transformControls);
	transformControls.setMode( "translate" );


	//Stars
	let geometryStar = new Three.BufferGeometry();
	let vertices = [];

	for ( let j = 0;  j < 100000; j++ ) {
		vertices.push( Three.Math.randFloatSpread( 3000 ) ); //x
		vertices.push( Three.Math.randFloatSpread( 3000 ) ); //y
		vertices.push( Three.Math.randFloatSpread( 3000 ) ); //z
	}
	geometryStar.setAttribute( "position", new Three.Float32BufferAttribute( vertices, 3 ) );
	particlesStar = new Three.Points( geometryStar, new Three.PointsMaterial( { color: 0x888888 } ) );

	//
	//

	function createMaterial(random = Math.random()) {
		const material = new Three.MeshPhongMaterial({
			side: Three.DoubleSide
		});

		const hue = random;
		const saturation = 1;
		const luminance = .5;

		material.color.setHSL(hue, saturation, luminance);

		return material;
	};

	
	//Create the sphere"s material
	//Set up the sphere lets

	const sphereRadius = .085;
	const sphereWidthDivisions = 32;
	const sphereHeightDivisions = 16;
	const geometry = new Three.SphereBufferGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);

	let frame = 0, maxFrame = 200;

	const createTrackerGroup = () => {
		let opacityMesh = [0];

		(function createGroupMaterial(){
			const number = Math.random();

			for (let j = 0; j < 11; j++){
				opacityMesh[j] = new Three.Mesh(geometry, createMaterial(number));
			};
		})();

		const createGroup = () => {
			const group = new Three.Group();
			let per = frame / maxFrame;
	
			for ( let i = 0; i < opacityMesh.length; i++ ) {
				let mesh = opacityMesh[i];


				let bias = Math.abs(0.5 - per) / 0.5;

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

	window.addEventListener( "keydown", function ( event ) {
		switch ( event.keyCode ) {
			case 81: //Q
				transformControls.setSpace( transformControls.space === "local" ? "world" : "local" );
				break;
			case 17: //Ctrl
				transformControls.setTranslationSnap( 100 );
				transformControls.setRotationSnap( THREE.Math.degToRad( 15 ) );
				break;
			case 87: //W
				modeControls = "translate";
				transformControls.setMode( "translate" );
				break;
			case 69: //E
				modeControls = "rotate";
				transformControls.setMode( "rotate" );
				break;
			case 82: //R
				transformControls.setMode( "scale" );	
				break;
			case 187:
			case 107: //+, =, num+
				transformControls.setSize( transformControls.size + 0.1 );
				break;
			case 189:
			case 109: //-, _, num-
				transformControls.setSize( Math.max( transformControls.size - 0.1, 0.1 ) );
				break;
			case 88: //X
				transformControls.showX = ! transformControls.showX;
				break;
			case 89: //Y
				transformControls.showY = ! transformControls.showY;
				break;
			case 90: //Z
				transformControls.showZ = ! transformControls.showZ;
				break;
			case 67:
				clearFlag = !clearFlag;
				break;
			case 32: //Spacebar
				transformControls.enabled = ! transformControls.enabled;
				break;
		}
	} );
	/*******/
	particles = new Array();
	let i = 0;

	for ( let ix = 0; ix < AMOUNTX; ix ++ ) {
		for ( let iy = 0; iy < AMOUNTY; iy ++ ) {
			particle = particles[i++] = createTrackerGroup();
			particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
			particle.position.z = iy * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 4 );
			sceneTwo.add(particle);
		};
	};
	for ( let ix = 0; ix < AMOUNTX; ix ++ ) {
		for ( let iy = 0; iy < AMOUNTY; iy ++ ) {
			particle = particles[i++] = createTrackerGroup();
			particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
			particle.position.z = iy * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 4 );
			scene.add(particle);
		};
	};
	let j = 0;
	/*sphere*/
	for ( let ix = particles.length; ix--;) {
		particle = particles[ j++ ];
		for (let i = 0; i < particle.children.length; i++){
			particle.children[i].position.y = Math.sin(( ix + count ) + Math.sin( ( i / 4 ) * 0.13 ) * Math.PI);
		};
	};

	const guiVissible = cameraHelper.__proto__.__proto__.__proto__.__proto__;

	GUI(camera, spheres, mainLight, guiVissible );
	renderer.setAnimationLoop( () => {
		update();
		render();
	} );
};

function setScissorForElement(elem) {
	const canvasRect = canvas.getBoundingClientRect();
	const elemRect = elem.getBoundingClientRect();

	//compute a canvas relative rectangle
	const right = Math.min(elemRect.right, canvasRect.right) - canvasRect.left;
	const left = Math.max(0, elemRect.left - canvasRect.left);
	const bottom = Math.min(elemRect.bottom, canvasRect.bottom) - canvasRect.top;
	const top = Math.max(0, elemRect.top - canvasRect.top);

	const width = Math.min(canvasRect.width, right - left);
	const height = Math.min(canvasRect.height, bottom - top);

	//setup the scissor to only render to that part of the canvas
	const positiveYUpBottom = canvasRect.height - bottom;

	renderer.setScissor(left, positiveYUpBottom, width, height);
	renderer.setViewport(left, positiveYUpBottom, width, height);

	//return the aspect
	return width / height;
}

function update() {
	let j = 0;
	/*sphere*/
	for ( let ix = particles.length; ix--;) {
		particle = particles[ j++ ];
		for (let i = 0; i < particle.children.length; i++){
			particle.children[i].position.y = Math.sin(( ix + count ) + Math.sin( ( i / 4 ) * 0.13 ) * Math.PI);
		};
	};

	
	camera.position.x -= Math.sin(2 * Math.PI) ** 2 ;

	camera2.matrix.lookAt(camera2.position, 5, 0);
	camera2.far = camera.far + 2000;
	count += 0.05;
};

function render() {
	renderer.setScissorTest(true);
	
	if (dragBoolean){
		switch (modeControls) {
			case "translate":
				camera.position.x = cameraEye.position.x;
				camera.position.y = cameraEye.position.y;
				camera.position.z = cameraEye.position.z;
				break;
			case "rotate":
				camera.rotation.x = cameraEye.rotation.x;
				camera.rotation.y = cameraEye.rotation.y;
				camera.rotation.z = cameraEye.rotation.z;
				break;
		}
	}

	{
		const aspect = setScissorForElement(view1Elem);

		camera.aspect = aspect;
		camera.updateProjectionMatrix();
		cameraHelper.update();
		cameraHelper.visible = false;

		if (!clearFlag){
			renderer.clear();
			scene.add(particlesStar);
		} else {
			scene.remove( particlesStar )
		}
		scene.background.set(0x000000);
		renderer.render(scene, camera);
	}
	{
		const aspect = setScissorForElement(view2Elem);

		camera2.aspect = aspect;
		camera2.updateProjectionMatrix();
		cameraHelper.visible = true;
		scene.background.set(0x000000);
		renderer.clear();
		renderer.render(sceneTwo, camera2);
	}
};

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera2.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	camera2.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
};

window.addEventListener( "resize", onWindowResize );

init();
