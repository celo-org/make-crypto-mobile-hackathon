import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {Normalize} from '../utils';
import LinearGradient from 'react-native-linear-gradient';
import {WIDTH_DEVICE} from '../constants';

export class GradientFooter extends PureComponent {
  state = {
    modalVisible: false,
  };

  componentDidMount() {}

  _goBack = () => {
    Navigation.pop(this.props.componentId);
  };

  _openDrawer = () => {
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          visible: true,
        },
      },
    });
  };

  render() {
    const {} = this.state;
    const {} = this.props;

    return (
      <View style={styles.wrapper}>
        <LinearGradient
          colors={['#000', 'transparent']}
          style={styles.gradient}
          start={{x: 1, y: 1}}
          end={{x: 1, y: 0}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    width: WIDTH_DEVICE,
  },
  gradient: {
    height: Normalize(20),
  },
});
