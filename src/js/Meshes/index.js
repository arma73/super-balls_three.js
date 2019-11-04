import { MeshBasicMaterial, Group, Mesh, SphereBufferGeometry, Geometry, Vector3, Face3 } from "three";
import { GroupOne } from "../Helpers/colors";
export let sphere, spheres;

const randomInteger = (min = 1, max = 5) => {
	const rand = min + Math.random() * (max + 1 - min);

	return Math.floor(rand);
};

function createMaterials() {
	const sphere = new MeshBasicMaterial({
		color: 0x12EC19,
		flatShading: false
	});

	return {
	  sphere
	};
};

function createGeometries() {
	const spheel = new SphereBufferGeometry(Math.Pi / 100, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);

	return {
		spheel
	};
};

function drawSquare(x1, y1, x2, y2) {
	const square = new Geometry();

	square.vertices.push(new Vector3(x1, y1, 0));
	square.vertices.push(new Vector3(x1, y2, 0));
	square.vertices.push(new Vector3(x2, y1, 0));
	square.vertices.push(new Vector3(x2, y2, 0));

	square.faces.push(new Face3(0, 1, 2));
	square.faces.push(new Face3(1, 2, 3));
	return square;
}

export const createMeshes = (scene) => {
	//Create a Group to hold the pieces of the train
	const props = {
		distance: 10,
		radius: 1
	};

	spheres = new Group();

	scene.add(spheres);

	const materials = createMaterials();
	const geometries = createGeometries();

	sphere = new Mesh(geometries.spheel, materials.sphere);
	sphere.position.set(0, 0, 0);


	const spheresObject = {};
	const square = drawSquare(1, 30, 30, 1);

	// for (let i = 1; i <= 13; i++ ){
	// 	spheresObject[i] = sphere.clone();
	// 	spheresObject[i].position.set(i * 1.7, i * 1.2, 0);
	// }

	// const sphereTwo = sphere.clone();

	// sphereTwo.position.set(1.7, 1.2, 0);

	// const sphereThree = sphere.clone();

	// sphereThree.position.set(3.4, 2.4, 0);

	// const sphereFour = sphere.clone();

	// sphereFour.position.set(5.1, 3.6, 0);

	// const sphereFive = sphere.clone();

	// sphereFive.position.set(3.4, 4.8, 0);

	// const sphereSix = sphere.clone();

	// sphereSix.position.set(1.7, 6, 0);

	// const sphereSeven = sphere.clone();

	// sphereSeven.position.set(0, 7.2, 0);

	// const sphereEight = sphere.clone();

	// sphereEight.position.set(-1.7, 6, 0);

	// const sphereNine = sphere.clone();

	// sphereNine.position.set(-3.4, 4.8, 0);

	// const sphereTen = sphere.clone();

	// sphereTen.position.set(-5.1, 3.6, 0);

	// const sphereEleven = sphere.clone();

	// sphereEleven.position.set(-3.4, 2.4, 0);

	// const sphereTwelve = sphere.clone();

	// sphereTwelve.position.set(-1.7,  1.2, 0);

	spheres.add(
		sphere,
		square
		// sphereTwo,
		// sphereThree,
		// sphereFour,
		// sphereFive,
		// sphereSix,
		// sphereSeven,
		// sphereEight,
		// sphereNine,
		// sphereTen,
		// sphereEleven,
		// sphereTwelve,
	);

	spheres.children.forEach((item) => {
		item.material.color.set(GroupOne[randomInteger()]);
	});
};
