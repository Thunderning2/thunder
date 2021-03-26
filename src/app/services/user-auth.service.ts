import { HttpClient } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { LogService } from './log.service';
import { UsersService } from './users.service';

@Injectable({ providedIn: 'root' })
export class UserAuthService {
  private endpoint = environment.endpoint;

  public get loggedIn() {
    const expired = new JwtHelperService().isTokenExpired(this.key);
    return this.usersService.user && !expired;
  }
  public get key() {
    return localStorage.getItem('key');
  }

  public get headers() {
    return { headers: { 'Authorization': `Bearer ${this.key}` } };
  }

  constructor(
    private log: LogService,
    private http: HttpClient,
    private usersService: UsersService,
  ) {}

  public async signUp(user: Credentials) {
    const res: any = await this.http.post(`${this.endpoint}/users`, user).toPromise();

    if (res) {
      localStorage.setItem('key', res);
      await this.usersService.updateUser();
    }
    return Boolean(res);
  }

  public async login(user: Credentials) {
    const res: string | { verify: true } = await this.http
      .post(`${this.endpoint}/login`, user)
      .toPromise() as any;      

    if (typeof res !== 'string')
      return res;

    localStorage.setItem('key', res);
    await this.usersService.updateUser();
  }

  public async verify(code: string): Promise<string> {
    const res: string | { message: string } = await this.http
      .get(`${this.endpoint}/verify-code?code=${code}`)
      .toPromise() as any;
    if (typeof res !== 'string')
      throw res.message;
    return res;
  }

  public async sendVerifyEmail(email: string): Promise<boolean> {
    const res = await this.http.get(`${this.endpoint}/send-verify-email?email=${email}`, this.headers).toPromise() as any;
    const verified = 'verify' in res;
    if (verified) {
      this.log.success('Email sent');
      return true;
    }
    this.log.error('Failed to send email');
    return false;
  }

  public async changePassword(oldPassword: string, newPassword: string): Promise<boolean> {
    const res = await this.http.post(
      `${this.endpoint}/verify-email`,
      { oldPassword, newPassword },
      this.headers).toPromise() as any;
    if (typeof res !== 'string') {
      this.log.error('Password change failed.');
      return false;
    }

    localStorage.setItem('key', res);
    this.log.success('Password successfully changed!');
    return true;
  }
}

export interface Credentials {
  username?: string;
  email?: string;
  password: string;
}