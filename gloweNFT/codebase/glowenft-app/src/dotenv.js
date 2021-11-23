import { Platform } from 'react-native'
// export const DEBUG = __DEV__ || process.env.NODE_ENV !== 'production';
export const DEBUG = true

const config = {
  apiUrl: 'https://glowe-server-staging.herokuapp.com',
  masterKey: '',
}

export default DEBUG ?
  config :
  {
    // prod configuration to add here
    ...config,
  }
