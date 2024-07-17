import React, {useCallback, useMemo} from 'react';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import useLanguage from '../../hooks/useLanguage';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../router';
import {
  Divider,
  Icon,
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';

interface IMenuItem {
  key: string;
  label: string;
  icon: string;
  onPress: {
    navigateTo?: keyof RootStackParamList;
    action?: Function;
  };
}
const MenuItem = ({
  label,
  icon,
  onPress,
  navigation,
}: IMenuItem & {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Menu', undefined>;
}) => {
  const handlePress = () => {
    if (onPress.action) {
      onPress.action();
    }
    if (onPress.navigateTo) {
      navigation.navigate(onPress.navigateTo);
    }
  };
  return (
    <TouchableRipple
      style={styles.menuItemContainerWrap}
      rippleColor="rgba(255, 255, 255, 0.3)"
      onPress={handlePress}>
      <>
        <View style={styles.menuItemContainer}>
          {/* {icon && (
          <Icon
            // style={styles.menuItemIcon}
            source={icon}
            size={24}
            color={theme.colors.text.toString()}
          />
        )} */}
          <Text style={[styles.menuItemLabel]}>{label}</Text>
        </View>
        <Divider />
      </>
    </TouchableRipple>
  );
};

/** This should move to drawer navigation, once admob issue on google AI is solved,  */
export default function MenuScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Menu'>) {
  const theme = useTheme();
  console.log(theme.dark ? 'dark theme' : 'light theme');
  const language = useLanguage();

  const doLogout = useCallback(() => {
    console.log('logout');
  }, []);

  const items: IMenuItem[] = useMemo(
    () => [
      {
        key: 'home',
        icon: 'home',
        label: language.home,
        onPress: {navigateTo: 'Home'},
      },
      {
        key: 'signup',
        icon: 'account-edit-outline',
        label: language.labelSignup,
        onPress: {navigateTo: 'SignUp'},
      },
      {
        key: 'signin',
        icon: 'account-edit-outline',
        label: language.labelSignin,
        onPress: {navigateTo: 'SignIn'},
      },
      {
        key: 'profile',
        icon: 'account-edit-outline',
        label: language.profile,
        onPress: {navigateTo: 'Profile'},
      },
      {
        key: 'logout',
        icon: 'logout',
        label: language.logout,
        onPress: {action: doLogout},
      },
    ],
    [
      doLogout,
      language.home,
      language.labelSignin,
      language.labelSignup,
      language.logout,
      language.profile,
    ],
  );
  return (
    <Surface style={styles.menuContainer}>
      <View style={styles.menuContainerLeft}>
        {items.map(item => (
          <MenuItem navigation={navigation} {...item} />
        ))}
      </View>
      {/* <View style={styles.menuContainerRight}>
        <></>
      </View> */}
    </Surface>
  );
}

interface Style {
  menuItemContainerWrap: ViewStyle;
  menuItemContainer: ViewStyle;
  menuItemIcon: TextStyle;
  menuItemLabel: TextStyle;
  menuContainer: ViewStyle;
  menuContainerLeft: ViewStyle;
  menuContainerRight: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  menuItemContainerWrap: {},
  menuItemContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
  },
  menuItemIcon: {marginRight: 10},
  menuItemLabel: {},
  menuContainer: {
    flexDirection: 'row',
  },
  menuContainerLeft: {
    flex: 1,
    // width: '85%',
    minHeight: '100%',
  },
  menuContainerRight: {
    width: '15%',
  },
});
