<script setup lang="ts">

	const props = defineProps<{
		title: string
		score: number
		max?: number
	}>()

	const getBlockStyle = (i: number) => {
		if (i < Math.floor(props.score) + 1) {
			// fully filled
			return { background: `linear-gradient(to top, #5C0F8B, #8B5BA8)` }
		} else if (i === Math.floor(props.score) + 1) {
			// partial block
			const partial = (props.score % 1) * 100
			return {
				background: `linear-gradient(to right, transparent ${partial}%, #2a2a2a ${partial}%),
							linear-gradient(to top, #5C0F8B, #8B5BA8)`
			}
		} else {
			// empty
			return { background: '#2a2a2a' }
		}
	}
</script>

<template>
	<div class="score-scale">
		<div class="header">
			<span class="title">{{ title }}</span>
			<span class="score">{{ score }}</span>
		</div>
		<div class="blocks">
			<div
				v-for="i in 10"
				:key="i"
				class="block"
				:class="{ 'block-filled': i <= Math.round(score) }"
				:style="getBlockStyle(i)"
			></div>
		</div>
	</div>
</template>


<style>
	.score-scale {
		display: flex;
		flex-direction: column;

		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.title {
			font-family: 'Geist', 'Inter', sans-serif;
			color: var(--color-title);
			font-size: 12px;
		}

		.score {
			font-family: 'Geist', sans-serif;
			color: var(--color-score);
			font-size: 20px;
			font-weight: 500;
		}

		.blocks {
			display: flex;
  			gap: 3px;

			.block {
				flex: 1;
				height: 28px;
				width: calc(100% / 10);
				border-radius: 2px;
			}
		}
	}
</style>