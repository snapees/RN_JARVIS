import {StyleSheet, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const Loading = () => {
  return (
    <View>
      <LottieView
        source={require('../../assets/animations/sync.json')}
        style={styles.lottie}
        autoPlay={true}
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: 280,
    height: 100,
  },
});

export default Loading;
