import * as dat from "dat.gui";
import { format } from "path";

//Dat gui
const GUI = (camera, cube, light) => {
	const gui = new dat.GUI();

	if (camera){
		let cameraGui = gui.addFolder("camera position");

		cameraGui.add(camera.position, "x");
		cameraGui.add(camera.position, "y");
		cameraGui.add(camera.position, "z");

		let fovCamera = gui.addFolder("camera projection");
		
		fovCamera.add(camera, "fov");
	};
	
	if (light){
		const lightGui = gui.addFolder("light position");
	 
		lightGui.add(light.position, "x");
		lightGui.add(light.position, "y");
		lightGui.add(light.position, "z");
	};
	 
	if (cube){
		let cubeGui = gui.addFolder("cube position");

		cubeGui.add(cube.position, "x");
		cubeGui.add(cube.position, "y");
		cubeGui.add(cube.position, "z");

		let cubeRotateGui = gui.addFolder("cube rotation");

		cubeRotateGui.add(cube.rotation, "x");
		cubeRotateGui.add(cube.rotation, "y");
		cubeRotateGui.add(cube.rotation, "z");
		cubeRotateGui.open();
	};

};

export default GUI;
