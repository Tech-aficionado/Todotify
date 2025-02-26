import { CanActivateFn, CanLoad, Router } from '@angular/router';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';

export const AuthenticationGaurds: CanActivateFn = (route: any, state: any) => {
  const router = inject(Router)
  // const token = localStorage.getItem('Access_token') ?? false;
  // if (token == false) {
    // router.navigate(['auth/access']);
  //   return false;
  // }
  return true;
};
