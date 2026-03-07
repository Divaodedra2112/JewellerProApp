import { get } from '../../../services/api';
import { UpdatesResponse, Update } from './UpdatesTypes';
import { logger } from '../../../utils/logger';

/** App updates endpoint: GET /api/v1/app/updates */
const UPDATES_PATH = '/app/updates';

/** Allowed filter values (case-insensitive): regulatory, circular, reminder, notice */
export type UpdateTypeFilter = 'regulatory' | 'circular' | 'reminder' | 'notice';

export const getUpdates = async (updateType?: UpdateTypeFilter): Promise<Update[]> => {
  try {
    const response = await get<UpdatesResponse>(UPDATES_PATH, {
      ...(updateType && { updateType }),
    });

    if (!response) {
      throw new Error('No response received from server');
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch updates');
    }

    return response.data ?? [];
  } catch (error: any) {
    logger.error('Updates Service - Error fetching updates', error as Error, {
      endpoint: UPDATES_PATH,
      updateType,
    });
    throw error;
  }
};
