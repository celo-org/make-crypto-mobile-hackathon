import { writable, derived } from 'svelte/store';



const valora = writable('valora', {
	provider: null,
	kit: null,
});


export default valora;

