import { PerspectiveCamera } from "three";
export let camera, controls;

export const createCamera = () => {
	camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.set( 19, 2, -15 );
};

export const createControls = (OrbitControls, camera) => {
	controls = new OrbitControls(camera);
	controls.target.set(0, 5, 0);
	controls.update();
};
