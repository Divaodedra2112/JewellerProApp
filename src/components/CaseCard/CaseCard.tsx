import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import styles from './CaseCard.styles';
import { defaultIconSizes, defaultImageSize, outerShadow } from '../../utils/CommonStyles';
import { Task } from './CaseCardTypes';
import {
  ACCEPTED_STATUS_NAME,
  ROLE_TYPE,
  TASK_TYPE,
  TASK_TYPE_LIST,
} from '../../utils/Const';
import { AppText } from '../AppText/AppText';
import { Divider } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  formatCreatedAt,
  formatList,
  formatYmdToPretty,
  getCaseCardDetails,
} from './CaseCard.utils';
import CalendarComponent from '../CalendarComponent/CalendarComponent';
import { CalendarIcon } from '../../assets/icons/svgIcons/appSVGIcons';
import { colors } from '../../utils/theme';
import { showToast, TOAST_MESSAGES, TOAST_TYPE } from '../../utils/toast';
import ConcernPriorityComponent from '../ConcernPriorityComponent/ConcernPriorityComponent';
import ConcernStatusComponent from '../ConcernStatusComponent/ConcernStatusComponent';
import SampleRequestPriorityComponent from '../SampleRequestPriorityComponent/SampleRequestPriorityComponent';
import SampleRequestStatusComponent from '../SampleRequestStatusComponent/SampleRequestStatusComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import {
  getFirstLaterCapitalize,
  getFirstTaskPriority,
  getFirstTaskStatus,
  getSampleRequestPriority,
  getSampleRequestStatus,
} from '../../utils/commonFunctions';
import { Avatar } from '@kolking/react-native-avatar';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import StaffListComponentWithTab from '../StaffListComponentWithTab/StaffListComponentWithTab';
import { fetchStaff } from '../../modules/main/Staff/StaffList/StaffListActions';
import { MainStackParamList } from '../../types/navigation';
import ProductListComponent from '../ProductListComponent/ProductListComponent';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

interface CaseCardProps {
  data: Task;
  useFor: TASK_TYPE;
  taskListType?: TASK_TYPE_LIST;
  startDateChange?: (date: string) => Promise<any> | any;
  endDateChange?: (date: string) => Promise<any> | any;
  priorityChange?: (priorityId: number) => Promise<any> | any;
  statusChange?: (statusId: number) => Promise<any> | any;
  staffChange?: (staffId: number | null) => Promise<any> | any;
  productChange?: (productId: number) => Promise<any> | any;
  onPress?: () => void;
  showAcceptButton?: boolean;
  acceptTask?: (newStatusId: number) => void;
  hideSampleRequestTitle?: boolean;
}

