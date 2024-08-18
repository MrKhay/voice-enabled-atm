<script lang="ts">
	import '../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import Icon from '@iconify/svelte';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<div class=" h-lvh w-lvh flex flex-col card justify-center align-middle items-center">
	<p class=" h1 m-5 font-bold font-serif">Voice Enabled ATM</p>
	<div class=" h-3/4 w-3/4 outline-primary-500 outline-8 outline">
		<slot />
	</div>
	<div class=" m-5 flex flex-row py-5 w-3/4 gap-5 justify-center items-center">
		<div class=" rounded-full variant-filled-primary h-4 w-4"></div>
		<div class=" h-3 w-96 rounded-sm variant-filled-primary"></div>
		<div class=" rounded-full variant-filled-primary h-4 w-4"></div>
	</div>
	<Icon icon="ic:twotone-atm" width="1.2em" height="1.2em" />
</div>
