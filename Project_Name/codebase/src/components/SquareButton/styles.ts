import { StyleSheet } from 'react-native';
import { border, colors, dimensions } from '../../styles';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: dimensions.height40,
    width: dimensions.width40,
    borderRadius: border.radius.lg10,
    backgroundColor: colors.light.neutralColor12,

    shadowColor: "#000",
    shadowOffset: {
      width: 6,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    
    elevation: 9,
  }
}) 