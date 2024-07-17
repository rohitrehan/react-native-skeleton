import React, {useEffect, useMemo} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleProp,
  StyleSheet,
  useColorScheme,
  ViewStyle,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import MenuScreen from '../screens/Menu';
import WelcomeScreen from '../screens/Welcome';
import {useAppDispatch} from '../store';
import {updateTheme} from '../store/reducers/config';
import {ThemeKey, themes} from '../config/themes';
import ProfileScreen from '../screens/Profile';
import {MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';
import Header from '../components/Base/Header';
import SettingsScreen from '../screens/Settings';
import SignUpScreen from '../screens/SignUp';
import SignInScreen from '../screens/SignIn';

const DefaultStack = createNativeStackNavigator<RootStackParamList>();

export {DefaultStack};

export default function Router() {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const paperTheme = useMemo(() => {
    const theme =
      colorScheme === 'dark'
        ? {...MD3DarkTheme, colors: themes[ThemeKey.dark].colors}
        : {...MD3LightTheme, colors: themes[ThemeKey.light].colors};
    return {...theme, roundness: 2};
  }, [colorScheme]);

  const selectedStatusBar = useMemo(() => {
    return colorScheme === 'dark' ? 'light-content' : 'dark-content';
  }, [colorScheme]);

  const themeColorStyle: StyleProp<ViewStyle> = useMemo(() => {
    return [{backgroundColor: paperTheme.colors.background}];
  }, [paperTheme]);

  const newStyle: StyleProp<ViewStyle> = themeColorStyle.concat(
    style.container,
  );

  useEffect(() => {
    if (colorScheme === 'dark') {
      dispatch(updateTheme(ThemeKey.dark));
    } else {
      dispatch(updateTheme(ThemeKey.light));
    }
  }, [colorScheme, dispatch]);

  // const isLoggedIn = false;

  return (
    <PaperProvider theme={paperTheme}>
      <SafeAreaView style={newStyle}>
        <StatusBar
          barStyle={selectedStatusBar}
          backgroundColor={paperTheme.colors.background}
        />
        <NavigationContainer>
          <DefaultStack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
              header: Header,
            }}>
            <DefaultStack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <DefaultStack.Group>
              {/* {isLoggedIn ? ( */}
              <DefaultStack.Group>
                <DefaultStack.Screen name="Home" component={HomeScreen} />
                <DefaultStack.Screen name="Profile" component={ProfileScreen} />
              </DefaultStack.Group>
              {/* ) : ( */}
              <DefaultStack.Group screenOptions={{headerShown: false}}>
                <DefaultStack.Screen name="SignIn" component={SignInScreen} />
                <DefaultStack.Screen name="SignUp" component={SignUpScreen} />
              </DefaultStack.Group>
              {/* )} */}
              {/* Common modal screens */}
              <DefaultStack.Group>
                <DefaultStack.Screen
                  name="Menu"
                  component={MenuScreen}
                  options={{
                    animation: 'slide_from_left',
                  }}
                />
                <DefaultStack.Screen
                  name="Settings"
                  component={SettingsScreen}
                  options={{
                    animation: 'slide_from_right',
                  }}
                />
                {/* <DefaultStack.Screen name="Invite" component={HomeScreen} /> */}
              </DefaultStack.Group>
            </DefaultStack.Group>
          </DefaultStack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </PaperProvider>
  );
}

interface Style {
  container: ViewStyle;
}

const style: Style = StyleSheet.create<Style>({
  container: {
    flex: 1,
    minHeight: '100%',
  },
});

export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  Profile: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Menu: undefined;
  Settings: undefined;
};

export type RootNavigationProps = NativeStackScreenProps<RootStackParamList>;
