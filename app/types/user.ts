import { WithTimestamps } from './common';

export interface User {
  id: number;
  email: string;
  created_at?: string;
  updated_at?: string;
  emergency_contact?: EmergencyContact | null;
}

export interface Profile {
  id: number;
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

export interface UserWithProfile extends User {
  profile: Profile;
}

export interface EmergencyContact {
  contact_id: number;
  contact_name: string;
  phone_number: string;
  description: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserWithEmergencyContact extends User {
  emergency_contact: EmergencyContact | null;
} 