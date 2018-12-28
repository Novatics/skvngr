import React from 'react';
import { View, Dimensions } from 'react-native';

import ProgressButton from './ProgressButton';

export default function Hud() {
  return (
    <View
      style={{
        position: 'absolute',
        height: 170,
        width: Dimensions.get('window').width,
        bottom: 0,
        // TODO: gradient from #006f628a to #3c3352
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ProgressButton total={5} current={3} />
    </View>
  );
}
