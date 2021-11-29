import React, {useCallback, useState} from 'react';
import {Modal, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import {AppText} from "./AppText";
import AppIcon from "./assets/AppIcon";

interface Props {
  readonly isVisible: boolean
  readonly onDismiss: () => void
  readonly onMintAddPress: (link: string) => void
}

export const DialogMintView: React.FC<Props> = (props) => {
  const [mintLink, setMintLink] = useState<string | undefined>()

  const onMintAddPress = useCallback(() => {
    if (!mintLink) return
    props.onMintAddPress(mintLink)
    props.onDismiss()
  }, [mintLink, props.onMintAddPress])

  return (
    <Modal transparent statusBarTranslucent animated visible={props.isVisible} animationType={'fade'}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={props.onDismiss}
          style={[StyleSheet.absoluteFillObject, {backgroundColor: 'rgba(0, 0, 0, 0.9)'}]}
        />
        <TouchableOpacity activeOpacity={1} style={styles.container}>
          <View style={styles.header}>
            <AppText fontSize={24} fontFamily={'bold'} color={'white'}>Mint NFT</AppText>
            <View style={{flex: 1}}/>
            <TouchableOpacity activeOpacity={1} onPress={props.onDismiss} >
              <AppIcon type={'icDialogClose'} width={32} height={32}/>
            </TouchableOpacity>
          </View>

          <View style={{paddingHorizontal: 24}}>
            <AppText color={'#B1B5C3'} fontSize={12} fontFamily={'bold'}>ENTER ADDRESS</AppText>
            <TextInput
              style={styles.input}
              placeholder={'Place url'}
              textAlign={'left'}
              textAlignVertical={'center'}
              placeholderTextColor={'#E6E8EC'}
              onChangeText={setMintLink}
            />
          </View>

          <View style={styles.footer}>
            <TouchableOpacity activeOpacity={1} onPress={onMintAddPress} style={[styles.button, {backgroundColor: '#FCFCFD', borderWidth: 0}]}>
              <AppText color={'#141416'} fontSize={16} fontFamily={'bold'}>Mint</AppText>
            </TouchableOpacity>
            <View style={{height: 8}}/>
            <TouchableOpacity style={[styles.button]} onPress={props.onDismiss}>
              <AppText color={'white'} fontSize={16} fontFamily={'bold'}>Cancel</AppText>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  )
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    width: '88%',
    backgroundColor: '#23262F',
    paddingBottom: 24
  },

  header: {
    height: 40,
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 32,
    flexDirection: 'row',
    alignItems: 'center'
  },

  input: {
    backgroundColor: '#141416',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginTop: 12,
    color: '#E6E8EC'
  },

  footer: {
    paddingHorizontal: 24,
    marginTop: 32,
    flexDirection: 'column'
  },

  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderWidth: 2,
    borderColor: '#353945',
    borderRadius: 1000
  }
})
