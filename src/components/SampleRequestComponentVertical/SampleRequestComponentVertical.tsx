import React, { useRef, useState, useEffect, useMemo } from 'react';
import { TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Divider } from '@ui-kitten/components';
import { AppText } from '../AppText/AppText';
import { Avatar } from '@kolking/react-native-avatar';
import { defaultImageSize } from '../../utils/CommonStyles';
import styles from './SampleRequestComponentVertical.styles';
import { outerShadow } from '../../utils/CommonStyles';
import {
  formatDate,
  getFirstLaterCapitalize,
  getFirstTaskPriority,
  getFirstTaskStatus,
  getSampleRequestStatus,
} from '../../utils/commonFunctions';
import { ACCEPTED_STATUS_NAME, ROLE_TYPE } from '../../utils/Const';
import { SampleRequest } from '../../modules/main/SampleRequest/SampleRequestList/SharedFiles/SampleRequestListTypes';
import SampleRequestPriorityComponent from '../SampleRequestPriorityComponent/SampleRequestPriorityComponent';
import SampleRequestStatusComponent from '../SampleRequestStatusComponent/SampleRequestStatusComponent';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/reducers';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { showToast, TOAST_TYPE } from '../../utils/toast';
import AppLoder from '../AppLoder/AppLoder';
import { colors } from '../../utils/theme';
import ProductListComponent from '../ProductListComponent/ProductListComponent';
import StaffListComponentWithTab from '../StaffListComponentWithTab/StaffListComponentWithTab';
import { AppButton } from '../../components';
import { fetchStaff } from '../../modules/main/Staff/StaffList/StaffListActions';
import CommonListCardWithDetailsTextAndImageWithMultiCat from '../CommonListCardWithDetailsTextAndImageWithMultiCat/CommonListCardWithDetailsTextAndImageWithMultiCat';

interface SampleRequestComponentVerticalProps {
  data: SampleRequest;
  priorityChange: (item: any) => Promise<any> | any;
  statusChange: (item: any) => Promise<any> | any;
  staffChange: (item: any) => Promise<any> | any;
  startDateChange: (item: any) => Promise<any> | any;
  endDateChange: (item: any) => Promise<any> | any;
  productChange: (productId: number) => Promise<any> | any;
  onPress?: () => void;
  isUpdating?: boolean;
  isTechnician?: boolean;
  useSampleRequestStatus?: boolean; // New prop to determine which status to use
  EstimateHours?: string;
  PendingRequest?: boolean; // For technicianFlow
  acceptTask: (item: any) => Promise<any> | any;
}

