import React, { useEffect } from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { fetchAssociationInfo } from '../../../store/slices/associationSlice';
import AssociationInfoCard from '../../../components/AssociationInfoCard/AssociationInfoCard';
import { AppLoader } from '../../../components/AppLoader';
import CustomHeader from '../../../components/CustomHeader/Header';
import { HamburgerMenuIcon } from '../../../assets/icons/svgIcons/appSVGIcons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { colors } from '../../../utils/theme';

const HomeScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.association);

  useEffect(() => {
    // Fetch association info on mount
    dispatch(fetchAssociationInfo() as any);
  }, [dispatch]);

  const onRefresh = () => {
    dispatch(fetchAssociationInfo() as any);
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title={t('app.name')}
        showBackButton={true}
        backIcon={<HamburgerMenuIcon width={24} height={24} color={colors.Gray80} />}
        onBackPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      {loading ? (
        <AppLoader isLoading={true} />
      ) : (
        <AssociationInfoCard />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default HomeScreen;
