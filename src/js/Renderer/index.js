import { WebGLRenderer, ReinhardToneMapping } from "three";

export let renderer;

export const createRenderer = () => {
	renderer = new WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setPixelRatio( window.devicePixelRatio );
	//
	renderer.toneMapping = ReinhardToneMapping;
	//
	renderer.gammaFactor = 2.2;
	renderer.gammaOutput = true;
	renderer.physicallyCorrectLights = true;

	document.body.appendChild( renderer.domElement );
};
