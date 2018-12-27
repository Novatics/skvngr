import React, { Component } from "react";
import { ViroARSceneNavigator } from "react-viro";
import Scene from "./js/Scene";

const API_KEY = "E658630C-44FE-45B4-A235-5031C4930327";

export default function Skvngr() {
  return (
    <ViroARSceneNavigator
      apiKey={API_KEY}
      bloomEnabled
      initialScene={{ scene: Scene }}
      autofocus
    />
  );
}
