import React, {PureComponent} from 'react';
import { BackHandler, StyleSheet, View, TouchableOpacity } from 'react-native';
import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Navigation} from "react-native-navigation"
// import {facebookLogin} from "../../js/api";
// import { store } from '../../js/state';
// import {currentVisibleScreen, setCurrentVisibleScreen} from "../../js/state/app-state";
// import {getPaymentIntent} from "../../js/api/stripe";
import _ from "lodash";
import {STANDARD_STATUS_BAR_HEIGHT} from "../../constants";

class WebViewScreen extends PureComponent {

  _backHandler;
  _smartPolling;

  state = { };

  // constructor(props) {
    // super(props);
    // if (this.props.onBackPress) {
    //   this._backHandler = BackHandler.addEventListener('hardwareBackPress', this.props.onBackPress);
    // }
  // }

  componentDidMount() {
    // if (this.props.paymentIntentId) {
    //   const reduxState = store.getState();
    //   this._smartPolling = setInterval(this._getPaymentIntent, 4e3)
    // }
  }

  componentWillUnmount() {
    // // Not mandatory
    // if (this._backHandler) {
    //   this._backHandler.remove();
    // }
  }

  _getPaymentIntent = async (paymentIntentId) => {
    try {
      const { componentId, paymentIntentId } = this.props;
      console.log({paymentIntentId})
      const paymentIntentRefreshed = await getPaymentIntent(paymentIntentId);
      console.log({paymentIntentRefreshed})
      if (_.get(paymentIntentRefreshed, 'intent.status', '') === 'requires_capture') {
        this._goBack()
        clearInterval(this._smartPolling)
      } else if (_.get(paymentIntentRefreshed, 'last_payment_error.code')) {
      }
    } catch (e) {
      console.log({e})

    }
  };

  _goBack = () => {
    const { componentId, onBackPress} = this.props;
    onBackPress && onBackPress();
    Navigation.pop(componentId)
  }

  render() {
    const { html } = this.state
    const { url, componentId, title, onBackPress } = this.props;
    return (
      <View style={{flex: 1}}>
        <View>
          <TouchableOpacity onPress={this._goBack}>
            <Icon name='chevron-left' size={28} color='black' style={{marginTop: STANDARD_STATUS_BAR_HEIGHT}}/>
          </TouchableOpacity>
        </View>
        <WebView
          source={{ uri: url }}
          style={styles.webView}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  webView: {
  }
});

export default WebViewScreen;
