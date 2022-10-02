import {
	BackSide,
	Color,
	DirectionalLight,
	Fog,
	HemisphereLight,
	Mesh,
	MeshLambertMaterial,
	Object3D,
	PlaneGeometry,
	Scene,
	ShaderMaterial,
	SphereGeometry,
} from 'three';

class Sky extends Object3D {
	constructor() {
		super();

		this.bottomColor = new Color(0xffffff);

		const hemiLight = new HemisphereLight(0xffffff, 0xffffff, 0.6);
		hemiLight.color.setHSL(0.6, 1, 0.6);
		hemiLight.groundColor.setHSL(0.095, 1, 0.75);
		hemiLight.position.set(0, 50, 0);
		this.add(hemiLight);

		const dirLight = new DirectionalLight(0xffffff, 1);
		dirLight.color.setHSL(0.1, 1, 0.95);
		dirLight.position.set(-1, 1.75, 1);
		dirLight.position.multiplyScalar(30);

		dirLight.castShadow = true;

		dirLight.shadow.mapSize.width = 2048;
		dirLight.shadow.mapSize.height = 2048;

		const d = 50;

		dirLight.shadow.camera.left = -d;
		dirLight.shadow.camera.right = d;
		dirLight.shadow.camera.top = d;
		dirLight.shadow.camera.bottom = -d;

		dirLight.shadow.camera.far = 3500;
		dirLight.shadow.bias = -0.0001;
		this.add(dirLight);

		const vertexShader = document.getElementById('vertexShader').textContent;
		const fragmentShader = document.getElementById('fragmentShader').textContent;
		const uniforms = {
			topColor: { value: new Color(0x0077ff) },
			bottomColor: { value: this.bottomColor },
			offset: { value: 33 },
			exponent: { value: 0.6 },
		};
		uniforms['topColor'].value.copy(hemiLight.color);

		const skyGeo = new SphereGeometry(4000, 32, 15);
		const skyMat = new ShaderMaterial({
			uniforms: uniforms,
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			side: BackSide,
		});

		const mesh = new Mesh(skyGeo, skyMat);
		this.add(mesh);
	}
}

class Ground extends Object3D {
	constructor() {
		super();

		const groundGeo = new PlaneGeometry(10000, 10000);
		const groundMat = new MeshLambertMaterial({ color: 0xffffff });
		groundMat.color.setHSL(0.095, 1, 0.75);

		const ground = new Mesh(groundGeo, groundMat);
		ground.position.y = -33;
		ground.rotation.x = -Math.PI / 2;
		ground.receiveShadow = true;
		this.add(ground);
	}
}

const scene = new Scene();
scene.background = new Color().setHSL(0.6, 0, 1);
scene.fog = new Fog(scene.background, 1, 5000);

const sky = new Sky();
scene.fog.color.copy(sky.bottomColor);
scene.add(sky);

const ground = new Ground();
scene.add(ground);

export default scene;
