// @flow

const WebViewScreenId = 'WebView';

const WebViewScreenDef = passProps => ({
  component: {
    name: WebViewScreenId,
    options: {
      topBar: {
        visible: false
      }
    },
    passProps
  }
});

export { WebViewScreenId, WebViewScreenDef };
