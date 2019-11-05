import { PerspectiveCamera } from "three";
export let camera, controls;

export const createCamera = () => {
	camera = new PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.set( -5, 5, 30 );
};

export const createControls = (OrbitControls) => {
	controls = new OrbitControls(camera);
};
