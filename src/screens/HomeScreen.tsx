import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useTheme, Text } from 'react-native-paper';
import { useAppSelector } from '../store/hook';
import { selectAuthState } from '../store/authSlice';

const HomeScreen = () => {
  const theme = useTheme();
  const authState = useAppSelector(selectAuthState);
  return (
    <>
      <View
        style={[
          styles.container,
          { backgroundColor: theme.colors.primaryContainer },
        ]}
      >
        <Text variant="headlineLarge">
          Welcome {authState?.userName ?? 'Guest'}
        </Text>
        <Text
          style={{ color: theme.colors.onPrimaryContainer }}
          variant="titleLarge"
        >
          RNS is a mobile application designed to help users track and maintain
          their daily habits, with a focus on sustainability and environmental
          awareness. Developed using Eact Native, the app allows users to create
          personalized goals and track their progress towards a more
          eco-friendly lifestyle.
        </Text>
        <Text
          style={{ color: theme.colors.onPrimaryContainer }}
          variant="titleLarge"
        >
          Target Audience:
        </Text>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
});
