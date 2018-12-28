import React from 'react';
import PropTypes from 'prop-types';
import {
  ViroARImageMarker,
  Viro3DObject,
  ViroAnimations,
  ViroQuad,
  ViroSpotLight,
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
  shrink: {
    properties: { scaleX: 0, scaleY: 0, scaleZ: 0, opacity: 0  },
    duration: 500,
    easing: 'EaseInEaseOut'

  },
  grow: {
    properties: { scaleX: '*=1.1', scaleY: '*=1.1', scaleZ: '*=1.1' },
    duration: 100,
    easing: 'EaseInEaseOut'
  },
  closing:[
    ["grow", "shrink"],
  ]
});

export default class Marker extends React.Component {
  static propTypes = {
    target: PropTypes.string.isRequired,
    source: SourceType.isRequired,
    resources: PropTypes.arrayOf(SourceType).isRequired,
  };

  state = {
    rotation: 0,
    closing: false
    };

  updateAnchorRotation = anchor => {
    const [x] = anchor.rotation;
    this.setState({ rotation: Math.floor(x) });
  };

  paperAngle = () => {
    const { rotation } = this.state;

    if (rotation > 60) return PaperAngle.High;
    if (rotation > 30) return PaperAngle.Medium;
    return PaperAngle.Small;
  };

  animationName = () => {
    if(this.state.closing) {
      return 'closing'
    }
    

    if (this.paperAngle() === PaperAngle.High){ 
      return 'rotateOverZ';
    }
    
    return 'rotateOverY';
    
  };

  position = () => {
    if (this.paperAngle() === PaperAngle.High) {
      return [0, 0, -0.1];
    }

    return [0, 0.1, 0];
  };

  getObject = () => {
    this.setState({ closing: true});
  }

  render() {
    const { resources, source, target } = this.props;
    const { rotation, closing } = this.state;

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
          shadowMapSize={2}
          shadowNearZ={2}
          shadowFarZ={7}
          shadowOpacity={0.5}
        />
    
        <Viro3DObject
          opacity={1}
          onClick={() => this.getObject()}
          animation={{
            name: this.animationName(),
            run: true,
            loop: true,
            interruptible: true,
            onFinish: closing ? () => this.setState({ closing: false }) : undefined
          }}
          rotation={[-rotation, 0, 0]}
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
