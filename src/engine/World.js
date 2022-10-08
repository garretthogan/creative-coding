import { Clock, Color, FogExp2, Object3D, Scene } from 'three';
import { Factory } from './Factory';
import { floor, PRIMITIVES } from './primitives';
import StandardLighting from './StandardLighting';
import { Octree } from 'three/addons/math/Octree.js';
import { ref } from 'vue';

/**
 * An fps world with moving neon lights
 * shoot laser guns at players
 * games start back to back
 * they never stop
 * spin up a few redis instancees
 * spin up a few servers
 * spin up a few rooms
 * see how many people can join
 * just keep it simple and keep it moving
 * but let the winner show off at the end
 * maybe even share to social media
 */

const clock = new Clock();
export default class World extends Scene {
	constructor() {
		super();

		// this.background = new Color(0xb1e1ff);
		// this.fog = new FogExp2(0xb1e1ff, 0.012);

		// enable json export
		// so you can export entire sub scenes as levels
		const factory = new Factory();
		this.add(factory);
		this.factory = factory;

		// factory.loadAsset('SheenChair.glb', 'gltf', (chair) => {
		// 	chair.scale.set(6, 6, 6);
		// 	chair.position.z = -7;
		// 	chair.position.x = 1;
		// });

		// optionally export lighting rigs too
		const lighting = new StandardLighting();
		this.add(lighting);
		this.lighting = lighting;

		floor.rotation.x = Math.PI * -0.5;
		floor.scale.set(8, 8, 1);
		this.add(floor);
		this.floor = floor;

		this.onBeforeRender = this.update.bind(this);

		this.selected = ref(new Object3D());
	}

	update() {}
}
