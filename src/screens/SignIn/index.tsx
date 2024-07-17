import React from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../router';
import {Text} from 'react-native-paper';

export default function SignInScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'SignIn'>) {
  return <Text>Home page content as per your design</Text>;
}
