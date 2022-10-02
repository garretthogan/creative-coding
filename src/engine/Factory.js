import { Object3D } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { box, sphere, PRIMITIVES } from './primitives';

export class Factory extends Object3D {
	constructor() {
		super();
	}

	instantiate(shape) {
		switch (shape) {
			case PRIMITIVES.SPHERE:
				const newSphere = sphere.clone();
				this.add(newSphere);
				return newSphere;
			case PRIMITIVES.BOX:
				const newBox = box.clone();
				this.add(newBox);
				return newBox;
		}

		return box.clone();
	}
	loadAsset(fileName, fileType) {
		if (fileType === 'gltf') {
			const loader = new GLTFLoader();
			loader.load(fileName, (gltf) => {
				gltf.scene.scale.set(6, 6, 6);
				gltf.scene.position.z = -7;
				gltf.scene.position.x = 1;
				this.add(gltf.scene);
			});
		}
	}
}
