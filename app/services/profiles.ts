import { BaseService } from './baseService';
import { User, UserWithProfile } from '../types/user';
import { WithTimestamps } from '../types/common';

export interface Profile {
  id?: number;
  user_id: number;
  first_name: string;
  last_name: string;
  date_of_birth?: string;
  gender?: string;
  phone_number?: string;
  emergency_contact_id?: number;
  created_at?: string;
  updated_at?: string;
}

export class ProfilesService extends BaseService<Profile> {
  constructor(
    getToken: () => string | null,
    onUnauthorized: () => void
  ) {
    super('/users', getToken, onUnauthorized);
  }

  async getProfileByUserId(userId: number): Promise<Profile | null> {
    const response = await this.getAll();
    return response.find(profile => profile.user_id === userId) || null;
  }

  async getUserWithProfile(userId: number): Promise<UserWithProfile> {
    return this.request<UserWithProfile>(`/profiles/${userId}/profile`);
  }

  async updateProfile(userId: number, data: Partial<Profile>): Promise<Profile> {
    const profile = await this.getProfileByUserId(userId);
    if (!profile) {
      throw new Error('Profile not found');
    }
    return this.update(profile.id!, data);
  }
}

export const profilesService = new ProfilesService(
  () => null,
  () => {}
); 