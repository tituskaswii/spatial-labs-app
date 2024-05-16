import {HDP} from '@helpers';
import {HS, VS} from '@utils/metrics';
import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const style = StyleSheet.create({
  pageWrap: {
    height,
    backgroundColor: '#F0F0F0',
  },
  gif: {
    width: HS(240),
    height: VS(240),
    alignSelf: 'center',
  },
  btmBox: {
    paddingHorizontal: HDP(24),
  },
  btn: {
    width: width * 0.9,
    alignSelf: 'center',
    position: 'absolute',
    bottom: HDP(50),
  },
});

export default style;
