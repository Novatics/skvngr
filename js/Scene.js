import React, { Component } from 'react';
import {
  ViroARScene,
  ViroARTrackingTargets,
  ViroAmbientLight,
} from 'react-viro';

import AssetLoader from './AssetLoader';
import Marker from './Marker';

export default class Scene extends Component {
  assetLoader = new AssetLoader('https://skvngr-server.herokuapp.com');

  state = {
    markers: [],
  };

  async componentDidMount() {
    const targets = await this.assetLoader.loadTargets();
    ViroARTrackingTargets.createTargets(targets);

    const markers = await this.assetLoader.loadMarkers();
    this.setState({ markers });
  }

  render() {
    const { markers } = this.state;
    return (
      <ViroARScene>
        <ViroAmbientLight color="#aaaaaa" />
        {markers.map(marker => {
          return (
            <Marker
              key={marker.target}
              target={marker.target}
              source={marker.source}
              resources={marker.resources}
            />
          );
        })}
      </ViroARScene>
    );
  }
}
