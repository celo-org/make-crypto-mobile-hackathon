<script>
export let currentRoute;


import Loading from 'components/elements/Loading.svelte';

import { auth } from 'store/index.js';
import { get } from 'svelte/store';


import SendForm from 'components/forms/views/dashboard/send/Form.svelte';


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
		throw new Error('Error!');
	}

	return result;

}

let promise = Promise.all([
	getBalance(),
]);


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

			<i class="fas fa-circle-notch fa-spin" style="text-align: center; color: #aaa; width: 100%; font-size: 1.5rem; margin-left: 0.5rem;"></i>

		</div>

	</div>

</section>

{:then data}

<section class="section">

	<div class="container">

		<p class="text has-text-centered" style="color: #1c1c1c; font-weight: 500;">
			Send Red Pocket
		</p>

		<br>

		<SendForm />

		<!-- <div class="field">

			<div class="control">

				<a href="#">
					Account Settings
				</a>

			</div>

		</div>
 -->
	</div>

</section>

{:catch error}

error.

{/await}

