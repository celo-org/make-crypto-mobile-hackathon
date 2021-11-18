import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';
import { AlignTypes } from '../../utils/enum';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: dimensions.spacingStackXxl16,
    paddingHorizontal: dimensions.spacingStackXxl16,
    backgroundColor: colors.light.neutralColor14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: AlignTypes.SPACE_BETWEEN,
  },
  logo: {
    width: dimensions.height80,
    height: dimensions.height40,
    borderRadius: dimensions.spacingStackXxs7,
    backgroundColor: colors.light.neutralColor12,

    shadowColor: colors.light.neutralColor0,
    shadowOffset: {
      width: dimensions.spacingStackXxxs6,
      height: dimensions.spacingStackQuarck4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: dimensions.spacingInlineXxxs9,
  },
  buttons: {
    width: dimensions.width90,
    justifyContent: AlignTypes.SPACE_BETWEEN,
    flexDirection: 'row',
  },
  title: {
    marginVertical: dimensions.spacingStackGiant25,
  },
  filter: {
    height: dimensions.height80,
  },
  content: {
    flex: 1,
    marginBottom: dimensions.height80,
  },
});
