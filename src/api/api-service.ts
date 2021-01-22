import { LoginInfo } from './domain/login-info';
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

  private createHeaders(): Headers {
    const headers = new Headers();
    headers.append("Content-Type", "application/json")
    const token = sessionStorage.getItem("token");
    if (token){
      headers.append("Authorization", `Bearer ${token}`);
    } 
    return headers;
  };


  // PARTNER REQUESTS



  getPartner(id: string): Promise<Partner> {
    const headers = this.createHeaders();
    return fetch(`${API_URL}/partner/${id}`, {
      method: "GET", headers
    })
      .then((res) => res.json())

      .then((res) => {
        return res as Partner;
      });
  };

  deletePartner(id: string): Promise<boolean> {
    const headers = this.createHeaders();
    return fetch(`${API_URL}/partner/${id}`, {
      method: "DELETE", headers
    })
      .then((res) => res.json())
      .then((res) => {
        return res as boolean;
      });
  };
  updatePartner(partner: Partner): Promise<{ id: string }> {
    const method = "POST";
    const headers = this.createHeaders();
    const body = JSON.stringify(partner);
    return fetch(`${API_URL}/partner/${partner.id}`, { method, headers, body })
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  };
  createPartner(partner: Partner): Promise<{ id: string }> {
    const method = "PUT";
   const headers = this.createHeaders();
    const body = JSON.stringify(partner);
    return fetch(`${API_URL}/partner`, { method, headers, body })
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  };
  getPartners(
    page: number,
    pageSize: number,
    search?: any
  ): Promise<PartnersPage> {
    const headers = this.createHeaders();
    return fetch(
      `${API_URL}/partners?page=${page}&pageSize=${pageSize}&search=${search}`,
      {
        method: "GET", headers
      }
    )
      .then((res) => res.json())
      .then((res) => {
        return res as PartnersPage;
      });
  };

  login(login: LoginInfo): Promise<{token: string}>{
    const method = "POST"
    const headers = new Headers();
    const body = JSON.stringify(login)
    headers.append("Content-Type", "application/json")
    return fetch(`${API_URL}/login`, { 
      method, headers, body
     }).then((res) => res.json())
     .then((res) => {
       return res;
     });
  };

  // USER REQUESTS

  createUser(user?: User): Promise<{ id: string }> {
    const method = "PUT";
    const headers = this.createHeaders();
    const body = JSON.stringify(user);
    return fetch(`${API_URL}/user`, { method, headers, body })
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  };
  loginCheck(login: string): Promise<Boolean> {
    const headers = this.createHeaders();
    return fetch(`${API_URL}/user/existence/${login}`, {
      method: "GET", headers
    })
      .then((res) => res.json())

      .then((res) => {
        return res as Boolean;
      });
  };

  updateUserPassword(password: string, id?: string): Promise<{ id: string }> {
    const method = "POST";
    const headers = this.createHeaders();
    const body = JSON.stringify({ password });
    return fetch(`${API_URL}/user/${id}/password`, { method, headers, body })
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  };
  updateUser(user: User): Promise<{ id: string }> {
    const method = "POST";
    const headers = this.createHeaders();
    const body = JSON.stringify(user);
    return fetch(`${API_URL}/user/${user.id}`, { method, headers, body })
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  };
  getUser(id: string): Promise<User> {
    const headers = this.createHeaders();
    return fetch(`${API_URL}/user/${id}`, {
      method: "GET", headers
    })
      .then((res) => res.json())

      .then((res) => {
        return res as User;
      });
  };
  deleteUser(id: string): Promise<Boolean> {
    const headers = this.createHeaders();
    return fetch(`${API_URL}/user/${id}`, {
      method: "DELETE", headers
    })
      .then((res) => res.json())
      .then((res) => {
        return res as boolean;
      });
  };
  getUsers(page: number, pageSize: number, search?: any): Promise<UsersPage> {
    const headers = this.createHeaders();
    return fetch(
      `${API_URL}/users?page=${page}&pageSize=${pageSize}&search=${search}`,
      {
        method: "GET", headers
      }
    )
      .then((res) => res.json())
      .then((res) => {
        return res as UsersPage;
      });
  };
};




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
