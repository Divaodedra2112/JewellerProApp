import { Platform, StyleSheet } from 'react-native';
import {colors, Fonts} from '../../utils/theme';
import {moderateScale, scale} from '../../utils/Responsive';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    backgroundColor: colors.ScreenBGColor,
    borderWidth:1,
    borderColor:colors.gray100,
    borderRadius:moderateScale(35),
    justifyContent:'space-between',
    padding:moderateScale(12),
  },
  commonFlex7:{
    flex:7,
    backgroundColor: colors.ScreenBGColor,
  },
  commonFlex3:{
    flex:3,
    backgroundColor: colors.ScreenBGColor,
  },
  commonAlignRight:{
    alignItems:'flex-end'
  },
  textStyle:{
    fontWeight: '400',
    fontSize: scale(16),
    lineHeight: moderateScale(22),
    // textAlign: 'center',
    color: colors.gray1000,
    fontFamily: Fonts.regular,
    // marginBottom: moderateScale(64),
  },
});
