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

	spheres.add(
		sphere,
	);

	spheres.children.forEach((item) => {
		item.material.color.set(GroupOne[randomInteger()]);
	});
};
