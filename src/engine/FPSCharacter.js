import { PerspectiveCamera, Vector3 } from 'three';

export default class FPSCharacter extends PerspectiveCamera {
	constructor(fov, aspect, near, far) {
		super(fov, aspect, near, far);
		this.onBeforeRender = () => console.log('before render player');

		this.rotation.order = 'YXZ';

		// document.body.addEventListener('mousedown', () => {
		// 	document.body.requestPointerLock();
		// });

		// document.body.addEventListener('mousemove', (event) => {});

		const direction = new Vector3();
		// document.body.addEventListener('mouseup', () => {
		// 	this.getWorldDirection(direction);
		// 	console.log('direction to fire in', direction);
		// 	if (document.pointerLockElement !== null) {
		// 		console.log('fire!');
		// 	}
		// });
	}
}
