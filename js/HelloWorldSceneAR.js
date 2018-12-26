import React, { Component } from "react";
import {
  ViroARScene,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroBox
} from "react-viro";

ViroARTrackingTargets.createTargets({
  targetOne: {
    source: require("./res/card.jpg"),
    orientation: "Up",
    physicalWidth: 0.1 // real world width in meters
  }
});

export default class HelloWorldSceneAR extends Component {
  log = () => {
    console.log("HELLO", "💩 ".repeat(100));
  };

  render() {
    return (
      <ViroARScene>
        <ViroARImageMarker target="targetOne" onAnchorFound={this.log}>
          <ViroBox position={[0, 0.25, 0]} scale={[0.5, 0.5, 0.5]} />
        </ViroARImageMarker>
      </ViroARScene>
    );
  }
}
