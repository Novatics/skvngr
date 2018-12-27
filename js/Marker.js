import React from "react";
import PropTypes from "prop-types";
import {
  ViroARImageMarker,
  Viro3DObject,
  ViroSpotLight,
  ViroQuad,
} from "react-viro";

const origin = {
  x: 0,
  y: 0,
  z: 0,
};

const SourceType = PropTypes.oneOfType([
  PropTypes.shape({ uri: PropTypes.string }),
  PropTypes.number, // binary
]);

export default class Marker extends React.Component {
  static propTypes = {
    source: SourceType.isRequired,
    resources: PropTypes.arrayOf(SourceType).isRequired,
  };

  state = {
    more60: false,
    rotation: origin,
    position: origin,
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
    const { resources, source } = this.props;
    const { rotation, position, more60 } = this.state;
    return (
      <ViroARImageMarker
        target="qrcode"
        onAnchorFound={this.updateAnchorRotation}
        onAnchorUpdated={this.updateAnchorRotation}
      >
        <ViroSpotLight
          color="#ffffff"
          position={[0, 5, 0]}
          direction={[0, -0.01, 0]}
          castsShadow
          shadowMapSize={200000}
          shadowNearZ={2}
          shadowFarZ={7}
          shadowOpacity={0.5}
        />
        <Viro3DObject
          onClick={() => alert("Sou a sua energia!! ")}
          rotation={[-rotation.x, -rotation.y + 180, -rotation.z]}
          scale={[0.005, 0.005, 0.005]}
          position={[position.x, position.y, position.z]}
          source={source}
          resources={resources}
          type="OBJ"
        />

        <Viro3DObject
          onClick={() => alert("Sou a sua energia!! ")}
          animation={{
            name: more60 ? 'rotateOverZ' : 'rotateOverY',
            run: true,
            loop: true,
          }}
          rotation={[-rotation.x, -rotation.y, -rotation.z]}
          scale={[0.005, 0.005, 0.005]}
          position={[position.x, position.y, position.z]}
          source={require("./res/forma1.obj")}
          resources={[require("./res/forma1.mtl")]}
          type="OBJ"
        />
        <ViroQuad
          rotation={[-90, 0, 0]}
          position={[0, -0.001, 0]}
          width={1}
          height={1}
          arShadowReceiver={true}
        />
      </ViroARImageMarker>
    );
  }
}
