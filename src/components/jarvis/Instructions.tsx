import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts} from '../../utils/Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import LottieView from 'lottie-react-native';
import Markdown from 'react-native-markdown-display';

interface instructionsProps {
  message: string;
  onCross: () => void;
}

const Instructions: FC<instructionsProps> = ({message, onCross}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cross} onPress={onCross}>
        <Icon name="close-circle" color="red" size={RFValue(20)} />
      </TouchableOpacity>
      <Image
        source={require('../../assets/images/logo_short.png')}
        style={styles.logo}
      />

      <View>
        {message === 'meditation' ? (
          <LottieView
            source={require('../../assets/animations/breath.json')}
            style={styles.message}
            autoPlay
            loop
          />
        ) : (
          <Markdown
            style={{
              body: {
                fontFamily: Fonts.Theme,
                padding: 20,
                fontSize: RFValue(22),
              },
            }}>
            {message}
          </Markdown>
        )}
      </View>
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

export default Instructions;
