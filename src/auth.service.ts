import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    constructor(
        private http: HttpClient,
        private router: Router
    ) {}
    isAuthenticated() {
        const token = localStorage.getItem('access_token') ?? false;
        if (token == false) {
            return false;
        }

        return true;
    }
}
