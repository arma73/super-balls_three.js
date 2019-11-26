import { WebGLRenderer, ReinhardToneMapping } from "three";

export let renderer;

export const createRenderer = () => {
	renderer = new WebGLRenderer( { 
		antialias: true, 
		preserveDrawingBuffer: true, 
		powerPreference:  "low-power", 
		failIfMajorPerformanceCaveat: true,
		depth: false
	} );
	renderer.autoClearColor = false;
	renderer.autoClear = false;
	
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setPixelRatio( window.devicePixelRatio );
	//
	renderer.toneMapping = ReinhardToneMapping;
	//
	renderer.gammaFactor = 2.2;
	renderer.gammaOutput = true;
	renderer.physicallyCorrectLights = true;

	document.body.appendChild( renderer.domElement );
	const view = document.createElement("div");

	view.classList.add("split");
	const view1 = document.createElement("div");

	view1.classList.add("view1");
	const view2 = document.createElement("div");

	view2.classList.add("view2");

	view.appendChild(view1);
	view.appendChild(view2);
	renderer.domElement.setAttribute("id", "canvas");
	document.body.appendChild( renderer.domElement );
	document.body.appendChild( view );
};
