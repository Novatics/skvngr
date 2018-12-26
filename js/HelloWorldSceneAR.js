import React, { Component } from "react";
import {
  ViroARScene,
  Viro3DObject,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroAmbientLight
} from "react-viro";

ViroARTrackingTargets.createTargets({
  qrcode: {
    source: require("./res/qrcode.png"),
    orientation: "Up",
    physicalWidth: 0.1
  }
});

export default class HelloWorldSceneAR extends Component {
  render() {
    return (
      <ViroARScene>
        <ViroARImageMarker target="qrcode">
          <Viro3DObject
            rotation={[-90, 0, 0]}
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
