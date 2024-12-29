/* eslint-disable react-hooks/exhaustive-deps */
import {Animated, StyleSheet, View} from 'react-native';
import React, {FC, useEffect, useRef} from 'react';
import {screenHeight, screenWidth} from '../../utils/Scaling';
import {bigHero6Data} from '../../utils/data';
import Water from '../options/Water';
import OptionItem from '../options/OptionItem';

interface BigHero6Props {
  onPress: (type: string) => void;
}

const BigHero6: FC<BigHero6Props> = ({onPress}) => {
  const animatedValues = useRef(
    [...Array(6)].map(() => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    Animated.stagger(
      100,
      animatedValues.map((animatedValue, index) =>
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
          delay: index * 200,
        }),
      ),
    ).start();
  }, []);

  return (
    <View style={styles.circle}>
      {bigHero6Data.map((item, index) => {
        const angle = 2 * Math.PI * (index / 6);
        const x = screenWidth * 0.38 * Math.cos(angle);
        const y = screenWidth * 0.38 * Math.sin(angle);
        // console.log(angle, x, y);

        const translateX = animatedValues[index].interpolate({
          inputRange: [0, 1],
          outputRange: [0, x],
        });

        const translateY = animatedValues[index].interpolate({
          inputRange: [0, 1],
          outputRange: [0, y],
        });

        return (
          <Animated.View
            style={[styles.item, {transform: [{translateX}, {translateY}]}]}
            key={index}>
            {item !== 'water' && <OptionItem onPress={onPress} item={item} />}
            {item === 'water' && <Water />}
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  item: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
});

export default BigHero6;
