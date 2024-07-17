import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {
  Button as PaperButton,
  ButtonProps,
  TouchableRipple,
  TouchableRippleProps,
  Text,
} from 'react-native-paper';

interface Props extends ButtonProps {
  touchableProps?: TouchableRippleProps;
}

export default function Button({onPress, children, ...props}: Props) {
  return (
    <PaperButton
      style={[styles.button]}
      onPress={onPress}
      rippleColor="rgba(255, 255, 255, 0.3)"
      mode="elevated"
      {...props}>
      <View style={styles.content}>
        {typeof children === 'string' ? <Text>{children}</Text> : children}
      </View>
    </PaperButton>
  );
}

interface Style {
  button: ViewStyle;
  content: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  button: {
    borderRadius: 4,
    marginVertical: 10,
    elevation: 2, // Adds shadow for Android
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
