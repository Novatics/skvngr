import React from 'react';
import {
  ViroARScene,
  ViroARTrackingTargets,
  ViroAmbientLight,
} from 'react-viro';

import Marker from './Marker';

ViroARTrackingTargets.createTargets({
  qrcode: {
    source: require('./res/qrcode.png'),
    orientation: 'Up',
    physicalWidth: 0.1,
  },
});

export default function Scene() {
  return (
    <ViroARScene>
      <ViroAmbientLight color="#aaaaaa" />
      <Marker
        target="qrcode"
        source={require('./res/cafe.obj')}
        resource={[require('./res/cafe.mtl')]}
      />
    </ViroARScene>
  );
}
