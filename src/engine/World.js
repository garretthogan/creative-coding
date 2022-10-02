import { Scene } from 'three';
import { Factory } from './Factory';
import { floor, PRIMITIVES } from './primitives';
import StandardLighting from './StandardLighting';

export default class World extends Scene {
	constructor() {
		super();

		floor.rotation.x = Math.PI * -0.5;
		this.add(floor);
		this.floor = floor;

		const factory = new Factory();
		const boxSize = 4;
		const cubeMesh = factory.instantiate(PRIMITIVES.BOX);
		cubeMesh.position.set(boxSize + 1, boxSize / 2, 0);

		const radius = 3;
		const sphereMesh = factory.instantiate(PRIMITIVES.SPHERE);
		sphereMesh.position.set(-radius - 1, radius + 2, 0);

		factory.loadAsset('SheenChair.glb', 'gltf', (fileName, fileType, chair) => {
			chair.scale.set(6, 6, 6);
			chair.position.z = -7;
			chair.position.x = 1;
		});

		this.add(factory);
		this.factory = factory;

		const lighting = new StandardLighting();
		this.add(lighting);
		this.lighting = lighting;
	}
}
