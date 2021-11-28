declare module "*.svg" {
  import React from 'react'
  import { SvgProps } from 'react-native-svg'

  const content: JSX.Element<SVGProps>

  export default content
}