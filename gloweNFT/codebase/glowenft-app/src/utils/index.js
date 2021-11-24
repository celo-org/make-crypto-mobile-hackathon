// import Geolocation from '@react-native-community/geolocation';
// import Geolocation from 'react-native-geolocation-service';
import _ from 'lodash';
import {Dimensions, Platform, PixelRatio} from 'react-native';
import ImageMultiplePicker from 'react-native-image-crop-picker';
import {Navigation} from 'react-native-navigation';

export const setDefaultStatusBar = (componentId) => {
  Navigation.mergeOptions(componentId, {
    statusBar: {
      drawBehind: true,
      backgroundColor: 'transparent',
      translucent: false,
      setHidden: false,
    },
  });
};

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function Normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export const showImagePicker = async () => {
  return new Promise((resolve, reject) => {
    ImageMultiplePicker.openPicker({
      multiple: false,
      cropping: true,
      freeStyleCropEnabled: true,
    })
      .then((images) => {
        console.log({images});
        resolve([images.path]);
      })
      .catch((err) => {
        console.log({err});
        reject(err);
      });
  });
};

// const client = create('https://ipfs.infura.io:5001/api/v0');

// export const uploadImageAndGetCid = async (file) => {
//   try {
//     const added = await client.add(file);
//     return added.path;
//   } catch (error) {
//     console.log('Error uploading file: ', error);
//     return '';
//   }
// };


export const getUrlByCid = (cid) => {
  return `https://ipfs.infura.io/ipfs/${cid}`
}
