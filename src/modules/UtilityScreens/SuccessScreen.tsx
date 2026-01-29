import React from 'react';
import { Layout } from '@ui-kitten/components';
import styles from './SuccessScreen.styles';
import { Images } from '../../utils';
import { AppText, TEXT_VARIANTS } from '../../components/AppText/AppText';
import { AppButton, AppImage } from '../../components';
import { ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../../utils/theme';

interface SuccessScreenProps {
  onAddAnother?: () => void;
  onGoToList?: () => void;
  onAddToChatList?: () => void;
  onSecondaryAction?: () => void;
  onSharePin?: () => void;
  title?: string;
  subtitle?: string;
  addAnotherLabel?: string;
  goToListLabel?: string;
  addToChatListLabel?: string;
  secondaryActionLabel?: string;
  sharePinLabel?: string;
  isAddToChatLoading?: boolean;
}

const SuccessScreen = ({
  onAddAnother,
  onGoToList,
  onAddToChatList,
  onSecondaryAction,
  onSharePin,
  title = 'Great work!',
  subtitle = 'Your item has been added successfully.',
  addAnotherLabel = 'Add Another Item',
  goToListLabel = '',
  addToChatListLabel = '',
  secondaryActionLabel = '',
  sharePinLabel = '',
  isAddToChatLoading = false,
}: SuccessScreenProps) => (
  <Layout style={styles.container} level="1">
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <AppImage
        image={Images.SUCCESS_IMAGE}
        mainStyle={styles.image}
        resizeMode="contain"
        isDisabled={true}
        from="success"
      />
      <AppText variant={TEXT_VARIANTS.h1} style={styles.title}>
        {title}
      </AppText>
      <AppText variant={TEXT_VARIANTS.h3_large} style={styles.subtitle}>
        {subtitle}
      </AppText>
      <AppButton onPress={onAddAnother ?? (() => {})} style={styles.button}>
        {addAnotherLabel}
      </AppButton>

      {secondaryActionLabel && onSecondaryAction && (
        <AppButton
          variant="secondary"
          onPress={onSecondaryAction}
          style={[styles.secondaryButton, { borderColor: colors.gray100 }]}
          textStyle={styles.secondaryButtonText}
        >
          {secondaryActionLabel}
        </AppButton>
      )}

      <TouchableOpacity
        style={styles.goToListButton}
        onPress={isAddToChatLoading ? undefined : onGoToList ?? (() => {})}
      >
        <AppText variant={TEXT_VARIANTS.h3_large} style={styles.goToListText}>
          {goToListLabel}
        </AppText>
      </TouchableOpacity>

      {addToChatListLabel ? (
        <TouchableOpacity onPress={isAddToChatLoading ? undefined : onAddToChatList ?? (() => {})}>
          <AppText variant={TEXT_VARIANTS.h3_large} style={styles.goToListText}>
            {isAddToChatLoading ? 'Loading chat groups…' : addToChatListLabel}
          </AppText>
        </TouchableOpacity>
      ) : null}

      {sharePinLabel ? (
        <TouchableOpacity
          onPress={onSharePin ?? (() => {})}
          style={styles.sharePinButton}
        >
          <AppText variant={TEXT_VARIANTS.h3_large} style={styles.goToListText}>
            {sharePinLabel}
          </AppText>
        </TouchableOpacity>
      ) : null}
    </ScrollView>
  </Layout>
);

export default SuccessScreen;
