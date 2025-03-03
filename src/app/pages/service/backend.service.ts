import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { json } from 'express';

interface RegisterUserSchema {
    fullname: string;
    email: string;
    password: string;
}

interface LoginUserSchema {
    email: string;
    password: string;
}

@Injectable()
export class BackendService {
    constructor(private http: HttpClient) {}

    response!: any[];

    apiUrl = 'https://88k7cdg9-3000.inc1.devtunnels.ms';

    getUsers() {
        return this.http.get(this.apiUrl + '/users').pipe(
            map((response: any) => {
                this.response = response;
                return this.response;
            })
        );
    }
    createUser(userDetail: RegisterUserSchema) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post(this.apiUrl + '/createUser', JSON.stringify(userDetail), httpOptions).pipe(
            map((response: any) => {
                this.response = response;
                return this.response;
            })
        );
    }
    validateOTPAuth(email: string, otpValue: number) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        const otpparam = {
            mail: email,
            otp: otpValue
        };
        return this.http.post(this.apiUrl + '/validateOTP', JSON.stringify(otpparam), httpOptions).pipe(
            map((response: any) => {
                this.response = response;
                return this.response;
            })
        );
    }

    login(userDetail: LoginUserSchema) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post(this.apiUrl + '/login', JSON.stringify(userDetail), httpOptions).pipe(
            map((response: any) => {
                this.response = response;
                return this.response;
            })
        );
    }

    todo_counts(token_string: string) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        let token_entry = {
            token: token_string
        };
        return this.http.post(this.apiUrl + '/todo_count', JSON.stringify(token_entry), httpOptions).pipe(
            map((response: any) => {
                this.response = response;
                return this.response;
            })
        );
    }

    getProducts(token_string: string) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        let token_entry = {
            token: token_string
        };
        return this.http.post(this.apiUrl + '/get_products', JSON.stringify(token_entry), httpOptions).pipe(
            map((response: any) => {
                this.response = response;
                return this.response;
            })
        );
    }
}
