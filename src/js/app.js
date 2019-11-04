//Modules
import * as THREE from "three";
import { createCamera, createControls, camera } from "./Camera_Controls";
import {createLights, mainLight} from "./Lights";
import {createMeshes, spheres, sphere} from "./Meshes";
import {createRenderer, renderer} from "./Renderer";
import GUI from "./Helpers/GUI";
import { gridHelper, spotLightHelper, axiseHelper } from "./Helpers/helpers";
import { RenderPass } from "./Helpers/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "./Helpers/postprocessing/UnrealBloomPass";
import { EffectComposer } from "./Helpers/postprocessing/EffectComposer";


const OrbitControls = require("three-orbit-controls")(THREE);
//Styles
import "GlobalStyles";

// these need to be accessed inside more than one function so we"ll declare them first
let scene, composer;

function drawSquare(x1, y1, x2, y2) {
	const square = new THREE.Geometry();

	square.vertices.push(new THREE.Vector3(x1, y1, 0));
	square.vertices.push(new THREE.Vector3(x1, y2, 0));
	square.vertices.push(new THREE.Vector3(x2, y1, 0));
	square.vertices.push(new THREE.Vector3(x2, y2, 0));

	square.faces.push(new THREE.Face3(0, 1, 2));
	square.faces.push(new THREE.Face3(1, 2, 3));
	return square;
}


function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x000000 );
  createCamera();
  createControls(OrbitControls);
  createLights(scene);
  createMeshes(scene);
  createRenderer();

  var square_material = new THREE.LineBasicMaterial( { color: 0x0000ff,side: THREE.DoubleSide } );

  var square_geometry = drawSquare(0,10,15,0);
  var square_Line = new THREE.Line(square_geometry, square_material);
  scene.add(square_Line);

  var square_material = new THREE.LineBasicMaterial({
	color: 0x0000ff
});


	
	var params = {
		bloomStrength: 0.8,
		bloomThreshold: 0.1,
		bloomRadius: 0.5
	};


	var renderScene = new RenderPass(spheres, camera);

	var bloomPass = new UnrealBloomPass( new THREE.SphereBufferGeometry(Math.Pi / 100, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2), params.bloomStrength, params.bloomRadius, params.bloomThreshold);
	bloomPass.threshold = params.bloomThreshold;
	bloomPass.strength = params.bloomStrength;
	bloomPass.radius = params.bloomRadius;

	composer = new EffectComposer(renderer);

	composer.setSize(window.innerWidth, window.innerHeight);
	composer.addPass(renderScene);
	composer.addPass(bloomPass);


	GUI(camera, spheres, mainLight );

	renderer.setAnimationLoop( () => {
		update();
		render();
		// composer.render();
	} );

	gridHelper(scene);
	// spotLightHelper(scene);
	axiseHelper(scene);

};

var frame = 0,
maxFrame = 200;

function update() {
	var per = frame / maxFrame,
	bias = Math.abs(0.5 - per) / 0.5;

	spheres.position.set(0,  -1 + 2 * bias, 0);
	frame += 1;
	frame = frame % maxFrame;


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
