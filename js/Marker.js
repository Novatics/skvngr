import React from 'react';
import PropTypes from 'prop-types';
import {
  ViroARImageMarker,
  Viro3DObject,
  ViroAnimations,
  ViroQuad,
} from 'react-viro';

const SourceType = PropTypes.oneOfType([
  PropTypes.shape({ uri: PropTypes.string }),
  PropTypes.number, // binary
]);

const PaperAngle = {
  Small: 0,
  Medium: 1,
  High: 2,
};

ViroAnimations.registerAnimations({
  rotateOverY: {
    properties: { rotateY: '+=270' },
    duration: 3000,
  },
  rotateOverZ: {
    properties: { rotateZ: '-=270' },
    duration: 3000,
  },
});

export default class Marker extends React.Component {
  static propTypes = {
    target: PropTypes.string.isRequired,
    source: SourceType.isRequired,
    resources: PropTypes.arrayOf(SourceType).isRequired,
  };

  state = {
    rotation: 0,
  };

  updateAnchorRotation = anchor => {
    const [x] = anchor.rotation.map(Math.floor);
    this.setState({ rotation: x });
  };

  paperAngle = () => {
    const { rotation } = this.state;

    if (rotation > 60) return PaperAngle.High;
    if (rotation > 30) return PaperAngle.Medium;
    return PaperAngle.Small;
  };

  animationName = () => {
    switch (this.paperAngle()) {
      case PaperAngle.High:
        return 'rotateOverZ';
      default:
        return 'rotateOverY';
    }
  };

  position = () => {
    switch (this.paperAngle()) {
      case PaperAngle.High:
        return [0, 0, -0.1];
      case PaperAngle.Medium:
        return [0, 0.1, 0];
      default:
        return [0, 0, 0];
    }
  };

  render() {
    const { resources, source, target } = this.props;
    const { rotation } = this.state;

    return (
      <ViroARImageMarker
        target={target}
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
          onClick={() => alert('Sou a sua energia!! ')}
          rotation={[-rotation.x, -rotation.y + 180, -rotation.z]}
          scale={[0.005, 0.005, 0.005]}
          position={[position.x, position.y, position.z]}
          source={source}
          resources={resources}
          type="OBJ"
        />

        <Viro3DObject
          onClick={() => alert('Sou a sua energia!! ')}
          animation={{
            name: this.animationName(),
            run: true,
            loop: true,
          }}
          rotation={[-rotation.x, -rotation.y, -rotation.z]}
          scale={[0.005, 0.005, 0.005]}
          position={this.position()}
          source={source}
          resources={resources}
          type="OBJ"
        />
        <ViroQuad
          rotation={[-90, 0, 0]}
          position={[0, -0.001, 0]}
          width={1}
          height={1}
          arShadowReceiver
        />
      </ViroARImageMarker>
    );
  }
}
