import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Session {
  login: string,
  id: number,
  avatar_url: string
}

@Injectable()
export class AuthService {
  session: any;

  constructor(private http: HttpClient) {
    //
  }

  login(username: string) {
    return this.http.get(`https://api.github.com/users/${username}`);
  }

  getSession() {
    return this.session;
  }

  setSession(session: any) {
    this.session = session;
  }
}