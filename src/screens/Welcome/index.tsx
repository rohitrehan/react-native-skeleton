import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import images from '../../config/images';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../router';
import {Text, useTheme} from 'react-native-paper';
import Button from '../../components/Base/Button';

// const {height, width} = Dimensions.get('screen');

export default function WelcomeScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Welcome'>) {
  const theme = useTheme();
  return (
    <ImageBackground
      source={theme.dark ? images.WelcomeDark : images.Welcome}
      style={{height: '100%', width: '100%'}}>
      <View style={[styles.overlay]}>
        <View style={styles.title}>
          <Text variant="headlineLarge">Sample</Text>
          <Text variant="headlineLarge">Template</Text>
        </View>
        <View style={styles.subTitle}>
          <Text variant="headlineSmall">Ready to customize</Text>
        </View>
        <View>
          <Button
            buttonColor={theme.colors.onPrimary}
            onPress={() => navigation.navigate('Home')}>
            <Text>Get Started</Text>
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
}

interface Style {
  overlay: ViewStyle;
  title: TextStyle;
  subTitle: TextStyle;
}
const styles: Style = StyleSheet.create<Style>({
  overlay: {
    width: '100%',
    position: 'absolute',
    bottom: 60,
    alignContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: '-5%',
  },
  subTitle: {
    marginTop: 20,
  },
});
