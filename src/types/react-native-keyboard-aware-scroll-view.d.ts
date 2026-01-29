declare module 'react-native-keyboard-aware-scroll-view' {
  import { Component } from 'react';
  import { ScrollViewProps } from 'react-native';

  export interface KeyboardAwareScrollViewProps extends ScrollViewProps {
    keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
    enableOnAndroid?: boolean;
    enableAutomaticScroll?: boolean;
  }

  export class KeyboardAwareScrollView extends Component<KeyboardAwareScrollViewProps> {}
}
