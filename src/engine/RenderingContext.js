import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import FPSCharacter from './FPSCharacter';

export default class RenderingContext {
	constructor(canvasId) {
		this.resizeRendererToDisplaySize = this.resizeRendererToDisplaySize.bind(this);
		this.render = this.render.bind(this);

		const canvas = document.getElementById(canvasId);
		const renderer = new THREE.WebGLRenderer({ canvas });

		const fov = 45;
		const aspect = 2; // the canvas default
		const near = 0.1;
		const far = 1000;
		const player = new FPSCharacter(fov, aspect, near, far);
		player.position.z = 20;
		player.position.y = 5;

		// const controls = new OrbitControls(player, canvas);
		// controls.target.set(0, 2, 0);
		// controls.update();

		this.renderer = renderer;
		this.player = player;
	}

	resizeRendererToDisplaySize() {
		const canvas = this.renderer.domElement;
		const pixelRatio = window.devicePixelRatio;
		const width = (canvas.clientWidth * pixelRatio) | 0;
		const height = (canvas.clientHeight * pixelRatio) | 0;
		const needResize = canvas.width !== width || canvas.height !== height;
		if (needResize) {
			this.player.aspect = canvas.clientWidth / canvas.clientHeight;
			this.player.updateProjectionMatrix();
			this.renderer.setSize(width, height, false);
		}
		return needResize;
	}

	render(scene) {
		this.resizeRendererToDisplaySize();
		this.renderer.render(scene, this.player);
	}
}
