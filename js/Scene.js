import React, { Component } from "react";
import {
  ViroARScene,
  Viro3DObject,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroAmbientLight,
  ViroAnimations,
} from "react-viro";

ViroARTrackingTargets.createTargets({
  qrcode: {
    source: require("./res/qrcode.png"),
    orientation: "Up",
    physicalWidth: 0.1,
  },
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: { rotateY: "+=90" },
    duration: 1000,
  },
});

export default class HelloWorldSceneAR extends Component {
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
      <ViroARScene displayPointCloud>
        <ViroAmbientLight color="#ffffff" />
        <ViroARImageMarker
          target="qrcode"
          onAnchorFound={this.updateAnchorRotation}
          onAnchorUpdate={this.updateAnchorRotation}
          pauseUpdates
        >
          <Viro3DObject
            rotation={[rotation.x, rotation.y, rotation.z]}
            scale={[0.001, 0.001, 0.001]}
            animation={{ name: "rotate", run: true, loop: true }}
            position={[0, 0.1, 0]}
            source={require("./res/brand.obj")}
            resources={[require("./res/brand.mtl")]}
            scale={[0.0005, 0.0005, 0.0005]}
          />
        </ViroARImageMarker>
      </ViroARScene>
    );
  }
}
