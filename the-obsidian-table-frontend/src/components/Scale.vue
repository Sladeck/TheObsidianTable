<script setup lang="ts">

	const props = defineProps<{
		title: string
		score: number
		max?: number
	}>()

	const lerpColor = (from: string, to: string, t: number) => {
		const parse = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
		const [fr, fg, fb] = parse(from)
		const [tr, tg, tb] = parse(to)
		const mix = (a: number, b: number) => Math.round(a + (b - a) * t)
		return `rgb(${mix(fr, tr)}, ${mix(fg, tg)}, ${mix(fb, tb)})`
	}

	const getBlockStyle = (i: number) => {
		const color = lerpColor('#7B61FF', '#C0C1FF', (i - 1) / 9)

		if (i < Math.floor(props.score) + 1) {
			// fully filled
			return { background: color }
		} else if (i === Math.floor(props.score) + 1) {
			// partial block
			const partial = (props.score % 1) * 100
			return {
				background: `linear-gradient(to right, ${color} ${partial}%, var(--Stroke) ${partial}%)`
			}
		} else {
			// empty
			return { background: 'var(--Stroke)' }
		}
	}
</script>

<template>
	<div class="score-scale">
		<div class="header">
			<span class="title">{{ title }}</span>
			<span class="score gradient-text">{{ score }}</span>
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
			color: var(--WhiteAshes);
			font-size: 12px;
		}

		.score {
			font-family: 'Geist', sans-serif;
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