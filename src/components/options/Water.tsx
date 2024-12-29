/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {circleRadius, Colors} from '../../utils/Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {useWaterStore} from '../../state/waterStore';
import {playTTS} from '../../utils/ttsListeners';
import {playSound} from '../../utils/voiceUtils';

const Water = () => {
  const {waterDrinkStamps, addWaterIntake} = useWaterStore();
  const totalSegments = 8;
  const completedSegments = waterDrinkStamps.length;

  const handlePress = () => {
    playSound('ting');
    if (completedSegments < totalSegments) {
      const timeStamp = new Date().toISOString();
      addWaterIntake(timeStamp);
    } else {
      playTTS('You have completed your daily water intake');
    }
  };

  const containerStyle = [
    styles.container,
    completedSegments === totalSegments && styles.containerCompleted,
  ];

  return (
    <TouchableOpacity
      style={containerStyle}
      // style={styles.container}
      onPress={handlePress}>
      <Icon name="water" size={RFValue(40)} color="#1ca3ec" />
      <View style={styles.segmentContainer}>
        {Array.from({length: totalSegments}).map((_, index) => (
          <View
            key={index}
            style={[
              styles.segment,
              {
                backgroundColor:
                  completedSegments === totalSegments
                    ? '#00D100'
                    : index < completedSegments
                    ? '#1ca3ec'
                    : '#eee',
                transform: [
                  {rotate: `${(index * 360) / totalSegments}deg`},
                  {translateX: circleRadius / 2 - 5},
                ],
              },
            ]}
          />
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: circleRadius,
    width: circleRadius,
    borderRadius: circleRadius,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    shadowOffset: {width: 1, height: 1},
    elevation: 10,
    shadowRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
  },
  containerCompleted: {
    shadowColor: 'yellow',
    elevation: 10,
  },
  segmentContainer: {
    position: 'absolute',
    height: circleRadius,
    width: circleRadius,
    borderRadius: circleRadius / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  segment: {
    position: 'absolute',
    width: 8,
    height: 4,
    borderRadius: 2,
  },
});

export default Water;
