<script>
export let currentRoute;

import Loading from 'components/elements/Loading.svelte';

import { auth } from 'store/index.js';
import { get } from 'svelte/store';


const api_url = app_.env.API_URL;
const token = get(auth).token;


let too_late = false;

async function getPacket() {

	const url = `${api_url}/_dashboard/packets/${currentRoute.namedParams.slug}`;

	const resp = await fetch(url, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const result = await resp.json();

	if (!resp.ok) {
		console.log(result);
		throw new Error('...');
	}

	return result;

}




let promise = Promise.all([
	getPacket(),
]);


// let show_it = false;


</script>


<style>

</style>



{#await promise}

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

{:then data}

{#if !show_it}

<section class="section">

	<div class="container">

		<i class="fas fa-check-square" style="width: 100%; text-align: center; font-size: 3rem; color: green;"></i>

		<br>

		<p class="text has-text-centered" style="color: #101010; font-size: 1.5rem;">
			Congratulations!
		</p>

		<p class="text has-text-centered">
			You have received <span>{data[0].amount}</span> CElO From Test User!
		</p>


		<div class="field">

			<div class="control">

				<div class="button is-blue" on:click={() => {show_it = true;}}>
					Claim
				</div>

			</div>

		</div>

		<div class="field">

			<div class="control">

				<div class="button is-blue" on:click={() => {show_it = true;}}>
					Lucky Winners
				</div>

			</div>

		</div>

	</div>

</section>

{:else}

<section class="section">

	<div class="container">


		{#each data[1].txns as txn}

		<div class="card" style="background: #243de2 !important;">

			<div class="card-content">

				<div class="columns is-mobile is-variable is-3 is-vcentered">

					<div class="column is-narrow">

						<img src="https://thumbs.dreamstime.com/b/flat-square-icon-cute-crocodile-teeth-red-background-wilderness-nature-logo-great-avatar-61506088.jpg" style="border-radius: 50%; border: 2px solid #fff; height: 36px; width: 36px;">

					</div>

					<div class="column">

						<p class="text" style="color: #fff; font-weight: 500;">Test User</p>
						<br>

						<p class="text" style="color: #fff; font-weight: 400;">@test</p>

					</div>

					<div class="column is-narrow">
						<p class="text" style="color: #fff; font-weight: 500; font-size: 1.25rem;">{txn} CELO</p>
					</div>

				</div>

			</div>

		</div>

		{/each}

	</div>

</section>

{/if}

{:catch error}

error.

{/await}
