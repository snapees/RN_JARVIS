/* eslint-disable react-hooks/exhaustive-deps */
import {Image, StatusBar, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {Colors, Fonts, lightColors} from '../utils/Constants';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {screenHeight, screenWidth} from '../utils/Scaling';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../components/ui/CustomText';
import LottieView from 'lottie-react-native';
import {initializeTtsListeners, playTTS} from '../utils/ttsListeners';
import {resetAndNavigate} from '../utils/NavigationUtils';
import {playSound} from '../utils/voiceUtils';

const bottomColors = [...lightColors].reverse();

const SplashScreen = () => {
  const jarvisAnimation = useSharedValue(screenHeight * 0.8);
  const messageContainerAnimation = useSharedValue(screenHeight * 0.8);

  const launchAnimation = async () => {
    messageContainerAnimation.value = screenHeight * 0.001;

    playSound('ting2');
    setTimeout(() => {
      jarvisAnimation.value = -screenHeight * 0.02;
      playTTS('Hello, I am Jarvis');
    }, 600);

    setTimeout(() => {
      resetAndNavigate('JarvisScreen');
    }, 4500);
  };

  useEffect(() => {
    initializeTtsListeners();
    launchAnimation();
  }, []);

  const animateImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(jarvisAnimation.value, {
            duration: 1500,
          }),
        },
      ],
    };
  });

  const messageContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(messageContainerAnimation.value, {
            duration: 1200,
          }),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <Animated.View style={[styles.imageContainer, animateImageStyle]}>
        <Image
          source={require('../assets/images/launch.png')}
          style={styles.img}
        />
      </Animated.View>

      <Animated.View style={[styles.gradientContainer, messageContainerStyle]}>
        <LinearGradient colors={bottomColors} style={styles.gradient}>
          <View style={styles.textContainer}>
            <CustomText fontSize={34} fontFamily={Fonts.Theme}>
              Jarvis!
            </CustomText>
            <LottieView
              source={require('../assets/animations/sync.json')}
              style={styles.lottie}
              autoPlay={true}
              loop
            />
            <CustomText>
              Synchronizing Best Configurations For You...
            </CustomText>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  imageContainer: {
    width: screenWidth - 20,
    height: screenHeight * 0.5,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  gradientContainer: {
    position: 'absolute',
    height: '35%',
    bottom: 0,
    width: '100%',
  },
  gradient: {
    width: '100%',
    height: '100%',
    paddingTop: 30,
  },
  textContainer: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 20,
    padding: 20,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 1,
    shadowRadius: 2,
    alignItems: 'center',
    shadowColor: Colors.border,
  },
  lottie: {
    width: 280,
    height: 100,
  },
});

export default SplashScreen;
