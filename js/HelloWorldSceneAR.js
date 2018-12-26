import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { ViroARScene, ViroText, ViroConstants } from "react-viro";

export default class HelloWorldSceneAR extends Component {
  state = {
    text: 'Initializing SKVNGR...'
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this.onInitialized}>
        <ViroText
          text={this.state.text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
        />
      </ViroARScene>
    );
  }

  onInitialized = (state, reason) => {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: "novatics!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

const styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center"
  }
});
