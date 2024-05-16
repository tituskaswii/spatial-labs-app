import {RF} from '@helpers';
import {family} from '@theme';
import React, {FC} from 'react';
import {Text as RNText, StyleSheet, TextStyle} from 'react-native';

interface Props {
  children?: React.ReactNode;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  p?: boolean;
  size?: TextStyle['fontSize'];
  fontSize?: TextStyle['fontSize'];
  bold?: boolean;
  semibold?: boolean;
  medium?: boolean;
  weight?: TextStyle['fontWeight'];
  fontWeight?: TextStyle['fontWeight'];
  center?: boolean;
  color?: TextStyle['color'];
  opacity?: TextStyle['opacity'];
  font?: TextStyle['fontFamily'];
  fontFamily?: TextStyle['fontFamily'];
  align?: TextStyle['textAlign'];
  textAlign?: TextStyle['textAlign'];
  transform?: TextStyle['textTransform'];
  textTransform?: TextStyle['textTransform'];
  lineHeight?: TextStyle['lineHeight'];
  position?: TextStyle['position'];
  top?: TextStyle['top'];
  right?: TextStyle['right'];
  bottom?: TextStyle['bottom'];
  left?: TextStyle['left'];
  style?: any;
  onPress?: any;
}

export const Text: FC<Props> = ({
  children,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  size,
  fontSize,
  bold,
  semibold,
  weight,
  fontWeight,
  center,
  color = '#151515',
  opacity,
  font,
  fontFamily = family.Regular,
  align,
  textAlign,
  transform,
  textTransform,
  lineHeight,
  position,
  top,
  right,
  bottom,
  left,
  style,
  medium,
  onPress,
  ...props
}) => {
  const textStyle = StyleSheet.flatten([
    h1 && {fontSize: RF(38), fontFamily: family.Bold},
    h2 && {fontSize: RF(32), fontFamily: family.Bold},
    h3 && {fontSize: RF(28), fontFamily: family.Bold},
    h4 && {fontSize: RF(24), fontFamily: family.Medium},
    h5 && {fontSize: RF(18), fontFamily: family.Medium},
    h6 && {fontSize: RF(14), fontFamily: '600'},
    p && {fontSize: RF(14), fontFamily: family.Regular},
    center && {textAlign: 'center'},
    (align || textAlign) && {textAlign: textAlign || align},
    bold && {fontWeight: family.Bold},
    semibold && {fontWeight: family.SemiBold},
    medium && {fontWeight: family.Medium},
    (weight || fontWeight) && {fontWeight: fontWeight || weight},
    (transform || textTransform) && {
      textTransform: textTransform || transform,
    },
    (font || fontFamily) && {fontFamily: fontFamily || font},
    (size || fontSize) && {fontSize: fontSize || size},
    color && {color},
    opacity && {opacity},
    lineHeight && {lineHeight},
    position && {position},
    right !== undefined && {right},
    left !== undefined && {left},
    top !== undefined && {top},
    bottom !== undefined && {bottom},
    style,
  ]);

  return (
    <RNText
      allowFontScaling={true}
      adjustsFontSizeToFit={false}
      maxFontSizeMultiplier={1.2}
      onPress={onPress}
      style={textStyle}
      {...props}>
      {children}
    </RNText>
  );
};
