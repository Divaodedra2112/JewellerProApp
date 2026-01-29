import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Divider } from '@ui-kitten/components';
import { AppText } from '../AppText/AppText';
import { Avatar } from '@kolking/react-native-avatar';
import { defaultImageSize } from '../../utils/CommonStyles';
import styles from './SampleRequestComponentHorizontal.styles';
import { outerShadow } from '../../utils/CommonStyles';

import { DEMO_IMAGES, ROLE_TYPE } from '../../utils/Const';
import { SampleRequest } from '../../modules/main/SampleRequest/SampleRequestList/SharedFiles/SampleRequestListTypes';
import SampleRequestPriorityComponent from '../SampleRequestPriorityComponent/SampleRequestPriorityComponent';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/reducers';
import SampleRequestStatusComponent from '../SampleRequestStatusComponent/SampleRequestStatusComponent';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { showToast, TOAST_TYPE } from '../../utils/toast';
import {
  formatDate,
  getFirstLaterCapitalize,
  getSampleRequestPriority,
  getSampleRequestStatus,
  truncateText,
} from '../../utils/commonFunctions';
import ProductListComponent from '../ProductListComponent/ProductListComponent';
import AppLoder from '../AppLoder/AppLoder';
import { colors } from '../../utils/theme';
import StaffListComponentWithTab from '../StaffListComponentWithTab/StaffListComponentWithTab';
import { AppButtonWithIcon } from '../AppButtonIcon/AppButtonWithIcon';
import { moderateScale } from '../../utils/Responsive';
import { fetchStaff } from '../../modules/main/Staff/StaffList/StaffListActions';
import CommonListCardWithDetailsTextAndImageWithMultiCat from '../CommonListCardWithDetailsTextAndImageWithMultiCat/CommonListCardWithDetailsTextAndImageWithMultiCat';

interface SampleRequestComponentHorizontalProps {
  data: SampleRequest;
  priorityChange: (item: any) => void;
  statusChange: (item: any) => void;
  staffChange: (item: any) => void;
  onPress?: () => void;
  isUpdating?: boolean;
  productChange: (productId: number) => Promise<any> | any;
  isTechnician: boolean;
}

