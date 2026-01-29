import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './StatCard.style';
import { outerShadow } from '../../utils/CommonStyles';
import { formatNumberIndian } from '../../utils/commonFunctions';
import { AppLoader } from '../AppLoader';
import { colors } from '../../utils/theme';

interface StatCardProps {
  number: string | number;
  sign?: string;
  title: string;
  handleOnClick?: () => void;
  backgroundColor?: string; // Add backgroundColor prop
  isLoading?: boolean; // Add loading prop
}

const StatCard: React.FC<StatCardProps> = ({
  number,
  sign = '',
  title,
  handleOnClick,
  backgroundColor,
  isLoading = false,
}) => {
  // Disable click if number is 0 or handleOnClick is not provided
  const isDisabled =
    !handleOnClick || number === 0 || (typeof number === 'string' && parseFloat(number) === 0);

  return (
    <TouchableOpacity
      style={[outerShadow, styles.card, backgroundColor && { backgroundColor }]}
      onPress={handleOnClick}
      disabled={isDisabled || isLoading}
    >
      {isLoading ? (
        <AppLoader
          isLoading={true}
          style={{
            position: 'relative',
            backgroundColor: 'transparent',
          }}
        />
      ) : (
        <>
          <Text style={styles.numberText}>
            {formatNumberIndian(number)}
            {sign}
          </Text>
          <Text style={styles.titleText}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default StatCard;
