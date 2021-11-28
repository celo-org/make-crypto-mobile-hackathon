<script>
export let currentRoute;


import Navbar from 'layouts/auth/Navbar.svelte';


import { auth } from 'store/index.js';


import { Route, navigateTo } from 'svelte-router-spa';
import { onMount } from 'svelte';
import { get } from 'svelte/store';


const token = get(auth).token;
const params = {};


onMount(() => {
	if (token) navigateTo('/logged-in');
});

</script>


<style>

#auth-layout {
	
}

</style>


<!-- <Navbar /> -->
<div id="auth-layout" class="layout">
	<Route {currentRoute} {params} />
</div>




