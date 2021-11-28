<script>
export let currentRoute;

import Form from 'components/forms/views/auth/login/Form.svelte';


let next_link = '';

if (currentRoute.queryParams.next_link) {
	next_link = currentRoute.queryParams.next_link;
}

</script>


<style>

.hero-title {
	/*color: #000;*/
}

</style>


<section class="hero">

	<div class="hero-body" style="padding-bottom: 0;">

		<div class="container">

			<img src="/cgp_logo.jpeg" style="height: auto; width: 100%; display: block; margin: 0 auto;">

		</div>

	</div>

</section>


<section class="section">

	<div class="container">

		<div class="columns is-centered">

			<div class="column is-5-desktop is-8-tablet is-12-mobile">

				<Form {next_link} />

			</div>

		</div>

	</div>

</section>



