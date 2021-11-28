import { Magic } from '@magic-sdk/react-native';

// magic sdk instance
export const magic = new Magic('pk_live_04940F0EFB35EAE9',{
  network: {
    rpcUrl: 'https://alfajores-forno.celo-testnet.org'
  }
}); 

// export const web3 = new Web3(magic.rpcProvider);

export const DID = await magic.auth.loginWithSMS({
  phoneNumber: '+254726111690',//pass the phone input value to get otp sms
});

  

  