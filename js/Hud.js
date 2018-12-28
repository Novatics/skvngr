import React from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, Text } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

function ProgressButton({ total, current }) {
  const diameter = 92;
  const innerRadius = 38;
  const textBoxHeight = 30;
  const stripeWidth = 5;

  const baseTextStyle = {
    color: '#fff',
    paddingBottom: innerRadius - textBoxHeight / 2 - stripeWidth,
  };

  return (
    <View
      style={{
        width: diameter,
        height: diameter,
        borderRadius: diameter / 2,
        backgroundColor: '#3c3352',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        // opacity: 0.5,
      }}
    >
      <ProgressCircle
        percent={(100 * current) / total}
        radius={innerRadius}
        borderWidth={stripeWidth}
        fill={current}
        color="#f4816a"
        bgColor="#3c3352"
        shadowColor="#3c3352"
        containerStyle={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            ...baseTextStyle,
            fontSize: textBoxHeight,
          }}
        >
          {current}
        </Text>
        <Text
          style={{
            ...baseTextStyle,
            fontSize: textBoxHeight / 2,
          }}
        >
          /{total}
        </Text>
      </ProgressCircle>
    </View>
  );
}

ProgressButton.propTypes = {
  total: PropTypes.number,
  current: PropTypes.number,
};

ProgressButton.defaultProps = {
  total: 0,
  current: 0,
};

export default function Hud() {
  return (
    <View
      style={{
        position: 'absolute',
        height: 170,
        width: Dimensions.get('window').width,
        bottom: 0,
        // TODO: gradient from #006f628a to #3c3352
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ProgressButton total={5} current={3} />
    </View>
  );
}
