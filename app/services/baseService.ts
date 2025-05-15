import { router } from 'expo-router';

export class BaseService<T = any> {
  protected getToken: () => string | null;
  protected onUnauthorized: () => void;

  constructor(
    getToken: () => string | null,
    onUnauthorized: () => void
  ) {
    this.getToken = getToken;
    this.onUnauthorized = onUnauthorized;
  }

  protected async request<R>(endpoint: string, options: RequestInit = {}): Promise<R> {
    const token = this.getToken();
    if (!token) {
      this.onUnauthorized();
      throw new Error('No authentication token found');
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    };

    try {
      const response = await fetch(endpoint, {
        ...options,
        headers,
      });

      if (response.status === 401) {
        this.onUnauthorized();
        throw new Error('Unauthorized');
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data as R;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  protected async getAll(): Promise<T[]> {
    return this.request<T[]>('');
  }

  protected async get(id: number): Promise<T> {
    return this.request<T>(`/${id}`);
  }

  protected async create(data: Partial<T>): Promise<T> {
    return this.request<T>('', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  protected async update(id: number, data: Partial<T>): Promise<T> {
    return this.request<T>(`/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  protected async delete(id: number): Promise<void> {
    return this.request<void>(`/${id}`, {
      method: 'DELETE',
    });
  }
} 