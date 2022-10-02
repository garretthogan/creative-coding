import * as THREE from 'three';

const intensity = 1;
const color = 0xffffff;
export const directionalLight = new THREE.DirectionalLight(color, intensity).clone();
directionalLight.position.set(0, 10, 0);
directionalLight.target.position.set(-5, 0, 0);

const skyColor = 0xb1e1ff;
const groundColor = 0xb97a20;
export const hemiLight = new THREE.HemisphereLight(skyColor, groundColor, intensity / 2).clone();

const ambientColor = 0xbc20b6;
export const ambientLight = new THREE.AmbientLight(ambientColor, intensity / 2).clone();
