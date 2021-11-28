<script>
export let currentRoute;


import { Navigate } from 'svelte-router-spa';

import { onMount } from 'svelte';

// import ModalValora from 'components/elements/ModalValora.svelte';
// countdown

let loading = true;


async function later() {
	await setTimeout(function(){ loading = false; }, 2000);
}

onMount(async() => {
	await later();
});

</script>


<style>

.hero {
	/*background-color: #000;*/
}

.hero-title {
	/*color: #fff;*/
}

.hero-subtitle {
	font-size: 1.25rem;
	margin-bottom: 1rem;
	color: #8a8a8a;
}


:global(.button.is-centered) {
	display: block;
	/*width: fit-content;*/
	max-width: 300px;
	margin: 0 auto;
	border-radius: 0.55rem;
}

</style>


<!-- <ModalValora is_active={true} /> -->


{#if loading}

<section class="hero">

	<div class="hero-body">

		<div class="container">

			<img src="/cgp_logo.jpeg" style="height: auto; width: 100%; display: block; margin: 0 auto;">

			<br>
			<br>

			<i class="fas fa-circle-notch fa-spin" style="text-align: center; color: #aaa; width: 100%; font-size: 1.5rem;"></i>

		</div>

	</div>

</section>

{:else}

<section class="hero is-fullheight">

	<div class="hero-body">

		<div class="container" style="max-width: 960px;">

			<img src="/cgp_logo.jpeg" style="height: auto; width: 100%; display: block; margin: 0 auto;">

			<p class="hero-subtitle has-text-centered">
				Send gifts randomly to people through the blockchain.
			</p>

			
			<!-- <img src="" style="display: block;"> -->

			<!-- <br> -->

			<br>

			<br>

			<Navigate styles="button is-blue is-centered" to='#'>
				Get Started
			</Navigate>

			<br>

			<Navigate styles="button is-white is-centered" to='/login?next_link=/dashboard/home'>
				Login
			</Navigate>

			
			<br>
			<br>
			<br>

			<p class="text has-text-centered">
				By selecting one or the other, you are agreeing to the <a href="#">Terms of Service</a> & <a href="#">Privacy Policy</a>
			</p>


		</div>

	</div>

</section>

{/if}


