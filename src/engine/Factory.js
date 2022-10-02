import { Object3D } from 'three';
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
}
