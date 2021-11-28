import { writable } from 'svelte-local-storage-store';
 
// First param `auth` is the local storage key.
// Second param is the initial value.
const auth = writable('auth', {
	token: '',
	// email: '',
	// full_name: '',
});


export default auth;

