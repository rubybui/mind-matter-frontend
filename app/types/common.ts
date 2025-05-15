// Common response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

// Common request types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface DateRange {
  start_date: string;
  end_date: string;
}

// Common utility types
export type WithId<T> = T & { id: number };
export type WithTimestamps<T> = T & {
  created_at: string;
  updated_at: string;
};
export type WithSoftDelete<T> = T & {
  deleted_at?: string;
  is_deleted: boolean;
};

// Common enum types
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  PREFER_NOT_TO_SAY = 'prefer_not_to_say'
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  THERAPIST = 'therapist'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended'
} 