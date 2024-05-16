import {HDP} from '@helpers';
import React, {FC} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

interface Props {
  flex?: ViewStyle['flex'];
  row?: boolean;
  justify?: ViewStyle['justifyContent'];
  justifyContent?: ViewStyle['justifyContent'];
  align?: ViewStyle['alignItems'];
  alignItems?: ViewStyle['alignItems'];
  content?: ViewStyle['alignContent'];
  alignContent?: ViewStyle['alignContent'];
  wrap?: ViewStyle['flexWrap'];
  width?: ViewStyle['width'];
  height?: ViewStyle['height'];
  position?: ViewStyle['position'];
  top?: ViewStyle['top'];
  right?: ViewStyle['right'];
  gap?: number;
  bottom?: ViewStyle['bottom'];
  left?: ViewStyle['left'];
  color?: ViewStyle['backgroundColor'];
  outlined?: boolean;
  card?: boolean;
  radius?: ViewStyle['borderRadius'];
  overflow?: ViewStyle['overflow'];
  safe?: boolean;
  scroll?: boolean;
  shadow?: {
    color?: ViewStyle['shadowColor'];
    offset?: ViewStyle['shadowOffset'];
    opacity?: ViewStyle['shadowOpacity'];
    radius?: ViewStyle['shadowRadius'];
  };
  children?: React.ReactNode;
  style?: any;
  onPress?: any;
  ref?: any;
  refreshControl?: any;
}

export const Block: FC<Props> = ({
  children,
  style,
  flex = 1,
  ref,
  row,
  justify,
  justifyContent,
  align,
  gap,
  alignItems,
  content,
  alignContent,
  wrap,
  width,
  height,
  position,
  top,
  right,
  bottom,
  left,
  onPress,
  // add the next props
  color,
  outlined,
  card,
  radius,
  overflow,
  safe,
  scroll,
  shadow,
  refreshControl,
  ...props
}) => {
  const blockStyle = StyleSheet.flatten([
    flex !== undefined && {flex},
    row && {flexDirection: 'row'},
    justify !== undefined && {justifyContent: justify},
    justifyContent !== undefined && {justifyContent},
    align !== undefined && {alignItems: align},
    alignItems !== undefined && {alignItems},
    content !== undefined && {alignContent: content},
    alignContent !== undefined && {alignContent},
    wrap !== undefined && {flexWrap: wrap},
    width !== undefined && {width},
    height !== undefined && {height},
    position !== undefined && {position},
    top !== undefined && {top},
    right !== undefined && {right},
    bottom !== undefined && {bottom},
    left !== undefined && {left},
    color !== undefined && {backgroundColor: color},
    gap !== undefined && {gap: HDP(gap)},
    outlined && {
      borderWidth: 1,
      borderColor: color,
      backgroundColor: 'transparent',
    },
    card && {
      backgroundColor: 'white',
      borderRadius: 16,
      padding: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.07,
      shadowRadius: 4,
      elevation: 2,
    },
    radius !== undefined && {borderRadius: radius},
    overflow !== undefined && {overflow},
    shadow !== undefined && {...shadow},
    // the style property will overwrite all above styles
    style,
  ]);

  // renders SafeAreaView if safe props is true
  if (safe) {
    return (
      <SafeAreaView ref={ref} style={blockStyle} {...props}>
        {children}
      </SafeAreaView>
    );
  }

  // renders ScrollView if scroll props is true
  if (scroll) {
    return (
      <SafeAreaView ref={ref} style={{flex: 1}} {...props}>
        <KeyboardAwareScrollView
          refreshControl={refreshControl}
          automaticallyAdjustContentInsets={false}
          keyboardShouldPersistTaps="handled"
          style={blockStyle}
          {...props}>
          {children}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }

  return (
    <TouchableOpacity
      ref={ref}
      disabled={!onPress}
      onPress={onPress}
      style={blockStyle}
      {...props}>
      {children}
    </TouchableOpacity>
  );
};
