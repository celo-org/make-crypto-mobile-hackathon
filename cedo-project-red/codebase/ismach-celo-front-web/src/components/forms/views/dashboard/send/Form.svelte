<script>
export let msg_show;
export let msg_text;
export let msg_type;
// export let balance;


import { auth } from 'store/index.js';


import { get } from 'svelte/store';
import { createForm } from 'svelte-forms-lib';
import * as yup from 'yup';
import { navigateTo, Navigate } from 'svelte-router-spa';

import { onMount } from 'svelte';


import FormFieldError from 'components/forms/FormFieldError.svelte';



const api_url = app_.env.API_URL;

const token = get(auth).token;

// const hcaptcha_site_key = app_.env.HCAPTCHA_SITE_KEY;

let loading = false;


let packet_sent = false;

let link = '';


const {
	form,
	errors,
	state,
	// handleBlur,
	handleChange,
	handleSubmit,
	setField,
} = createForm({
	initialValues: {
		celo_value_amount: '',
		recipients_amount: '',
		message: '',
	},
	validationSchema: yup.object().shape({
		celo_value_amount: yup
			.number()
			.required('Amount'),
		recipients_amount: yup
			.number()
			.required(),
		message: yup
			.string()
			.required(),
	}),
	onSubmit: values => {

		loading = true;

		let body_data = JSON.stringify(values);

		submitForm(body_data).then(data => {

			// alert('Packet Sent!');

			packet_sent = true;
			link = data.link;
			// navigateTo!...

		}).catch(error => {

			console.log(error);
			alert('Error!');
			// msg_type = 'error';
			// msg_show = true;

		}).finally(() => {

			loading = false;

		});
		
	}
});


async function submitForm(body_data) {

	const url = `${api_url}/_sender/pockets`;

	const resp = await fetch(url, {
		method: 'POST',
		body: body_data,
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});

	const result = await resp.json();

	console.log(result);

	if (!resp.ok) {
		msg_text = result.detail;
		throw new Error('Error!');
	}

	return result;

}


</script>


<style>

form {

}

</style>


<form on:submit={handleSubmit}>

	{#if !packet_sent}

	<div class="field">

		<div class="control">

			<label>Amount</label>

			<input placeholder="Celo Packet Amount" class="input" type="number" id="celo_value_amount" name="celo_value_amount" on:change={handleChange} bind:value={$form.celo_value_amount}>

			{#if $errors.celo_value_amount}
				<FormFieldError detail={$errors.celo_value_amount} />
			{/if}

		</div>

	</div>

	<div class="field">

		<div class="control">

			<label>Number of Recipients</label>

			<input placeholder="Total Recipients" class="input" type="number" id="recipients_amount" name="recipients_amount" on:change={handleChange} bind:value={$form.recipients_amount}>

			{#if $errors.recipients_amount}
				<FormFieldError detail={$errors.recipients_amount} />
			{/if}

		</div>

	</div>


	<div class="field">

		<div class="control">

			<label>Description</label>

			<input placeholder="Message" class="input" type="text" id="message" name="message" on:change={handleChange} bind:value={$form.message}>

			{#if $errors.message}
				<FormFieldError detail={$errors.message} />
			{/if}

		</div>

	</div>


	<div class="field">

		<div class="control">

			<label>Password</label>

			<input placeholder="Password" class="input" type="password">

		</div>

	</div>

	<div class="field is-grouped">

		<div class="control">

			<button  class="button is-blue">
				<span>Create Packet</span>
				<i class="fas fa-circle-notch fa-spin" class:is-hidden={!loading} style="margin-left: 1rem; display: block;"></i>
			</button>

		</div>

	</div>

	{:else}

	<div class="field">

		<div class="control">

			<label>Red Pocket Link</label>

			<input type="" name="" class="input" readonly value="https://ismach-celo-front-web.vercel.app/dashboard/packet/{link}">

		</div>

	</div>

	<br>
	<br>


	<div class="field">

		<div class="control">

			<div class="button is-white">
				<i class="fab fa-whatsapp" style="margin-right: 1rem;"></i>
				<span>Share to Whatsapp</span>
			</div>

		</div>

	</div>


	<div class="field">

		<div class="control">

			<div class="button is-white">
				<i class="fab fa-twitter" style="margin-right: 1rem;"></i>
				<span>Share to Twitter</span>
			</div>

		</div>

	</div>


	<div class="field">

		<div class="control">

			<div class="button is-white">
				<i class="fab fa-facebook" style="margin-right: 1rem;"></i>
				<span>Share to Facebook</span>
			</div>

		</div>

	</div>


	<div class="field is-grouped">

		<div class="control">

			<div class="button is-blue">
				<span>Copy Link</span>
			</div>

		</div>

	</div>


	{/if}

</form>

