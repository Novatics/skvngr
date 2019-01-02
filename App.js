import React, { Component, Fragment } from 'react';
import { ViroARSceneNavigator } from 'react-viro';
import Scene from './js/Scene';
import EndScreen from './js/EndScreen';

const API_KEY = 'E658630C-44FE-45B4-A235-5031C4930327';
export default class Skvngr extends Component {
  state = {
    page: 'home',
    endScreenOpen: true,
  };

  render() {
    const { page, endScreenOpen } = this.state;

    switch (page) {
      case 'end':
        return <EndScreen />;
      default:
        return (
          <Fragment>
            <ViroARSceneNavigator
              apiKey={API_KEY}
              initialScene={{ scene: Scene }}
            />

            <EndScreen
              open={endScreenOpen}
              onClose={() => this.setState({ endScreenOpen: false })}
            />
          </Fragment>
        );
    }
  }
}
