/**
 * @flow
 */

import { Dimensions, Platform, StatusBar, NativeModules } from 'react-native'
import {
  getStatusBarHeight,
  getBottomSpace,
} from 'react-native-iphone-x-helper'
// import { getStatusBarHeight } from 'react-native-status-bar-height';
import DeviceInfo from 'react-native-device-info';
import {Normalize} from '../utils';

const getStatusBarRealHeight = () => {
  if (Platform.OS === 'android') {
    return StatusBar.currentHeight
  } else {
    const deviceName = DeviceInfo.getModel()
    switch (deviceName) {
      case 'iPhone 11':
      case 'iPhone 11 Pro':
      case 'iPhone 11 Pro Max':
        return 33
      case 'iPhone 12':
      case 'iPhone 12 Pro':
      case 'iPhone 12 Pro Max':
        return 32
      case 'iPhone 12 mini':
        return 34
      case 'iPhone SE':
        return 20
    }
    return getStatusBarHeight()
  }
}
const getScrollViewSafeArea = () => {
  if (Platform.OS === 'android') {
    return StatusBar.currentHeight
  } else {
    const deviceName = DeviceInfo.getModel()
    switch (deviceName) {
      case 'iPhone 11':
      case 'iPhone 11 Pro':
      case 'iPhone 11 Pro Max':
        return 47
      case 'iPhone 12':
      case 'iPhone 12 Pro':
      case 'iPhone 12 Pro Max':
        return 47
      case 'iPhone 12 mini':
        return 34 // CHECK
      case 'iPhone SE':
        return 20// CHECK
    }
    return getStatusBarHeight()// CHECK
  }
}
export const isAndroid = Platform.OS === 'android'
export const STANDARD_STATUS_BAR_HEIGHT = getStatusBarRealHeight();
export const STANDARD_BOTTOM_SPACE = Platform.OS === 'ios' ? Normalize(10) : 0;
export const STANDARD_SCROLL_VIEW_SAFE_AREA = isAndroid ? getScrollViewSafeArea() : 0
// export const STANDARD_HEADER_HEIGHT = getStatusBarHeight()

export const WIDTH_DEVICE = Dimensions.get('window').width
export const HEIGHT_DEVICE = Dimensions.get('window').height

export const ANIMATION_DURATION = 300;


console.log({bottomSpace: getBottomSpace()})
console.log({statusBarHeight: getStatusBarHeight()})
console.log({height: HEIGHT_DEVICE})
console.log({patform: Platform.OS})
console.log({STANDARD_SCROLL_VIEW_SAFE_AREA: STANDARD_SCROLL_VIEW_SAFE_AREA})



