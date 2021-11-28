<script>
export let msg_show;
export let msg_text;
export let msg_type;
export let next_link;


import { auth } from 'store/index.js';


import { get } from 'svelte/store';
import { createForm } from 'svelte-forms-lib';
import * as yup from 'yup';
import { navigateTo, Navigate } from 'svelte-router-spa';

import { onMount } from 'svelte';


import FormFieldError from 'components/forms/FormFieldError.svelte';



const api_url = app_.env.API_URL;
// const hcaptcha_site_key = app_.env.HCAPTCHA_SITE_KEY;

let loading = false;



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
		username: '',
		password: '',
	},
	validationSchema: yup.object().shape({
		username: yup
			.string()
			.required('Username required!'),
		password: yup
			.string()
			.required('Password required!'),
	}),
	onSubmit: values => {

		// alert('...');

		loading = true;

		let form_data = new FormData();

		form_data.append('username', values.username);
		form_data.append('password', values.password);

		submitForm(form_data).then(data => {

			auth.set({token: data.access_token});

			if (next_link) {
				navigateTo(next_link);
			} else {
				navigateTo('/logged-in');
			}

		}).catch(error => {

			msg_type = 'error';
			msg_show = true;

		}).finally(() => {

			loading = false;

		});
		
	}
});


async function submitForm(form_data) {

	const url = `${api_url}/_auth/access-token`;

	const resp = await fetch(url, {
		method: 'POST',
		body: form_data,
	});

	console.log(resp);

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

:global(.form-card-link) {
	text-align: center;
}

</style>


<form on:submit={handleSubmit}>

	<div class="field">

		<div class="control">

			<input placeholder="Username" class="input" type="text" id="username" name="username" on:change={handleChange} bind:value={$form.username}>

			{#if $errors.username}
				<FormFieldError detail={$errors.username} />
			{/if}

		</div>

	</div>

	<div class="field">

		<div class="control">

			<input placeholder="Password" class="input" type="password" id="password" name="password"  on:change={handleChange} bind:value={$form.password}>

			{#if $errors.password}
				<FormFieldError detail={$errors.password} />
			{/if}

		</div>

	</div>


	<div class="field is-grouped">

		<div class="control" style="width: 100%;">

			<button class="button is-blue" style="width: 100% !important; display: block !important;">
				<span>Log In</span>
				<i class="fas fa-circle-notch fa-spin" class:is-hidden={!loading}></i>
			</button>

		</div>

	</div>

	<div class="field is-grouped">

		<div class="control">

			<Navigate styles="form-card-link" to="#">
				<span>Forgot password?</span>
			</Navigate>

		</div>

	</div>

</form>

