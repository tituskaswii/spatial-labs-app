import {HDP} from '@helpers';
import {HS, VS} from '@utils/metrics';
import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const style = StyleSheet.create({
  pageWrap: {
    height,
    // backgroundColor: 'red',
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
    backgroundColor: '#E6E6E6',
    paddingHorizontal: HDP(20),
    paddingVertical: HDP(14),
    borderRadius: HDP(100),
  },
  aviNull: {
    backgroundColor: '#E6E6E6',
    height: HDP(100),
    width: HDP(100),
    justifyContent: 'center',
    borderRadius: HDP(1000),
    alignSelf: 'center',
    // overflow: 'hidden',
  },
  optBox: {
    backgroundColor: '#fff',
    borderRadius: HDP(12),
    width: width * 0.7,
    alignSelf: 'center',
    position: 'absolute',
    top: HDP(120),
    zIndex: 10000,
    // marginTop: HDP(20),
  },
  optItem: {
    padding: HDP(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divide: {
    width: '100%',
    height: 1,
    backgroundColor: '#11111140',
  },
});

export default style;
