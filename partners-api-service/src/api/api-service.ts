import { PartnersPage } from "./domain/partners-page";
import { Partner } from "./domain";

const API_URL = "http://localhost:3000";

export interface ApiService {
  getPartner(id: string): Promise<Partner>;
  deletePartner(id: string): Promise<boolean>;
  updatePartner(partner: Partner): Promise<{ id: string }>;
  createPartner(partner: Partner): Promise<{ id: string }>;
  getPartners(page: number, pageSize: number): Promise<PartnersPage>;
}

export class ApiServiceImpl implements ApiService {
  private constructor() {}

  static readonly instance = new ApiServiceImpl();

  getPartner(id: string): Promise<Partner> {
    return fetch(`${API_URL}/partner/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      
      .then((res) => {
          
        return res as Partner;
      });
  }

  deletePartner(id: string): Promise<boolean> {
    return fetch(`${API_URL}/partner/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        return res as boolean;
      });
  }
  updatePartner(partner: Partner): Promise<{ id: string }> {
    const method = "POST";
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const body = JSON.stringify(partner);
    return fetch(`${API_URL}/partner/${partner.id}`, { method, headers, body })
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  }
  createPartner(partner: Partner): Promise<{ id: string }> {
    const method = "PUT";
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const body = JSON.stringify(partner);
    return fetch(`${API_URL}/partner`, { method, headers, body })
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  }
  getPartners(page: number, pageSize: number): Promise<PartnersPage> {
    return fetch(`${API_URL}/partners?page=${page}&pageSize=${pageSize}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        return res as PartnersPage;
      });
  }
}

export const apiService: ApiService = {
  getPartner(id: string): Promise<Partner> {
    return fetch(`${API_URL}/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        return res as Partner;
      });
  },
  deletePartner(id: string): Promise<boolean> {
    return fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        return res as boolean;
      });
  },
  updatePartner(partner: Partner): Promise<{ id: string }> {
    const method = "POST";
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const body = JSON.stringify(partner);
    return fetch(`${API_URL}/${partner.id}`, { method, headers, body })
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  },
  createPartner(partner: Partner): Promise<{ id: string }> {
    const method = "PUT";
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const body = JSON.stringify(partner);
    return fetch(`${API_URL}`, { method, headers, body })
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  },
  getPartners(page: number, pageSize: number): Promise<PartnersPage> {
    return fetch(`${API_URL}s?page=${page}&pageSize=${pageSize}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        return res as PartnersPage;
      });
  },
};
