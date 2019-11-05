function drawSquare(x1, y1, x2, y2) {
	const square = new THREE.Geometry();

	square.vertices.push(new THREE.Vector3(x1, y1, 0));
	square.vertices.push(new THREE.Vector3(x1, y2, 0));
	square.vertices.push(new THREE.Vector3(x2, y1, 0));
	square.vertices.push(new THREE.Vector3(x2, y2, 0));

	square.faces.push(new THREE.Face3(0, 1, 2));
	square.faces.push(new THREE.Face3(1, 2, 3));
	return square;
};

function addEarth() {
	//create the sphere's material
	const earthContainerWidth = 10;
	const earthTexture = new THREE.MeshLambertMaterial({
		color: 0xFFFFFF,
		overdraw:true
	});

	earthTexture.needsUpdate = true;

	//set up the sphere vars
	let radius = earthContainerWidth/14.15, segments = 64, rings = 64;

	//create a new mesh with sphere geometry -
	//we will cover the sphereMaterial next!

	let sphere = new THREE.Mesh(
	   new THREE.SphereGeometry(radius, segments, rings),
	   earthTexture);

	//add the sphere to the scene
	scene.add(sphere);
};
