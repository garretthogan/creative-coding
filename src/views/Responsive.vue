<template>
	<canvas id="c"></canvas>
</template>

<script setup>
	import { onMounted } from '@vue/runtime-core';
	import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
	import RenderingContext from '../engine/RenderingContext.js';
	import World from '../engine/World.js';

	onMounted(() => {
		const gui = new GUI();
		const folder = gui.addFolder('lighting rig');
		folder.close();

		const world = new World();
		world.lighting.mountControls(folder);

		const renderingContext = new RenderingContext('c');
		renderingContext.render(world);

		const render = (time) => {
			time *= 0.001; // convert time to seconds

			renderingContext.render(world);

			requestAnimationFrame(render);
		};

		requestAnimationFrame(render);
	});
</script>

<style scoped>
	#c {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>
