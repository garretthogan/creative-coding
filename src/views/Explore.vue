<template></template>

<script setup>
	import { onMounted } from '@vue/runtime-core';
	import { ExploreGame } from '../engine/ExploreGame';

	const exploreGame = new ExploreGame();
	onMounted(() => {
		exploreGame.startExploreWorld();
	});
</script>

<style scoped></style>
