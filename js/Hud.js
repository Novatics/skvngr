import React from 'react';
import { View, Dimensions, Image } from 'react-native';

import ProgressButton from './ProgressButton';

export default function Hud() {
  const dimensions = Dimensions.get('window');

  return (
    <React.Fragment>
      <Image
        style={{
          position: 'absolute',
          top: (dimensions.height - 151) / 2,
          left: (dimensions.width - 154) / 2,
          height: 151,
          width: 154,
        }}
        source={require('./res/target.png')}
      />
      <View
        style={{
          position: 'absolute',
          height: 170,
          width: dimensions.width,
          bottom: 0,
          // TODO: gradient from #006f628a to #3c3352
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ProgressButton total={5} current={3} />
      </View>
    </React.Fragment>
  );
}
