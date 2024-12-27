import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';

const App = () => {
  return (
    <View>
      <Icon name="arrow-down" size={RFValue(20)} color="white" />
    </View>
  );
};

const styles = StyleSheet.create({});

export default App;