const SampleRequestComponentHorizontal: React.FC<SampleRequestComponentHorizontalProps> = ({
  priorityChange,
  statusChange,
  staffChange,
  data,
  onPress,
  isUpdating: _isUpdating = false,
  productChange,
  isTechnician: _isTechnician,
}) => {
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
  //get staff list
  const { staff: staffList } = useSelector((state: RootState) => state.staffReducer);
  const dispatch = useDispatch();

  // get priority from redux store
  const { taskTypes } = useSelector((state: RootState) => state.statusAndPriority);
  const user = useSelector((state: RootState) => state.auth.user);

  // Check if user is a salesperson or technician
  const isStaffSelectionDisabled = user?.roles?.some(
    role => role.roleType === ROLE_TYPE.SALESPERSON || role.roleType === ROLE_TYPE.TECHNICIAN
  );
  const priorities = getSampleRequestPriority(taskTypes) || [];
  const statuses = getSampleRequestStatus(taskTypes) || [];
  const matchedPriority = priorities.find((p: { id: number }) => p.id === priority?.id);
  const matchedStatus = statuses.find((p: { id: number }) => p.id === status?.id);
  const prioritiesFontColor = matchedPriority?.fontColor;
  const prioritiesBackgroundColor = matchedPriority?.backgroundColor;
  const statusFontColor = matchedStatus?.fontColor;
  const statusBackgroundColor = matchedStatus?.backgroundColor;
  const statusIcon = matchedStatus?.icon;
  const [assigneeId, setAssigneeId] = useState<number | null>(assignee?.id);
  const [_assignToImage, setAssignToImage] = useState<string | null>(DEMO_IMAGES);
  const sheetRef = useRef<ActionSheetRef>(null);
  const [isPriorityUpdating, setIsPriorityUpdating] = useState<boolean>(false);
  const [isStatusUpdating, setIsStatusUpdating] = useState<boolean>(false);
  const [_isStaffUpdating, _setIsStaffUpdating] = useState<boolean>(false);
  const [isProductUpdating, setIsProductUpdating] = useState<boolean>(false);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [actionSheetContent, setActionSheetContent] = useState<'staff' | 'products' | ''>('');
  const [productAssignTo, setProductAssignTo] = useState<number | null>(product?.id ?? null);
  const { products: productList, loading: productLoading } = useSelector(
    (state: RootState) => state.product
  );

  //get Task list
  const { tasksByGroup } = useSelector((state: RootState) => state.task);
  // The data is stored under "_" key because groupBy is { key: '', value: '' }
  const tasks = tasksByGroup._?.tasks || [];

  //Action sheet close
  const hideActionSheet = () => {
    sheetRef.current?.hide();
  };
  // Action sheet open
  const showActionSheet = () => {
    sheetRef.current?.show();
  };

  // keep product selection in sync if parent updates `data`
  useEffect(() => {
    setProductAssignTo(product?.id ?? null);
  }, [product?.id]);

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
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={[outerShadow, styles.commonDesignForSpace]}>
        {/* Product */}
        {title && (
          <View style={styles.taskContainer}>
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
                subTitleArray={categoriesArray.map((cat: any) => cat.name)}
                showCatLength={true}
                subTitleStyle={styles.commonProductStyle}
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
                maxCharactersShow={15}
              />
            )}
          </View>
        )}

        {/* Status */}
        <View style={styles.statusContainer}>
          <View style={styles.statusContainerStyle}>
            {isStatusUpdating ? (
              <View style={styles.centerContent}>
                <ActivityIndicator size="small" />
              </View>
            ) : (
              <SampleRequestStatusComponent
                initialStatus={status?.name}
                initialStatusId={status?.id}
                backgroundColor={statusBackgroundColor}
                fontColor={statusFontColor}
                iconName={statusIcon}
                onStatusSelect={statusItem => {
                  setIsStatusUpdating(true);
                  const result: any = statusChange(statusItem);
                  if (result && typeof result.then === 'function') {
                    result.finally(() => setIsStatusUpdating(false));
                  } else {
                    setIsStatusUpdating(false);
                  }
                }}
              />
            )}
          </View>
          <View style={styles.priorityContainerStyle}>
            {priority?.name &&
              (isPriorityUpdating ? (
                <View style={styles.centerContent}>
                  <ActivityIndicator size="small" />
                </View>
              ) : (
                <SampleRequestPriorityComponent
                  initialPriority={priority?.name}
                  initialPriorityId={priority?.id}
                  backgroundColor={prioritiesBackgroundColor}
                  fontColor={prioritiesFontColor}
                  onPrioritySelect={priorityItem => {
                    setIsPriorityUpdating(true);
                    const result: any = priorityChange(priorityItem);
                    if (result && typeof result.then === 'function') {
                      result.finally(() => setIsPriorityUpdating(false));
                    } else {
                      setIsPriorityUpdating(false);
                    }
                  }}
                />
              ))}
          </View>
        </View>

        {/* company */}

        <View>
          <View style={styles.deviderContainer}>
            <Divider style={styles.divider} />
          </View>

          <View style={styles.commonColumn}>
            <View style={[styles.commonFlexRow, styles.commonAlignCenter]}>
              <Avatar
                {...(customer?.profileImage ? { source: { uri: customer.profileImage } } : {})}
                name={company?.name || ''}
                size={defaultImageSize.small}
                colorize={true}
                style={[
                  styles.companyImageSection &&
                    Object.fromEntries(
                      Object.entries(styles.companyImageSection).filter(
                        ([key]) => key !== 'backgroundColor'
                      )
                    ),
                  styles.companyImageCard &&
                    Object.fromEntries(
                      Object.entries(styles.companyImageCard).filter(
                        ([key]) => key !== 'backgroundColor'
                      )
                    ),
                ]}
              />
              <View style={styles.commonDirectionColumn}>
                {company?.name && (
                  <AppText style={styles.companyName}>
                    {truncateText(`${company?.name || ''}`, 25)}
                  </AppText>
                )}
                {company?.road && (
                  <AppText style={styles.companyEmailAddress}>
                    {truncateText(`${company?.road?.name || ''}`, 25)}
                  </AppText>
                )}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.deviderContainer}>
          <Divider style={styles.divider} />
        </View>

        {/* select staff + link to concern */}
        <View style={{ flex: 1, flexDirection: 'column', marginBottom: moderateScale(12) }}>
          <View style={{ flex: 1, marginBottom: moderateScale(5) }}>
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
              style={assignee?.firstName && assignee?.lastName ? styles.staffTouchable : {}}
            >
              {_isStaffUpdating ? (
                <View style={styles.staffUpdatingLoader}>
                  <ActivityIndicator size="small" />
                </View>
              ) : (
                <>
                  {assignee?.firstName && assignee?.lastName ? (
                    <>
                      {_isTechnician ? (
                        <Avatar
                          {...(customer?.profileImage
                            ? { source: { uri: customer.profileImage } }
                            : {})}
                          name={company?.name || ''}
                          size={defaultImageSize.small}
                          colorize={true}
                          style={[styles.companyImageSection, styles.companyImageCard]}
                        />
                      ) : (
                        <Avatar
                          {...(assignee?.profileImage
                            ? { source: { uri: assignee.profileImage } }
                            : {})}
                          name={`${assignee?.firstName || ''} ${assignee?.lastName || ''}`.trim()}
                          size={defaultImageSize.small}
                          colorize={true}
                          style={[styles.techImageSection, styles.techImageCard]}
                        />
                      )}
                    </>
                  ) : null}

                  <View style={styles.commonFlexColumn}>
                    {_isTechnician && company?.name ? (
                      <AppText style={styles.techniciansName}>
                        {truncateText(company.name, 25)}
                      </AppText>
                    ) : assignee?.firstName && assignee?.lastName ? (
                      <AppText style={styles.techniciansName}>
                        {truncateText(`${assignee.firstName} ${assignee.lastName}`, 25)}
                      </AppText>
                    ) : (
                      <AppButtonWithIcon
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
                        style={styles.linkSampleRequestButton}
                        textStyle={styles.linkSampleRequestButtonText}
                        disabled={isStaffSelectionDisabled}
                      >
                        Select staff
                      </AppButtonWithIcon>
                    )}

                    {!_isTechnician && assignee?.firstName && assignee?.lastName && (
                      <AppText style={styles.techniciansNameState}>
                        {getFirstLaterCapitalize(assignee?.roles?.[0]?.name)}
                      </AppText>
                    )}
                  </View>
                </>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.linkSampleRequestButton}>
            <AppText style={styles.linkSampleRequestButtonText}>
              Link to concern{linkTo?.length ? ` (${linkTo.length})` : ''}
            </AppText>
          </View>
        </View>

        {/* created at */}
        <AppText style={styles.createdAtText}>Created at {formatDate(createdAt)}</AppText>
      </View>

      {/* Action Sheet */}
      <ActionSheet
        ref={sheetRef}
        containerStyle={styles.modalView}
        indicatorStyle={styles.actionSheetIndicator}
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
              _setIsStaffUpdating(true);
              if (staff) {
                setAssigneeId(staff.id);
                setAssignToImage(staff.profileImage);
                const result: any = staffChange(staff.id);
                if (result && typeof result.then === 'function') {
                  result.finally(() => _setIsStaffUpdating(false));
                } else {
                  _setIsStaffUpdating(false);
                }
              } else {
                // Handle deselection - set to null
                setAssigneeId(null);
                setAssignToImage(null);
                const result: any = staffChange(null);
                if (result && typeof result.then === 'function') {
                  result.finally(() => _setIsStaffUpdating(false));
                } else {
                  _setIsStaffUpdating(false);
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

export default SampleRequestComponentHorizontal;
