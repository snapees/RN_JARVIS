import React, {useEffect} from 'react';
import Navigation from './src/navigation/Navigation';
import {Platform, StatusBar} from 'react-native';
import {
  batteryOptimizationCheck,
  powerManagerCheck,
  requestPermission,
} from './src/notification/notificationPermission';
import './src/notification/notificationListener';
import {registeringAllTriggers} from './src/notification/registerTriggers';
import {setCategories} from './src/notification/notificationInitial';

const App = () => {
  const permissionChecks = async () => {
    requestPermission();
    registeringAllTriggers();
    setCategories();

    if (Platform.OS === 'android') {
      batteryOptimizationCheck();
      powerManagerCheck();
    }
  };

  useEffect(() => {
    permissionChecks();
  }, []);

  return (
    <>
      <Navigation />
      <StatusBar hidden />
    </>
  );
};

export default App;
