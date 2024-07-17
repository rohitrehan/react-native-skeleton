import React, {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {useCallback, useEffect, useMemo} from 'react';
import {Appbar} from 'react-native-paper';

export default function Header({navigation, route}: NativeStackHeaderProps) {
  const title = useMemo(() => route.name, [route.name]);
  const back = useMemo(() => route.name !== 'Home', [route.name]);

  return (
    <Appbar.Header mode="center-aligned">
      {back ? (
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
      ) : (
        <Appbar.Action
          icon="menu"
          onPress={() => {
            navigation.navigate('Menu');
          }}
        />
      )}
      <Appbar.Content title={title} />
      <Appbar.Action
        icon="cog"
        onPress={() => {
          navigation.navigate('Settings');
        }}
      />
    </Appbar.Header>
  );
}
