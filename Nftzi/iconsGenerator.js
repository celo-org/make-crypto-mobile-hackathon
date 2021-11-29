const p = require('path')
const fs = require('fs')

const uniqueNames = new Set()
function findInDir(dir, filter, fileList = []) {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = p.join(dir, file)
    const fileStat = fs.lstatSync(filePath)

    if (fileStat.isDirectory()) {
      findInDir(filePath, filter, fileList)
    } else if (p.extname(filePath) === filter) {
      const name = p.basename(filePath, filter)
      if (uniqueNames.has(name)) throw new Error(`file exists: ${name}`)
      uniqueNames.add(name)
      fileList.push(filePath)
    }
  })

  return fileList
}

const path = 'assets'

const icons = findInDir(path, '.svg')
const fileName = `${path}/AppIcon.tsx`

if (fs.existsSync(fileName)) fs.unlinkSync(fileName)
const logger = fs.createWriteStream(fileName)

logger.write(`/* eslint-disable */
import React, {memo} from 'react'
import {StyleProp, View, ViewStyle} from 'react-native'
`)

const iconNames = Array.from(uniqueNames.values())
const types = iconNames.map((c) => `'${c}'`).join(' | ')

for (const icon of icons) {
  const name = p.basename(icon, '.svg')
  let capitalized = name.charAt(0).toUpperCase() + name.slice(1)
  capitalized = capitalized
    .split('-')
    .map((c) => c.charAt(0).toUpperCase() + c.slice(1))
    .join('')
  logger.write(`import ${capitalized} from '.${icon.replace(path, '')}'\n`)
}

logger.write(`
export type AppIconType = ${types}
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
`)

for (let iconName of iconNames) {
  let capitalized = iconName.charAt(0).toUpperCase() + iconName.slice(1)
  capitalized = capitalized
    .split('-')
    .map((c) => c.charAt(0).toUpperCase() + c.slice(1))
    .join('')

  logger.write(`  case '${iconName}':\n`)
  logger.write(
    `    if (!!tint && !width && !height) return <${capitalized} fill={tint} />\n`,
  )
  logger.write(
    `    if (!!tint && width && height) return <${capitalized} fill={tint} width={width} height={height} />\n`,
  )
  logger.write(
    `    if (!!stroke && !width && !height) return <${capitalized} stroke={stroke} />\n`,
  )
  logger.write(
    `    if (!!stroke && width && height) return <${capitalized} stroke={stroke} width={width} height={height} />\n`,
  )
  logger.write(
    `    if (!stroke && !tint && width && height) return <${capitalized} width={width} height={height} />\n`,
  )
  logger.write(`    return <${capitalized} />\n`)
}

logger.write(`  }
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
`)
