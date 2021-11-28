import React from 'react'
import {Text, TextProps} from 'react-native'
import {FontKey, fonts} from "./theme";

interface Props extends TextProps {
  readonly color?: string
  readonly fontFamily?: FontKey
  readonly lineHeight?: number
  readonly letterSpacing?: number
  readonly fontSize?: number
  readonly centered?: boolean
}

export const AppText: React.FC<Props> = (props) => {
  const fontFamily =
    props.fontFamily !== undefined ? fonts[props.fontFamily] : fonts.regular
  const fontSize = props.fontSize
  return (
    <Text style={[{color: props.color ?? 'white', fontFamily: fontFamily, fontSize, lineHeight: props.lineHeight, textAlign: props.centered === true ? 'center' : undefined}, props.style]}>
      {props.children}
    </Text>
  )
}
