export interface FetchStatusAndPriorityTypes {
  isSuccess: boolean;
  code: string;
  data: {
    type: TaskType;
  };
}

interface TaskType {
  id: number;
  name: string;
  description: string;
  code: string;
  status: Status[];
  priority: Priority[];
}

interface Status {
  id: number;
  name: string;
  statusCategory: 'active' | 'done' | 'backlog';
}

interface Priority {
  id: number;
  name: 'low' | 'medium' | 'high' | 'critical';
  fontColor: string;
  backgroundColor: string;
}

export interface TypesRequestCode {
  code?: string; // concern
}

// Competitor Company Types
export interface CompetitorCompanyRole {
  id: number;
  roleType: string;
  name: string;
}

export interface CompetitorCompanyUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string | null;
  mobileNo: string;
  profileImage: string | null;
  isDeleted: boolean;
  roles: CompetitorCompanyRole[];
}

export interface CompetitorCompany {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  createdBy: CompetitorCompanyUser;
  updatedBy: CompetitorCompanyUser | null;
}

export interface CompetitorCompanyListResponse {
  isSuccess: boolean;
  code: string;
  data: CompetitorCompany[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}
