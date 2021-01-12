import { UsersPage } from "./domain/users-page";
import { User } from "./domain/user";
import { PartnersPage } from "./domain/partners-page";
import { Partner } from "./domain";

const API_URL = "http://localhost:3000";

export interface ApiService {
  getPartner(id: string): Promise<Partner>;
  deletePartner(id: string): Promise<boolean>;
  updatePartner(partner: Partner): Promise<{ id: string }>;
  createPartner(partner: Partner): Promise<{ id: string }>;
  getPartners(
    page: number,
    pageSize: number,
    search: Partner
  ): Promise<PartnersPage>;
}

export class ApiServiceImpl implements ApiService {
  private constructor() {}

  static readonly instance = new ApiServiceImpl();

  // PARTNER REQUESTS

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
  getPartners(
    page: number,
    pageSize: number,
    search?: any
  ): Promise<PartnersPage> {
    return fetch(
      `${API_URL}/partners?page=${page}&pageSize=${pageSize}&search=${search}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        return res as PartnersPage;
      });
  }

  // USER REQUESTS

  createUser(user?: User): Promise<{ id: string }> {
    const method = "PUT";
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const body = JSON.stringify(user);
    return fetch(`${API_URL}/user`, { method, headers, body })
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  }
  loginCheck(login: string): Promise<Boolean> {
    return fetch(`${API_URL}/user/existence/${login}`, {
      method: "GET",
    })
      .then((res) => res.json())

      .then((res) => {
        return res as Boolean;
      });
  }

  updateUserPassword(password: string, id?: string): Promise<{ id: string }> {
    const method = "POST";
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const body = JSON.stringify({ password });
    return fetch(`${API_URL}/user/${id}/password`, { method, headers, body })
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  }
  updateUser(user: User): Promise<{ id: string }> {
    const method = "POST";
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const body = JSON.stringify(user);
    return fetch(`${API_URL}/user/${user.id}`, { method, headers, body })
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  }
  getUser(id: string): Promise<User> {
    return fetch(`${API_URL}/user/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())

      .then((res) => {
        return res as User;
      });
  }
  deleteUser(id: string): Promise<Boolean> {
    return fetch(`${API_URL}/user/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        return res as boolean;
      });
  }
  getUsers(page: number, pageSize: number, search?: any): Promise<UsersPage> {
    return fetch(
      `${API_URL}/users?page=${page}&pageSize=${pageSize}&search=${search}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        return res as UsersPage;
      });
  }
}

// FUNCTIONAL

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
  getPartners(
    page: number,
    pageSize: number,
    search?: any
  ): Promise<PartnersPage> {
    return fetch(
      `${API_URL}/partners?page=${page}&pageSize=${pageSize}&search=${search}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        return res as PartnersPage;
      });
  },
};
