import { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ROLE_TYPE } from '../utils/Const';
import {
  ConcernIcon,
  SampleRequestDrawerIcon,
  DailyVisitDrawerMenu,
  CompetitorAnalysisDrawerMenu,
  MasterBagDrawerMenu,
} from '../assets/icons/svgIcons/appSVGIcons';
import { MainStackParamList } from '../types/navigation';
import { StackNavigationProp } from '@react-navigation/stack';

interface FloatingAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ color: string; width: number; height: number }>;
  onPress: () => void;
}

export const useFloatingActions = (): FloatingAction[] => {
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
  const user = useSelector((state: RootState) => state.auth.user);
  const isSalesperson = user?.roles?.some(role => role.roleType === ROLE_TYPE.SALESPERSON);

  return useMemo(() => {
    const allActions: FloatingAction[] = [
      {
        id: 'concern',
        label: 'Concern',
        icon: ConcernIcon,
        onPress: () => (navigation as any).navigate('CreateTaskScreen'),
      },
      {
        id: 'sampleRequest',
        label: 'Sample',
        icon: SampleRequestDrawerIcon,
        onPress: () => (navigation as any).navigate('AddSampleRequestScreen'),
      },
      {
        id: 'dailyVisit',
        label: 'Daily Report',
        icon: DailyVisitDrawerMenu,
        onPress: () => (navigation as any).navigate('AddDailyVisitScreen'),
      },
      {
        id: 'competitorAnalysis',
        label: 'Competitor',
        icon: CompetitorAnalysisDrawerMenu,
        onPress: () => (navigation as any).navigate('AddCompetitorAnalysisScreen'),
      },
      {
        id: 'masterBag',
        label: 'Master Bag',
        icon: MasterBagDrawerMenu,
        onPress: () => (navigation as any).navigate('AddMasterBagCapScreen'),
      },
    ];

    // Filter out Master Bag if user is salesperson
    if (isSalesperson) {
      return allActions.filter(action => action.id !== 'masterBag');
    }
    return allActions;
  }, [isSalesperson, navigation]);
};
