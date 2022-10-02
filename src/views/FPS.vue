<template></template>

<script setup>
	import { onMounted } from '@vue/runtime-core';
	import { ExploreGame } from '../engine/ExploreGame';

	onMounted(() => {
		const exploreGame = new ExploreGame();
		exploreGame.startExploreWorld();
	});
</script>

<style scoped></style>
