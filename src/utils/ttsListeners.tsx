import Tts from 'react-native-tts';

export const initializeTtsListeners = async () => {
  Tts.getInitStatus().then(
    () => {
      console.log('TTS is ready to use ✅');
    },
    err => {
      if (err.code === 'no_engine') {
        console.log('No TTS engine installed ❌');
        Tts.requestInstallEngine();
      }
    },
  );

  // const voices = await Tts.voices();
  // console.log(voices);
  Tts.setDefaultVoice('en-us-x-iol-local');
  Tts.setDefaultRate(0.3, true);
  Tts.setIgnoreSilentSwitch('ignore');
  Tts.setDefaultPitch(0.7);

  Tts.addEventListener('tts-start', event => console.log('TTS Started', event));
  // Tts.addEventListener('tts-progress', event =>
  //   console.log('TTS progress', event),
  // );
  Tts.addEventListener('tts-finish', event => console.log('TTS finish', event));
  Tts.addEventListener('tts-cancel', event => console.log('TTS cancel', event));
};
