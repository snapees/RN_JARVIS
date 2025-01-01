/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {displayNotification} from './src/notification/notificationInitial';

async function onMessageRecieved(message) {
  console.log(message);

  const {title, imageUrl, description} = message.data;
  await displayNotification(title, imageUrl, description, 'fcm-message');
}

messaging().onMessage(onMessageRecieved);
messaging().setBackgroundMessageHandler(onMessageRecieved);

AppRegistry.registerComponent(appName, () => App);
