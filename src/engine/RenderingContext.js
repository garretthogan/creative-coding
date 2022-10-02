import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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
		const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
		camera.position.z = 20;
		camera.position.y = 10;

		const controls = new OrbitControls(camera, canvas);
		controls.target.set(0, 5, 0);
		controls.update();

		this.renderer = renderer;
		this.camera = camera;
	}

	resizeRendererToDisplaySize() {
		const canvas = this.renderer.domElement;
		const pixelRatio = window.devicePixelRatio;
		const width = (canvas.clientWidth * pixelRatio) | 0;
		const height = (canvas.clientHeight * pixelRatio) | 0;
		const needResize = canvas.width !== width || canvas.height !== height;
		if (needResize) {
			this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize(width, height, false);
		}
		return needResize;
	}

	render(scene) {
		this.resizeRendererToDisplaySize();
		this.renderer.render(scene, this.camera);
	}
}
