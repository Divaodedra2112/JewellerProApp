/**
 * Profile API – GET /app/profile, PATCH /app/profile.
 * Auth: Authorization: Bearer <access_token> (handled by api interceptor).
 */

import { get, patch } from '../../../services/api';
import { logger } from '../../../utils/logger';

const PROFILE_PATH = '/app/profile';

// --- Types (aligned with Mobile App Profile API Guide) ---

export interface ProfileUser {
  id: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  mobileNumber: string;
  email?: string;
  isEmailVerified?: boolean;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetProfileResponse {
  success: boolean;
  data: { user: ProfileUser };
  message?: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  data: { user: ProfileUser };
  message?: string;
}

export interface ProfileErrorResponse {
  code?: string;
  message?: string;
}

// --- Helpers ---

/** Format phone for display: +{countryCode} {mobileNumber} */
export function formatPhoneDisplay(countryCode: string, mobileNumber: string): string {
  const cc = (countryCode || '').trim();
  const num = (mobileNumber || '').trim();
  if (!cc && !num) return '';
  if (!cc) return num;
  const prefix = cc.startsWith('+') ? cc : `+${cc}`;
  return num ? `${prefix} ${num}` : prefix;
}

/** Map API profile user to auth slice user shape */
export function mapProfileUserToAuthUser(apiUser: ProfileUser): {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  mobile: string;
  email?: string;
  countryCode?: string;
  photo?: string;
  roles?: Array<{ id: number; name: string; permissions: Record<string, string[]> }>;
  permissions?: Record<string, string[]>;
} {
  const id = typeof apiUser.id === 'string' ? parseInt(apiUser.id, 10) || 0 : Number(apiUser.id) || 0;
  const firstName = apiUser.firstName ?? '';
  const lastName = apiUser.lastName ?? '';
  const name = [firstName, lastName].filter(Boolean).join(' ') || apiUser.email || '';
  return {
    id,
    name,
    firstName,
    lastName,
    mobile: apiUser.mobileNumber ?? '',
    email: apiUser.email,
    countryCode: apiUser.countryCode ?? undefined,
    photo: undefined,
    roles: [],
    permissions: {},
  };
}

// --- API calls ---

/**
 * GET /app/profile – fetch current user profile.
 * 200: returns data.user; 401: interceptor clears tokens and redirects to login.
 */
export async function getProfile(): Promise<GetProfileResponse> {
  try {
    const response = await get<GetProfileResponse>(PROFILE_PATH);

    if (!response) {
      const err: any = new Error('No response received from server');
      err.response = { status: 0, data: { message: 'No response received from server' } };
      throw err;
    }

    if (response.success === false || !response.data?.user) {
      const err: any = new Error(response.message || 'Failed to load profile');
      err.response = { status: 200, data: { message: response.message } };
      throw err;
    }

    return response;
  } catch (error: any) {
    logger.error('Profile API – getProfile failed', error as Error, {
      endpoint: PROFILE_PATH,
      method: 'GET',
    });
    throw error;
  }
}

/**
 * PATCH /app/profile – update first name and/or last name.
 * At least one of firstName or lastName must be present.
 * 200: returns data.user; 400: validation error; 401: interceptor clears tokens.
 */
export async function updateProfile(payload: UpdateProfileRequest): Promise<UpdateProfileResponse> {
  const hasFirst = typeof payload.firstName === 'string' && payload.firstName.trim().length > 0;
  const hasLast = typeof payload.lastName === 'string' && payload.lastName.trim().length > 0;
  if (!hasFirst && !hasLast) {
    const err: any = new Error('At least one of firstName or lastName is required to update profile');
    err.response = {
      status: 400,
      data: { code: 'VALIDATION', message: 'At least one of firstName or lastName is required to update profile' },
    };
    throw err;
  }

  const body: UpdateProfileRequest = {};
  if (hasFirst) body.firstName = payload.firstName!.trim();
  if (hasLast) body.lastName = payload.lastName!.trim();

  try {
    const response = await patch<UpdateProfileResponse>(PROFILE_PATH, body);

    if (!response) {
      const err: any = new Error('No response received from server');
      err.response = { status: 0, data: { message: 'No response received from server' } };
      throw err;
    }

    if (response.success === false || !response.data?.user) {
      const err: any = new Error(response.message || 'Failed to update profile');
      err.response = { status: 200, data: { message: response.message } };
      throw err;
    }

    return response;
  } catch (error: any) {
    logger.error('Profile API – updateProfile failed', error as Error, {
      endpoint: PROFILE_PATH,
      method: 'PATCH',
      payload: body,
    });
    throw error;
  }
}
