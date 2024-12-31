/* eslint-disable react-hooks/exhaustive-deps */
import {Animated, StatusBar, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Colors} from '../utils/Constants';
import Background from '../components/jarvis/Background';
import Loading from '../components/jarvis/Loading';
import BigHero6 from '../components/jarvis/BigHero6';
import {playTTS} from '../utils/ttsListeners';
import SoundPlayer from 'react-native-sound-player';
import {playSound} from '../utils/voiceUtils';
import {prompt} from '../utils/data';
import Instructions from '../components/jarvis/Instructions';
import Pedometer from '../components/pedometer/Pedometer';
import {askAI} from '../service/apiService';

const JarvisScreen = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [message, setMessage] = useState('');
  const [showPedometer, setShowPedometer] = useState(false);

  const blurOpacity = useRef(new Animated.Value(0)).current;

  const startBlur = () => {
    Animated.timing(blurOpacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const stopBlur = () => {
    Animated.timing(blurOpacity, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const timer = setTimeout(startBlur, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleError = (error: any) => {
    playTTS('There was an error. Please Try again...');
    startBlur();
    setMessage('');
    setShowLoader(true);
    SoundPlayer.stop();
    setShowInstructions(false);
    console.log(error);
  };

  const handleResponse = async (
    type: string,
    promptText: string,
    sound: string,
  ) => {
    setShowLoader(true);
    try {
      if (type === 'meditation') {
        playTTS('Focus on your breath.');
        playSound(sound);
        setMessage('meditation');
        return;
      }

      const data = await askAI(promptText);
      setMessage(data);
      playTTS(data);

      if (type === 'happiness') {
        setTimeout(() => {
          playSound(sound);
        }, 7000);
      } else {
        playSound(sound);
      }

      stopBlur();
    } catch (error) {
      handleError(error);
    } finally {
      setShowLoader(false);
    }
  };

  const onOptionPressHandler = (type: string) => {
    setShowInstructions(true);
    if (type === 'pedometer') {
      setShowPedometer(true);
      setShowLoader(false);
      return;
    }

    switch (type) {
      case 'happiness':
        handleResponse(type, prompt.joke, 'laugh');
        break;
      case 'motivation':
        handleResponse(type, prompt.motivation, 'motivation');
        break;
      case 'health':
        handleResponse(type, prompt.health, 'meditation');
        break;
      case 'meditation':
        handleResponse(type, prompt.health, 'meditation');
        break;
      default:
        handleError('there was no type like that');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.secondry} />

      {message && (
        <Instructions
          onCross={() => {
            startBlur();
            setMessage('');
            setShowLoader(true);
            SoundPlayer.stop();
            setShowInstructions(false);
          }}
          message={message}
        />
      )}

      {showPedometer && (
        <Pedometer
          onCross={() => {
            startBlur();
            setMessage('');
            setShowLoader(true);
            setShowPedometer(false);
            SoundPlayer.stop();
            setShowInstructions(false);
          }}
          message={message}
        />
      )}

      {showLoader && (
        <View style={styles.loaderContainer}>
          <Loading />
        </View>
      )}

      {!showInstructions && (
        <View style={styles.showInstructions}>
          <BigHero6 onPress={onOptionPressHandler} />
        </View>
      )}

      <Background blurOpacity={blurOpacity} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondry,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    position: 'absolute',
    zIndex: 2,
  },
  showInstructions: {
    zIndex: 3,
  },
});

export default JarvisScreen;
