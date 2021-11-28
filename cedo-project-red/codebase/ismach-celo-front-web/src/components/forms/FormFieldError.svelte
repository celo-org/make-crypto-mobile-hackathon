<script>
export let detail;

</script>


<style>

.form-field-error {
	margin-top: 1rem !important;
	margin-bottom: 0 !important;
	height: unset !important;
	background: var(--bg-error) !important;
	border-color: var(--border-error) !important;
}

.card-content {
	padding: 0.325rem !important;
}

p {
	color: var(--text-dark);
}

</style>


<div class="card form-field-error">

	<div class="card-content">

		<p class="has-text-centered">
			{detail}
		</p>

	</div>

</div>




