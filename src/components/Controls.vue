<template>
	<button @click="makeBox">make box</button>
	<button @click="exportSelected">export selected</button>
	<button @click="exportFactory">export scene</button>
	<button @click="importFiles">import files</button>
	<button @click="toggleFloor">toggle floor</button>
</template>

<script setup>
	import { Object3D } from 'three';
	import { PRIMITIVES } from '../engine/primitives';

	const { factory, floor, selected } = defineProps({ factory: Object3D, floor: Object3D, selected: Object });
	const emit = defineEmits(['spawned', 'loadStarted', 'loaded', 'loadEnded']);

	function makeBox() {
		const cubeMesh = factory.instantiate(PRIMITIVES.BOX);
		emit('spawned', cubeMesh);
	}

	function exportSelected() {
		const json = selected.value.toJSON();
		const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(json));
		const dlAnchorElem = document.getElementById('downloadAnchorElem');
		dlAnchorElem.setAttribute('href', dataStr);
		dlAnchorElem.setAttribute('download', 'world.json');
		dlAnchorElem.click();
	}

	function exportFactory() {
		const json = factory.toJSON();
		const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(json));
		const dlAnchorElem = document.getElementById('downloadAnchorElem');
		dlAnchorElem.setAttribute('href', dataStr);
		dlAnchorElem.setAttribute('download', 'world.json');
		dlAnchorElem.click();
	}

	function importFiles() {
		const fileInput = document.getElementById('fileImporter');
		fileInput.addEventListener('change', onFilesImported);
		fileInput.click();
	}

	function onFilesImported(e) {
		const files = Array.from(e.target.files);
		files.map((file) => {
			const coercedType = file.name.split('.').pop();
			const reader = new FileReader();
			reader.onloadstart = (e) => emit('loadStarted', e);
			reader.onload = (e) => emit('loaded', e, file.type, coercedType);
			reader.onloadend = emit('loadEnded', e);

			reader.readAsArrayBuffer(file);
		});
	}

	function toggleFloor() {
		floor.visible = !floor.visible;
	}
</script>

<style scoped></style>
