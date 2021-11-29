/* eslint-disable */
import React, {memo} from 'react'
import {StyleProp, View, ViewStyle} from 'react-native'
import IcArrow from './icArrow.svg'
import IcDialogClose from './icDialogClose.svg'
import IcMint from './icMint.svg'
import Illustration_one from './illustration_one.svg'
import WalletIcon from './walletIcon.svg'

export type AppIconType = 'icArrow' | 'icDialogClose' | 'icMint' | 'illustration_one' | 'walletIcon'
export interface AppIconProps {
  readonly type: AppIconType
  readonly testID?: string
  readonly nativeID?: string
  readonly style?: StyleProp<ViewStyle>
  readonly isVisible?: boolean
  readonly tint?: string
  readonly stroke?: string
  readonly width?: number
  readonly height?: number
}

const getIcon = (type: AppIconType, tint: string | undefined, stroke: string | undefined, width: number | undefined, height: number | undefined): JSX.Element => {
    switch (type) {
  case 'icArrow':
    if (!!tint && !width && !height) return <IcArrow fill={tint} />
    if (!!tint && width && height) return <IcArrow fill={tint} width={width} height={height} />
    if (!!stroke && !width && !height) return <IcArrow stroke={stroke} />
    if (!!stroke && width && height) return <IcArrow stroke={stroke} width={width} height={height} />
    if (!stroke && !tint && width && height) return <IcArrow width={width} height={height} />
    return <IcArrow />
  case 'icDialogClose':
    if (!!tint && !width && !height) return <IcDialogClose fill={tint} />
    if (!!tint && width && height) return <IcDialogClose fill={tint} width={width} height={height} />
    if (!!stroke && !width && !height) return <IcDialogClose stroke={stroke} />
    if (!!stroke && width && height) return <IcDialogClose stroke={stroke} width={width} height={height} />
    if (!stroke && !tint && width && height) return <IcDialogClose width={width} height={height} />
    return <IcDialogClose />
  case 'icMint':
    if (!!tint && !width && !height) return <IcMint fill={tint} />
    if (!!tint && width && height) return <IcMint fill={tint} width={width} height={height} />
    if (!!stroke && !width && !height) return <IcMint stroke={stroke} />
    if (!!stroke && width && height) return <IcMint stroke={stroke} width={width} height={height} />
    if (!stroke && !tint && width && height) return <IcMint width={width} height={height} />
    return <IcMint />
  case 'illustration_one':
    if (!!tint && !width && !height) return <Illustration_one fill={tint} />
    if (!!tint && width && height) return <Illustration_one fill={tint} width={width} height={height} />
    if (!!stroke && !width && !height) return <Illustration_one stroke={stroke} />
    if (!!stroke && width && height) return <Illustration_one stroke={stroke} width={width} height={height} />
    if (!stroke && !tint && width && height) return <Illustration_one width={width} height={height} />
    return <Illustration_one />
  case 'walletIcon':
    if (!!tint && !width && !height) return <WalletIcon fill={tint} />
    if (!!tint && width && height) return <WalletIcon fill={tint} width={width} height={height} />
    if (!!stroke && !width && !height) return <WalletIcon stroke={stroke} />
    if (!!stroke && width && height) return <WalletIcon stroke={stroke} width={width} height={height} />
    if (!stroke && !tint && width && height) return <WalletIcon width={width} height={height} />
    return <WalletIcon />
  }
}

const AppIcon: React.FC<AppIconProps> = ({
  type,
  testID,
  nativeID,
  style,
  isVisible,
  tint,
  stroke,
  width,
  height
}) => {
  if (isVisible === false) return null
  return (
    <View accessibilityLabel={testID} nativeID={nativeID} pointerEvents={'none'} style={style}>
      {getIcon(type, tint, stroke, width, height)}
    </View>
  )
}
export default memo(AppIcon)
