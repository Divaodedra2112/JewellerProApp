export type SortOrder = 'asc' | 'desc';

export interface TaskResponse {
  isSuccess: boolean;
  code: string;
  data: Task[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export interface Task {
  id: number;
  title: string;
  type: {
    id: number;
    name: string;
    description: string;
    code: string;
  };
  status: {
    id: number;
    name: string;
    statusCategory: string;
    isDefault: boolean;
    isFinal: boolean;
  };
  priority: {
    id: number;
    name: string;
    sortOrder: number;
  };
  createdBy: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    mobileNo: string;
    profileImage: string;
    status: string;
    roles: Array<{
      id: number;
      name: string;
    }>;
  };
  reporter: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    mobileNo: string;
    profileImage: string;
    status: string;
    roles: Array<{
      id: number;
      name: string;
    }>;
  };
  assignee: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    mobileNo: string;
    profileImage: string;
    status: string;
    roles: Array<{
      id: number;
      name: string;
    }>;
  };
  data: {
    images: string[];
    description: string;
    unit: null | string;
    product: {
      id: number;
      productName: string;
      productCode: string;
      category: {
        id: number;
        name: string;
      };
    };
    concernTypes: Array<{
      id: number;
      name: string;
      description: string | null;
    }>;
    branch: {
      id: number;
      name: string;
      code: string;
      address_line1: string;
      address_line2: string;
      city: string;
      state: string;
      country: string;
      pinCode: string;
      contactPerson: Array<{
        name: string;
        mobileNo: string;
      }>;
    };
    company: {
      id: number;
      name: string;
      address_line1: string;
      address_line2: string;
      city: string;
      state: string;
      country: string;
      pinCode: string;
      road: {
        id: number;
        name: string;
      };
    };
    customer: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      mobileNo: string;
      profileImage: string;
      status: string;
      roles: Array<{
        id: number;
        name: string;
      }>;
    };
    category: {
      id: number;
      name: string;
    };
    categories?: Array<{
      id: number;
      name: string;
    }>;
    grade: {
      id: number;
      name: string;
    };
  };
  taskStatus: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  linkTo?: number[];
}

export interface TaskListState {
  list: Task[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  limit: number;
}

export interface TaskListContextType {
  state: TaskListState;
  filter: {
    activeFilterCount: number;
    current: Record<string, any>;
    update: (filters: Record<string, any>) => void;
    reset: () => void;
  };
  sort: {
    current: {
      field: string;
      order: SortOrder;
    };
    update: (field: string) => void;
    toggleOrder: () => void;
  };
  search: {
    current: string;
    update: (text: string) => void;
    reset: () => void;
  };
  handleRefresh: () => Promise<void>;
  handleResetAll: () => void;
  handleLoadMore: () => void;
  hasResults: boolean;
}

export const validSortFields = ['title', 'priority'] as const;

export type TaskSortBy = (typeof validSortFields)[number];
