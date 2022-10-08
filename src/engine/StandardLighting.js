import { DirectionalLightHelper, Object3D } from 'three';
import { ColorGUIHelper } from './UIHelpers.js';
import { ambientLight, directionalLight, hemiLight } from './lighting';

function makeXYZGUI(gui, vector3, name, onChangeFn) {
	const folder = gui.addFolder(name);
	folder.add(vector3, 'x', -100, 100).onChange(onChangeFn);
	folder.add(vector3, 'y', -100, 100).onChange(onChangeFn);
	folder.add(vector3, 'z', -100, 100).onChange(onChangeFn);
	folder.open();
}

/** consists of directional light, hemisphere light, and ambient light */
export default class StandardLighting extends Object3D {
	constructor() {
		super();

		const helper = new DirectionalLightHelper(directionalLight);
		this.helper = helper;

		this.add(helper);
		this.add(directionalLight);
		this.add(directionalLight.target);
		this.add(hemiLight);
		this.add(ambientLight);
	}

	mountControls(gui) {
		const dlController = gui.addFolder('directional light');
		dlController.addColor(new ColorGUIHelper(directionalLight, 'color'), 'value').name('color');
		dlController.add(directionalLight, 'intensity', 0, 2, 0.01);

		const hlController = gui.addFolder('hemisphere light');
		hlController.addColor(new ColorGUIHelper(hemiLight, 'groundColor'), 'value').name('groundColor');
		hlController.addColor(new ColorGUIHelper(hemiLight, 'color'), 'value').name('skyColor');
		hlController.add(hemiLight, 'intensity', 0, 2, 0.01);

		const alController = gui.addFolder('ambient light');
		alController.addColor(new ColorGUIHelper(ambientLight, 'color'), 'value').name('skyColor');
		alController.add(ambientLight, 'intensity', 0, 2, 0.01);

		const updateLight = () => {
			directionalLight.target.updateMatrixWorld();
			this.helper.update();
		};
		updateLight();

		makeXYZGUI(gui, directionalLight.position, 'position', updateLight);
		makeXYZGUI(gui, directionalLight.target.position, 'target', updateLight);
	}
}
