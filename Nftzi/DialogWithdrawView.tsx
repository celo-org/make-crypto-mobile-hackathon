import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from "react-native";
import {AppText} from "./AppText";
import AppIcon from "./assets/AppIcon";
import {AppToken} from "./RentLendTokensView";
import {Slice, VictoryPie} from "victory-native";
import {newLockedGold} from "@celo/contractkit/lib/generated/LockedGold";
import {balanceElapsedInPercent, secondsElapsed, secondsElapsedInPercent} from "./date.utils";
import {WithdrawChartView} from "./WithdrawChartView";
import {isOwner, showWithdrawDetails} from "./constants";
import moment from "moment";


// import { BlurView } from 'expo-blur';

interface Props {
  readonly isVisible: boolean
  readonly onDismiss: () => void
  readonly onWithdraw: (tokeId: AppToken['tokenId']) => void
  readonly address: string
  readonly item: () => AppToken
}

const maxBalance = '990000000000000000'
export const DialogWithdrawView: React.FC<Props> = (props) => {
  ///let token: AppToken = {...props.item(), balance: '940000000', rentedAt: moment('2021-11-28 10:06').unix().toString()}
  let token: AppToken = props.item()
  const rentedAt = parseInt(token.rentedAt, 10)

  console.log(rentedAt, secondsElapsedInPercent(rentedAt), secondsElapsed(rentedAt))
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [time, setTime] = useState(secondsElapsedInPercent(rentedAt))
  const [balance, setBalance] = useState(() => {
    if (isOwner(token, props.address)) {
      //return balanceElapsedInPercent(rentedAt, parseInt(token.balance, 10))
      //return 1.0 - (parseInt(maxBalance, 10) - parseInt(token.balance, 10)) / parseInt(maxBalance, 10)
    }
    console.log('balance', (parseInt(maxBalance, 10) - parseInt(token.balance, 10)) / parseInt(maxBalance, 10))
    return (parseInt(maxBalance, 10) - parseInt(token.balance, 10)) / parseInt(maxBalance, 10)
    //return 0
  })
  const timeRef = useRef(secondsElapsed(rentedAt))

  const height = 250

  useEffect(() => {

    const time = () => {
      setTime((prev) => {
        if (prev >= 1) {
          if (timeoutRef.current) clearTimeout(timeoutRef.current)
          setBalance(1)
          return 1
        }
        timeoutRef.current = setTimeout(time, 1000)
        timeRef.current += 1
        return timeRef.current / 60
      })
    }

    timeoutRef.current = setTimeout(time, 1000)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const onWithdrawPress = useCallback(() => {
    props.onDismiss()
    props.onWithdraw(token.tokenId)
  }, [])

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
            <AppText fontSize={24} fontFamily={'bold'} color={'white'}>Rented</AppText>
            <View style={{flex: 1}}/>
            <TouchableOpacity activeOpacity={1} onPress={props.onDismiss} >
              <AppIcon type={'icDialogClose'} width={32} height={32}/>
            </TouchableOpacity>
          </View>

          <View style={styles.input}>
            <View style={{height: 125, width: '100%'}}>
              <WithdrawChartView containerHeight={125} height={height} color={'#353945'} value={1}/>
              <WithdrawChartView containerHeight={125} height={height} color={'#ffffff'} value={time}/>
              <WithdrawChartView containerHeight={125} height={height} color={'#07DA67'} value={balance}/>
            </View>
            <View style={{position: 'absolute', bottom: 16 + 16 + 8, alignItems: 'center', left: 0, right: 0}}>
              <AppText style={{alignSelf: 'center'}} fontSize={38} fontFamily={'bold'}>1.00</AppText>
            </View>
            <View style={{flexDirection: 'row', marginTop: 8}}>
              <AppText fontSize={12} color={'#777E90'}>0.001</AppText>
              <View style={{flex: 1}}/>
              <AppText fontSize={12} color={'#777E90'}>0.0165 CELO / SEC</AppText>
              <View style={{flex: 1}}/>
              <AppText fontSize={12} color={'#777E90'}>1.00</AppText>
            </View>
          </View>

          <View style={styles.footer}>
            {showWithdrawDetails(token, props.address) && (
            // {true && (
              <TouchableOpacity activeOpacity={1} onPress={onWithdrawPress} style={[styles.button, {borderWidth: 0, backgroundColor: 'white'}]}>
                <AppText color={'#141416'} fontSize={16} fontFamily={'bold'}>Withdraw</AppText>
              </TouchableOpacity>
            )}

            <View style={{height: 8}}/>

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
  },
})
