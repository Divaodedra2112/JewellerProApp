import React from 'react';
import { View, Text, TextStyle, ViewStyle, ScrollView } from 'react-native';
import { styles } from './ReadMoreText.style';

interface ReadMoreTextProps {
  text: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  scrollViewStyle?: ViewStyle;
}

const ReadMoreText: React.FC<ReadMoreTextProps> = ({ text, style, textStyle, scrollViewStyle }) => {
  return (
    <View style={[styles.container, style]}>
      <ScrollView 
        style={[styles.scrollView, scrollViewStyle]} 
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </ScrollView>
    </View>
  );
};

export default ReadMoreText;
