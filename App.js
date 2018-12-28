import React from 'react';
import { ViroARSceneNavigator } from 'react-viro';
import Scene from './js/Scene';
import Hud from './js/Hud';

const API_KEY = 'E658630C-44FE-45B4-A235-5031C4930327';

export default function Skvngr() {
  return (
    <React.Fragment>
      <ViroARSceneNavigator
        autofocus
        bloomEnabled
        apiKey={API_KEY}
        initialScene={{ scene: Scene }}
      />
      <Hud />
    </React.Fragment>
  );
}
