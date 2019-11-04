import { GridHelper, SpotLight, SpotLightHelper, AxisHelper, DirectionalLight, DirectionalLightHelper } from "three";

export const gridHelper = (scene) => {
	const size = 10;
	const divisions = 10;

	const helper = new GridHelper( size, divisions );

	scene.add(helper);
};

export const spotLightHelper = (scene) => {
	const spotLight = new SpotLight( 0xffffff );

	spotLight.position.set( 10, 10, 10 );
	scene.add( spotLight );

	const spotLightHelper = new SpotLightHelper( spotLight );

	scene.add( spotLightHelper );
};

export const axiseHelper = (scene) => {
	const axisHelper = new AxisHelper( 200 );
	
	scene.add( axisHelper );

	const light = new DirectionalLight( 0xFFFFFF );
	
	const helper = new DirectionalLightHelper( light, 5 );

	scene.add( helper );
};
