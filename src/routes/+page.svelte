<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Icon from '@iconify/svelte';

	let loading = true;
	let sessionEnded = false;
	let isWithdrawing = false;
	let finalTranscript = '';
	let recognizing = false;
	let isSpeaking = false;
	let voicePromt = '';
	let recognizer: any;
	let voices: SpeechSynthesisVoice[] = [];
	let balance = 45000;
	let selectedVoiceIndex = 0;
	let errorMessage = '';
	let welcomeMsg = 'Welcome back, Mr Mattew';
	let balanceMsg = `Your account balance, is ${balance} naira`;
	let repeatMsg = 'I could not understand what you said, Kindly repeat it';
	let instructionsMsg =
		'This is a voice-enabled ATM service. Please listen to the following instructions:\n' +
		'1. To speak, press down on your screen.\n' +
		'2. To end the session, press down on your screen and say CANCEL.\n' +
		'3. To repeat instruction, press down on your screen key and say REPEAT INSTRUCTION.\n' +
		'4. To withdraw money, press down on your screen key and say WITHDRAW then the amount you want to withdraw.\n' +
		'5. To deposite money, press down on your screen key and say DEPOSITE then the amount you want to deposite.\n' +
		'6. To know your account balance, press down on your screen key and say BALANCE.\n';

	onMount(() => {
		if (typeof window !== 'undefined') {
			initSpeechRecognition();
			window.addEventListener('keydown', handleKeydown);
			window.addEventListener('keyup', handleKeyup);

			if ('speechSynthesis' in window) {
				const loadVoices = () => {
					voices = speechSynthesis.getVoices();
					loading = false;
					console.log('Hello');
					// Optionally say welcomeMsg and instructionsMsg
					sayIt(welcomeMsg).then(() => sayIt(instructionsMsg));
				};

				// Load voices when available
				loadVoices();
				// Add event listener in case voices are loaded later
				speechSynthesis.addEventListener('voiceschanged', loadVoices);
			}
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			// Remove event listeners when the component is destroyed
			window.removeEventListener('keydown', handleKeydown);
			window.removeEventListener('keyup', handleKeyup);
		}
	});

	async function sayIt(msg: string): Promise<void> {
		if (!loading) {
			isSpeaking = true;
			return new Promise<void>((resolve) => {
				let u = new SpeechSynthesisUtterance(msg);
				u.voice = voices[selectedVoiceIndex];

				// Resolve the promise when speaking ends
				u.onend = () => {
					resolve();
					isSpeaking = false;
				};

				u.onerror = (event) => {
					console.error('SpeechSynthesisUtterance error:', event);
					resolve(); // Ensure promise resolves even if there's an error
					isSpeaking = false;
				};

				speechSynthesis.speak(u);
			});
		}
	}

	function promotState() {
		if (finalTranscript !== '') {
			voicePromt = finalTranscript;
			console.log('CALL: ', voicePromt);
		}
	}

	function initSpeechRecognition() {
		if (typeof window !== 'undefined') {
			if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
				const SpeechRecognition =
					window.SpeechRecognition || (window as any).webkitSpeechRecognition;
				recognizer = new SpeechRecognition();

				recognizer.continuous = true;
				recognizer.interimResults = true;
				recognizer.lang = 'en-US';

				recognizer.onstart = () => {
					recognizing = true;
					console.log('Speech recognition started.');
				};

				recognizer.onresult = async (event: any) => {
					let interimTranscript = '';
					let finalTranscriptUpdate = '';
					// Add a delay of 500 milliseconds
					await new Promise((resolve) => setTimeout(resolve, 500));
					for (let i = event.resultIndex; i < event.results.length; i++) {
						const result = event.results[i];
						if (result.isFinal) {
							finalTranscriptUpdate += result[0].transcript;
						} else {
							interimTranscript += result[0].transcript;
						}
					}
					// Update finalTranscript with final results only
					finalTranscript = finalTranscript + finalTranscriptUpdate;
					promotState();
				};

				recognizer.onerror = (event: any) => {
					console.error('Speech recognition error:', event.error);
				};

				recognizer.onend = () => {
					recognizing = false;
					console.log('Speech recognition ended.');
				};
			} else {
				errorMessage = 'SpeechRecognition API is not supported in this browser.';
			}
		}
	}

	function startRecognition() {
		finalTranscript = ''; // Clear previous results
		if (recognizer && !recognizing) {
			if (isSpeaking) {
				speechSynthesis.cancel();
			}
			recognizer.start();
		}
	}

	async function stopRecognition() {
		if (recognizer && recognizing) {
			// Add a delay of 500 milliseconds
			await new Promise((resolve) => setTimeout(resolve, 500));
			recognizer.stop();
			recognizing = false;
		}
	}

	async function withdrawPrompt() {
		var prompt = finalTranscript
			.toLocaleLowerCase()
			.replace('withdraw', '')
			.replace('naira', '')
			.replace(',', '');

		var amount = parseFloat(prompt);

		if (amount) {
			if (balance > amount) {
				sayIt(`Processing ${amount} naira .....`).then(async () => {
					await new Promise((resolve) => setTimeout(resolve, 500));
					await sayIt('You can take your money.');
					await sayIt(`Your account balance is ${balance} naira`);
				});
				balance = balance - amount;
			} else {
				sayIt('Insufficient funds');
			}
		} else {
			sayIt('Invalid amount');
		}
	}

	async function depositPrompt() {
		var prompt = finalTranscript
			.toLocaleLowerCase()
			.replace('deposite', '')
			.replace('deposites', '')
			.replace('deposit', '')
			.replace('naira', '')
			.replace(',', '');

		var amount = parseFloat(prompt);

		if (amount) {
			sayIt(`Depositing ${amount} naira .....`).then(async () => {
				await new Promise((resolve) => setTimeout(resolve, 500));
				balance += amount;
				await sayIt(`Your account balance is ${balance} naira`);
			});
		} else {
			sayIt('Invalid amount');
		}
	}

	$: {
		if (!isSpeaking && !recognizing && finalTranscript !== '') {
			let prompt = finalTranscript.toLocaleLowerCase();

			switch (true) {
				case prompt == 'cancel':
					sayIt('Session Ended');
					sessionEnded = true;
					break;

				case prompt == 'start' || 'starts':
					sayIt(welcomeMsg).then(() => {
						sayIt(instructionsMsg);
					});
					sessionEnded = true;
					break;
				case prompt == 'repeat instruction':
					sayIt(instructionsMsg);
					break;

				case prompt == 'balance' || 'acccount balance':
					sayIt(balanceMsg);
					break;

				case prompt.includes('withdraw') || prompt.includes('withdraws'):
					withdrawPrompt();
					break;

				case prompt.includes('deposite') ||
					prompt.includes('deposites') ||
					prompt.includes('deposit'):
					depositPrompt();
					break;

				default:
					sayIt(repeatMsg);
					sessionEnded = true;
					break;
			}

			// Clear finalTranscript after processing the command
			finalTranscript = '';
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		finalTranscript = '';
		startRecognition();
		// You can add your logic here to handle specific key presses
	}

	function handleKeyup(event: KeyboardEvent) {
		stopRecognition();
	}
</script>

<div
	class="variant-soft-surface h-full w-full flex flex-col justify-center items-center gap-5"
	on:pointerdown={startRecognition}
	on:pointerup={stopRecognition}
>
	<p class="h1">Welcome back 👋</p>
	<p class="h3">Mr Mattew</p>
	<Icon
		icon="fluent:mic-pulse-48-filled"
		width="4em"
		height="4em"
		class="text-primary-500 {recognizing ? 'animate-pulse text-red-500' : ''} {isSpeaking
			? 'animate-pulse text-red-400'
			: ''}"
	/>

	<div class="flex flex-row items-center justify-center gap-2">
		<p class="font-medium">Voice:</p>
		<select
			class="form-select input block text-white mt-1 rounded-md shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
			bind:value={selectedVoiceIndex}
			disabled={loading}
		>
			{#each voices as voice, i}
				<option value={i}>{voice.name} ({voice.lang})</option>
			{/each}
		</select>
	</div>

	<p class=" text-white">{voicePromt}</p>

	<!-- <button class=" btn btn-sm variant-outline-primary" on:click={startRecognition}
		>Start Speech Recognition</button
	>
	<button class=" btn btn-sm variant-outline-error" on:click={stopRecognition}
		>Stop Speech Recognition</button
	> -->

	<!-- Display the error message if any -->
	{#if errorMessage}
		<p class="text-red-500">{errorMessage}</p>
	{/if}
</div>

<style>
	/* Add your styles here */
	.btn-primary {
		background-color: #007bff;
		color: white;
		border: none;
		padding: 0.5em 1em;
		border-radius: 0.25em;
		cursor: pointer;
	}
	.btn-primary:hover {
		background-color: #0056b3;
	}
</style>
