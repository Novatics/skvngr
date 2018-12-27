import React, { Component } from "react";
import {
  ViroARScene,
  Viro3DObject,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroAmbientLight,
  ViroAnimations,
  ViroNode,
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

export default class Scene extends Component {
  state = {
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
  };

  updateAnchorRotation = anchor => {
    const [x, y, z] = anchor.rotation;
    this.setState({ rotation: { x, y, z } });

    if (x > 60) {
      this.setState({ position: { x: 0, y: 0, z: -0.1 } });
    }
    if (x < 30) {
      this.setState({ position: { x: 0, y: 0.1, z: 0 } });
    }
  };

  render() {
    const { rotation, position } = this.state;
    return (
      <ViroARScene displayPointCloud>
        <ViroAmbientLight color="#ffffff" />
        <ViroARImageMarker
          target="qrcode"
          onAnchorFound={this.updateAnchorRotation}
          onAnchorUpdated={this.updateAnchorRotation}
        >
          <Viro3DObject
            rotation={[-rotation.x, 0, 0]}
            scale={[0.0005, 0.0005, 0.0005]}
            position={[position.x, position.y, position.z]}
            source={require("./res/marca.obj")}
            resources={[require("./res/marca.mtl")]}
            type="OBJ"
          />
        </ViroARImageMarker>
      </ViroARScene>
    );
  }
}
