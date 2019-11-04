import * as dat from "dat.gui";

//Dat gui
const GUI = (camera, cube, light) => {
	const gui = new dat.GUI();

	if (camera){
		let cameraGui = gui.addFolder("camera position");

		cameraGui.add(camera.position, "x");
		cameraGui.add(camera.position, "y");
		cameraGui.add(camera.position, "z");
		cameraGui.open();

		let fovCamera = gui.addFolder("camera projection");
		
		fovCamera.add(camera, "fov");
		fovCamera.open();
	};
	
	if (light){
		const lightGui = gui.addFolder("light position");
	 
		lightGui.add(light.position, "x");
		lightGui.add(light.position, "y");
		lightGui.add(light.position, "z");
		lightGui.open();
	};
	 
	if (cube){
		let cubeGui = gui.addFolder("cube position");

		cubeGui.add(cube.position, "x");
		cubeGui.add(cube.position, "y");
		cubeGui.add(cube.position, "z");
		cubeGui.open();

		let cubeRotateGui = gui.addFolder("cube rotation");

		cubeRotateGui.add(cube.rotation, "x");
		cubeRotateGui.add(cube.rotation, "y");
		cubeRotateGui.add(cube.rotation, "z");
		cubeRotateGui.open();
	};
};

export default GUI;
