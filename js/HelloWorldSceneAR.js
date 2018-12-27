import React, { Component } from "react";
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  Viro3DObject,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroAmbientLight,
  ViroText,
} from "react-viro";
import AssetLoader from './AssetLoader';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();
  assetLoader = new AssetLoader('https://skvngr-server.herokuapp.com');
  }

  createTargetsFromImages = async () => {
    const targets = await this.assetLoader.loadTargets();
    ViroARTrackingTargets.createTargets(targets);

    return targets;
  }

  loadMarkers = async () => {
    let markers = [];
    const targets = await this.createTargetsFromImages();

    for (target in targets) {
      markers.push((
        <ViroARImageMarker key={target} target={target}>
          <Viro3DObject
            rotation={[-90, 0, 0]}
            scale={[0.001, 0.001, 0.001]}
            source={require("./res/brand.obj")}
            resources={[require("./res/brand.mtl")]}
            type="OBJ"
          />
          <ViroAmbientLight color="#ffffff" />
        </ViroARImageMarker>
      ));
    }

    this.setState({ markers });
  }

  async componentDidMount() {
    await this.loadMarkers();
  }

  render() {
    return (
      <ViroARScene>
        {this.state.markers}
      </ViroARScene>
    );
  }
}
