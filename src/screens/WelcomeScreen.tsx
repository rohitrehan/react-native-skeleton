import React, { memo } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { ImageOverlay } from '../components/image-overlay';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PublicStackParamList } from '../navigation/PublicStack';
import useLanguage from '../hooks/useLanguage';
import images from '../core/images';

const WelcomeScreen = ({
  navigation,
}: NativeStackScreenProps<PublicStackParamList, 'Welcome'>) => {
  const theme = useTheme();
  const language = useLanguage();

  return (
    <ImageOverlay
      style={styles.container}
      source={theme.dark ? images.WelcomeDark : images.Welcome}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.contentContainer}>
        <Animatable.View
          style={[styles.headingContainer]}
          animation="slideInLeft"
        >
          <View style={styles.title}>
            <Text variant="headlineLarge">{language.WelcomeHeadline1}</Text>
            <Text variant="headlineLarge">{language.WelcomeHeadline2}</Text>
          </View>
        </Animatable.View>
        <Animatable.View
          style={[styles.sloganContainer]}
          animation="slideInRight"
        >
          <View style={styles.subtitle}>
            <Text variant="headlineSmall">{language.WelcomeSlogan}</Text>
          </View>
        </Animatable.View>
        <Animatable.View style={[styles.buttonContainer]} animation="flipInY">
          <Button
            icon="arrow-right-bold-circle-outline"
            mode="contained"
            compact
            onPress={() => navigation.navigate('SignIn')}
            style={styles.button}
          >
            {language.WelcomeButtonText}
          </Button>
        </Animatable.View>
      </View>
    </ImageOverlay>
  );
};

export default memo(WelcomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {},
  title: {
    alignItems: 'center',
  },
  subtitle: {},
  headerContent: {
    padding: 15,
  },
  footerContent: {
    padding: 15,
  },
  button: {
    marginTop: 20,
  },
  surface: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingContainer: { marginBottom: 50 },
  sloganContainer: { marginBottom: 50 },
  buttonContainer: {},
});
