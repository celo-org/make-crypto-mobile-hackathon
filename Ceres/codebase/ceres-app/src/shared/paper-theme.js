
import { DefaultTheme } from 'react-native-paper';


const paperTheme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: '#9807F9',
    accent: '#88D622',
    surface: 'purple',
    backdrop: 'red',
    background: 'rgb(247, 249, 252)',
    placeholder: '#8F9BB3',
    disabled: '#C7CDD9',
    notification: 'green'
  },
};

export default paperTheme;