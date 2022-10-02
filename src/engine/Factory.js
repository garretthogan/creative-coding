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
	loadAsset(fileName, fileType, onLoaded) {
		if (fileType === 'gltf') {
			const loader = new GLTFLoader();
			loader.load(fileName, (gltf) => {
				this.add(gltf.scene);
				onLoaded(gltf.scene);
			});
		}
	}
}
