<script>
export let currentRoute;


import Loading from 'components/elements/Loading.svelte';


import { Navigate } from 'svelte-router-spa';


import { auth } from 'store/index.js';


import { get } from 'svelte/store';
import SvelteSeo from 'svelte-seo';



const api_url = app_.env.API_URL;
const token = get(auth).token;


async function getBalance() {

	const url = `${api_url}/_dashboard/balance`;

	const resp = await fetch(url, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const result = await resp.json();

	if (!resp.ok) {
		throw new Error(result.detail);
	}

	return result;
}


let promise = Promise.all([
	getBalance(),
]);


let connected_wallet = false;


</script>


<style>

</style>


{#if !connected_wallet}

<section class="section">

	<div class="container">

		<img src="/cgp_logo.jpeg" style="height: auto; width: 100%; display: block; margin: 0 auto;">

		<br>

		<p class="text has-text-centered">
			Kindly connect you Valora Wallet
		</p>


		<br>
		<br>
		<br>


		<div class="button is-white" style="border: blue; display: block; margin: 0 auto; max-width: 100%;" on:click={() => { connected_wallet = true}}>
			<img src="https://valoraapp.com/_next/static/images/icon-62b90ddabe4910b9c5d55ecabf817aa8.png" height="16" width="16" style="margin-right: 1.5rem;">
			Connect Valora Wallet
		</div>

	</div>

</section>

{:else}

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

<section class="section">

	<div class="container">


		<div class="card" style="background: #243de2 !important;">

			<div class="card-content">

				<div class="columns is-mobile is-variable is-3 is-vcentered">

					<div class="column is-narrow">

						<img src="https://thumbs.dreamstime.com/b/flat-square-icon-cute-crocodile-teeth-red-background-wilderness-nature-logo-great-avatar-61506088.jpg" style="border-radius: 50%; border: 2px solid #fff; height: 64px; width: 64px;">

					</div>

					<div class="column">

						<p class="text" style="color: #fff; font-weight: 500; margin-bottom: 0.5rem;">Test User</p>

						<p class="text" style="color: #fff; font-weight: 400; margin-bottom: 0rem;">@test</p>

					</div>

				</div>

			</div>

		</div>

		<br>

		<br>

		<div class="field">

			<div class="control">

				<label>Account Balance</label>

				<input class="input" readonly value="{data[0].balance} CELO" style="color: blue;">

			</div>

		</div>

		<br>

		<div class="field">

			<div class="control">

				<label style="color: #101010;">Things to do</label>

				<Navigate styles='button is-white' to='/dashboard/send'>
					Send Gold Packet
				</Navigate>

				<br>

				<Navigate styles='button is-white' to='#'>
					Withdraw
				</Navigate>

			</div>

		</div>

		

	</div>

</section>

{:catch error}

error

{/await}

{/if}

