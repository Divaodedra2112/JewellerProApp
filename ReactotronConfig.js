import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

let reactotron;

// Only configure Reactotron in development
if (__DEV__) {
  reactotron = Reactotron.configure({
    name: 'JewellerPro App',
    host: 'localhost', // Change to your machine's IP if testing on physical device
  })
    .useReactNative({
      asyncStorage: false, // if you want to see AsyncStorage
      networking: {
        ignoreUrls: /symbolicate/,
      },
      editor: false,
      errors: { veto: (stackFrame) => false },
      overlay: false,
    })
    .use(reactotronRedux())
    .connect();

  // Clear Reactotron on each app start
  reactotron.clear();

  // Make Reactotron available globally for debugging
  console.tron = reactotron;
}

export default reactotron || Reactotron;
