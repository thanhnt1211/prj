// import {Injectable} from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   CanActivate,
//   Router,
// } from '@angular/router';
// import {AuthService} from '../services/auth.service';
// import { KEY_USER_INFO } from '../utils/const';
// import { LocalStorageService } from '../services/storage.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class SuperAuthGuard implements CanActivate {
  
//   constructor(private authService: AuthService,
//     private router: Router,
//     private storageService: LocalStorageService) {
//   }

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): boolean {
//     const url = state.url;
//     const validRequest = this.checkLogin(url);
//     if (validRequest) {
//       return true;
//     } else {
//       this.router.navigate(['/super-admin/login']);
//     }
//   }

//   checkLogin(url: string): boolean {
//     const user = this.storageService.get(KEY_USER_INFO);
//     if (user) {
//       return true;
//     }
//     this.authService.redirectUrl = url;
//     return false;
//   }
// }
