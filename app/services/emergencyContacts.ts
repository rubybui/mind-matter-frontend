import { BaseService } from './baseService';
import { EmergencyContact } from '../types/user';
import { config } from '../config';

export class EmergencyContactsService extends BaseService<EmergencyContact> {
  constructor(
    getToken: () => string | null,
    onUnauthorized: () => void
  ) {
    super(getToken, onUnauthorized);
  }

  async getEmergencyContacts(): Promise<EmergencyContact[]> {
    return this.request<EmergencyContact[]>(`${config.apiBaseUrl}/emergency-contacts`);
  }

  async createEmergencyContact(contact: Omit<EmergencyContact, 'contact_id'>): Promise<EmergencyContact> {
    return this.request<EmergencyContact>(`${config.apiBaseUrl}/emergency-contacts`, {
      method: 'POST',
      body: JSON.stringify(contact),
    });
  }

  async updateEmergencyContact(contactId: number, contact: Partial<EmergencyContact>): Promise<EmergencyContact> {
    return this.request<EmergencyContact>(`${config.apiBaseUrl}/emergency-contacts/${contactId}`, {
      method: 'PUT',
      body: JSON.stringify(contact),
    });
  }

  async deleteEmergencyContact(contactId: number): Promise<void> {
    const response = await fetch(`${config.apiBaseUrl}/emergency-contacts/${contactId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.getToken()}`,
      },
    });

    if (response.status === 401) {
      this.onUnauthorized();
      throw new Error('Unauthorized');
    }

    if (response.status !== 204) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
}

export const emergencyContactsService = new EmergencyContactsService(
  () => null,
  () => {}
); 