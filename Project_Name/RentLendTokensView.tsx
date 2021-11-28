import React, {forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import {AppText} from "./AppText";
import Web3 from "web3";
import {newKitFromWeb3} from '@celo/contractkit';
import NftziContract from "./abi/Nftzi.json";
import {getCurrecyContract, isOwner, showRentedDetails, showWithdrawDetails} from './constants';
import {DialogDetailsView} from "./DialogDetailsView";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import AppIcon from "./assets/AppIcon";
import {StatusBar} from "expo-status-bar";
import {DialogWithdrawView} from "./DialogWithdrawView";

export interface AppToken {
  tokenId: string
  creator: string
  rentedBy: string
  URI: string
  rentedAt: string
  balance: string
}

const screenWidth = Dimensions.get('window').width

interface Props {
  readonly address: string
  readonly onMintPress: () => void
  readonly onRentPress: (tokenId: AppToken['tokenId']) => void
  readonly onRedeemPress: (tokeId: AppToken['tokenId']) => void
}

interface Ref {
  loadTokens: () => void
}

export const RentLendTokensView = forwardRef<Ref, Props>((props, ref) => {
  const [tab, setTab] = useState<'rent' | 'lend'>('rent')
  const [loading, setLoading] = useState(true)
  const [tokens, setTokens] = useState<AppToken[]>([])
  const refTokens = useRef<AppToken[]>([])
  const detailTokenRef = useRef<AppToken | undefined>()
  const [isDialogDetailVisible, setDialogDetailVisible] = useState(false)
  const [isDialogWithdrawVisible, setDialogWithdrawVisible] = useState(false)
  const insets = useSafeAreaInsets()


  const loadTokens = useCallback(async () => {
    console.log('App', 'loadTokens')
    setLoading(true)

    const web3 = new Web3('wss://alfajores-forno.celo-testnet.org/ws');
    // @ts-ignore
    const kit = newKitFromWeb3(web3);

    const currencyContract = await getCurrecyContract('CELO', kit);

    const networkId = await web3.eth.net.getId();
    const deployedNetwork = NftziContract.networks[networkId];
    const nftzi = new web3.eth.Contract(
      //@ts-ignore
      NftziContract.abi,
      deployedNetwork.address
    );

    refTokens.current = await nftzi.methods.tokensInfo().call()
    refTokens.current = refTokens.current.filter(t => t.tokenId !== "0")
    setTokens(refTokens.current.filter(t => {
      if (tab === 'rent') {
        return t.creator.toLowerCase() !== props.address.toLowerCase()
      }
      return t.creator.toLowerCase() === props.address.toLowerCase()
    }))
    console.log('App', 'tokens loaded')
    setLoading(false)
  }, [tab]);


  useImperativeHandle(ref, () => ({
    loadTokens
  }), [loadTokens])

  useEffect(() => {
    setTokens(refTokens.current.filter(t => {
      if (tab === 'rent') {
        return t.creator.toLowerCase() !== props.address.toLowerCase()
      }
      return t.creator.toLowerCase() === props.address.toLowerCase()
    }))
  }, [tab])

  const onDetailsPress = useCallback((token: AppToken) => {
    detailTokenRef.current = token
    if (showWithdrawDetails(token, props.address) || showRentedDetails(token, props.address)) {
    // if (true) {
      setDialogWithdrawVisible(true)
      return
    }
    setDialogDetailVisible(true)
  }, [])

  const renderItem = useCallback((info: ListRenderItemInfo<AppToken>) => {
    console.log(info.item.tokenId, info.item.creator, info.item.rentedBy, info.item.rentedAt, info.item.balance)
    return <View style={styles.listItemContainer}>
      {!!info.item.URI && (
        <Image source={{uri: info.item.URI}} style={{width: screenWidth - 48, height: screenWidth - 48, resizeMode: 'cover'}}/>
      )}

      {!info.item.URI && (
        <View style={{width: screenWidth - 48, height: screenWidth - 48}}/>
      )}

      <View style={styles.listItemBottom}>
        <AppText fontSize={12} style={{textAlign: 'center'}}>Current price</AppText>
        <AppText fontSize={18} fontFamily={'bold'} style={styles.listItemPrice}>1.00 CLEO</AppText>

        {(showRentedDetails(info.item, props.address) || showWithdrawDetails(info.item, props.address) || isOwner(info.item, props.address)) && (
          <TouchableOpacity style={styles.detailsButton} onPress={() => onDetailsPress(info.item)}>
            <AppText centered fontFamily={'bold'} fontSize={16}>View Details</AppText>
          </TouchableOpacity>
        )}

        {(!isOwner(info.item, props.address) && parseInt(info.item.rentedAt, 10) === 0) && (
          <TouchableOpacity style={styles.rentButton} activeOpacity={1} onPress={() => props.onRentPress(info.item.tokenId)}>
            <AppText centered fontFamily={'bold'} fontSize={16}>RENT NOW</AppText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  }, [onDetailsPress])

  return (
    <View style={styles.container}>
      <View style={{height: insets.top}}/>
      <View style={styles.header}>
        <AppText fontSize={36} color={'white'} fontFamily={'bold'}>{tab === 'rent' ? 'Rent' : 'Lend'}</AppText>
        <View style={{flex: 1}}/>
        {tab === 'lend' && (
          <TouchableOpacity style={styles.mintButton} onPress={props.onMintPress}>
            <AppIcon type={'icMint'}/>
            <View style={{width: 8}}/>
            <AppText fontSize={18} fontFamily={'bold'}>Mint NFT</AppText>
            <View style={{flex: 1}}/>
            <AppIcon type={'icArrow'} />
          </TouchableOpacity>
        )}
      </View>

      <FlatList<AppToken>
        style={{flex: 1}}
        data={tokens}
        refreshing={loading}
        onRefresh={loadTokens}
        keyExtractor={(item) => item.tokenId.toString()}
        contentContainerStyle={styles.contentContainer}
        renderItem={renderItem}
      />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.button, tab === 'rent' ? styles.selectedButton : undefined]}
          onPress={loading ? undefined : () => setTab('rent')}
        >
          <AppText children={'Rent'} color={tab === 'rent' ? 'white' : '#221F14'} fontFamily={'bold'} fontSize={16}/>
        </TouchableOpacity>
        <View style={{width: 16}}/>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.button, tab === 'lend' ? styles.selectedButton : undefined]}
          onPress={loading ? undefined : () => setTab('lend')}
        >
          <AppText children={'Lend'} color={tab === 'lend' ? 'white' : '#221F14'} fontFamily={'bold'} fontSize={16}/>
        </TouchableOpacity>
      </View>

      <DialogDetailsView
        isVisible={isDialogDetailVisible}
        onDismiss={() => setDialogDetailVisible(false)}
        item={() => detailTokenRef.current!}
      />

      {isDialogWithdrawVisible && (
        <DialogWithdrawView
          address={props.address}
          isVisible={isDialogWithdrawVisible}
          onWithdraw={props.onRedeemPress}
          onDismiss={() => setDialogWithdrawVisible(false)}
          item={() => detailTokenRef.current!}
        />
      )}
      <StatusBar backgroundColor={'#141416'} style={'light'} />
    </View>
  )
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141416'
  },

  header: {
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 16
  },

  buttonsContainer: {
    flexDirection: 'row',
    height: 48,
    width: '100%',
    paddingHorizontal: 24,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 24
  },

  button: {
    flex: 1,
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 48 / 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },


  selectedButton: {
    backgroundColor: '#353945',
  },


  contentContainer: {
    paddingBottom: 24 + 48 + 16,
    paddingHorizontal: 24
  },


  listItemContainer: {
    backgroundColor: '#353945',
    borderRadius: 16,
    width: '100%',
    minHeight: screenWidth - 48,
    marginBottom: 16,
    overflow: 'hidden'
  },

  listItemBottom: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 14
  },

  listItemPrice: {
    marginTop: 4,
    textAlign: 'center'
  },

  detailsButton: {
    height: 48,
    borderRadius: 1000,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16
  },

  rentButton: {
    height: 48,
    borderRadius: 1000,
    backgroundColor: '#141416',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16
  },

  mintButton: {
    backgroundColor: '#353945',
    height: 64,
    borderRadius: 16,
    paddingHorizontal: 16,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  }
})