const SampleRequestComponentVertical: React.FC<SampleRequestComponentVerticalProps> = ({
  priorityChange,
  statusChange,
  staffChange,
  startDateChange: _startDateChange,
  endDateChange: _endDateChange,
  productChange,
  data,
  onPress,
  isUpdating: _isUpdating = false,
  isTechnician: _isTechnician,
  useSampleRequestStatus = true, // Default to sample request status
  EstimateHours: _EstimateHours,
  PendingRequest,
  acceptTask,
}) => {
  const sheetRef = useRef<ActionSheetRef>(null);
  const dispatch = useDispatch();

  const {
    data: { company, customer, category, grade, product } = {},
    title,
    status,
    priority,
    assignee,
    createdAt,
    linkTo,
  } = data || {};

  // Handle both single category (backward compatibility) and multiple categories
  const categories = (data?.data as any)?.categories;
  const categoriesArray =
    categories && Array.isArray(categories) && categories.length > 0
      ? categories
      : category
      ? [category]
      : [];

  // Handle both single grade (backward compatibility) and multiple grades
  const grades = (data?.data as any)?.grades;
  const gradesArray =
    grades && Array.isArray(grades) && grades.length > 0 ? grades : grade ? [grade] : [];

  //get Task list
  const { tasksByGroup } = useSelector((state: RootState) => state.task);
  // The data is stored under "_" key because groupBy is { key: '', value: '' }
  const tasks = tasksByGroup._?.tasks || [];

  console.log('tasks-=-=-=-=-=', tasks);

  // redux
  const { staff: staffList } = useSelector((state: RootState) => state.staffReducer);
  const { taskTypes } = useSelector((state: RootState) => state.statusAndPriority);
  const { products: productList, loading: productLoading } = useSelector(
    (state: RootState) => state.product
  );
  const user = useSelector((state: RootState) => state.auth.user);

  // Check if user is a salesperson or technician
  const isStaffSelectionDisabled = user?.roles?.some(
    role => role.roleType === ROLE_TYPE.SALESPERSON || role.roleType === ROLE_TYPE.TECHNICIAN
  );

  // derive priority/status colors/icons
  const priorities = getFirstTaskPriority(taskTypes) || [];
  const statuses = useSampleRequestStatus
    ? getSampleRequestStatus(taskTypes) || []
    : getFirstTaskStatus(taskTypes) || [];
  const matchedPriority = priorities.find((p: { id: number }) => p.id === priority?.id);
  const matchedStatus = statuses.find((p: { id: number }) => p.id === status?.id);
  const prioritiesFontColor = matchedPriority?.fontColor;
  const prioritiesBackgroundColor = matchedPriority?.backgroundColor;
  const statusFontColor = matchedStatus?.fontColor;
  const statusBackgroundColor = matchedStatus?.backgroundColor;
  const statusIcon = matchedStatus?.icon;

  // local UI state
  const [assigneeId, setAssigneeId] = useState<number | null>(assignee?.id);
  const [isPriorityUpdating, setIsPriorityUpdating] = useState<boolean>(false);
  const [isStatusUpdating, setIsStatusUpdating] = useState<boolean>(false);
  const [_isStaffUpdating, setIsStaffUpdating] = useState<boolean>(false);
  const [isProductUpdating, setIsProductUpdating] = useState<boolean>(false);
  const [isAccepting, setIsAccepting] = useState<boolean>(false);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [actionSheetContent, setActionSheetContent] = useState<'staff' | 'products' | ''>('');
  const [productAssignTo, setProductAssignTo] = useState<number | null>(product?.id ?? null);

  // keep product selection in sync if parent updates `data`
  useEffect(() => {
    setProductAssignTo(product?.id ?? null);
  }, [product?.id]);

  // action sheet helpers
  const hideActionSheet = () => sheetRef.current?.hide();
  const showActionSheet = () => sheetRef.current?.show();

  // check if current status is already accepted
  const isAlreadyAccepted = status?.name === ACCEPTED_STATUS_NAME;

  // filtered products based on grade + category
  const getFilteredProducts = () => {
    if (gradesArray.length > 0 && categoriesArray.length > 0 && productList) {
      // Filter products that match any of the selected grades and any of the selected categories
      const gradeIds = gradesArray.map((g: any) => g.id);
      const categoryIds = categoriesArray.map((cat: any) => cat.id);
      const filtered = productList.filter((prod: any) => {
        const matchesGrade = prod.grades?.some((g: any) => gradeIds.includes(g.id));
        const matchesCategory =
          prod.categories?.some((cat: any) => categoryIds.includes(cat.id)) ||
          (prod.category && categoryIds.includes(prod.category.id));
        return matchesGrade && matchesCategory;
      });
      return filtered;
    }
    return [];
  };

  // name to show on the card (current product or selected)
  const selectedProductName = useMemo(() => {
    if (!productAssignTo) {
      return product?.productName;
    }
    const source = filteredProducts.length ? filteredProducts : productList || [];
    const match = source.find((p: any) => p.id === productAssignTo);
    return match?.productName ?? product?.productName;
  }, [productAssignTo, filteredProducts, productList, product?.productName]);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[outerShadow, styles.commonDesignForSpace]}>
        {/* Title and priority */}
        {(title || priority?.name) && (
          <View style={styles.commonContainer}>
            {/* Hide title for now */}
            {priority?.name &&
              (isPriorityUpdating ? (
                <View style={styles.priorityUpdatingLoader}>
                  <ActivityIndicator size="small" />
                </View>
              ) : (
                <SampleRequestPriorityComponent
                  style={styles.priorityPicker}
                  initialPriority={priority?.name}
                  initialPriorityId={priority?.id}
                  backgroundColor={prioritiesBackgroundColor}
                  fontColor={prioritiesFontColor}
                  onPrioritySelect={prio => {
                    setIsPriorityUpdating(true);
                    const result: any = priorityChange(prio);
                    if (result && typeof result.then === 'function') {
                      result.finally(() => setIsPriorityUpdating(false));
                    } else {
                      setIsPriorityUpdating(false);
                    }
                  }}
                />
              ))}
          </View>
        )}

        {/* Product */}
        {isProductUpdating ? (
          <View style={styles.priorityUpdatingLoader}>
            <ActivityIndicator size="small" />
          </View>
        ) : (
          <CommonListCardWithDetailsTextAndImageWithMultiCat
            title={gradesArray.length > 0 ? gradesArray.map((g: any) => g.name).join(', ') : ''}
            titleArray={gradesArray.map((g: any) => g.name)}
            showTitleLength={true}
            titleStyle={styles.commonProductStyle}
            subTitle={
              categoriesArray.length > 0
                ? categoriesArray.map((cat: any) => cat.name).join(', ')
                : ''
            }
            subTitleStyle={styles.commonProductStyle}
            subTitleArray={categoriesArray.map((cat: any) => cat.name)}
            showCatLength={true}
            detailText={selectedProductName}
            detailTextStyle={styles.commonProductStyle}
            rowDesign={true}
            onClick={() => {
              setActionSheetContent('products');
              if (
                gradesArray.length === 0 ||
                categoriesArray.length === 0 ||
                !productList?.length
              ) {
                showToast(TOAST_TYPE.ERROR, 'Product data not available yet.');
                return;
              }
              setFilteredProducts(getFilteredProducts());
              showActionSheet();
            }}
            maxCharactersShow={20}
          />
        )}

        <View style={styles.deviderContainer}>
          <Divider style={styles.divider} />
        </View>

        <View />

        {/* company + Status */}
        <View style={[styles.commonContainer, styles.commonAlignCenter]}>
          <View style={styles.companySection}>
            <View style={styles.commonColumn}>
              <View style={[styles.commonFlexRow, styles.commonAlignCenter]}>
                <Avatar
                  {...(customer?.profileImage ? { source: { uri: customer.profileImage } } : {})}
                  name={company?.name || ''}
                  size={defaultImageSize.small}
                  colorize={true}
                  style={[styles.companyImageSection, styles.companyImageCard]}
                />
                <View style={styles.commonDirectionColumn}>
                  {company?.name && <AppText style={styles.companyName}>{company?.name}</AppText>}
                  {company?.road && (
                    <AppText style={styles.companyEmailAddress}>{company?.road?.name}</AppText>
                  )}
                </View>
              </View>
            </View>
          </View>

          {!PendingRequest && (
            <View style={styles.statusSection}>
              <View style={styles.statusSectionInner}>
                {isStatusUpdating ? (
                  <View style={styles.statusUpdatingLoader}>
                    <ActivityIndicator size="small" />
                  </View>
                ) : (
                  <SampleRequestStatusComponent
                    style={styles.statusPicker}
                    initialStatus={status?.name}
                    initialStatusId={status?.id}
                    backgroundColor={statusBackgroundColor}
                    fontColor={statusFontColor}
                    iconName={statusIcon}
                    onStatusSelect={st => {
                      setIsStatusUpdating(true);
                      const result: any = statusChange(st);
                      if (result && typeof result.then === 'function') {
                        result.finally(() => setIsStatusUpdating(false));
                      } else {
                        setIsStatusUpdating(false);
                      }
                    }}
                  />
                )}
              </View>
            </View>
          )}

          {PendingRequest && !isAlreadyAccepted && (
            <View style={styles.acceptButtonContainer}>
              <AppButton
                style={styles.appButtonPending}
                onPress={async () => {
                  if (isAccepting) {
                    return;
                  }

                  setIsAccepting(true);
                  try {
                    const acceptStatus = statuses.find((s: any) => s.name === ACCEPTED_STATUS_NAME);
                    if (acceptStatus) {
                      const result: any = acceptTask(acceptStatus.id);
                      if (result && typeof result.then === 'function') {
                        await result;
                      }
                    }
                  } catch (error) {
                    // Error handling is done by the parent component
                  } finally {
                    setIsAccepting(false);
                  }
                }}
                disabled={isAccepting}
              >
                {isAccepting ? (
                  <View style={styles.acceptButtonLoader}>
                    <AppLoder size="small" color={colors.black} />
                  </View>
                ) : (
                  'Accept'
                )}
              </AppButton>
            </View>
          )}
        </View>

        <View style={styles.deviderContainer}>
          <Divider style={styles.divider} />
        </View>

        {/* select staff + link to concern */}
        <View style={styles.buttonRowContainer}>
          <TouchableOpacity
            onPress={() => {
              setActionSheetContent('staff');
              // Fetch all staff without pagination
              dispatch(
                fetchStaff({
                  sortBy: 'firstName',
                  order: 'asc',
                }) as any
              );
              showActionSheet();
            }}
            disabled={_isStaffUpdating || isStaffSelectionDisabled}
            style={styles.staffTouchable}
          >
            {_isStaffUpdating ? (
              <View style={styles.staffUpdatingLoader}>
                <ActivityIndicator size="small" />
              </View>
            ) : (
              <>
                {assignee?.firstName || assignee?.lastName ? (
                  <Avatar
                    {...(assignee?.profileImage ? { source: { uri: assignee.profileImage } } : {})}
                    name={`${assignee?.firstName || ''} ${assignee?.lastName || ''}`.trim()}
                    size={defaultImageSize.small}
                    colorize={true}
                    style={[styles.companyImageSection, styles.companyImageCard]}
                  />
                ) : null}

                <View style={styles.staffNameContainer}>
                  {assignee?.firstName || assignee?.lastName ? (
                    <AppText style={styles.techniciansName}>
                      {assignee?.firstName} {assignee?.lastName}
                    </AppText>
                  ) : (
                    <TouchableOpacity
                      style={styles.linkSampleRequestButton}
                      onPress={() => {
                        setActionSheetContent('staff');
                        // Fetch all staff without pagination
                        dispatch(
                          fetchStaff({
                            sortBy: 'firstName',
                            order: 'asc',
                          }) as any
                        );
                        showActionSheet();
                      }}
                      disabled={isStaffSelectionDisabled}
                    >
                      <AppText style={styles.linkSampleRequestButtonText}>Select staff</AppText>
                    </TouchableOpacity>
                  )}

                  {assignee?.firstName && assignee?.lastName && (
                    <AppText style={styles.techniciansNameState}>
                      {getFirstLaterCapitalize(assignee?.roles?.[0]?.name)}
                    </AppText>
                  )}
                </View>
              </>
            )}
          </TouchableOpacity>

          <View style={styles.linkButtonTouchable}>
            <View style={styles.linkSampleRequestButton}>
              <AppText style={styles.linkSampleRequestButtonText}>
                Link concern{linkTo?.length ? ` (${linkTo.length})` : ''}
              </AppText>
            </View>
          </View>

          {/* <View>
            <View style={styles.linkSampleRequestButton}>
              <AppText style={styles.linkSampleRequestButtonText}>
                Link to concern{linkTo?.length ? ` (${linkTo.length})` : ''}
              </AppText>
            </View>
          </View> */}
        </View>

        <View style={styles.deviderContainer}>
          <Divider style={styles.divider} />
        </View>

        <View style={styles.createdAtContainer}>
          <AppText style={styles.createdAtText}>Created at {formatDate(createdAt)}</AppText>
        </View>
      </View>

      {/* Action Sheet */}
      <ActionSheet
        ref={sheetRef}
        containerStyle={styles.modalView}
        indicatorStyle={styles.indicator}
        gestureEnabled={true}
        closeOnTouchBackdrop={true}
        defaultOverlayOpacity={0.3}
        useBottomSafeAreaPadding
        drawUnderStatusBar={false}
        keyboardHandlerEnabled={false}
      >
        {/* Staff selector */}
        {actionSheetContent === 'staff' && (
          <StaffListComponentWithTab
            onClose={() => hideActionSheet()}
            title="Select staff"
            staffList={staffList}
            roadId={company?.road?.id}
            roadName={company?.road?.name}
            onItemSelect={staff => {
              setIsStaffUpdating(true);
              if (staff) {
                setAssigneeId(staff.id);
                const result: any = staffChange(staff.id);
                if (result && typeof result.then === 'function') {
                  result.finally(() => setIsStaffUpdating(false));
                } else {
                  setIsStaffUpdating(false);
                }
              } else {
                // Handle deselection - set to null
                setAssigneeId(null);
                const result: any = staffChange(null);
                if (result && typeof result.then === 'function') {
                  result.finally(() => setIsStaffUpdating(false));
                } else {
                  setIsStaffUpdating(false);
                }
              }
              hideActionSheet();
            }}
            selectedId={assigneeId}
            imageShow={true}
          />
        )}

        {/* Product selector */}
        {actionSheetContent === 'products' &&
          (productLoading ? (
            <AppLoder size="small" color={colors.primary} />
          ) : (
            <ProductListComponent
              onClose={() => hideActionSheet()}
              title="Select product"
              productList={filteredProducts}
              onItemSelect={async p => {
                const prev = productAssignTo;
                setProductAssignTo(p.id); // optimistic UI
                setIsProductUpdating(true);
                hideActionSheet();
                try {
                  const res = productChange(p.id);
                  if (res && typeof res.then === 'function') {
                    await res;
                  }
                  showToast(TOAST_TYPE.SUCCESS, 'Product updated.');
                } catch (e) {
                  setProductAssignTo(prev ?? null); // rollback
                  showToast(TOAST_TYPE.ERROR, 'Failed to update product.');
                } finally {
                  setIsProductUpdating(false);
                }
              }}
              selectedId={productAssignTo}
            />
          ))}
      </ActionSheet>
    </TouchableOpacity>
  );
};

export default SampleRequestComponentVertical;
