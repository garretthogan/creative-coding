<template>
	<div class="button-container">
		<router-link to="/explore"><button></button></router-link>
	</div>
</template>

<script setup>
	import { onMounted, onUnmounted } from '@vue/runtime-core';
	import { PlanetGenerator } from '../engine/PlanetGenerator.js';
	const generator = new PlanetGenerator();
	onMounted(() => {
		generator.startPlanetGenerator();
	});
	onUnmounted(() => {
		generator.destroy();
	});
</script>

<style scoped>
	.button-container {
		position: absolute;
		left: calc(50vw - 256px);
		top: calc(50vh - 256px);
		z-index: 1;
	}

	button {
		border-radius: 256px;
		cursor: pointer;
		width: 512px;
		height: 512px;
		opacity: 0;
	}
</style>
