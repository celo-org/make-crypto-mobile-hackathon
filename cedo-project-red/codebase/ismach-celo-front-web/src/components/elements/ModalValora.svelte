<script>
export let is_active;


import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';
import { newKitFromWeb3 } from '@celo/contractkit';



import { valora } from 'store/index.js';

import { onMount } from 'svelte';



onMount(async () => {

	// Remotely connect to the Alfajores testnet
	
	const provider = new WalletConnectProvider({
		rpc: {
			44787: 'https://alfajores-forno.celo-testnet.org',
		},
	});

	await provider.enable();
	const web3 = new Web3(provider);
	let kit = newKitFromWeb3(web3);

	kit.defaultAccount = provider.accounts[0];

	provider.on('accountsChanged', (accounts) => {
		console.log(accounts);
	});

	valora.set({
		provider: provider,
		kit: kit,
	})

});



</script>


<style>

</style>


<div class="modal" class:is-active={is_active}>

	<div class="modal-background">

		<div class="modal-card">

			<div class="modal-card-body">

				Buffoon!

			</div>

		</div>

	</div>

</div>

