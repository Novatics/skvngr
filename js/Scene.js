import React, { Component } from "react";
import {
  ViroARScene,
  Viro3DObject,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroAmbientLight,
} from "react-viro";

ViroARTrackingTargets.createTargets({
  qrcode: {
    source: require("./res/qrcode.png"),
    orientation: "Up",
    physicalWidth: 0.1,
  },
});

export default class Scene extends Component {
  state = {
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
  };

  updateAnchorRotation = anchor => {
    const [x, y, z] = anchor.rotation;
    this.setState({ rotation: { x, y, z } });
  };

  render() {
    const { rotation } = this.state;

    return (
      <ViroARScene>
        <ViroARImageMarker
          target="qrcode"
          onAnchorFound={this.updateAnchorRotation}
          onAnchorUpdate={this.updateAnchorRotation}
          pauseUpdates
        >
          <Viro3DObject
            rotation={[rotation.x, rotation.y, rotation.z]}
            scale={[0.001, 0.001, 0.001]}
            source={require("./res/brand.obj")}
            resources={[require("./res/brand.mtl")]}
            type="OBJ"
          />
          <ViroAmbientLight color="#ffffff" />
        </ViroARImageMarker>
      </ViroARScene>
    );
  }
}
