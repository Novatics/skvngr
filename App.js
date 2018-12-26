import React, { Component } from "react";
import { ViroARSceneNavigator } from "react-viro";
import InitialARScene from "./js/HelloWorldSceneAR";

const sharedProps = {
  apiKey: "E658630C-44FE-45B4-A235-5031C4930327"
};

export default class Skvngr extends Component {
  state = {
    sharedProps,
  }

  render() {
    return (
      <ViroARSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: InitialARScene }}
      />
    );
  }
}
