import {AmbientLight, DirectionalLight} from "three";
export let ambientLight, mainLight;

export const createLights = (scene) => {
	ambientLight = new AmbientLight( 0x404040 );
	mainLight = new DirectionalLight( 0xffffff, 5 );
	mainLight.position.set( 10, 10, 10 );
	scene.add( ambientLight, mainLight );
};
