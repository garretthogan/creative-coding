import {
	BoxGeometry,
	DoubleSide,
	Mesh,
	MeshPhongMaterial,
	NearestFilter,
	PlaneGeometry,
	RepeatWrapping,
	SphereGeometry,
	TextureLoader,
} from 'three';

export const PRIMITIVES = { SPHERE: 'sphere', BOX: 'box' };

const boxSize = 4;
const boxSegments = 4;
const boxGeometry = new BoxGeometry(boxSize, boxSize, boxSize, boxSegments, boxSegments, boxSegments);
const boxMaterial = new MeshPhongMaterial({ color: '#8ac' });

export const box = new Mesh(boxGeometry, boxMaterial).clone();

const sphereRadius = 3;
const sphereWidthSegments = 32;
const sphereHeightSegments = 16;
const sphereGeometry = new SphereGeometry(sphereRadius, sphereWidthSegments, sphereHeightSegments);
const sphereMaterial = new MeshPhongMaterial({ color: '#ca8' });

export const sphere = new Mesh(sphereGeometry, sphereMaterial).clone();

const planeSize = 40;

const loader = new TextureLoader();
const texture = loader.load('checker.png');
texture.wrapS = RepeatWrapping;
texture.wrapT = RepeatWrapping;
texture.magFilter = NearestFilter;
const repeats = planeSize / 2;
texture.repeat.set(repeats, repeats);

const planeGeo = new PlaneGeometry(planeSize, planeSize);
const planeMat = new MeshPhongMaterial({ map: texture, side: DoubleSide });
export const floor = new Mesh(planeGeo, planeMat).clone();
