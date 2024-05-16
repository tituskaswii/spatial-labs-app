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
  },
  showTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  floater: {
    position: 'absolute',
    bottom: HDP(0),
    paddingBottom: HDP(50),
    paddingTop: HDP(50),
    width,
    // backgroundColor: '#ffffff',
  },
  aviNull: {
    backgroundColor: '#E6E6E6',
    height: HDP(64),
    width: HDP(64),
    justifyContent: 'center',
    borderRadius: HDP(1000),
    alignSelf: 'center',
  },
  recItem: {
    padding: HDP(16),
    borderRadius: HDP(24),
    width: 0.35 * width,
    marginBottom: HDP(10),
    height: HDP(151),
    justifyContent: 'space-between',
  },
  modalItem: {
    padding: HDP(16),
    borderRadius: HDP(24),
    width: 0.35 * width,
    height: HDP(151),
    justifyContent: 'space-between',
    alignSelf: 'center',
    // margin: HDP(87),
  },
  saveBtn: {
    backgroundColor: '#2E2E2E',
    alignSelf: 'flex-end',
    paddingHorizontal: HDP(30),
    borderRadius: HDP(128),
  },
  delBtn: {
    backgroundColor: '#E6E6E6',
    alignSelf: 'flex-end',
    paddingHorizontal: HDP(30),
    borderRadius: HDP(128),
  },
  ctaGrid: {
    padding: HDP(12),
    borderRadius: HDP(40),
  },
  dropList: {
    flexDirection: 'row',
    gap: HDP(15),
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: HDP(20),
  },
  dropBox: {
    width: width * 0.9,
    marginTop: HDP(5),
    marginRight: HDP(50),
    paddingTop: HDP(20),
    paddingHorizontal: HDP(20),
  },
  dropView: {
    backgroundColor: '#E6E6E6',
    padding: HDP(6),
    borderRadius: HDP(8),
    height: HDP(52),
  },
  nameIcon: {
    backgroundColor: '#CFCFCF',
    height: HDP(40),
    borderRadius: HDP(12),
    width: HDP(40),
  },
  nameFill: {
    backgroundColor: '#CFCFCF',
    borderRadius: HDP(100),
    height: HDP(20),
    width: HDP(110),
  },
});

export default style;
