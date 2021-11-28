
import React from 'react';
import { Image } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import Onboarding from 'react-native-onboarding-swiper';

const Simple = () => (
  <Onboarding
    onDone={() => console.log('done')}
    pages={[
      {
        backgroundColor: '#fff',
        image: <Image source={require('../assets/images/onboard1.png')} />,
        title: 'Send Celo',
        subtitle: 'Use our app to send Celo',
      },
      {
        backgroundColor: '#fff',
        image: <Image source={require('../assets/images/onboard2.png')} />,
        title: 'Stake Celo',
        subtitle: 'You can easily stake your celo',
      },
      {
        backgroundColor: '#fff',
        image: <Image source={require('../assets/images/onboard3.png')} />,
        title: 'Receive Rewards',
        subtitle: "Once you stake Celo, you are ready to receive rewards",
      },
    ]}
  />
);

export default Simple;