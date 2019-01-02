import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

const dimensions = Dimensions.get('window');

const EndScreen = ({ open, onClose }) =>
  open && (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        top: (dimensions.height - 465) / 2,
        left: (dimensions.width - 335) / 2,
        borderRadius: 10,
        position: 'absolute',
        width: 335,
        height: 465,
      }}
    >
      <TouchableHighlight
        style={{
          position: 'absolute',
          top: -3,
          left: 300,
        }}
        onPress={() => onClose()}
        underlayColor="white"
      >
        <Text style={{ fontSize: 42, color: '#3c3352' }}>×</Text>
      </TouchableHighlight>

      <Image
        source={require('./res/rocket.png')}
        style={{ width: 160, height: 160, marginBottom: 30 }}
      />
      <Text
        style={{
          width: 123,
          height: 24,
          fontFamily: 'Montreal',
          fontSize: 20,
          fontWeight: 'bold',
          letterSpacing: 0.33,
          textAlign: 'center',
          color: '#3c3352',
          marginBottom: 10,
        }}
      >
        PARABÉNS!
      </Text>
      <Text
        style={{
          width: 194,
          height: 40,
          fontFamily: 'Montreal',
          fontSize: 16,
          lineHeight: 20,
          textAlign: 'center',
          color: '#3c3352',
          marginBottom: 60,
        }}
      >
        Sua startup está pronta para decolar
      </Text>

      <Text
        style={{
          width: 228,
          height: 36,
          opacity: 0.7,
          fontFamily: 'Montreal',
          fontSize: 12,
          lineHeight: 18,
          textAlign: 'center',
          color: '#3c3352',
          marginBottom: 15,
        }}
      >
        Retire seu prêmio na entrada utilizando o código abaixo:
      </Text>

      <Text
        style={{
          width: 133,
          height: 19,
          fontFamily: 'Montreal',
          fontSize: 16,
          fontWeight: 'bold',
          lineHeight: 19,
          letterSpacing: 0.6,
          textAlign: 'center',
          color: '#3c3352',
        }}
      >
        0994773662991
      </Text>
    </View>
  );

export default EndScreen;
