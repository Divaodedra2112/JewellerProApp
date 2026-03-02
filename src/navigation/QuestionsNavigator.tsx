import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QuestionsStackParamList } from '../types/navigation';
import QuestionsListScreen from '../modules/main/Questions/QuestionsListScreen';
import QuestionDetailScreen from '../modules/main/Questions/QuestionDetailScreen';

const Stack = createNativeStackNavigator<QuestionsStackParamList>();

const QuestionsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="QuestionsList" component={QuestionsListScreen} />
      <Stack.Screen name="QuestionDetail" component={QuestionDetailScreen} />
    </Stack.Navigator>
  );
};

export default QuestionsNavigator;
