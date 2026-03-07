/**
 * Unit tests for Profile API helpers and API behaviour.
 * Run: npm test -- profileApi.test.ts
 */

jest.mock('../src/utils/logger', () => ({
  logger: {
    error: jest.fn(),
    debug: jest.fn(),
    log: jest.fn(),
  },
}));

jest.mock('../src/services/api', () => ({
  get: jest.fn(),
  patch: jest.fn(),
}));

import {
  formatPhoneDisplay,
  mapProfileUserToAuthUser,
  getProfile,
  updateProfile,
  type ProfileUser,
} from '../src/modules/main/Profile/profileApi';

const { get, patch } = require('../src/services/api');

describe('formatPhoneDisplay', () => {
  it('formats countryCode and mobileNumber with + prefix', () => {
    expect(formatPhoneDisplay('91', '9876543210')).toBe('+91 9876543210');
  });

  it('adds + to countryCode if missing', () => {
    expect(formatPhoneDisplay('91', '9876543210')).toBe('+91 9876543210');
  });

  it('handles empty strings', () => {
    expect(formatPhoneDisplay('', '')).toBe('');
  });

  it('handles only countryCode', () => {
    expect(formatPhoneDisplay('91', '')).toBe('+91');
  });

  it('handles only mobileNumber', () => {
    expect(formatPhoneDisplay('', '9876543210')).toBe('9876543210');
  });

  it('trims whitespace', () => {
    expect(formatPhoneDisplay('  91  ', '  9876543210  ')).toBe('+91 9876543210');
  });
});

describe('mapProfileUserToAuthUser', () => {
  const baseApiUser: ProfileUser = {
    id: '123',
    firstName: 'Raj',
    lastName: 'Sharma',
    countryCode: '91',
    mobileNumber: '9876543210',
    email: 'raj@example.com',
  };

  it('maps all fields correctly', () => {
    const result = mapProfileUserToAuthUser(baseApiUser);
    expect(result.id).toBe(123);
    expect(result.firstName).toBe('Raj');
    expect(result.lastName).toBe('Sharma');
    expect(result.name).toBe('Raj Sharma');
    expect(result.mobile).toBe('9876543210');
    expect(result.email).toBe('raj@example.com');
    expect(result.countryCode).toBe('91');
  });

  it('handles string id', () => {
    const result = mapProfileUserToAuthUser({ ...baseApiUser, id: '456' });
    expect(result.id).toBe(456);
  });

  it('handles empty firstName/lastName', () => {
    const result = mapProfileUserToAuthUser({
      ...baseApiUser,
      firstName: '',
      lastName: '',
    });
    expect(result.name).toBe('raj@example.com');
    expect(result.firstName).toBe('');
    expect(result.lastName).toBe('');
  });

  it('handles missing email', () => {
    const result = mapProfileUserToAuthUser({
      ...baseApiUser,
      email: undefined,
    });
    expect(result.name).toBe('Raj Sharma');
  });
});

describe('getProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns profile when API returns success', async () => {
    const mockUser: ProfileUser = {
      id: '1',
      firstName: 'A',
      lastName: 'B',
      countryCode: '91',
      mobileNumber: '9999999999',
    };
    (get as jest.Mock).mockResolvedValue({
      success: true,
      data: { user: mockUser },
      message: 'Profile retrieved successfully',
    });

    const result = await getProfile();
    expect(get).toHaveBeenCalledWith('/app/profile');
    expect(result.success).toBe(true);
    expect(result.data.user).toEqual(mockUser);
  });

  it('throws when response is null', async () => {
    (get as jest.Mock).mockResolvedValue(null);
    await expect(getProfile()).rejects.toThrow();
  });

  it('throws when success is false', async () => {
    (get as jest.Mock).mockResolvedValue({
      success: false,
      data: {},
      message: 'Error',
    });
    await expect(getProfile()).rejects.toThrow();
  });
});

describe('updateProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sends only provided fields and returns updated user', async () => {
    const mockUser: ProfileUser = {
      id: '1',
      firstName: 'NewFirst',
      lastName: 'Sharma',
      countryCode: '91',
      mobileNumber: '9876543210',
    };
    (patch as jest.Mock).mockResolvedValue({
      success: true,
      data: { user: mockUser },
      message: 'Profile updated successfully',
    });

    const result = await updateProfile({
      firstName: 'NewFirst',
      lastName: 'Sharma',
    });
    expect(patch).toHaveBeenCalledWith('/app/profile', {
      firstName: 'NewFirst',
      lastName: 'Sharma',
    });
    expect(result.data.user.firstName).toBe('NewFirst');
  });

  it('throws when both firstName and lastName are empty', async () => {
    await expect(
      updateProfile({ firstName: '', lastName: '' })
    ).rejects.toThrow(/At least one of firstName or lastName/);

    await expect(
      updateProfile({})
    ).rejects.toThrow(/At least one of firstName or lastName/);
  });

  it('sends only firstName when lastName is empty', async () => {
    (patch as jest.Mock).mockResolvedValue({
      success: true,
      data: { user: { id: '1', firstName: 'Only', lastName: '', countryCode: '91', mobileNumber: '0' } },
    });
    await updateProfile({ firstName: 'Only', lastName: '' });
    expect(patch).toHaveBeenCalledWith('/app/profile', { firstName: 'Only' });
  });

  it('trims whitespace from names', async () => {
    (patch as jest.Mock).mockResolvedValue({
      success: true,
      data: { user: { id: '1', firstName: 'A', lastName: 'B', countryCode: '91', mobileNumber: '0' } },
    });
    await updateProfile({ firstName: '  A  ', lastName: '  B  ' });
    expect(patch).toHaveBeenCalledWith('/app/profile', { firstName: 'A', lastName: 'B' });
  });
});
