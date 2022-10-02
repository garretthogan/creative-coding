import { sRGBEncoding, WebGLRenderer } from 'three';

const renderer = new WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = sRGBEncoding;
renderer.shadowMap.enabled = true;
export default renderer;
