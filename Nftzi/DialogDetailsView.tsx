import React from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from "react-native";
import {AppText} from "./AppText";
import AppIcon from "./assets/AppIcon";
import {AppToken} from "./RentLendTokensView";

// import { BlurView } from 'expo-blur';

interface Props {
  readonly isVisible: boolean
  readonly onDismiss: () => void
  readonly item: () => AppToken
}

export const DialogDetailsView: React.FC<Props> = (props) => {
  if (!props.isVisible) return null

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
            <AppText fontSize={24} fontFamily={'bold'} color={'white'}>Details</AppText>
            <View style={{flex: 1}}/>
            <TouchableOpacity activeOpacity={1} onPress={props.onDismiss} >
              <AppIcon type={'icDialogClose'} width={32} height={32}/>
            </TouchableOpacity>
          </View>

          <View style={styles.input}>
            <AppText color={'#B1B5C3'} fontSize={12} fontFamily={'bold'}>ADDRESS DETAILS</AppText>
            <View style={{height: 10}}/>
            <AppText
              fontSize={14}
              lineHeight={16}
              children={props.item().URI}
              color={'white'}
            />
          </View>

          <View style={styles.footer}>
            <TouchableOpacity activeOpacity={1} onPress={props.onDismiss} style={styles.button}>
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
    marginTop: 28,
    flexDirection: 'row',
    alignItems: 'center'
  },

  input: {
    borderWidth: 1,
    borderColor: '#353945',
    borderRadius: 12,
    marginTop: 32,
    padding: 16,
    marginHorizontal: 24,
  },

  footer: {
    paddingHorizontal: 24,
    marginTop: 32,
    flexDirection: 'row'
  },

  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderWidth: 2,
    borderColor: '#353945',
    borderRadius: 1000
  }
})
