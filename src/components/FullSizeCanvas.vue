<template>
	<div id="full-size-container"></div>
</template>

<script setup>
	import { onMounted } from '@vue/runtime-core';
	import scene from '../beach';
	import DebugBox from '../DebugBox';
	import camera from '../utils/camera';
	import renderer from '../utils/renderer';

	onMounted(() => {
		const container = document.getElementById('full-size-container');
		container.appendChild(renderer.domElement);

		const debugBox = new DebugBox();
		scene.add(debugBox);

		camera.position.set(0, 0, 250);

		update();
	});

	function update() {
		requestAnimationFrame(update);
		renderer.render(scene, camera);
	}
</script>

<style scoped></style>
