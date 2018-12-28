import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

export default function ProgressButton({ total, current }) {
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
        backgroundColor: 'rgba(60, 51, 82, 0.5)',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ProgressCircle
        percent={(100 * current) / total}
        radius={innerRadius}
        borderWidth={stripeWidth}
        fill={current}
        color="#f4816a"
        bgColor="#3C3352"
        shadowColor="rgba(60, 51, 82, 0.5)"
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
