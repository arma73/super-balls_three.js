import { PerspectiveCamera } from "three";
export let camera, controls, camera2, controls2;

export const createCamera = () => {
	camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.set( 19, 2, -15 );
};

export const createControls = (OrbitControls, camera, elem) => {
	controls = new OrbitControls(camera, elem);
	controls.target.set(0, 5, 0);
	controls.update();
};

export const createControls2 = (OrbitControls, camera, elem) => {
	controls2 = new OrbitControls(camera, elem);
	controls.target.set(0, 5, 0);
	controls.update();
};

export const createCamera2 = () => {
	camera2 = new PerspectiveCamera( 60, 2, 0.1, 700);
	camera2.position.set(20, 12, -35);
	camera2.lookAt(0, 5, 0);
};
