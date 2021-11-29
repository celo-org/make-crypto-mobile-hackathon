import './global'
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {LogBox, StyleSheet, View} from 'react-native';
import {requestTxSig} from "@celo/dappkit";
import {parseDappkitResponseDeeplink} from "@celo/utils";
import * as Linking from "expo-linking";
import Web3 from 'web3';
import {newKitFromWeb3} from '@celo/contractkit';
import NftziContract from './abi/Nftzi.json';
import {ConnectToValoraView} from "./ConnectToValoraView";
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  approveRequestId,
  callback,
  dappName,
  getCurrecyContract,
  loginRequestId,
  mintRequestId,
  redeemRequestId
} from "./constants";
import {RentLendTokensView} from "./RentLendTokensView";
import {DialogMintView} from "./DialogMintView";
import {StatusBar} from "expo-status-bar";
import {AlertLoading} from "./AlertLoading";
import {appEmitter} from "./eventEmitter";

LogBox.ignoreAllLogs()

export default function App() {
  const [address, setAddress] = useState("");
  const [dappkitResponse, setDappkitResponse] = useState(undefined);
  const [appLoaded, setAppLoaded] = useState(false)
  const listRef = useRef(null)
  const [showMintDialog, setShowMintDialog] = useState(false)

  useEffect(() => {

    const deeplinkListener = ({url}) => {
      const dresp = parseDappkitResponseDeeplink(url)
      console.log('App', 'addEventListener', dresp, url)
      if (dresp.requestId === loginRequestId) {
        setAddress(dresp.address.toLowerCase())
      }
      if (dresp.requestId === mintRequestId) {
        setDappkitResponse(dresp)
      }
      if (dresp.requestId === approveRequestId) {
        setDappkitResponse(dresp)
      }
      if (dresp.requestId === redeemRequestId) {
        setDappkitResponse(dresp)
      }
    }

    const i = async () => {
      console.log('App', 'i')
      await SplashScreen.preventAutoHideAsync();
      await Font.loadAsync({
        'GTFlexa-Bd': require('./assets/fonts/GTFlexa-Bd.ttf'),
        'GTFlexa-Rg': require('./assets/fonts/GTFlexa-Rg.ttf'),
      })
      await SplashScreen.hideAsync()
      setAppLoaded(true)

      Linking.addEventListener('url', deeplinkListener);
    }

    i()

    return () => {
      if (deeplinkListener) Linking.removeEventListener('url', deeplinkListener)
    }
  }, []);

  useEffect(() => {
    async function sendTx(dappkitResponse) {
      try {
        if (!dappkitResponse) return
        if (!dappkitResponse.rawTxs) return
        appEmitter.emit('loading', true)
        console.log('App', 'sendTx', dappkitResponse)
        const web3 = new Web3('wss://alfajores-forno.celo-testnet.org/ws');
        const kit = newKitFromWeb3(web3);
        for (const tx of dappkitResponse.rawTxs) {
          await kit.web3.eth.sendSignedTransaction(tx);
        }
        listRef.current?.loadTokens()
      } catch (e) {
        console.log('error sendTx', e)
      } finally {
        appEmitter.emit('loading', false)
      }
    }

    sendTx(dappkitResponse)
  }, [dappkitResponse]);

  useEffect(() => {
    if (address !== "") {
      listRef.current?.loadTokens()
    }
  }, [address]);


  const mintLinkAdd = useCallback(async (link) => {
    console.log('App', 'mintLinkAdd', link)
    appEmitter.emit('loading', true)
    try {
      const web3 = new Web3('wss://alfajores-forno.celo-testnet.org/ws');
      const kit = newKitFromWeb3(web3);
      const currencyContract = await getCurrecyContract('CELO', kit);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = NftziContract.networks[networkId];
      const nftzi = new web3.eth.Contract(
        NftziContract.abi,
        deployedNetwork.address
      );

      const txObject = await nftzi.methods.safeMint(link, currencyContract.address);

      const requestId = mintRequestId
      await requestTxSig(
        kit,
        [
          {
            tx: txObject,
            from: address,
            to: nftzi.options.address,
            feeCurrency: currencyContract.address
          }
        ],
        {requestId, dappName, callback}
      );
      console.log('all complete mint')
    } finally {
      console.log('finally mint')
      appEmitter.emit('loading', false)
    }
  }, [address])

  const mint = useCallback(() => {
    setShowMintDialog(true)
  }, []);

  const rent = async (tokenId) => {
    try {
      appEmitter.emit('loading', true)
      console.log('App', 'rent', tokenId)

      const web3 = new Web3('wss://alfajores-forno.celo-testnet.org/ws');
      const kit = newKitFromWeb3(web3);

      const currencyContract = await getCurrecyContract('CELO', kit);

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = NftziContract.networks[networkId];
      const nftzi = new web3.eth.Contract(
        NftziContract.abi,
        deployedNetwork.address
      );

      const txObjectIncApproval = currencyContract.approve(
        nftzi.options.address,
        web3.utils.toWei("1")
      ).txo;

      const txObject = nftzi.methods.rent(tokenId);

      const requestId = approveRequestId

      await requestTxSig(
        kit,
        [
          {
            tx: txObjectIncApproval,
            from: address,
            to: currencyContract.address,
            feeCurrency: currencyContract.address,
            estimatedGas: 200000
          },
          {
            tx: txObject,
            from: address,
            to: nftzi.options.address,
            feeCurrency: currencyContract.address,
            estimatedGas: 200000
          }
        ],
        {requestId, dappName, callback}
      );
    } catch (e) {
      console.log('error', e)
    } finally {
      appEmitter.emit('loading', false)
    }
  };

  const details = async (token) => {
    console.log('App', 'details', token)
    if (token.rentedAt > 0) {
      // Alert.alert(
      //   `Balance: ${token.balance}`,
      //   token.URI,
      //   [
      //     {
      //       text: "Cancel",
      //       onPress: () => console.log("Cancel Pressed"),
      //       style: "cancel"
      //     },
      //     {text: "REDEEM", onPress: () => redeem(token.tokenId)}
      //   ]
      // );
    } else {
      // Alert.alert(
      //   "Details",
      //   token.URI,
      //   [
      //     {
      //       text: "Cancel",
      //       onPress: () => console.log("Cancel Pressed"),
      //       style: "cancel"
      //     },
      //     {text: "OK", onPress: () => console.log("OK Pressed")}
      //   ]
      // );

    }
  };

  const redeem = async (tokenId) => {
    try {
      appEmitter.emit('loading', true)
      console.log('App', 'redeem', tokenId)

      const web3 = new Web3('wss://alfajores-forno.celo-testnet.org/ws');
      const kit = newKitFromWeb3(web3);

      const currencyContract = await getCurrecyContract('CELO', kit);

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = NftziContract.networks[networkId];
      const nftzi = new web3.eth.Contract(
        NftziContract.abi,
        deployedNetwork.address
      );

      const txObject = nftzi.methods.redeem(tokenId);

      const requestId = redeemRequestId
      await requestTxSig(
        kit,
        [
          {
            tx: txObject,
            from: address,
            to: nftzi.options.address,
            feeCurrency: currencyContract.address
          }
        ],
        {requestId, dappName, callback}
      );

      listRef.current?.loadTokens()
    } catch (e) {
      console.error(e)
    } finally {
      appEmitter.emit('loading', false)
    }
  };

  if (!appLoaded) return <View/>
  console.log('app loaded', address)
  return (
    <SafeAreaProvider>
      <View style={styles.container}>

        {address === '' && <ConnectToValoraView/>}
        {address !== '' && <RentLendTokensView
          address={address}
          ref={listRef}
          onMintPress={mint}
          onRentPress={rent}
          onRedeemPress={redeem} />
        }

        <DialogMintView isVisible={showMintDialog} onDismiss={() => setShowMintDialog(false)} onMintAddPress={mintLinkAdd}/>
        <StatusBar style={'light'} />
        <AlertLoading/>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
