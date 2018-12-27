import React, { Component } from "react";
import {
  ViroARScene,
  Viro3DObject,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroAmbientLight,
} from "react-viro";
import AssetLoader from './AssetLoader';

export default class HelloWorldSceneAR extends Component {
  assetLoader = new AssetLoader('https://skvngr-server.herokuapp.com');

  state = {
    markers: [],
  }

  async componentDidMount() {
    const targets = await this.assetLoader.loadTargets();
    ViroARTrackingTargets.createTargets(targets);
    const markers = await this.assetLoader.loadMarkers();
    this.setState({ markers });  
  }

  render() {
    return (
      <ViroARScene>
        {
          this.state.markers.map(marker => {
            return (
              <ViroARImageMarker key={marker.target} target={marker.target}>
                <Viro3DObject
                  rotation={[-90, 0, 0]}
                  scale={[0.001, 0.001, 0.001]}
                  source={marker.source}
                  resources={marker.resources}
                  type="OBJ"
                />
                <ViroAmbientLight color="#ffffff" />
              </ViroARImageMarker>
            )
          })
        }
      </ViroARScene>
    );
  }
}
