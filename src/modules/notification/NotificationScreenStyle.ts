// src/screens/NotificationScreenStyle.ts
import { StyleSheet } from 'react-native';
import { colors } from '../../utils/theme';
import { moderateScale, verticalScale } from '../../utils/Responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80, // Extra padding to ensure content is visible above bottom tab bar
    flexGrow: 1,
  },
  card: {
    marginBottom: moderateScale(10),
    padding: moderateScale(16),
    backgroundColor: colors.white,
    borderRadius: moderateScale(8),
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  unread: {
    // No specific background or border for unread, only the dot
  },
  read: {
    // No specific background or border for read
  },
  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2196F3',
    marginLeft: 6,
    marginRight: 4,
    marginTop: verticalScale(5),
  },
  readView: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.transparent,
    marginTop: verticalScale(8),
    marginRight: moderateScale(8),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  timeView: { justifyContent: 'center', flexDirection: 'row', alignItems: 'center', flex: 2 },
  iconWrap: {
    marginRight: 12,
  },
  icon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    flex: 7,
    // marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#666',
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  description: { marginTop: verticalScale(8) },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0', // Placeholder background
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  checkmarkIcon: {
    marginLeft: 8,
  },
  badgeContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  badge: {
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    minWidth: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(100),
  },
  emptyStateText: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: moderateScale(14),
  },
});

export default styles;
