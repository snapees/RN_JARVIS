import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Constants';

const Pedometer = () => {
  return (
    <View>
      <Text>Pedometer</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    width: '90%',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    shadowOffset: {height: 1, width: 1},
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 10,
    shadowColor: '#000',
    borderRadius: 10,
    zIndex: 5,
  },
  logo: {
    width: 50,
    height: 40,
    alignSelf: 'center',
    marginVertical: 10,
  },
  cross: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  message: {
    width: 400,
    height: 400,
    alignSelf: 'center',
  },
});

export default Pedometer;
