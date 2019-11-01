import "../assets/scss/app.scss";

import { Scene, WebGLRenderer, PerspectiveCamera, LineBasicMaterial, Geometry, Vector3, Line } from "three";

const canvas = document.querySelector("#SupeBalls");
const context = canvas.getContext("webgl", {alpha: false});

const renderer = new WebGLRenderer( { canvas: canvas, context: context } );

const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500 );

camera.position.set(0, 0, 100);

camera.lookAt(0, 0, 0);

const scene = new Scene();

const material = LineBasicMaterial( {color: 0x0000ff} );

const geometry = new Geometry();

geometry.vertices.push(new Vector3(-10, 0, 0));
geometry.vertices.push(new Vector3(0,  10, 0));
geometry.vertices.push(new Vector3(10, 0, 0));

var line = new Line( geometry, material);

scene.add( line );
renderer.render( scene, camera );
