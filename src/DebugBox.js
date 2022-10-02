import { BoxGeometry, Mesh, MeshBasicMaterial, Object3D } from 'three';

export default class DebugBox extends Object3D {
	constructor() {
		super();

		const geometry = new BoxGeometry(100, 100, 100);
		const material = new MeshBasicMaterial({ color: 0x00ff00 });
		const mesh = new Mesh(geometry, material);
		mesh.onBeforeRender = this.onBeforeRender.bind(this);
		mesh.position.y = 100;

		this.mesh = mesh;

		this.add(mesh);
	}

	onBeforeRender() {
		this.mesh.rotation.x += 0.01;
		this.mesh.rotation.y += 0.01;
	}
}
