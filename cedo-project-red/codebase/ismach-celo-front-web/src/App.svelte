<script>
import { Router } from 'svelte-router-spa';
import { routes } from './router';


</script>


<style>
	
main {
	min-height: calc(100vh - var(--navbar-height));
	margin-top: var(--navbar-height);;
}

</style>


<main>
	<Router {routes} />
</main>


