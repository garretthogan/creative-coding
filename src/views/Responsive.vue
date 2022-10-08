<template>
	<div class="control-panel">
		<Controls
			:factory="world.factory"
			:floor="world.floor"
			:selected="world.selected"
			@load-started="onLoadStart"
			@loaded="onLoad"
			@load-ended="onLoadEnd"
			@spawned="onObjectSpawned"
		/>
	</div>
	<canvas id="c"></canvas>
</template>

<script setup>
	import { onMounted } from '@vue/runtime-core';
	import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
	import RenderingContext from '../engine/RenderingContext.js';
	import World from '../engine/World.js';
	import { Clock, ObjectLoader } from 'three';
	import { TransformControls } from 'three/addons/controls/TransformControls.js';
	import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
	import Controls from '../components/Controls.vue';
	import { ref } from 'vue';

	const selected = ref(null);

	const clock = new Clock();
	const world = new World();

	const JSON_TYPE = 'application/json';
	const GLB = 'glb';
	const GLTF = 'gltf';

	const KEYCODES = {
		BracketRight: 'bracketright',
		BracketLeft: 'bracketleft',
		Backquote: 'Backquote',
		KeyE: 'KeyE',
		KeyQ: 'KeyQ',
		KeyW: 'KeyW',
		KeyR: 'KeyR',
	};

	let transformController;
	onMounted(() => {
		document.addEventListener('keyup', onKeyUp);
		const gui = new GUI();
		const folder = gui.addFolder('lighting rig');
		folder.close();

		world.lighting.mountControls(folder);

		const renderingContext = new RenderingContext('c');
		renderingContext.render(world);

		const render = (time) => {
			time *= 0.001; // convert time to seconds

			const STEPS_PER_FRAME = 5;
			const deltaTime = Math.min(0.05, clock.getDelta()) / STEPS_PER_FRAME;
			renderingContext.render(world);

			requestAnimationFrame(render);
		};

		transformController = new TransformControls(renderingContext.player, renderingContext.renderer.domElement);
		//transformController.addEventListener('change', render);
		world.add(transformController);

		requestAnimationFrame(render);
	});

	// control panel

	function onObjectSpawned(obj) {
		const boxSize = 4;
		obj.position.set(boxSize + 1, boxSize / 2, 0);
		selectedChild = world.factory.children.length - 1;
		transformController.attach(obj);
		world.selected.value = obj;
	}

	////

	// function onFilesImported(e) {
	// 	const files = Array.from(e.target.files);
	// 	files.map((file) => {
	// 		const coercedType = file.name.split('.').pop();
	// 		const reader = new FileReader();
	// 		reader.onloadstart = onLoadStart;
	// 		reader.onload = (e) => onLoad(e, file.type, coercedType);
	// 		reader.onloadend = onLoadEnd;

	// 		reader.readAsArrayBuffer(file);
	// 	});
	// }

	function onLoadStart(e) {
		const buffer = e.currentTarget.result;
	}

	async function onLoad(e, type, coercedType) {
		let actualType = coercedType;
		if (type !== '') {
			actualType = type;
		}

		const buffer = e.currentTarget.result;
		const rawText = new TextDecoder().decode(buffer);
		let parent = null;
		switch (actualType) {
			case JSON_TYPE:
				/**
				 * might need a class to encapsulate
				 * the diff export functionality for
				 * child and parent
				 * if parent then export as single object
				 * and import as single object
				 * user can split children if they choose
				 * or just use it as is
				 *
				 * next step is to allow user to walk around
				 * in fps mode
				 *
				 * then save map to db
				 *
				 * then pull map in for a lobby of players
				 *
				 * then replicate movement so everyone can see each other
				 */
				const jsonResult = JSON.parse(rawText);
				const objLoader = new ObjectLoader();
				const obj = objLoader.parse(jsonResult);
				const children = obj.children;
				// might eventually do something custom for
				// scenes with kids
				if (false) {
					parent = obj;
					break;
				} else {
					world.factory.add(obj);
					transformController.attach(obj);
					world.selected.value = obj;
					selectedChild = world.factory.children.length - 1;
					return;
				}
			case GLB:
			case GLTF:
				const gltf = await gltfParser(buffer);
				world.factory.add(gltf.scene);
				transformController.attach(gltf.scene);
				world.selected.value = gltf.scene;
				return;
		}

		if (parent) {
			const children = parent.children;
			children.map((c) => {
				const clone = c.clone();
				world.factory.add(clone);
				transformController.attach(clone);
				world.selected.value = clone;
				selectedChild = world.factory.children.length - 1;
			});
		}
	}

	function onLoadEnd(e) {
		console.log('handle retries in here');
	}

	let selectedChild = -1;
	function onKeyUp(e) {
		const key = KEYCODES[e.code];
		switch (key) {
			case KEYCODES.BracketRight:
				selectedChild++;
				break;
			case KEYCODES.BracketLeft:
				selectedChild--;
				break;
			case KEYCODES.KeyW:
				transformController.setMode('translate');
				return;
			case KEYCODES.KeyQ:
				transformController.setMode('scale');
				return;
			case KEYCODES.KeyR:
				transformController.setMode('rotate');
				return;
			case KEYCODES.Backquote:
				transformController.setSpace(transformController.space === 'local' ? 'world' : 'local');
				console.log('control space', transformController.space);
				return;
		}

		if (selectedChild < 0) {
			selectedChild = world.factory.children.length - 1;
		} else if (selectedChild > world.factory.children.length - 1) {
			selectedChild = 0;
		}

		const attachTarget = world.factory.children[selectedChild];
		transformController.attach(attachTarget);
		world.selected.value = attachTarget;
	}

	function gltfParser(buffer) {
		const gltfLoader = new GLTFLoader();
		return new Promise((resolve, reject) => {
			gltfLoader.parse(buffer, '', resolve, reject);
		});
	}
</script>

<style scoped>
	#c {
		width: 100%;
		height: 100%;
		display: block;
	}
	.control-panel {
		position: absolute;
		left: 48px;
	}
</style>
