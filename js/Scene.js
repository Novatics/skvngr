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
    properties: { rotateY: "+=270" },
    duration: 3000,
  },
  rotate2: {
    properties: { rotateZ: "+=270" },
    duration: 3000,
  },
});

export default class Scene extends Component {
  state = {
    more60: false,
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
    const [x, y, z] = anchor.rotation.map(Math.floor);
    this.setState({ rotation: { x, y, z } });

    if (x > 60) {
      this.setState({ position: { x: 0, y: 0, z: -0.1 }, more60: true });
    }
    if (x < 30) {
      this.setState({ position: { x: 0, y: 0.1, z: 0 }, more60: false });
    }
  };

  render() {
    const { rotation, position, more60 } = this.state;
    return (
      <ViroARScene displayPointCloud>
        <ViroAmbientLight color="#ffffff" />
        <ViroARImageMarker
          target="qrcode"
          onAnchorFound={this.updateAnchorRotation}
          onAnchorUpdated={this.updateAnchorRotation}
        >
          <Viro3DObject
            animation={{
              name: more60 ? "rotate2" : "rotate",
              run: true,
              loop: true,
            }}
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
