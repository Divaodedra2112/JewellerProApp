import React, { createContext, useContext, useCallback, useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDebouncedCallback } from './useDebounce';

/**
 * Base filter interface that can be extended by specific modules
 * @template T - Type of the filter values
 */
export interface ModuleFilter {
  isSample?: boolean | null;
  categoryId?: number | number[] | null;
  [key: string]: any;
}

/**
 * Interface for sort configuration
 * @template T - Type of the sort field
 */
export interface ModuleSort {
  field: string;
  order: 'asc' | 'desc';
}

/**
 * Base query interface for API requests
 */
export interface BaseQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy: string;
  order: 'asc' | 'desc';
  filter?: ModuleFilter;
}

/**
 * Configuration for a module's functionality
 * @template T - Type of the data items
 * @template F - Type of the filter
 * @template S - Type of the sort
 * @template Q - Type of the query
 */
export interface ModuleConfig<
  T,
  F extends ModuleFilter,
  S extends ModuleSort,
  Q extends BaseQuery
> {
  query: {
    /**
     * Builds the query object for API requests
     * @param params - Query parameters including page, limit, sort, and filter
     * @returns The complete query object
     */
    buildQuery: (params: {
      page?: number;
      limit?: number;
      sortBy: S['field'];
      order: S['order'];
      filter?: F & { search?: string };
      extraParams?: { [key: string]: any };
    }) => Q;
    /**
     * Action to fetch data using the query
     * @param query - The query object to use for fetching
     */
    fetchAction: (
      query: Q,
      extraParams?: {
        [key: string]: any;
      }
    ) => void;
  };
  filter: {
    /**
     * Default filter values
     */
    defaults: Partial<F>;
    /**
     * Counts the number of active filters
     * @param filter - The current filter object
     * @returns Number of active filters
     */
    getActiveCount: (filter: F) => number;
  };
  sort: {
    /**
     * Default sort configuration
     */
    defaults: {
      field: S['field'];
      order: 'asc' | 'desc';
    };
    /**
     * Available sort fields
     */
    fields: S['field'][];
  };
  search: {
    /**
     * Debounce time in milliseconds for search
     */
    debounce?: number;
    /**
     * Minimum length required for search
     */
    minLength?: number;
  };
  pagination?: {
    /**
     * Default number of items per page
     */
    defaultLimit: number;
    /**
     * Default page number
     */
    defaultPage: number;
  };
  config: {
    /**
     * Error handler callback
     */
    onError?: (error: Error) => void;
    /**
     * Success handler callback
     */
    onSuccess?: (data: T[]) => void;
  };
}

/**
 * State interface for module data
 * @template T - Type of the data items
 */
export interface ModuleState<T> {
  list: T[];
  loading: boolean;
  error: string | null;
  refreshing: boolean;
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  extraParams?: { [key: string]: any };
}

/**
 * Combined state interface for module
 * @template F - Type of the filter
 * @template S - Type of the sort
 */
interface CombinedState<F extends ModuleFilter, S extends ModuleSort> {
  filter: F;
  sort: {
    field: S['field'];
    order: 'asc' | 'desc';
  };
  search: string;
  pagination: {
    page: number;
    limit: number;
  };
}

/**
 * Context type for module functionality
 * @template T - Type of the data items
 * @template F - Type of the filter
 * @template S - Type of the sort
 * @template Q - Type of the query
 */
export interface ModuleContextType<
  T,
  F extends ModuleFilter,
  S extends ModuleSort,
  Q extends BaseQuery
> {
  state: ModuleState<T>;
  filter: {
    current: F;
    update: (updates: Partial<F>) => void;
    reset: () => void;
    activeFilterCount: number;
  };
  sort: {
    current: {
      field: S['field'];
      order: 'asc' | 'desc';
    };
    update: (field: S['field']) => void;
    toggleOrder: () => void;
    reset: () => void;
    /**
     * Indicates if the current sort field differs from the default
     */
    isDefaultSortChanged: boolean;
  };
  search: {
    current: string;
    update: (text: string) => void;
    reset: () => void;
    debouncedValue: string;
  };
  pagination: {
    current: {
      page: number;
      limit: number;
    };
    update: (updates: { page?: number; limit?: number }) => void;
    reset: () => void;
    total: number;
    hasMore: boolean;
  };
  buildQuery: () => Q;
  handleRefresh: () => void;
  handleResetAll: () => void;
  handleLoadMore: () => void;
  /**
   * Indicates if there are any results in the current state
   */
  hasResults: boolean;
}

// Create Module Context
export function createModuleContext<
  T,
  F extends ModuleFilter,
  S extends ModuleSort,
  Q extends BaseQuery
