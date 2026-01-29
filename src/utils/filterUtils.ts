import { TaskModuleFilter } from '../modules/main/Tasks/TaskList/SharedFiles/TaskListContext';

/**
 * Utility functions for handling task filters
 */

/**
 * Creates a filter object for navigation with only defined values
 * @param filter - Partial filter object
 * @returns Clean filter object with only defined values
 */
export const createNavigationFilter = (
  filter: Partial<TaskModuleFilter>
): Partial<TaskModuleFilter> => {
  const cleanFilter: Partial<TaskModuleFilter> = {};

  // List of all supported filter properties
  const filterProperties: (keyof TaskModuleFilter)[] = [
    'search',
    'typeId',
    'statusIds',
    'priorityIds',
    'assignToIds',
    'branchIds',
    'roadIds',
    'companyIds',
    'customerIds',
    'gradeIds',
    'categoryIds',
    'concernIds',
    'sampleRequestIds',
    'endDate',
    'isOverdue',
  ];

  // Add properties that exist and are not undefined
  filterProperties.forEach(prop => {
    if (filter[prop] !== undefined) {
      cleanFilter[prop] = filter[prop];
    }
  });

  return cleanFilter;
};

/**
 * Creates an overdue filter for navigation
 * @returns Filter object with overdue settings
 */
export const createOverdueFilter = (): Partial<TaskModuleFilter> => {
  return createNavigationFilter({
    isOverdue: true,
    typeId: 1,
  });
};

/**
 * Creates a status filter for navigation
 * @param statusIds - Array of status IDs to filter by
 * @returns Filter object with status settings
 */
export const createStatusFilter = (statusIds: number[]): Partial<TaskModuleFilter> => {
  return createNavigationFilter({
    statusIds,
    typeId: 1,
  });
};

/**
 * Creates a priority filter for navigation
 * @param priorityIds - Array of priority IDs to filter by
 * @returns Filter object with priority settings
 */
export const createPriorityFilter = (priorityIds: number[]): Partial<TaskModuleFilter> => {
  return createNavigationFilter({
    priorityIds,
    typeId: 1,
  });
};

/**
 * Creates an assignee filter for navigation
 * @param assignToIds - Array of assignee IDs to filter by
 * @returns Filter object with assignee settings
 */
export const createAssigneeFilter = (assignToIds: number[]): Partial<TaskModuleFilter> => {
  return createNavigationFilter({
    assignToIds,
    typeId: 1,
  });
};

/**
 * Creates a search filter for navigation
 * @param searchTerm - Search term to filter by
 * @returns Filter object with search settings
 */
export const createSearchFilter = (searchTerm: string): Partial<TaskModuleFilter> => {
  return createNavigationFilter({
    search: searchTerm,
    typeId: 1,
  });
};
