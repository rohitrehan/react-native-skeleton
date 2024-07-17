import {useEffect} from 'react';
import {BackHandler, NativeEventSubscription} from 'react-native';

const useBackHandler = (handleBackPress: () => boolean | null | undefined) => {
  useEffect(() => {
    const backHandler: NativeEventSubscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return () => backHandler.remove();
  });
};

export default useBackHandler;
