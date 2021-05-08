import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DEFAULT_REDIRECT_LINK, RESULT_CODE_SUCCESS, SIGNUP_REDIRECT_LINK, KEY_USER_INFO, LOGIN_SUPER_REDIRECT_LINK } from '../utils/const';
import { LocalStorageService } from './storage.service';
import { AdminRepository } from '../repositories/admin.repository';
import { User } from './../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  isLoggedIn = false;
  isLoggedInSuper = false;
  accessToken = '';
  // store the URL so we can redirect after logging in
  redirectUrl: string;
  signupDirect: string;
  loginSuperDirect: string;

  constructor(
    private storageService: LocalStorageService,
    private router: Router,
    private adminRepository: AdminRepository,
  ) {
    this.redirectUrl = DEFAULT_REDIRECT_LINK;
    this.signupDirect = SIGNUP_REDIRECT_LINK;
    this.loginSuperDirect = LOGIN_SUPER_REDIRECT_LINK;
  }

  async login(authInfo: any) {    
    return this.adminRepository.login(authInfo).toPromise().then(async (res: any) => {            
      if (res.result && Number(res.code) === RESULT_CODE_SUCCESS) {               
        this.accessToken = res.result.access_token;
        this.setToken(this.accessToken);
        const user = new User();
        user.fill(res.result.user);
        this.storageService.set(KEY_USER_INFO, JSON.stringify(user));        
        this.loggedIn();
        return true;
      }      
      return false;

    });
  }

  async signup(authInfo: any) {
    return this.adminRepository.signup(authInfo).toPromise().then(async (res: any) => {
      if (res.result && Number(res.code) === RESULT_CODE_SUCCESS) {
        console.log(res.result.access_token);
        this.accessToken = res.result.access_token;
        this.setToken(this.accessToken);
        const user = new User();
        user.fill(res.result.user);
        this.storageService.set(KEY_USER_INFO, JSON.stringify(user));
        this.loggedIn();
      }
      return res;
    });
  }

  endSession(): void {
    this.isLoggedIn = false;
    this.storageService.unset('access_token');
    // this.storageService.unset('');
    this.router.navigate(['/signin']);
  }

  setToken(token: string) {
    if (token) {
      this.storageService.set('access_token', token);
    }
  }

  check(): Promise<any> {
    return new Promise((resolve, reject) => {
      const accessToken = this.storageService.get('access_token');
      if (!accessToken) {
        resolve(false);
      }
      resolve(true);
    });
  }

  loggedIn(): void {
    this.isLoggedIn = true;
    if (this.signupDirect) {
      // this.router.navigate(['home']);
    }
  }
}
