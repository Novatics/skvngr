import React, { Component } from "react";
import {
  ViroARScene,
  ViroAnimations,
  Viro3DObject,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroSpotLight
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

          <ViroSpotLight
            innerAngle={5}
            outerAngle={25}
            direction={[0, -1, 0]}
            position={[0, 5, 1]}
            color="#ffffff"
            castsShadow={true}
            shadowMapSize={2048}
            shadowNearZ={2}
            shadowFarZ={7}
            shadowOpacity={0.7}
          />
        </ViroARImageMarker>
      </ViroARScene>
    );
  }
}

ViroARTrackingTargets.createTargets({
  logo: {
    source: require("./res/logo.png"),
    orientation: "Up",
    physicalWidth: 0.165 // real world width in meters
  }
});