const CaseCard: React.FC<CaseCardProps> = ({
  data,
  useFor,
  taskListType = TASK_TYPE_LIST.LIST,
  startDateChange,
  endDateChange,
  priorityChange,
  statusChange,
  staffChange,
  productChange,
  onPress,
  showAcceptButton,
  acceptTask,
  hideSampleRequestTitle = false,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const { productNames, categoryNames, gradeNames, linkedCount } = getCaseCardDetails(data);
  const { xsmall } = defaultIconSizes;
  const startDate = data?.startDate;
  const endDate = data?.endDate;
  const [isStartDateUpdating, setIsStartDateUpdating] = useState(false);
  const [isEndDateUpdating, setIsEndDateUpdating] = useState(false);
  const [isPriorityUpdating, setIsPriorityUpdating] = useState(false);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);
  const [isStaffUpdating, setIsStaffUpdating] = useState(false);
  const [assigneeId, setAssigneeId] = useState<number | null>(data?.assignee?.id ?? null);

  const sheetRef = useRef<ActionSheetRef>(null);
  const dispatch = useDispatch();
  const [actionSheetContent, setActionSheetContent] = useState<'staff' | 'products' | ''>('');
  const [isProductUpdating, setIsProductUpdating] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const raw = (data?.data as any) || {};
  const categoriesArray = Array.isArray(raw?.categories)
    ? raw.categories
    : raw?.category
      ? [raw.category]
      : [];
  const gradesArray = Array.isArray(raw?.grades) ? raw.grades : raw?.grade ? [raw.grade] : [];
  const currentProductId = raw?.product?.id ?? raw?.products?.[0]?.id ?? null;
  const [productAssignTo, setProductAssignTo] = useState<number | null>(currentProductId);

  const { taskTypes } = useSelector((state: RootState) => state.statusAndPriority);
  const priorities = useMemo(
    () =>
      (useFor === TASK_TYPE.SAMPLE_REQUEST
        ? getSampleRequestPriority(taskTypes)
        : getFirstTaskPriority(taskTypes)) || [],
    [taskTypes, useFor]
  );
  const matchedPriority = priorities.find((p: { id: number }) => p.id === data?.priority?.id);
  const prioritiesFontColor = matchedPriority?.fontColor;
  const prioritiesBackgroundColor = matchedPriority?.backgroundColor;

  const statuses = useMemo(
    () =>
      (useFor === TASK_TYPE.SAMPLE_REQUEST
        ? getSampleRequestStatus(taskTypes)
        : getFirstTaskStatus(taskTypes)) || [],
    [taskTypes, useFor]
  );
  const matchedStatus = statuses.find((s: { id: number }) => s.id === data?.status?.id);
  const statusFontColor = matchedStatus?.fontColor;
  const statusBackgroundColor = matchedStatus?.backgroundColor;
  const statusIcon = matchedStatus?.icon;

  const {
    staff: staffList,
    loading: staffLoading,
    currentPage: staffCurrentPage,
    totalPages: staffTotalPages,
    limit: staffLimit,
    refreshing: staffRefreshing,
  } = useSelector((state: RootState) => state.staffReducer);
  const { products: productList, loading: productLoading } = useSelector(
    (state: RootState) => state.product
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const isStaffSelectionDisabled = user?.roles?.some(
    (role: any) => role.roleType === ROLE_TYPE.SALESPERSON || role.roleType === ROLE_TYPE.TECHNICIAN
  );
  const isTechnician = user?.roles?.some((role: any) => role.roleType === ROLE_TYPE.TECHNICIAN);

  const company = (data?.data as any)?.company;
  const customer = (data?.data as any)?.customer;
  const companyName = company?.name || '';
  const customerName = `${customer?.firstName || ''} ${customer?.lastName || ''}`.trim();
  const assignee = data?.assignee;
  const assigneeName = `${assignee?.firstName || ''} ${assignee?.lastName || ''}`.trim();
  const assigneeRole = assignee?.roles?.[0]?.name
    ? getFirstLaterCapitalize(assignee.roles[0].name)
    : '';

  useEffect(() => {
    setAssigneeId(data?.assignee?.id ?? null);
  }, [data?.assignee?.id]);

  useEffect(() => {
    setProductAssignTo(currentProductId);
  }, [currentProductId]);

  const getFilteredProducts = () => {
    if (gradesArray.length > 0 && categoriesArray.length > 0 && productList) {
      const gradeIds = gradesArray.map((g: any) => g.id);
      const categoryIds = categoriesArray.map((cat: any) => cat.id);
      return productList.filter((prod: any) => {
        const matchesGrade = prod.grades?.some((g: any) => gradeIds.includes(g.id));
        const matchesCategory =
          prod.categories?.some((cat: any) => categoryIds.includes(cat.id)) ||
          (prod.category && categoryIds.includes(prod.category.id));
        return matchesGrade && matchesCategory;
      });
    }
    return [];
  };

  const showActionSheet = () => sheetRef.current?.show();
  const hideActionSheet = () => sheetRef.current?.hide();

  const handleStaffLoadMore = () => {
    if (staffCurrentPage < staffTotalPages && !staffLoading) {
      dispatch(
        fetchStaff({
          page: staffCurrentPage + 1,
          limit: staffLimit,
          sortBy: 'firstName' as any,
          order: 'asc',
        }) as any
      );
    }
  };

  const handleStaffRefresh = () => {
    dispatch(
      fetchStaff({
        page: 1,
        limit: staffLimit,
        sortBy: 'firstName' as any,
        order: 'asc',
      }) as any
    );
  };

  const handleCompanyCustomerPress = () => {
    if (!customer?.id) {
      return;
    }
    navigation.navigate('CustomerProfile', { item: customer });
  };

const isEndDateOverdue = useMemo(() => {
  if (!endDate) {return false;}

  const end = new Date(endDate);
  const today = new Date();

  // Normalize both to date-only
  const endOnly = new Date(
    end.getFullYear(),
    end.getMonth(),
    end.getDate()
  );

  const todayOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  return endOnly < todayOnly;
}, [endDate]);

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          outerShadow,
          styles.commonDesignForSpace,
          taskListType === TASK_TYPE_LIST.KANBAN ? styles.kanbanCardWidth : null,
        ]}
      >
        {/* Title */}
      <View style={styles.headerContainer}>
        {useFor === TASK_TYPE.CONCERN ? (
          <View>
            <AppText style={styles.title}>{data?.title ?? ''}</AppText>
          </View>
        ) : isTechnician && !hideSampleRequestTitle ? (
          <View>
            <AppText style={styles.title}>Sample Request</AppText>
          </View>
        ) : null}

        {showAcceptButton && isTechnician && taskListType === TASK_TYPE_LIST.LIST && (
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => {
              const acceptedStatus = statuses.find((s: any) => s.name === ACCEPTED_STATUS_NAME);
              if (acceptedStatus && acceptTask) {
                acceptTask(acceptedStatus.id);
              } else {
                showToast(TOAST_TYPE.ERROR, 'Accepted status not found');
              }
            }}
          >
            <AppText style={styles.acceptButtonText}>Accept</AppText>
          </TouchableOpacity>
        )}
      </View>

      {/* Divider */}
      {(useFor === TASK_TYPE.CONCERN || (isTechnician && !hideSampleRequestTitle)) && (
        <View style={styles.deviderContainer}>
          <Divider style={styles.divider} />
        </View>
      )}

      {/* Company details & priority */}
      <View style={styles.commonTwoColumnRow}>
        <View style={styles.commonTwoColumnLeft}>
          <TouchableOpacity
            style={styles.companyRow}
            onPress={handleCompanyCustomerPress}
            disabled={!customer?.id}
            activeOpacity={0.7}
          >
            <Avatar
              {...(customer?.profileImage ? { source: { uri: customer.profileImage } } : {})}
              name={companyName || customerName || ''}
              size={defaultImageSize.smallx}
              colorize={true}
              style={styles.companyAvatar}
            />
            <View style={styles.companyTextContainer}>
              {companyName ? (
                <AppText style={styles.companyName}>
                  {companyName}
                </AppText>
              ) : null}
              {company?.road?.name ? (
                <AppText style={styles.customerName}>
                  {company.road.name}
                </AppText>
              ) : null}
            </View>
          </TouchableOpacity>
        </View>
            <View style={[styles.commonTwoColumnRight]}>
          {priorityChange ? (
            isPriorityUpdating ? (
              <ActivityIndicator size="small" />
            ) : useFor === TASK_TYPE.SAMPLE_REQUEST ? (
              <SampleRequestPriorityComponent
                style={styles.commonTwoColumnRightText}
                initialPriority={data?.priority?.name}
                initialPriorityId={data?.priority?.id}
                backgroundColor={prioritiesBackgroundColor}
                fontColor={prioritiesFontColor}
                onPrioritySelect={(prioId: number) => {
                  setIsPriorityUpdating(true);
                  const result: any = priorityChange(prioId);
                  if (result && typeof result.then === 'function') {
                    result.finally(() => setIsPriorityUpdating(false));
                  } else {
                    setIsPriorityUpdating(false);
                  }
                }}
              />
            ) : (
              <ConcernPriorityComponent
                style={styles.commonTwoColumnRightText}
                initialPriority={data?.priority?.name}
                initialPriorityId={data?.priority?.id}
                backgroundColor={prioritiesBackgroundColor}
                fontColor={prioritiesFontColor}
                onPrioritySelect={(prioId: number) => {
                  if (!priorityChange) {
                    showToast(TOAST_TYPE.ERROR, 'Priority update is not available.');
                    return;
                  }
                  setIsPriorityUpdating(true);
                  const result: any = priorityChange(prioId);
                  if (result && typeof result.then === 'function') {
                    result.finally(() => setIsPriorityUpdating(false));
                  } else {
                    setIsPriorityUpdating(false);
                  }
                }}
              />
            )
          ) : (
            <AppText style={styles.commonTwoColumnRightText}>Pending</AppText>
          )}
        </View>
      </View>

      {/* Divider */}
      <View style={styles.deviderContainer}>
        <Divider style={styles.divider} />
      </View>

      {/* Product, Category, Grade, sample linked, created */}
      <View style={styles.detailsContainer}>
        {productChange ? (
          <TouchableOpacity
            style={styles.detailRow}
            onPress={() => {
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
          >
            <AppText style={styles.detailLabel}>Product:</AppText>
            {isProductUpdating ? (
              <ActivityIndicator size="small" />
            ) : (
              <AppText style={styles.detailValue}>{formatList(productNames)}</AppText>
            )}
          </TouchableOpacity>
        ) : (
          <View style={styles.detailRow}>
            <AppText style={styles.detailLabel}>Product:</AppText>
            <AppText style={styles.detailValue}>{formatList(productNames)}</AppText>
          </View>
        )}

        <View style={styles.detailRow}>
          <AppText style={styles.detailLabel}>Category:</AppText>
          <AppText style={styles.detailValue}>{formatList(categoryNames)}</AppText>
        </View>

        <View style={styles.detailRow}>
          <AppText style={styles.detailLabel}>Grade:</AppText>
          <AppText style={styles.detailValue}>{formatList(gradeNames)}</AppText>
        </View>

        <View style={styles.detailRow}>
          <AppText style={styles.detailLabel}>Sample:</AppText>
          <AppText style={styles.detailValue}>{`Linked (${linkedCount})`}</AppText>
        </View>

        <View style={styles.detailRow}>
          <AppText style={styles.detailLabel}>Created:</AppText>
          <AppText style={styles.detailValue}>{formatCreatedAt(data?.createdAt)}</AppText>
        </View>
      </View>

      {/* Divider */}
      {!showAcceptButton && (
        <View style={styles.deviderContainer}>
          <Divider style={styles.divider} />
        </View>
      )}

      {/* Staff & status */}
      {!showAcceptButton && (
        <View style={styles.commonTwoColumnRow}>
          <View
            style={[
              styles.commonTwoColumnLeft,
              taskListType === TASK_TYPE_LIST.KANBAN ? styles.kanbanTwoColumnLeft : null,
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                if (!staffChange || isStaffSelectionDisabled || isStaffUpdating) {
                  return;
                }
                setActionSheetContent('staff');
                dispatch(
                  fetchStaff({
                    sortBy: 'firstName',
                    order: 'asc',
                  }) as any
                );
                showActionSheet();
              }}
              disabled={!staffChange || isStaffSelectionDisabled || isStaffUpdating}
              style={styles.staffTouchable}
            >
              {isStaffUpdating ? (
                <ActivityIndicator size="small" />
              ) : assigneeName ? (
                <View style={styles.staffRow}>
                  <Avatar
                    {...(assignee?.profileImage ? { source: { uri: assignee.profileImage } } : {})}
                    name={assigneeName || company?.name || ''}
                    size={defaultImageSize.small}
                    colorize={true}
                    style={styles.staffAvatar}
                  />
                  <View style={styles.staffTextContainer}>
                    <AppText style={styles.staffName}>{assigneeName}</AppText>
                    {!!assigneeRole && <AppText style={styles.staffRole}>{assigneeRole}</AppText>}
                  </View>
                </View>
              ) : (
                <View style={styles.selectStaffButton}>
                  <AppText style={styles.selectStaffButtonText}>Select staff</AppText>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.commonTwoColumnRight,
              taskListType === TASK_TYPE_LIST.KANBAN ? styles.kanbanTwoColumnRight : null,
            ]}
          >
            {statusChange ? (
              isStatusUpdating ? (
                <ActivityIndicator size="small" />
              ) : useFor === TASK_TYPE.SAMPLE_REQUEST ? (
                <SampleRequestStatusComponent
                  style={styles.commonTwoColumnRightText}
                  initialStatus={data?.status?.name}
                  initialStatusId={data?.status?.id}
                  backgroundColor={statusBackgroundColor}
                  fontColor={statusFontColor}
                  iconName={statusIcon}
                  onStatusSelect={(stId: number) => {
                    setIsStatusUpdating(true);
                    const result: any = statusChange(stId);
                    if (result && typeof result.then === 'function') {
                      result.finally(() => setIsStatusUpdating(false));
                    } else {
                      setIsStatusUpdating(false);
                    }
                  }}
                />
              ) : (
                <ConcernStatusComponent
                  style={styles.commonTwoColumnRightText}
                  initialStatus={data?.status?.name}
                  initialStatusId={data?.status?.id}
                  backgroundColor={statusBackgroundColor}
                  fontColor={statusFontColor}
                  iconName={statusIcon}
                  onStatusSelect={(stId: number) => {
                    if (!statusChange) {
                      showToast(TOAST_TYPE.ERROR, 'Status update is not available.');
                      return;
                    }
                    setIsStatusUpdating(true);
                    const result: any = statusChange(stId);
                    if (result && typeof result.then === 'function') {
                      result.finally(() => setIsStatusUpdating(false));
                    } else {
                      setIsStatusUpdating(false);
                    }
                  }}
                />
              )
            ) : (
              <AppText style={styles.commonTwoColumnRightText}>Pending</AppText>
            )}
          </View>
        </View>
      )}

      {useFor === TASK_TYPE.CONCERN && (
        <>
          {/* Divider */}
          <View style={styles.deviderContainer}>
            <Divider style={styles.divider} />
          </View>

          {/* Start / End Date */}
          {(startDate || endDate) && (
            <View style={styles.dateRangeContainer}>
              {startDate && (
                <View style={styles.dateColumnLeft}>
                  <View style={styles.dateHeaderRow}>
                    <CalendarIcon width={xsmall} height={xsmall} color={colors.Gray40} />
                    <AppText style={styles.dateLabel}>Start Date</AppText>
                  </View>
                  {isStartDateUpdating ? (
                    <ActivityIndicator size="small" />
                  ) : (
                    <CalendarComponent
                      initialDate={startDate}
                      disabled={!startDateChange}
                      formatDisplayDate={formatYmdToPretty}
                      containerStyle={styles.calendarInline}
                      showSimpleDate={false}
                      fontStyle={styles.dateValue}
                      onDateSelect={selectedDate => {
                        if (endDate && new Date(selectedDate) > new Date(endDate)) {
                          showToast(TOAST_TYPE.ERROR, TOAST_MESSAGES.GENERIC.START_DATE_LATER_END);
                          return false;
                        }

                        if (!startDateChange) {
                          return false;
                        }

                        setIsStartDateUpdating(true);
                        const result: any = startDateChange(selectedDate);
                        if (result && typeof result.then === 'function') {
                          result.finally(() => setIsStartDateUpdating(false));
                        } else {
                          setIsStartDateUpdating(false);
                        }
                        return true;
                      }}
                    />
                  )}
                </View>
              )}

              {startDate && endDate && <View style={styles.dateColumnGap} />}

              {endDate && (
                <View style={styles.dateColumnRight}>
                  <View style={styles.dateHeaderRowRight}>
                    <CalendarIcon width={xsmall} height={xsmall} color={colors.Gray40} />
                    <AppText style={styles.dateLabel}>End Date</AppText>
                  </View>
                  {isEndDateUpdating ? (
                    <ActivityIndicator size="small" />
                  ) : (
                    <CalendarComponent
                      initialDate={endDate}
                      disabled={!endDateChange}
                      formatDisplayDate={formatYmdToPretty}
                      containerStyle={styles.calendarInline}
                      showSimpleDate={false}
                        fontStyle={[
                        styles.dateValueRight,
                        isEndDateOverdue && { color: colors.redButtonColor },
                      ]}

                      onDateSelect={selectedDate => {
                        if (startDate && new Date(selectedDate) < new Date(startDate)) {
                          showToast(
                            TOAST_TYPE.ERROR,
                            'End date cannot be earlier than start date.'
                          );
                          return false;
                        }

                        if (!endDateChange) {
                          return false;
                        }

                        setIsEndDateUpdating(true);
                        const result: any = endDateChange(selectedDate);
                        if (result && typeof result.then === 'function') {
                          result.finally(() => setIsEndDateUpdating(false));
                        } else {
                          setIsEndDateUpdating(false);
                        }
                        return true;
                      }}
                    />
                  )}
                </View>
              )}
            </View>
          )}
        </>
      )}

      {/* Staff selector sheet */}
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
        {actionSheetContent === 'staff' && (
          <StaffListComponentWithTab
            title="Select staff"
            staffList={staffList}
            roadId={company?.road?.id}
            roadName={company?.road?.name}
            onItemSelect={staff => {
              const prev = assigneeId;
              const nextId = staff ? staff.id : null;
              setAssigneeId(nextId);
              setIsStaffUpdating(true);

              const result: any = staffChange?.(nextId);
              if (result && typeof result.then === 'function') {
                result
                  .catch(() => {
                    setAssigneeId(prev ?? null);
                    showToast(TOAST_TYPE.ERROR, 'Failed to update staff.');
                  })
                  .finally(() => setIsStaffUpdating(false));
              } else {
                setIsStaffUpdating(false);
              }
              hideActionSheet();
            }}
            selectedId={assigneeId}
            imageShow={true}
            onClose={() => hideActionSheet()}
            loading={staffLoading}
            hasMore={staffCurrentPage < staffTotalPages}
            onLoadMore={handleStaffLoadMore}
            refreshing={staffRefreshing}
            onRefresh={handleStaffRefresh}
          />
        )}

        {actionSheetContent === 'products' &&
          (productLoading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <ProductListComponent
              title="Select product"
              productList={filteredProducts}
              onItemSelect={async p => {
                const prev = productAssignTo;
                setProductAssignTo(p.id);
                setIsProductUpdating(true);
                hideActionSheet();
                try {
                  const res = productChange?.(p.id);
                  if (res && typeof res.then === 'function') {
                    await res;
                  }
                  showToast(TOAST_TYPE.SUCCESS, 'Product updated.');
                } catch (e) {
                  setProductAssignTo(prev ?? null);
                  showToast(TOAST_TYPE.ERROR, 'Failed to update product.');
                } finally {
                  setIsProductUpdating(false);
                }
              }}
              onClose={() => hideActionSheet()}
              selectedId={productAssignTo}
            />
          ))}
      </ActionSheet>
    </View>
    </TouchableOpacity>
  );
};

export default CaseCard;
