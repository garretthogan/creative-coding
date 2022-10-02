<script setup>
	import { onMounted } from '@vue/runtime-core';
	import { sRGBEncoding, WebGLRenderer } from 'three';
	import scene from '../beach';
	import camera from '../utils/camera';
	import DebugBox from '../DebugBox';

	// width * this = height
	// 1920 * 0.563 ~= 1080
	const heightRatio = 0.563;

	// width in pixels
	defineProps({ width: { type: Number, default: 512 } });

	onMounted(() => {
		const debugBox = new DebugBox();
		camera.position.set(0, 0, 250);
		scene.add(debugBox);
		update();
	});

	let renderer;
	function onCanvasMounted(canvas) {
		renderer = new WebGLRenderer({ canvas });
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.outputEncoding = sRGBEncoding;
		renderer.shadowMap.enabled = true;
	}

	function update() {
		requestAnimationFrame(update);
		if (renderer) {
			renderer.render(scene, camera);
		}
	}
</script>

<template>
	<canvas
		:style="{ 'max-width': `${width}px`, 'max-height': `${width * heightRatio}px` }"
		:ref="onCanvasMounted"
		id="canvas"
	>
	</canvas>
</template>

<style scoped></style>
