import React, { Component } from "react";
import {
  ViroARScene,
  ViroMaterials,
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
  state = {
    animateCar: false
  };

  log = () => {
    console.log("HELLO", "💩 ".repeat(100));
  };

  _onAnchorFound = () => {
    this.log();
    this.setState({
      animateCar: true
    });
  };
  _toggleButtons = () => {
    this.setState({
      animName: this.state.animName == "scaleUp" ? "scaleDown" : "scaleUp"
    });
  };

  render() {
    return (
      <ViroARScene>
        <ViroARImageMarker
          target="qrcode"
          onAnchorFound={this._onAnchorFound}
          pauseUpdates={this.state.pauseUpdates}
        >
          <Viro3DObject
            scale={[0, 0, 0]}
            source={require("./res/tesla/object_car.obj")}
            resources={[require("./res/tesla/object_car.mtl")]}
            type="OBJ"
            materials="white"
            onClick={this._toggleButtons}
            animation={{ name: "scaleCar", run: this.state.animateCar }}
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

ViroMaterials.createMaterials({
  white: {
    lightingModel: "PBR",
    diffuseTexture: require("./res/tesla/object_car_main_Base_Color.png"),
    metalnessTexture: require("./res/tesla/object_car_main_Metallic.png"),
    roughnessTexture: require("./res/tesla/object_car_main_Roughness.png")
  }
});

ViroARTrackingTargets.createTargets({
  logo: {
    source: require("./res/logo.png"),
    orientation: "Up",
    physicalWidth: 0.165 // real world width in meters
  }
});

ViroAnimations.registerAnimations({
  scaleUp: {
    properties: { scaleX: 1, scaleY: 1, scaleZ: 1 },
    duration: 500,
    easing: "bounce"
  },
  scaleDown: {
    properties: { scaleX: 0, scaleY: 0, scaleZ: 0 },
    duration: 200
  },
  scaleCar: {
    properties: { scaleX: 0.09, scaleY: 0.09, scaleZ: 0.09 },
    duration: 500,
    easing: "bounce"
  }
});
