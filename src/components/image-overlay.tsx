import React from 'react';
import {
  ColorValue,
  ImageBackground,
  ImageBackgroundProps,
  StyleSheet,
  View,
} from 'react-native';

const DEFAULT_OVERLAY_COLOR = 'rgba(0, 0, 0, 0.45)';

interface ImageOverlayProps extends ImageBackgroundProps {
  overlayColor?: ColorValue;
}
export const ImageOverlay = (props: ImageOverlayProps) => {
  const { style, children, overlayColor, ...imageBackgroundProps } = props;
  const { ...imageBackgroundStyle } = StyleSheet.flatten(style);

  return (
    <ImageBackground {...imageBackgroundProps} style={imageBackgroundStyle}>
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: overlayColor || DEFAULT_OVERLAY_COLOR },
        ]}
      />
      {children}
    </ImageBackground>
  );
};
