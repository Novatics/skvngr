import React, { Component } from "react";
import {
  ViroARScene,
  Viro3DObject,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroAmbientLight,
  ViroAnimations,
} from "react-viro";

import Marker from "./Marker";

ViroARTrackingTargets.createTargets({
  qrcode: {
    source: require("./res/qrcode.png"),
    orientation: "Up",
    physicalWidth: 0.1,
  },
});

ViroAnimations.registerAnimations({
  rotateOverY: {
    properties: { rotateY: "+=270" },
    duration: 3000,
  },
  rotateOverZ: {
    properties: { rotateZ: "+=270" },
    duration: 3000,
  },
});

export default function Scene() {
  return (
    <ViroARScene displayPointCloud={NODE_ENV !== "production"}>
      <ViroAmbientLight color="#ffffff" />
      <Marker
        source={require("./res/marca.obj")}
        resource={[require("./res/marca.mtl")]}
      />
    </ViroARScene>
  );
}