>(config: ModuleConfig<T, F, S, Q>) {
  const ModuleContext = createContext<ModuleContextType<T, F, S, Q> | undefined>(undefined);

  const ModuleProvider = ({
    children,
    state,
  }: {
    children: React.ReactNode;
    state?: ModuleState<T>;
  }) => {
    const dispatch = useDispatch();
    const abortControllerRef = useRef<AbortController | null>(null);
    const searchRef = useRef('');
    const isInitialMount = useRef(true);

    // Single combined state
    const [moduleState, setModuleState] = useState<CombinedState<F, S>>({
      filter: config.filter.defaults as F,
      sort: {
        field: config.sort.defaults.field,
        order: config.sort.defaults.order,
      },
      search: '',
      pagination: {
        page: config.pagination?.defaultPage || 1,
        limit: config.pagination?.defaultLimit || 10,
      },
    });

    // Add state for immediate UI updates
    const [searchText, setSearchText] = useState('');

    // Core functions
    const buildQuery = useCallback(
      (searchOverride?: string) => {
        const search = (searchOverride ?? searchRef.current)?.trim() || undefined;

        const cleanedFilter = Object.entries(moduleState.filter).reduce((acc, [key, value]) => {
          if (value !== null && value !== undefined) {
            if (Array.isArray(value)) {
              if (value.length > 0) {
                acc[key as keyof F] = value as F[keyof F];
              }
            } else if (typeof value === 'boolean' || value !== '') {
              acc[key as keyof F] = value as F[keyof F];
            }
          }
          return acc;
        }, {} as Partial<F>);

        const filterWithSearch = {
          ...cleanedFilter,
          ...(search ? { search } : {}),
        } as F & { search?: string };

        const query = config.query.buildQuery({
          page: moduleState.pagination.page,
          limit: moduleState.pagination.limit,
          sortBy: moduleState.sort.field,
          order: moduleState.sort.order,
          ...(filterWithSearch ? { filter: filterWithSearch } : {}),
          ...(state && state.extraParams ? { extraParams: state.extraParams } : {}),
        });

        return query;
      },
      [moduleState]
    );

    const handleFetch = useCallback(
      async (searchOverride?: string) => {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();
        try {
          await dispatch(config.query.fetchAction(buildQuery(searchOverride)));
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
      },
      [dispatch, buildQuery]
    );

    // State update handlers
    /**
     * Updates filter state and resets pagination to first page
     * @param updates - Partial filter updates to apply
     */
    const handleFilter = useCallback((updates: Partial<F>) => {
      // Remove properties that are explicitly set to undefined
      const cleanedUpdates = Object.entries(updates).reduce((acc, [key, value]) => {
        if (value !== undefined) {
          acc[key as keyof F] = value as F[keyof F];
        }
        return acc;
      }, {} as Partial<F>);

      // For properties set to undefined, we need to explicitly remove them from the filter
      const removedKeys = Object.keys(updates).filter(key => updates[key as keyof F] === undefined);

      setModuleState(prev => {
        const newFilter = { ...prev.filter, ...cleanedUpdates };
        // Remove properties that were explicitly set to undefined
        removedKeys.forEach(key => {
          delete newFilter[key as keyof F];
        });
        return {
          ...prev,
          filter: newFilter,
          pagination: {
            page: config.pagination?.defaultPage || 1,
            limit: config.pagination?.defaultLimit || 10,
          },
        };
      });
    }, []);

    /**
     * Updates sort field and resets pagination to first page
     * @param field - New sort field to apply
     */
    const handleSort = useCallback((field: S['field']) => {
      setModuleState(prev => ({
        ...prev,
        sort: {
          ...prev.sort,
          field,
        },
        pagination: {
          page: config.pagination?.defaultPage || 1,
          limit: config.pagination?.defaultLimit || 10,
        },
      }));
    }, []);

    /**
     * Toggles sort order between 'asc' and 'desc' and resets pagination
     */
    const handleToggleOrder = useCallback(() => {
      setModuleState(prev => ({
        ...prev,
        sort: {
          ...prev.sort,
          order: prev.sort.order === 'asc' ? 'desc' : 'asc',
        },
        pagination: {
          page: config.pagination?.defaultPage || 1,
          limit: config.pagination?.defaultLimit || 10,
        },
      }));
    }, []);

    /**
     * Debounced search handler that updates search state and resets pagination
     * @param text - Search text to apply
     */
    const debouncedSearch = useDebouncedCallback(text => {
      searchRef.current = text;
      setModuleState(prev => ({
        ...prev,
        search: text,
        pagination: {
          page: config.pagination?.defaultPage || 1,
          limit: config.pagination?.defaultLimit || 10,
        },
      }));
    }, config.search.debounce || 500);

    /**
     * Immediate search handler that updates UI and triggers debounced search
     * @param text - Search text to apply
     */
    const handleSearch = (text: string) => {
      setSearchText(text); // Update UI immediately
      debouncedSearch(text);
    };

    /**
     * Updates pagination state without resetting other states
     * @param updates - Pagination updates to apply
     */
    const handlePagination = useCallback((updates: { page?: number; limit?: number }) => {
      setModuleState(prev => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          ...updates,
        },
      }));
    }, []);

    // Reset handlers
    /**
     * Resets filter state to defaults and resets pagination
     */
    const handleResetFilter = useCallback(() => {
      setModuleState(prev => ({
        ...prev,
        filter: config.filter.defaults as F,
        pagination: {
          page: config.pagination?.defaultPage || 1,
          limit: config.pagination?.defaultLimit || 10,
        },
      }));
    }, []);

    /**
     * Resets sort state to defaults and resets pagination
     */
    const handleResetSort = useCallback(() => {
      setModuleState(prev => ({
        ...prev,
        sort: {
          field: config.sort.defaults.field,
          order: config.sort.defaults.order,
        },
        pagination: {
          page: config.pagination?.defaultPage || 1,
          limit: config.pagination?.defaultLimit || 10,
        },
      }));
    }, []);

    /**
     * Resets search state and clears search ref
     */
    const handleResetSearch = useCallback(() => {
      setModuleState(prev => ({
        ...prev,
        search: '',
        pagination: {
          page: config.pagination?.defaultPage || 1,
          limit: config.pagination?.defaultLimit || 10,
        },
      }));
      searchRef.current = '';
      setSearchText(''); // Reset the UI search text
    }, []);

    /**
     * Resets pagination state to defaults
     */
    const handleResetPagination = useCallback(() => {
      setModuleState(prev => ({
        ...prev,
        pagination: {
          page: config.pagination?.defaultPage || 1,
          limit: config.pagination?.defaultLimit || 10,
        },
      }));
    }, []);

    /**
     * Resets all states (filter, sort, search, pagination) to their defaults
     */
    const handleResetAll = useCallback(() => {
      setModuleState({
        filter: config.filter.defaults as F,
        sort: {
          field: config.sort.defaults.field,
          order: config.sort.defaults.order,
        },
        search: '',
        pagination: {
          page: config.pagination?.defaultPage || 1,
          limit: config.pagination?.defaultLimit || 10,
        },
      });
      searchRef.current = '';
      setSearchText(''); // Reset the UI search text
    }, []);

    // Auto-fetch effect - skip on initial mount to avoid duplicate fetch
    useEffect(() => {
      // Skip the initial mount - let InitializationService or screen handle first fetch
      if (isInitialMount.current) {
        isInitialMount.current = false;
        return;
      }
      
      handleFetch();
    }, [moduleState, handleFetch]);

    /**
     * Loads more data by incrementing the page number if more data is available
     */
    const handleLoadMore = useCallback(() => {
      if (
        !state?.loading &&
        (state?.total || 0) > moduleState.pagination.page * moduleState.pagination.limit
      ) {
        setModuleState(prev => ({
          ...prev,
          pagination: {
            ...prev.pagination,
            page: prev.pagination.page + 1,
          },
        }));
      }
    }, [state?.loading, state?.total, moduleState.pagination.page, moduleState.pagination.limit]);

    const handleRefresh = useCallback(() => {
      // Reset pagination to page 1 before refreshing
      setModuleState(prev => ({
        ...prev,
        pagination: {
          page: config.pagination?.defaultPage || 1,
          limit: config.pagination?.defaultLimit || 10,
        },
      }));
    }, []);

    const value: ModuleContextType<T, F, S, Q> = {
      state: state || {
        list: [],
        loading: false,
        error: null,
        refreshing: false,
        total: 0,
        totalPages: 0,
        currentPage: moduleState.pagination.page,
        limit: moduleState.pagination.limit,
      },
      filter: {
        current: moduleState.filter,
        update: handleFilter,
        reset: handleResetFilter,
        activeFilterCount: config.filter.getActiveCount(moduleState.filter),
      },
      sort: {
        current: moduleState.sort,
        update: handleSort,
        toggleOrder: handleToggleOrder,
        reset: handleResetSort,
        isDefaultSortChanged: moduleState.sort.field !== config.sort.defaults.field,
      },
      search: {
        current: searchText,
        update: handleSearch,
        reset: handleResetSearch,
        debouncedValue: moduleState.search,
      },
      pagination: {
        current: moduleState.pagination,
        update: handlePagination,
        reset: handleResetPagination,
        total: state?.total || 0,
        hasMore: (state?.total || 0) > moduleState.pagination.page * moduleState.pagination.limit,
      },
      buildQuery,
      handleRefresh,
      handleResetAll: handleResetAll,
      handleLoadMore,
      hasResults: (state?.list?.length || 0) > 0,
    };

    return <ModuleContext.Provider value={value}>{children}</ModuleContext.Provider>;
  };

  const useModuleContext = () => {
    const context = useContext(ModuleContext);
    if (!context) {
      throw new Error('useModuleContext must be used within a ModuleProvider');
    }
    return context;
  };

  return { ModuleProvider, useModuleContext };
}
